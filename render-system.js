function statIconSrc(key) {
  return {
    endurance: "./assets/ui/icons/icon_endurance.svg",
    panic: "./assets/ui/icons/icon_panic.svg",
    witness: "./assets/ui/icons/icon_witness.svg",
  }[key] || "";
}

function choiceIcon(choice) {
  return window.NW_ROLL.isRollChoice(choice)
    ? `<span class="choice-icon dice" title="판정 선택"><img src="./assets/ui/icons/icon_dice.svg" alt="판정" /></span>`
    : `<span class="choice-icon none" aria-hidden="true"></span>`;
}

function premiumChoiceButton(choice, index) {
  return `
    <button class="premium-choice-btn" onclick="choose(${index})">
      <div class="premium-choice-row">
        <span><span class="premium-choice-index">${String(index + 1).padStart(2, "0")}</span>${choice.label}</span>
        ${choiceIcon(choice)}
      </div>
    </button>
  `;
}

function premiumWitnessCard(name, role, value, iconKey) {
  return `
    <article class="witness-card">
      <div class="witness-portrait"></div>
      <div>
        <div class="witness-name"><span>${name}</span><small>${role}</small></div>
        <div class="witness-meter"><span style="width:${Math.min(100, value * 8)}%"></span></div>
      </div>
    </article>
  `;
}

function premiumPlayScreen(state, scenes) {
  const scene = scenes[state.index];
  const stats = state.stats;
  const artSrc = scene.artSrc || "./assets/scenes/exodus/scene_01_brickyard.svg";
  const artLabel = scene.artLabel || scene.art || "장면 삽화";

  return `
    <main class="premium-play">
      <section class="premium-topbar">
        <div class="premium-location">EXODUS · CHAPTER 01</div>
        <div class="premium-title">이름 없는 증인들</div>
        <div class="premium-progress">장면 ${state.index + 1}/${scenes.length}<span>증언 ${stats.witness}</span></div>
      </section>

      <section class="premium-illustration">
        <img class="scene-asset-img" src="${artSrc}" alt="${artLabel}" />
        <div class="premium-art-caption">
          <p class="eyebrow">ILLUSTRATION</p>
          <h2>${scene.art}</h2>
        </div>
      </section>

      <section class="premium-story">
        <div class="premium-story-head">
          <p class="eyebrow">벽돌과 바다 · ${state.index + 1}/${scenes.length}</p>
          <h2>${scene.title}</h2>
        </div>
        <div class="premium-story-body">
          <p>${scene.text}</p>
          <div class="premium-question">당신은 이 순간을 어떻게 통과하겠습니까?</div>
        </div>
        <div class="premium-choices">
          ${scene.choices.map(premiumChoiceButton).join("")}
        </div>
      </section>

      <aside class="premium-witness-panel">
        <h3>증인단</h3>
        <div class="witness-list">
          ${premiumWitnessCard("이름 없는 자", "생존", stats.endurance, "endurance")}
          ${premiumWitnessCard("떨리는 마음", "공포", 14 - stats.panic, "panic")}
          ${premiumWitnessCard("기억하는 입", "증언", stats.witness, "witness")}
        </div>
        <h3>기록</h3>
        <div class="premium-log">
          ${state.log.map((entry) => `<p>${entry}</p>`).join("")}
        </div>
      </aside>

      <section class="premium-bottombar">
        <div class="verse">“너희는 가만히 있어 여호와께서 오늘 너희를 위하여 행하시는 구원을 보라”</div>
        <div class="chapter-step">${scene.id}</div>
        <div class="objective">목표 · 해방을 목격하고 증언으로 남기십시오</div>
      </section>
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
      <section class="art scene-art asset-art"><img class="scene-asset-img" src="${scene.artSrc}" alt="${scene.artLabel || scene.art}" /><div><p class="eyebrow">2D6 CHECK</p><h2>${scene.art}</h2></div></section>
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
      <aside class="side"><h3>상태</h3><p>생존 ${state.stats.endurance}</p><p>공포 ${state.stats.panic}</p><p>증언 ${state.stats.witness}</p></aside>
    </main>
  `;
}

function feedbackScreen(state, scenes) {
  const scene = scenes[state.index];
  const feedback = state.feedback;
  return `
    <main class="layout play-screen feedback-screen">
      <section class="art scene-art asset-art"><img class="scene-asset-img" src="${scene.artSrc}" alt="${scene.artLabel || scene.art}" /><div><p class="eyebrow">선택의 결과</p><h2>${scene.art}</h2></div></section>
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
      <aside class="side"><h3>상태</h3><p>생존 ${state.stats.endurance}</p><p>공포 ${state.stats.panic}</p><p>증언 ${state.stats.witness}</p></aside>
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
    premiumPlayScreen(state, scenes);

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
  playScreen: premiumPlayScreen,
  rollScreen,
  feedbackScreen,
  endingScreen,
};
