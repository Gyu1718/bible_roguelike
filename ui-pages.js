function stageMenuButton(activeMenu, id, label, icon) {
  const active = activeMenu === id ? "active" : "";
  return `<button class="home-v4-menu-button ${active}" onclick="setMenu('${id}')"><span>${icon}</span><strong>${label}</strong></button>`;
}

function stageMenu(activeMenu) {
  return `
    <nav class="home-v4-menu-list">
      ${stageMenuButton(activeMenu, "chapters", "이야기", "I")}
      ${stageMenuButton(activeMenu, "witnesses", "증인들", "W")}
      ${stageMenuButton(activeMenu, "records", "기록", "R")}
      ${stageMenuButton(activeMenu, "artifacts", "유물", "A")}
      ${stageMenuButton(activeMenu, "achievements", "업적", "T")}
      ${stageMenuButton(activeMenu, "settings", "설정", "S")}
    </nav>
  `;
}

function formatDate(iso) {
  if (!iso) return "날짜 없음";
  try {
    return new Date(iso).toLocaleString("ko-KR", { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

function stageChaptersPage(save) {
  const cleared = save.clearedChapters?.includes("exodus");
  return `
    <section class="home-v4-board">
      <header class="home-v4-header">
        <p>제1막</p>
        <h2>시작의 증인</h2>
      </header>

      <article class="home-v4-feature">
        <div class="home-v4-feature-copy">
          <span>${cleared ? "다시 열리는 기록" : "열린 이야기"}</span>
          <h3>벽돌과 바다</h3>
          <p>제국의 벽돌가마 아래에서 시작된 이름 없는 사람의 기록.</p>
          <button onclick="restart()">${cleared ? "다시 시작하기" : "이야기 시작"}</button>
        </div>
      </article>

      <section class="home-v4-locked">
        <article><span>잠김</span><strong>광야의 메아리</strong></article>
        <article><span>잠김</span><strong>무너진 성벽</strong></article>
        <article><span>잠김</span><strong>불 가운데서</strong></article>
        <article><span>잠김</span><strong>포로의 강가</strong></article>
      </section>
    </section>
  `;
}

function recordsPage(save) {
  const endings = save.endingsSeen || [];
  const history = save.runHistory || [];
  const last = save.lastRun;
  return `
    <section class="stage-main-content stage-archive-content">
      <div class="stage-main-head"><div><p class="eyebrow">기록</p><h2>기록 보관소</h2></div></div>
      ${last ? `<div class="stage-record-highlight"><strong>마지막 기록</strong><span>${last.endingTitle} · ${last.testimonyType}</span><span>${formatDate(last.completedAt)}</span></div>` : `<div class="stage-record-highlight"><strong>아직 기록 없음</strong><span>첫 이야기를 완료하면 기록이 남습니다.</span></div>`}
      <div class="stage-archive-grid">
        ${endings.length ? endings.map((item) => `<article><span>엔딩</span><strong>${item.replace("exodus:", "")}</strong></article>`).join("") : `<article><span>비어 있음</span><strong>아직 본 엔딩이 없습니다</strong></article>`}
        ${history.slice(0, 4).map((run, i) => `<article><span>최근 기록 ${i + 1}</span><strong>${run.endingTitle}</strong><em>${run.testimonyType}</em></article>`).join("")}
      </div>
    </section>
  `;
}

function witnessesPage(save) {
  const seen = save.testimonyTypesSeen || [];
  return `
    <section class="stage-main-content stage-archive-content">
      <div class="stage-main-head"><div><p class="eyebrow">증언</p><h2>증언 유형</h2></div></div>
      <p class="stage-archive-desc">플레이 중 드러난 숨은 신앙의 흔적입니다. 엔딩에서만 확인됩니다.</p>
      <div class="stage-archive-grid">
        ${window.NW_PROFILE.allTitles().map((type) => {
          const unlocked = seen.includes(type);
          return `<article class="${unlocked ? "" : "locked"}"><span>${unlocked ? "발견" : "미발견"}</span><strong>${unlocked ? type : "???"}</strong></article>`;
        }).join("")}
      </div>
    </section>
  `;
}

function achievementsPage(save) {
  const unlocked = save.achievementsUnlocked || [];
  const achievements = [
    { title: "첫 기록", desc: "첫 엔딩에 도달했다." },
    { title: "해방의 길", desc: "1장을 클리어했다." },
    { title: "다른 증언들", desc: "서로 다른 증언 유형 3개를 발견했다." },
    { title: "죽음도 기록이다", desc: "배드엔딩을 기록했다." },
    { title: "다섯 갈래의 기억", desc: "서로 다른 엔딩 5개를 발견했다." },
  ];
  return `<section class="stage-main-content stage-archive-content"><div class="stage-main-head"><div><p class="eyebrow">업적</p><h2>업적</h2></div></div><div class="stage-archive-grid">${achievements.map((item) => { const done = unlocked.includes(item.title); return `<article class="${done ? "" : "locked"}"><span>${done ? "달성" : "잠김"}</span><strong>${done ? item.title : "???"}</strong><em>${item.desc}</em></article>`; }).join("")}</div></section>`;
}

function artifactsPage(save) {
  const unlocked = save.artifactsUnlocked || [];
  const artifacts = [
    ["벽돌", "억압의 시간이 몸에 남긴 무게"],
    ["문설주의 피", "이해보다 먼저 행한 순종의 표식"],
    ["지팡이의 그림자", "중심 인물을 멀리서 목격하는 방식"],
    ["물벽의 길", "불가능이 길이 되는 순간"],
    ["기억의 조각", "사건을 증언으로 남기려는 마음"],
    ["떨리는 숨", "공포 속에서도 지워지지 않는 생존의 흔적"],
  ];
  return `<section class="stage-main-content stage-archive-content"><div class="stage-main-head"><div><p class="eyebrow">유물</p><h2>유물</h2></div></div><div class="stage-archive-grid">${artifacts.map(([title, desc]) => { const open = unlocked.includes(title); return `<article class="${open ? "" : "locked"}"><span>${open ? "해금" : "미발견"}</span><strong>${open ? title : "???"}</strong><em>${open ? desc : "다른 선택으로 발견 가능"}</em></article>`; }).join("")}</div></section>`;
}

function settingsPage() {
  return `<section class="stage-main-content stage-archive-content"><div class="stage-main-head"><div><p class="eyebrow">설정</p><h2>설정</h2></div></div><button class="stage-start-secondary" onclick="window.NW_SAVE?.reset()">저장 데이터 초기화</button><div class="stage-archive-grid"><article><span>예정</span><strong>소리</strong></article><article><span>예정</span><strong>텍스트</strong></article><article><span>예정</span><strong>접근성</strong></article></div></section>`;
}

function stageHomeContent(activeMenu, save) {
  const pages = {
    chapters: () => stageChaptersPage(save),
    witnesses: () => witnessesPage(save),
    records: () => recordsPage(save),
    artifacts: () => artifactsPage(save),
    achievements: () => achievementsPage(save),
    settings: () => settingsPage(save),
  };
  return (pages[activeMenu] || pages.chapters)();
}

function homeScreen(activeMenu, save) {
  return `
    <main class="home-v4-shell">
      <section class="home-v4-screen">
        <div class="home-v4-vignette"></div>
        <aside class="home-v4-left">
          <div class="home-v4-logo">
            <h2>이름 없는<br />증인들</h2>
            <p>사건의 중심이 아니라, 그 곁에서 본 사람의 기록.</p>
          </div>
          ${stageMenu(activeMenu)}
        </aside>
        ${stageHomeContent(activeMenu, save)}
        <footer class="home-v4-footer">
          <div>“너희는 가만히 있어 여호와께서 오늘 너희를 위하여 행하시는 구원을 보라”</div>
        </footer>
      </section>
    </main>
  `;
}

window.NW_UI_PAGES = {
  homeScreen,
};
