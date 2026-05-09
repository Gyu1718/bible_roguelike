const { endings, scenes } = window.GAME_DATA;

let state = {
  screen: "home",
  index: 0,
  stats: { endurance: 10, panic: 5, witness: 0 },
  feedback: null,
  pendingChoice: null,
  roll: null,
  ending: null,
  log: ["새로운 목격자의 기록이 열렸다."],
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function apply(effects = {}) {
  const next = { ...state.stats };
  Object.entries(effects).forEach(([key, value]) => {
    next[key] = clamp((next[key] || 0) + value, 0, key === "panic" ? 14 : 20);
  });
  state.stats = next;
}

function evaluate() {
  const stats = state.stats;
  if (stats.endurance <= 0) return endings.collapse;
  if (stats.panic >= 12) return endings.terror;
  if (stats.witness >= 12 && stats.panic <= 7) return endings.trueWitness;
  if (stats.witness <= 5) return endings.silent;
  return endings.survivor;
}

function riskInfo(value = 0) {
  if (value >= 100) return { label: "치명", className: "lethal", width: 100 };
  if (value >= 70) return { label: "높음", className: "high", width: value };
  if (value >= 45) return { label: "주의", className: "mid", width: value };
  return { label: "낮음", className: "low", width: value };
}

function isRollChoice(choice) {
  return !choice.badEnding && (choice.risk || 0) >= 70 && (choice.risk || 0) < 100;
}

function roll2d6() {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  return { d1, d2, total: d1 + d2 };
}

function rollTarget(choice) {
  const risk = choice.risk || 0;
  if (risk >= 85) return 9;
  if (risk >= 70) return 8;
  return 7;
}

function rollModifier(choice) {
  const stats = state.stats;
  let mod = 0;
  if ((choice.effects?.witness || 0) > 0 && stats.witness >= 6) mod += 1;
  if ((choice.effects?.endurance || 0) < 0 && stats.endurance >= 8) mod += 1;
  if (stats.panic >= 9) mod -= 1;
  if (stats.panic >= 12) mod -= 1;
  return mod;
}

function failureEffects(choice) {
  return {
    endurance: choice.failEffects?.endurance ?? -1,
    panic: choice.failEffects?.panic ?? 2,
    witness: choice.failEffects?.witness ?? -1,
  };
}

function needsFeedback(choice) {
  if (choice.feedbackMode === "inline") return false;
  if (choice.feedbackMode === "modal") return true;
  if (choice.badEnding) return true;
  if (isRollChoice(choice)) return true;
  const effects = choice.effects || {};
  if ((effects.witness || 0) >= 3) return true;
  if ((effects.panic || 0) >= 3) return true;
  return false;
}

function goNextOrEnd() {
  if (state.stats.endurance <= 0 || state.stats.panic >= 14) {
    state.ending = evaluate();
    state.screen = "ending";
    render();
    return;
  }

  state.index += 1;

  if (!scenes[state.index] || scenes[state.index]?.final) {
    state.ending = evaluate();
    state.screen = "ending";
    render();
    return;
  }

  state.feedback = null;
  state.pendingChoice = null;
  state.roll = null;
  state.screen = "play";
  render();
}

function choose(index) {
  const choice = scenes[state.index].choices[index];

  if (choice.badEnding) {
    state.feedback = { ...choice, next: "bad" };
    state.log.unshift(choice.text);
    state.log = state.log.slice(0, 6);
    state.screen = "feedback";
    render();
    return;
  }

  if (isRollChoice(choice)) {
    const dice = roll2d6();
    const target = rollTarget(choice);
    const modifier = rollModifier(choice);
    const score = dice.total + modifier;
    state.pendingChoice = choice;
    state.roll = { ...dice, target, modifier, score, success: score >= target };
    state.screen = "roll";
    render();
    return;
  }

  apply(choice.effects);
  state.log.unshift(choice.text);
  state.log = state.log.slice(0, 6);
  state.feedback = { ...choice, next: state.stats.endurance <= 0 || state.stats.panic >= 14 ? "ending" : "continue" };

  if (needsFeedback(choice)) {
    state.screen = "feedback";
    render();
    return;
  }

  goNextOrEnd();
}

function resolveRoll() {
  const choice = state.pendingChoice;
  const roll = state.roll;

  if (!choice || !roll) return;

  if (roll.success) {
    apply(choice.effects);
    state.feedback = {
      ...choice,
      title: choice.successTitle || choice.title,
      text: choice.successText || choice.text,
      next: state.stats.endurance <= 0 || state.stats.panic >= 14 ? "ending" : "continue",
    };
    state.log.unshift(choice.successText || choice.text);
  } else {
    const fail = failureEffects(choice);
    apply(fail);
    state.feedback = {
      ...choice,
      title: choice.failTitle || "판정 실패",
      text: choice.failText || "위험한 선택은 뜻대로 풀리지 않았다. 몸과 마음이 흔들렸다.",
      next: state.stats.endurance <= 0 || state.stats.panic >= 14 ? "ending" : "continue",
    };
    state.log.unshift(state.feedback.text);
  }

  state.log = state.log.slice(0, 6);
  state.screen = "feedback";
  render();
}

function proceed() {
  if (state.feedback?.next === "bad") {
    state.ending = endings[state.feedback.badEnding];
    state.screen = "ending";
    render();
    return;
  }

  if (state.feedback?.next === "ending") {
    state.ending = evaluate();
    state.screen = "ending";
    render();
    return;
  }

  goNextOrEnd();
}

function restart() {
  state = {
    screen: "play",
    index: 0,
    stats: { endurance: 10, panic: 5, witness: 0 },
    feedback: null,
    pendingChoice: null,
    roll: null,
    ending: null,
    log: ["벽돌과 바다 기록을 시작했다."],
  };
  render();
}

function statBar(label, value, key) {
  return `
    <div class="stat">
      <div class="stat-row"><span>${label}</span><strong>${value}</strong></div>
      <div class="bar"><div class="fill ${key === "panic" ? "panic" : ""}" style="width:${Math.min(100, value * 8)}%"></div></div>
    </div>
  `;
}

function side() {
  const stats = state.stats;
  return `
    <aside class="side">
      <h3>상태</h3>
      ${statBar("생존", stats.endurance, "endurance")}
      ${statBar("공포", stats.panic, "panic")}
      ${statBar("증언", stats.witness, "witness")}
      <div class="log">
        <h3>기록</h3>
        ${state.log.map((entry) => `<p>${entry}</p>`).join("")}
      </div>
    </aside>
  `;
}

function choiceButton(choice, index) {
  const risk = riskInfo(choice.risk);
  const rollLabel = isRollChoice(choice) ? " · 판정" : "";
  return `
    <button class="choice-btn" onclick="choose(${index})">
      <div class="choice-top">
        <span>${choice.label}</span>
        <span class="risk-badge risk-${risk.className}">위험도 ${risk.label}${rollLabel}</span>
      </div>
      <div class="risk-meter"><div class="risk-fill ${risk.className}" style="width:${risk.width}%"></div></div>
    </button>
  `;
}

function homeScreen() {
  return `
    <main class="layout">
      <section class="art"><div><p class="eyebrow">BIBLICAL WITNESS ROGUELIKE</p><h2>물벽 사이의 길</h2></div></section>
      <section class="card">
        <p class="eyebrow">1편</p>
        <h2>벽돌과 바다</h2>
        <p>위험도 높은 선택은 2d6 판정이 발생합니다. 위험도 치명 선택은 판정 없이 즉시 배드엔딩으로 이어집니다.</p>
        <button class="primary" onclick="restart()">시작하기</button>
      </section>
      ${side()}
    </main>
  `;
}

function playScreen() {
  const scene = scenes[state.index];
  return `
    <main class="layout">
      <section class="art"><div><p class="eyebrow">ILLUSTRATION</p><h2>${scene.art}</h2></div></section>
      <section class="card">
        <p class="eyebrow">벽돌과 바다 · ${state.index + 1}/${scenes.length}</p>
        <h2>${scene.title}</h2>
        <p>${scene.text}</p>
        <div class="choices">
          ${scene.choices.map(choiceButton).join("")}
        </div>
      </section>
      ${side()}
    </main>
  `;
}

function rollScreen() {
  const scene = scenes[state.index];
  const choice = state.pendingChoice;
  const roll = state.roll;
  const modText = roll.modifier === 0 ? "보정 없음" : `보정 ${roll.modifier > 0 ? "+" : ""}${roll.modifier}`;

  return `
    <main class="layout">
      <section class="art"><div><p class="eyebrow">2D6 CHECK</p><h2>${scene.art}</h2></div></section>
      <section class="card">
        <p class="eyebrow">판정</p>
        <h2>${choice.label}</h2>
        <p>위험한 선택이다. 주사위 두 개를 굴려 목표값 이상이면 성공한다.</p>
        <div class="meta">
          <div><span>주사위</span><strong>${roll.d1} + ${roll.d2}</strong></div>
          <div><span>${modText}</span><strong>총 ${roll.score}</strong></div>
          <div><span>목표값</span><strong>${roll.target} 이상</strong></div>
          <div><span>결과</span><strong>${roll.success ? "성공" : "실패"}</strong></div>
        </div>
        <button class="primary" onclick="resolveRoll()">결과 확인</button>
      </section>
      ${side()}
    </main>
  `;
}

function feedbackScreen() {
  const scene = scenes[state.index];
  const feedback = state.feedback;
  return `
    <main class="layout">
      <section class="art"><div><p class="eyebrow">선택의 결과</p><h2>${scene.art}</h2></div></section>
      <section class="card">
        <p class="eyebrow">선택의 결과</p>
        <h2>${feedback.title}</h2>
        <p>${feedback.text}</p>
        <div class="meta">
          <div><span>생존</span><strong>${state.stats.endurance}</strong></div>
          <div><span>공포</span><strong>${state.stats.panic}</strong></div>
          <div><span>증언</span><strong>${state.stats.witness}</strong></div>
          <div><span>분기</span><strong>${feedback.next === "bad" ? "배드엔딩" : "계속 진행"}</strong></div>
        </div>
        <button class="primary" onclick="proceed()">${feedback.next === "bad" ? "배드엔딩 확인" : "계속"}</button>
      </section>
      ${side()}
    </main>
  `;
}

function endingScreen() {
  const ending = state.ending;
  return `
    <main class="layout">
      <section class="art"><div><p class="eyebrow">목격의 끝</p><h2>물벽 사이의 길</h2></div></section>
      <section class="card">
        <p class="eyebrow">엔딩</p>
        <h2>${ending.title}</h2>
        <p>${ending.text}</p>
        <div class="row">
          <button class="primary" onclick="restart()">다시 도전</button>
          <button class="secondary" onclick="state.screen='home';render()">처음으로</button>
        </div>
      </section>
      ${side()}
    </main>
  `;
}

function render() {
  const root = document.getElementById("root");
  const body =
    state.screen === "home" ? homeScreen() :
    state.screen === "roll" ? rollScreen() :
    state.screen === "feedback" ? feedbackScreen() :
    state.screen === "ending" ? endingScreen() :
    playScreen();

  root.innerHTML = `
    <div class="app">
      <header class="top">
        <div>
          <p class="eyebrow">BIBLICAL WITNESS ROGUELIKE</p>
          <h1>이름 없는 증인들</h1>
          <p>성경 세계관 선택지형 로그라이크</p>
        </div>
        <button class="secondary" onclick="restart()">새 회차</button>
      </header>
      ${body}
    </div>
  `;
}

window.restart = restart;
window.choose = choose;
window.proceed = proceed;
window.resolveRoll = resolveRoll;
window.state = state;
window.render = render;
render();
