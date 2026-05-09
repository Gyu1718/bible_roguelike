function statIconSrc(key) {
  return {
    endurance: "./assets/ui/icons/icon_endurance.svg",
    panic: "./assets/ui/icons/icon_panic.svg",
    witness: "./assets/ui/icons/icon_witness.svg",
  }[key] || "";
}

function statBar(label, value, key) {
  return `
    <div class="stat">
      <div class="stat-row">
        <span class="stat-label"><img class="stat-icon" src="${statIconSrc(key)}" alt="${label}" /><span>${label}</span></span>
        <strong>${value}</strong>
      </div>
      <div class="bar"><div class="fill ${key === "panic" ? "panic" : ""}" style="width:${Math.min(100, value * 8)}%"></div></div>
    </div>
  `;
}

function sidePanel(state) {
  const stats = state.stats;
  return `
    <aside class="side">
      <h3>상태</h3>
      ${statBar("생존", stats.endurance, "endurance")}
      ${statBar("공포", stats.panic, "panic")}
      ${statBar("증언", stats.witness, "witness")}
      <div class="log"><h3>기록</h3>${state.log.map((entry) => `<p>${entry}</p>`).join("")}</div>
    </aside>
  `;
}

function choiceIcon(choice) {
  return window.NW_ROLL.isRollChoice(choice)
    ? `<span class="choice-icon dice" title="판정 선택"><img src="./assets/ui/icons/icon_dice.svg" alt="판정" /></span>`
    : `<span class="choice-icon none" aria-hidden="true"></span>`;
}

function choiceButton(choice, index) {
  return `<button class="choice-btn" onclick="choose(${index})"><div class="choice-top"><span>${choice.label}</span>${choiceIcon(choice)}</div></button>`;
}

function sceneArtSection(scene, eyebrowText = "ILLUSTRATION") {
  const artSrc = scene.artSrc || "./assets/scenes/exodus/scene_01_brickyard.svg";
  const artLabel = scene.artLabel || scene.art || "장면 삽화";
  return `
    <section class="art scene-art asset-art">
      <img class="scene-asset-img" src="${artSrc}" alt="${artLabel}" />
      <div><p class="eyebrow">${eyebrowText}</p><h2>${scene.art}</h2></div>
    </section>
  `;
}

function playScreen(state, scenes) {
  const scene = scenes[state.index];
  return `
    <main class="layout play-screen">
      ${sceneArtSection(scene, "ILLUSTRATION")}
      <section class="card story-card">
        <p class="eyebrow">벽돌과 바다 · ${state.index + 1}/${scenes.length}</p>
        <h2>${scene.title}</h2>
        <p>${scene.text}</p>
        <div class="choices">${scene.choices.map(choiceButton).join("")}</div>
      </section>
      ${sidePanel(state)}
    </main>
  `;
}

function rollScreen(state, scenes) {
  const scene = scenes[state.index];
  const choice = state.pendingChoice;
  const roll = state.roll;
  const modText = roll.modifier === 0 ? "보정 없음" : `보정 ${roll.modifier > 0 ? "+" : ""}${roll.modifier}`;
  return `
    <main class="layout play-screen roll-screen">
      ${sceneArtSection(scene, "2D6 CHECK")}
      <section class="card story-card">
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
      ${sidePanel(state)}
    </main>
  `;
}

function feedbackScreen(state, scenes) {
  const scene = scenes[state.index];
  const feedback = state.feedback;
  return `
    <main class="layout play-screen feedback-screen">
      ${sceneArtSection(scene, "선택의 결과")}
      <section class="card story-card">
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
      ${sidePanel(state)}
    </main>
  `;
}

function endingScreen(state) {
  const ending = state.ending;
  const type = window.NW_PROFILE.getType(state.profile);
  return `
    <main class="ending-screen">
      <section class="ending-panel">
        <p class="eyebrow">엔딩</p>
        <h2>${ending.title}</h2>
        <div class="type-ribbon">당신의 증언 유형: ${type.title}</div>
        <p>${ending.text}</p>
        <p>${type.text}</p>
        <div class="meta">
          <div><span>생존</span><strong>${state.stats.endurance}</strong></div>
          <div><span>공포</span><strong>${state.stats.panic}</strong></div>
          <div><span>증언</span><strong>${state.stats.witness}</strong></div>
          <div><span>기록</span><strong>${state.log.length}개</strong></div>
        </div>
        <div class="row"><button class="primary" onclick="restart()">다시 도전</button><button class="secondary" onclick="goHome('chapters')">처음으로</button></div>
      </section>
    </main>
  `;
}

function renderApp(state, scenes, saveData) {
  const body =
    state.screen === "home" ? window.NW_UI_PAGES.homeScreen(state.activeMenu, saveData) :
    state.screen === "roll" ? rollScreen(state, scenes) :
    state.screen === "feedback" ? feedbackScreen(state, scenes) :
    state.screen === "ending" ? endingScreen(state) :
    playScreen(state, scenes);

  return `
    <div class="app screen-${state.screen}">
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

window.NW_RENDER = {
  renderApp,
  playScreen,
  rollScreen,
  feedbackScreen,
  endingScreen,
};
