function premiumMenuButton(activeMenu, id, label, icon) {
  const active = activeMenu === id ? "active" : "";
  return `<button class="${active}" onclick="setMenu('${id}')"><span class="premium-menu-icon">${icon}</span><span>${label}</span></button>`;
}

function premiumMainMenu(activeMenu) {
  return `
    <nav class="premium-main-menu">
      ${premiumMenuButton(activeMenu, "chapters", "이야기", "I")}
      ${premiumMenuButton(activeMenu, "witnesses", "증인들", "W")}
      ${premiumMenuButton(activeMenu, "records", "기록", "R")}
      ${premiumMenuButton(activeMenu, "artifacts", "유물", "A")}
      ${premiumMenuButton(activeMenu, "achievements", "업적", "T")}
      ${premiumMenuButton(activeMenu, "settings", "설정", "S")}
    </nav>
  `;
}

function premiumChaptersPage(save) {
  const cleared = save.clearedChapters?.includes("exodus");
  const endingsCount = save.endingsSeen?.length || 0;
  return `
    <section class="premium-chapter-panel">
      <div class="premium-chapter-top">
        <div>
          <p class="eyebrow">CHAPTER SELECT</p>
          <h2>여정의 기록</h2>
        </div>
        <div class="premium-save-chips">
          <span>회차 ${save.totalRuns || 0}</span>
          <span>엔딩 ${endingsCount}</span>
          <span>증언 ${save.testimonyTypesSeen?.length || 0}</span>
        </div>
      </div>

      <div class="premium-chapter-grid">
        <article class="premium-featured-card">
          <span class="chapter-label">CHAPTER 01 · ${cleared ? "CLEARED" : "AVAILABLE"}</span>
          <h3>벽돌과 바다</h3>
          <p>제국의 벽돌가마 아래에서 시작된 이름 없는 사람의 기록. 그는 모세가 아니라, 모세의 기적을 곁에서 목격한 한 사람입니다.</p>
          <div class="premium-start-row">
            <button class="premium-start-primary" onclick="restart()">${cleared ? "다시 시작하기" : "이야기 시작"}</button>
            <button class="premium-start-secondary" onclick="setMenu('records')">기록 보기</button>
          </div>
        </article>

        <div class="premium-small-card-stack">
          <article class="premium-small-card"><span>LOCKED</span><strong>2장 광야의 메아리</strong><em>만나, 원망, 기다림의 이야기</em></article>
          <article class="premium-small-card"><span>LOCKED</span><strong>3장 무너진 성벽</strong><em>사사시대 확장 후보</em></article>
          <article class="premium-small-card"><span>LOCKED</span><strong>4장 불 가운데서</strong><em>엘리야 확장 후보</em></article>
          <article class="premium-small-card"><span>LOCKED</span><strong>5장 포로의 강가</strong><em>바벨론 확장 후보</em></article>
        </div>
      </div>

      <footer class="premium-main-footer">
        <span><strong>목표</strong> · 해방을 목격하고, 침묵이 아니라 증언으로 남기십시오.</span>
        <span>EXODUS ARCHIVE</span>
      </footer>
    </section>
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

function recordsPage(save) {
  const endings = save.endingsSeen || [];
  const history = save.runHistory || [];
  const last = save.lastRun;
  return `
    <section class="home-hero archive-hero">
      <p class="eyebrow">RECORDS</p>
      <h2>기록 보관소</h2>
      <p>당신이 지나온 엔딩과 마지막 증언이 이곳에 남습니다.</p>
      ${last ? `<div class="record-highlight"><strong>마지막 기록</strong><span>${last.endingTitle} · ${last.testimonyType} · ${formatDate(last.completedAt)}</span><span>생존 ${last.stats?.endurance ?? "-"} · 공포 ${last.stats?.panic ?? "-"} · 증언 ${last.stats?.witness ?? "-"}</span></div>` : `<div class="record-highlight"><strong>아직 기록 없음</strong><span>첫 회차를 완료하면 기록이 남습니다.</span></div>`}
    </section>
    <section class="archive-grid">
      ${endings.length ? endings.map((item) => `<article class="archive-card"><span>엔딩 발견</span><strong>${item.replace("exodus:", "")}</strong><em>기록 보관소에 등록됨</em></article>`).join("") : `<article class="archive-card empty"><span>비어 있음</span><strong>아직 본 엔딩이 없습니다</strong><em>1장을 플레이해 기록을 여십시오.</em></article>`}
      ${history.slice(0, 4).map((run, i) => `<article class="archive-card"><span>최근 회차 ${i + 1}</span><strong>${run.endingTitle}</strong><em>${run.testimonyType} · 생존 ${run.stats?.endurance ?? "-"} / 공포 ${run.stats?.panic ?? "-"} / 증언 ${run.stats?.witness ?? "-"}</em></article>`).join("")}
    </section>
  `;
}

function witnessesPage(save) {
  const seen = save.testimonyTypesSeen || [];
  return `
    <section class="home-hero archive-hero">
      <p class="eyebrow">WITNESSES</p>
      <h2>증언 유형</h2>
      <p>플레이 중 드러난 숨은 신앙의 흔적입니다. 게임 중에는 보이지 않고 엔딩에서만 드러납니다.</p>
    </section>
    <section class="archive-grid">
      ${window.NW_PROFILE.allTitles().map((type) => {
        const unlocked = seen.includes(type);
        return `<article class="archive-card ${unlocked ? "" : "locked"}"><span>${unlocked ? "발견" : "미발견"}</span><strong>${unlocked ? type : "???"}</strong><em>${unlocked ? "엔딩에서 확인한 증언 유형" : "다른 선택으로 발견 가능"}</em></article>`;
      }).join("")}
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
  return `<section class="home-hero archive-hero"><p class="eyebrow">ACHIEVEMENTS</p><h2>업적</h2><p>반복 플레이를 통해 열리는 작은 표식들입니다.</p></section><section class="archive-grid">${achievements.map((item) => { const done = unlocked.includes(item.title); return `<article class="archive-card ${done ? "" : "locked"}"><span>${done ? "달성" : "잠김"}</span><strong>${done ? item.title : "???"}</strong><em>${item.desc}</em></article>`; }).join("")}</section>`;
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
  return `<section class="home-hero archive-hero"><p class="eyebrow">ARTIFACTS</p><h2>유물</h2><p>장면과 신학적 상징을 짧은 기록으로 남기는 공간입니다. 엔딩과 상태에 따라 해금됩니다.</p></section><section class="archive-grid">${artifacts.map(([title, desc]) => { const open = unlocked.includes(title); return `<article class="archive-card ${open ? "" : "locked"}"><span>${open ? "해금" : "미발견"}</span><strong>${open ? title : "???"}</strong><em>${open ? desc : "다른 엔딩과 선택으로 발견 가능"}</em></article>`; }).join("")}</section>`;
}

function settingsPage() {
  return `<section class="home-hero archive-hero"><p class="eyebrow">SETTINGS</p><h2>설정</h2><p>현재는 저장 초기화만 제공합니다. 이후 사운드, 텍스트 속도, 화면 효과 설정을 추가할 수 있습니다.</p><button class="secondary danger" onclick="window.NW_SAVE?.reset()">저장 데이터 초기화</button></section><section class="archive-grid"><article class="archive-card"><span>예정</span><strong>BGM</strong><em>메뉴 / 플레이 / 엔딩 음악 설정</em></article><article class="archive-card"><span>예정</span><strong>효과음</strong><em>선택, 판정, 엔딩 효과음 설정</em></article><article class="archive-card"><span>예정</span><strong>텍스트</strong><em>글자 크기와 표시 속도</em></article><article class="archive-card"><span>예정</span><strong>접근성</strong><em>고대비 모드와 흔들림 감소</em></article></section>`;
}

function premiumHomeContent(activeMenu, save) {
  if (activeMenu === "chapters") return premiumChaptersPage(save);
  const pages = {
    witnesses: () => witnessesPage(save),
    records: () => recordsPage(save),
    artifacts: () => artifactsPage(save),
    achievements: () => achievementsPage(save),
    settings: () => settingsPage(save),
  };
  return `<section class="premium-chapter-panel">${(pages[activeMenu] || (() => premiumChaptersPage(save)))()}</section>`;
}

function homeScreen(activeMenu, save) {
  return `
    <main class="premium-main">
      <aside class="premium-menu-panel">
        <div class="premium-logo-block">
          <p class="eyebrow">BIBLICAL WITNESS ROGUELIKE</p>
          <h2>이름 없는<br />증인들</h2>
          <p>성경의 중심 인물이 아니라, 그 사건을 곁에서 본 한 사람의 기록.</p>
        </div>
        ${premiumMainMenu(activeMenu)}
        <div class="premium-menu-footer">
          <span>GyuGwang Project · Prototype</span>
          <span>PC 16:9 기준 프리미엄 레이아웃</span>
        </div>
      </aside>
      ${premiumHomeContent(activeMenu, save)}
    </main>
  `;
}

window.NW_UI_PAGES = {
  homeScreen,
};
