const { endings, scenes } = window.GAME_DATA;

let state = {
  screen: "home",
  index: 0,
  stats: { endurance: 10, panic: 5, witness: 0 },
  feedback: null,
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

function needsFeedback(choice) {
  if (choice.feedbackMode === "inline") return false;
  if (choice.feedbackMode === "modal") return true;
  if (choice.badEnding) return true;
  if ((choice.risk || 0) >= 70) return true;
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
  state.screen = "play";
  render();
}

function choose(index) {
  const choice = scenes[state.index].choices[index];
  apply(choice.effects);
  state.log.unshift(choice.text);
  state.log = state.log.slice(0, 6);
  state.feedback = choice;

  if (choice.badEnding) state.feedback.next = "bad";
  else if (state.stats.endurance <= 0 || state.stats.panic >= 14) state.feedback.next = "ending";
  else state.feedback.next = "continue";

  if (needsFeedback(choice)) {
    state.screen = "feedback";
    render();
    return;
  }

  goNextOrEnd();
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
  return `
    <button class="choice-btn" onclick="choose(${index})">
      <div class="choice-top">
        <span>${choice.label}</span>
        <span class="risk-badge risk-${risk.className}">위험도 ${risk.label}</span>
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
        <p>핍박받던 히브리 노예가 출애굽을 경험하는 선택지형 로그라이크입니다. 선택지에는 위험도만 표시됩니다. 일반 선택은 바로 진행되고, 위험하거나 치명적인 선택은 결과창이 열립니다.</p>
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
window.state = state;
window.render = render;
render();
