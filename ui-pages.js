function homeMenuButton(activeMenu, id, label, sublabel, icon) {
  const active = activeMenu === id ? "is-active" : "";
  return `
    <button class="home-menu-button ${active}" onclick="setMenu('${id}')">
      <span class="home-menu-icon">${icon}</span>
      <span class="home-menu-text"><strong>${label}</strong><em>${sublabel}</em></span>
    </button>
  `;
}

function homeMenu(activeMenu) {
  return `
    <nav class="home-menu">
      ${homeMenuButton(activeMenu, "chapters", "이야기", "장 선택", "▰")}
      ${homeMenuButton(activeMenu, "witnesses", "증인들", "인물과 기록", "◉")}
      ${homeMenuButton(activeMenu, "records", "기록", "문서와 유물", "▤")}
      ${homeMenuButton(activeMenu, "achievements", "업적", "여정의 발자취", "♕")}
      ${homeMenuButton(activeMenu, "artifacts", "훈련", "기술과 전투", "⚔")}
      ${homeMenuButton(activeMenu, "settings", "설정", "옵션과 지원", "⚙")}
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

function homeChaptersPage(save) {
  const cleared = save.clearedChapters?.includes("exodus");
  return `
    <section class="home-board home-board-chapters">
      <header class="home-act-title">
        <span class="home-act-cross">✛</span>
        <strong>제 1 막 · 시작의 증인</strong>
      </header>

      <article class="home-chapter-main">
        <div class="home-chapter-copy">
          <span class="home-chapter-kicker">1장</span>
          <h2>벽돌과 바다</h2>
          <p>믿음으로 세운 성벽</p>
          <button onclick="restart()">${cleared ? "다시 걷기" : "이야기 계속하기"} ›</button>
        </div>
      </article>

      <section class="home-chapter-grid">
        <article class="home-chapter-card locked card-02"><span>2장</span><strong>광야의 메아리</strong><i>🔒</i></article>
        <article class="home-chapter-card locked card-03"><span>3장</span><strong>갈라진 밤바다</strong><i>🔒</i></article>
        <article class="home-chapter-card locked card-04"><span>4장</span><strong>불기둥 아래서</strong><i>🔒</i></article>
        <article class="home-chapter-card locked card-05"><span>5장</span><strong>무너진 왕궁</strong><i>🔒</i></article>
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

function homeContent(activeMenu, save) {
  const pages = {
    chapters: () => homeChaptersPage(save),
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
    <main class="home-screen-shell">
      <section class="home-screen">
        <div class="home-bg"></div>
        <div class="home-vignette"></div>
        <div class="home-outer-frame"></div>

        <aside class="home-sidebar">
          <div class="home-emblem">♜</div>
          <div class="home-title">
            <h1>이름 없는 증인들</h1>
            <p>하나님의 이야기를 따라 걷는 여정</p>
          </div>
          ${homeMenu(activeMenu)}
          <div class="home-quick-icons">
            <button>♛</button><button>♕</button><button>▤</button><button>♙</button>
          </div>
          <div class="home-sidebar-cross">✝</div>
        </aside>

        ${homeContent(activeMenu, save)}

        <div class="home-top-icons">
          <button>▣</button><button>⚙</button><button>⚑</button><span>증인력 전<br />12%</span>
        </div>

        <footer class="home-footer">
          <p>이로하실지 너를 위하여 싸우시리니 너희는 가만히 있을지니라</p>
          <strong>출애굽기 14:14</strong>
        </footer>

        <button class="home-hourglass">⌛</button>
      </section>
    </main>
  `;
}

window.NW_UI_PAGES = {
  homeScreen,
};
