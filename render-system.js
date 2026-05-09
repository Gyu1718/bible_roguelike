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

function resolveMoodLabel(kind, value) {
  if (kind === "endurance") {
    if (value >= 10) return "걸음이 단단함";
    if (value >= 7) return "아직 버팀";
    if (value >= 4) return "숨이 가빠짐";
    return "무너질 듯함";
  }
  if (kind === "panic") {
    if (value <= 3) return "고요함";
    if (value <= 6) return "떨림";
    if (value <= 9) return "두려움";
    return "공포에 가까움";
  }
  if (kind === "witness") {
    if (value >= 10) return "선명한 기억";
    if (value >= 7) return "남겨진 말";
    if (value >= 4) return "흐릿한 증언";
    return "침묵에 가까움";
  }
  return "-";
}

function stageWitnessCard(name, role, label) {
  return `
    <article class="stage-witness-card clean-witness-card">
      <div class="stage-portrait"></div>
      <div>
        <div class="stage-witness-name"><span>${name}</span><small>${role}</small></div>
        <div class="stage-state-label">${label}</div>
      </div>
    </article>
  `;
}

function stageStatsPanel(state) {
  const stats = state.stats;
  const shortLog = state.log.slice(-3);
  return `
    <aside class="stage-party clean-stage-party">
      <h3>증인단</h3>
      <div class="stage-witness-list">
        ${stageWitnessCard("이름 없는 자", "생존", resolveMoodLabel("endurance", stats.endurance))}
        ${stageWitnessCard("떨리는 마음", "공포", resolveMoodLabel("panic", stats.panic))}
        ${stageWitnessCard("기억하는 입", "증언", resolveMoodLabel("witness", stats.witness))}
      </div>
      <h3>이야기 기록</h3>
      <div class="stage-log clean-stage-log">
        ${shortLog.length ? shortLog.map((entry) => `<p>${entry}</p>`).join("") : `<p>아직 기록된 말이 없습니다.</p>`}
      </div>
    </aside>
  `;
}

function stageArtPanel(scene, label = "장면") {
  const artSrc = scene.artSrc || "./assets/scenes/exodus/scene_01_brickyard.svg";
  const artLabel = scene.artLabel || scene.art || "장면 삽화";
  return `
    <section class="stage-art">
      <img src="${artSrc}" alt="${artLabel}" />
      <div class="stage-art-caption clean-art-caption">
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

  return stageFrame(`
    <section class="stage-topbar clean-topbar">
      <div class="location">제1막 · 벽돌과 바다</div>
      <div class="title">이름 없는 증인들</div>
      <div class="progress">${scene.art}</div>
    </section>
    ${stageArtPanel(scene)}
    <section class="stage-story clean-story-panel">
      <div>
        <p class="eyebrow">이야기</p>
        <h2>${scene.title}</h2>
      </div>
      <div>
        <p>${scene.text}</p>
        <div class="stage-question">당신은 어떻게 지나가겠습니까?</div>
      </div>
      <div class="stage-choices">
        ${scene.choices.map(stageChoiceButton).join("")}
      </div>
    </section>
    ${stageStatsPanel(state)}
    <section class="stage-bottom-bar clean-bottom-bar">
      <div class="verse">“너희는 가만히 있어 여호와께서 오늘 너희를 위하여 행하시는 구원을 보라”</div>
      <div class="chapter-step">${scene.id.replace("scene_", "")}</div>
      <div class="objective">다음 이야기</div>
    </section>
  `, "stage-play");
}

function rollScreen(state, scenes) {
  const scene = scenes[state.index];
  const choice = state.pendingChoice;
  const roll = state.roll;

  return stageFrame(`
    <section class="stage-topbar clean-topbar">
      <div class="location">위험 판정</div>
      <div class="title">주사위가 굴러갑니다</div>
      <div class="progress">${roll.success ? "길이 열림" : "두려움이 번짐"}</div>
    </section>
    ${stageArtPanel(scene, "판정")}
    <section class="stage-story stage-result-card clean-story-panel">
      <div>
        <p class="eyebrow">판정</p>
        <h2>${choice.label}</h2>
      </div>
      <div>
        <p>위험한 선택입니다. 당신의 걸음이 흔들림을 통과해야 합니다.</p>
        <div class="stage-roll-grid clean-roll-grid">
          <div><span>주사위</span><strong>${roll.d1} + ${roll.d2}</strong></div>
          <div><span>결과</span><strong>${roll.success ? "성공" : "실패"}</strong></div>
        </div>
      </div>
      <div class="stage-choices">
        <button class="stage-choice" onclick="resolveRoll()"><div class="stage-choice-row"><span><span class="stage-choice-index">OK</span>결과 확인</span></div></button>
      </div>
    </section>
    ${stageStatsPanel(state)}
    <section class="stage-bottom-bar clean-bottom-bar">
      <div class="verse">두려움은 길을 막지만, 믿음은 길을 보게 합니다.</div>
      <div class="chapter-step">판정</div>
      <div class="objective">다음 이야기</div>
    </section>
  `, "stage-roll");
}

function feedbackScreen(state, scenes) {
  const scene = scenes[state.index];
  const feedback = state.feedback;

  return stageFrame(`
    <section class="stage-topbar clean-topbar">
      <div class="location">선택의 결과</div>
      <div class="title">기록됨</div>
      <div class="progress">${feedback.next === "bad" ? "마지막 갈림길" : "계속되는 길"}</div>
    </section>
    ${stageArtPanel(scene, "결과")}
    <section class="stage-story stage-result-card clean-story-panel">
      <div>
        <p class="eyebrow">결과</p>
        <h2>${feedback.title}</h2>
      </div>
      <div>
        <p>${feedback.text}</p>
        <div class="stage-roll-grid clean-roll-grid">
          <div><span>흔적</span><strong>${feedback.next === "bad" ? "무너짐" : "남겨짐"}</strong></div>
          <div><span>길</span><strong>${feedback.next === "bad" ? "끊어짐" : "이어짐"}</strong></div>
        </div>
      </div>
      <div class="stage-choices">
        <button class="stage-choice" onclick="proceed()"><div class="stage-choice-row"><span><span class="stage-choice-index">OK</span>${feedback.next === "bad" ? "마지막 확인" : "계속"}</span></div></button>
      </div>
    </section>
    ${stageStatsPanel(state)}
    <section class="stage-bottom-bar clean-bottom-bar">
      <div class="verse">선택은 사라지지 않고 기록으로 남습니다.</div>
      <div class="chapter-step">결과</div>
      <div class="objective">다음 이야기</div>
    </section>
  `, "stage-feedback");
}

function endingStatText(kind, value, logLength) {
  if (kind === "endurance") return value >= 7 ? "끝까지 걸음" : "간신히 건넘";
  if (kind === "panic") return value <= 6 ? "흔들렸으나 무너지지 않음" : "두려움이 깊게 남음";
  if (kind === "witness") return value >= 8 ? "선명하게 남김" : "희미하게 붙듦";
  if (kind === "log") return `${logLength}개의 기억`;
  return "-";
}

function endingScreen(state) {
  const ending = state.ending;
  const type = window.NW_PROFILE.getType(state.profile);
  return `
    <main class="stage-shell">
      <section class="game-stage stage-ending-screen">
        <img class="stage-bg" src="./assets/backgrounds/ending/ending_bg_liberation.svg" alt="" />
        <div class="stage-vignette"></div>
        <section class="stage-ending-panel clean-ending-panel">
          <p class="eyebrow">ENDING</p>
          <h2>${ending.title}</h2>
          <div class="type-ribbon">증언 유형 · ${type.title}</div>
          <p>${ending.text}</p>
          <p>${type.text}</p>
          <div class="stage-ending-stats clean-ending-stats">
            <div><span>생존 시간</span><strong>${endingStatText("endurance", state.stats.endurance)}</strong></div>
            <div><span>공포 저항</span><strong>${endingStatText("panic", state.stats.panic)}</strong></div>
            <div><span>증언</span><strong>${endingStatText("witness", state.stats.witness)}</strong></div>
            <div><span>기록</span><strong>${endingStatText("log", 0, state.log.length)}</strong></div>
          </div>
          <div class="stage-ending-actions">
            <button class="primary" onclick="restart()">다시 걷기</button>
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
