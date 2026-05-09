const { endings, scenes } = window.GAME_DATA;

let state = {
  screen: "home",
  index: 0,
  stats: { endurance: 10, panic: 5, witness: 0 },
  profile: { obedience: 0, witness: 0, survival: 0, fear: 0, resistance: 0, avoidance: 0 },
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

function applyProfile(profile = {}) {
  const next = { ...state.profile };
  Object.entries(profile).forEach(([key, value]) => {
    next[key] = (next[key] || 0) + value;
  });
  state.profile = next;
}

function testimonyType() {
  const entries = Object.entries(state.profile).sort((a, b) => b[1] - a[1]);
  const [key, value] = entries[0];

  if (!value) {
    return {
      title: "아직 이름 붙지 않은 걸음",
      text: "당신의 선택은 아직 뚜렷한 한 방향으로 굳어지지 않았다. 그러나 그 모호함도 억압의 시간을 통과하는 한 방식이었다.",
    };
  }

  const types = {
    obedience: {
      title: "두려움 속의 순종자",
      text: "당신은 모든 것을 이해해서 움직인 사람이 아니다. 그러나 떨림 속에서도 주어진 말씀과 표식 앞에 몸을 맞추는 쪽을 선택했다.",
    },
    witness: {
      title: "해방의 증언자",
      text: "당신은 사건을 단순한 생존으로만 넘기지 않았다. 본 것을 마음에 새기고, 그 의미를 언어로 남기려는 방향을 택했다.",
    },
    survival: {
      title: "상처 입은 생존자",
      text: "당신은 먼저 살아남아야 했다. 그 선택은 비겁함만이 아니라, 오래 억압받은 사람이 몸으로 배운 현실적인 지혜이기도 했다.",
    },
    fear: {
      title: "공포에 흔들린 사람",
      text: "당신의 선택은 자주 두려움에 끌려갔다. 그러나 그 두려움은 단순한 약함이 아니라, 노예의 시간 속에서 새겨진 상처의 흔적이었다.",
    },
    resistance: {
      title: "무모한 저항자",
      text: "당신은 불의 앞에서 쉽게 침묵하지 않았다. 다만 분노가 앞설 때, 용기와 무모함의 경계가 흐려지기도 했다.",
    },
    avoidance: {
      title: "피하려는 생존자",
      text: "당신은 위험을 피하고 익숙한 안전을 찾으려 했다. 그러나 해방의 길은 때로 안전해 보이는 곳을 떠나는 결단을 요구했다.",
    },
  };

  return types[key];
}

function evaluate() {
  const stats = state.stats;
  if (stats.endurance <= 0) return endings.collapse;
  if (stats.panic >= 12) return endings.terror;
  if (stats.witness >= 12 && stats.panic <= 7) return endings.trueWitness;
  if (stats.witness <= 5) return endings.silent;
  return endings.survivor;
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
  applyProfile(choice.profile);

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
    profile: { obedience: 0, witness: 0, survival: 0, fear: 0, resistance: 0, avoidance: 0 },
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

function choiceIcon(choice) {
  if (isRollChoice(choice)) return `<span class="choice-icon dice" title="판정 선택">⚂</span>`;
  return `<span class="choice-icon none" aria-hidden="true"></span>`;
}

function choiceButton(choice, index) {
  return `
    <button class="choice-btn" onclick="choose(${index})">
      <div class="choice-top">
        <span>${choice.label}</span>
        ${choiceIcon(choice)}
      </div>
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
        <p>선택지의 위험도 숫자와 바는 숨겼습니다. 주사위 아이콘이 붙은 선택지만 2d6 판정이 발생합니다. 치명적인 선택은 표시 없이 선택 결과에서 드러납니다.</p>
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
  const type = testimonyType();
  return `
    <main class="layout">
      <section class="art"><div><p class="eyebrow">목격의 끝</p><h2>물벽 사이의 길</h2></div></section>
      <section class="card">
        <p class="eyebrow">엔딩</p>
        <h2>${ending.title}</h2>
        <p>${ending.text}</p>
        <div class="meta">
          <div><span>당신의 증언 유형</span><strong>${type.title}</strong></div>
          <div><span>현재 상태</span><strong>생존 ${state.stats.endurance} · 공포 ${state.stats.panic} · 증언 ${state.stats.witness}</strong></div>
        </div>
        <p>${type.text}</p>
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
