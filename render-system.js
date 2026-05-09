function choiceIcon(choice) {
  return window.NW_ROLL.isRollChoice(choice)
    ? `<span class="choice-icon dice" title="판정 선택"><img src="./assets/ui/icons/icon_dice.svg" alt="판정" /></span>`
    : `<span class="choice-icon none" aria-hidden="true"></span>`;
}

function stageChoiceButton(choice, index) {
  return `
    <button class="stage-choice" onclick="choose(${index})">
      <div class="stage-choice-row">
        <span><span class="stage-choice-index">${String(index + 1).padStart(2, "0")}</span>${choice.label}</span>
        ${choiceIcon(choice)}
      </div>
    </button>
  `;
}

function stageWitnessCard(name, role, value) {
  return `
    <article class="stage-witness-card">
      <div class="stage-portrait"></div>
      <div>
        <div class="stage-witness-name"><span>${name}</span><small>${role}</small></div>
        <div class="stage-meter"><span style="width:${Math.min(100, value * 8)}%"></span></div>
      </div>
    </article>
  `;
}

function stageStatsPanel(state) {
  const stats = state.stats;
  return `
    <aside class="stage-party">
      <h3>증인단</h3>
      <div class="stage-witness-list">
        ${stageWitnessCard("이름 없는 자", "생존", stats.endurance)}
        ${stageWitnessCard("떨리는 마음", "공포 저항", 14 - stats.panic)}
        ${stageWitnessCard("기억하는 입", "증언", stats.witness)}
      </div>
      <h3>기록</h3>
      <div class="stage-log">
        ${state.log.map((entry) => `<p>${entry}</p>`).join("")}
      </div>
    </aside>
  `;
}

function stageArtPanel(scene, label = "ILLUSTRATION") {
  const artSrc = scene.artSrc || "./assets/scenes/exodus/scene_01_brickyard.svg";
  const artLabel = scene.artLabel || scene.art || "장면 삽화";
  return `
    <section class="stage-art">
      <img src="${artSrc}" alt="${artLabel}" />
      <div class="stage-art-caption">
        <p class="eyebrow">${label}</p>
        <h2>${scene.art}</h2>
      </div>
    </section>
  `;
}

function stageFrame(inner, screenClass = "stage-play") {
  return `
    <main class="stage-shell">
      <section class="game-stage ${screenClass}">
        <img class="stage-bg" src="./assets/backgrounds/play/play_bg_dark_sea.svg" alt="" />
        <div class="stage-vignette"></div>
        ${inner}
      </section>
    </main>
  `;
}

function stagePlayScreen(state, scenes) {
  const scene = scenes[state.index];
  const stats = state.stats;

  return stageFrame(`
    <section class="stage-topbar">
      <div class="location">EXODUS · CHAPTER 01</div>
      <div class="title">이름 없는 증인들</div>
      <div class="progress">장면 ${state.index + 1}/${scenes.length} · 증언 ${stats.witness}</div>
    </section>
    ${stageArtPanel(scene)}
    <section class="stage-story">
      <div>
        <p class="eyebrow">벽돌과 바다 · ${state.index + 1}/${scenes.length}</p>
        <h2>${scene.title}</h2>
      </div>
      <div>
        <p>${scene.text}</p>
        <div class="stage-question">당신은 이 순간을 어떻게 통과하겠습니까?</div>
      </div>
      <div class="stage-choices">
        ${scene.choices.map(stageChoiceButton).join("")}
      </div>
    </section>
    ${stageStatsPanel(state)}
    <section class="stage-bottom-bar">
      <div class="verse">“너희는 가만히 있어 여호와께서 오늘 너희를 위하여 행하시는 구원을 보라”</div>
      <div class="chapter-step">${scene.id}</div>
      <div class="objective">목표 · 해방을 목격하고 증언으로 남기십시오</div>
    </section>
  `, "stage-play");
}

function rollScreen(state, scenes) {
  const scene = scenes[state.index];
  const choice = state.pendingChoice;
  const roll = state.roll;
  const modText = roll.modifier === 0 ? "보정 없음" : `보정 ${roll.modifier > 0 ? "+" : ""}${roll.modifier}`;

  return stageFrame(`
    <section class="stage-topbar">
      <div class="location">2D6 CHECK</div>
      <div class="title">위험 판정</div>
      <div class="progress">목표값 ${roll.target} 이상 · 총 ${roll.score}</div>
    </section>
    ${stageArtPanel(scene, "2D6 CHECK")}
    <section class="stage-story stage-result-card">
      <div>
        <p class="eyebrow">판정</p>
        <h2>${choice.label}</h2>
      </div>
      <div>
        <p>위험한 선택입니다. 주사위 두 개를 굴려 목표값 이상이면 성공합니다.</p>
        <div class="stage-roll-grid">
          <div><span>주사위</span><strong>${roll.d1} + ${roll.d2}</strong></div>
          <div><span>${modText}</span><strong>총 ${roll.score}</strong></div>
          <div><span>목표값</span><strong>${roll.target} 이상</strong></div>
          <div><span>결과</span><strong>${roll.success ? "성공" : "실패"}</strong></div>
        </div>
      </div>
      <div class="stage-choices">
        <button class="stage-choice" onclick="resolveRoll()"><div class="stage-choice-row"><span><span class="stage-choice-index">OK</span>결과 확인</span></div></button>
      </div>
    </section>
    ${stageStatsPanel(state)}
    <section class="stage-bottom-bar">
      <div class="verse">판정은 위험한 선택에만 나타납니다.</div>
      <div class="chapter-step">${scene.id}</div>
      <div class="objective">목표 · 공포에 끌려가지 않고 길을 분별하십시오</div>
    </section>
  `, "stage-roll");
}

function feedbackScreen(state, scenes) {
  const scene = scenes[state.index];
  const feedback = state.feedback;

  return stageFrame(`
    <section class="stage-topbar">
      <div class="location">CHOICE RESULT</div>
      <div class="title">선택의 결과</div>
      <div class="progress">${feedback.next === "bad" ? "배드엔딩 분기" : "계속 진행"}</div>
    </section>
    ${stageArtPanel(scene, "선택의 결과")}
    <section class="stage-story stage-result-card">
      <div>
        <p class="eyebrow">선택의 결과</p>
        <h2>${feedback.title}</h2>
      </div>
      <div>
        <p>${feedback.text}</p>
        <div class="stage-roll-grid">
          <div><span>생존</span><strong>${state.stats.endurance}</strong></div>
          <div><span>공포</span><strong>${state.stats.panic}</strong></div>
          <div><span>증언</span><strong>${state.stats.witness}</strong></div>
          <div><span>분기</span><strong>${feedback.next === "bad" ? "배드엔딩" : "진행"}</strong></div>
        </div>
      </div>
      <div class="stage-choices">
        <button class="stage-choice" onclick="proceed()"><div class="stage-choice-row"><span><span class="stage-choice-index">OK</span>${feedback.next === "bad" ? "배드엔딩 확인" : "계속"}</span></div></button>
      </div>
    </section>
    ${stageStatsPanel(state)}
    <section class="stage-bottom-bar">
      <div class="verse">선택은 사라지지 않고 기록으로 남습니다.</div>
      <div class="chapter-step">${scene.id}</div>
      <div class="objective">목표 · 사건을 증언으로 남기십시오</div>
    </section>
  `, "stage-feedback");
}

function endingScreen(state) {
  const ending = state.ending;
  const type = window.NW_PROFILE.getType(state.profile);
  return `
    <main class="stage-shell">
      <section class="game-stage stage-ending-screen">
        <img class="stage-bg" src="./assets/backgrounds/ending/ending_bg_liberation.svg" alt="" />
        <div class="stage-vignette"></div>
        <section class="stage-ending-panel">
          <p class="eyebrow">ENDING</p>
          <h2>${ending.title}</h2>
          <div class="type-ribbon">당신의 증언 유형: ${type.title}</div>
          <p>${ending.text}</p>
          <p>${type.text}</p>
          <div class="stage-ending-stats">
            <div><span>생존</span><strong>${state.stats.endurance}</strong></div>
            <div><span>공포</span><strong>${state.stats.panic}</strong></div>
            <div><span>증언</span><strong>${state.stats.witness}</strong></div>
            <div><span>기록</span><strong>${state.log.length}개</strong></div>
          </div>
          <div class="stage-ending-actions">
            <button class="primary" onclick="restart()">다시 도전</button>
            <button class="secondary" onclick="goHome('chapters')">처음으로</button>
          </div>
        </section>
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
    stagePlayScreen(state, scenes);

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
  playScreen: stagePlayScreen,
  rollScreen,
  feedbackScreen,
  endingScreen,
};
