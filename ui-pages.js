function menuButton(activeMenu, id, label, icon = "") {
  const active = activeMenu === id ? "active" : "";
  return `<button class="menu-item ${active}" onclick="setMenu('${id}')">${icon}${label}</button>`;
}

function menuNav(activeMenu) {
  return `
    <nav class="main-menu">
      ${menuButton(activeMenu, "chapters", "챕터", "▣ ")}
      ${menuButton(activeMenu, "witnesses", "증인")}
      ${menuButton(activeMenu, "records", "기록")}
      ${menuButton(activeMenu, "artifacts", "유물")}
      ${menuButton(activeMenu, "achievements", "업적")}
      ${menuButton(activeMenu, "settings", "설정")}
    </nav>
  `;
}

function chaptersPage(save) {
  const cleared = save.clearedChapters?.includes("exodus");
  const endingsCount = save.endingsSeen?.length || 0;
  return `
    <section class="home-hero">
      <p class="eyebrow">기억하라 · 기록하라 · 전하라</p>
      <h2>벽돌과 바다</h2>
      <p>그들이 우리에게 벽돌을 만들라 하였고, 우리는 피와 땀으로 대답하였다.</p>
      <button class="primary" onclick="restart()">${cleared ? "다시 시작하기" : "1장 시작하기"}</button>
      <div class="save-summary">
        <span>회차 ${save.totalRuns || 0}</span>
        <span>엔딩 ${endingsCount}</span>
        <span>증언 유형 ${save.testimonyTypesSeen?.length || 0}</span>
      </div>
    </section>
    <section class="chapter-grid">
      <button class="chapter-card ${cleared ? "cleared" : "active"}" onclick="restart()">
        <span>${cleared ? "클리어" : "진행 가능"}</span>
        <strong>1장 벽돌과 바다</strong>
        <em>${cleared ? `발견 엔딩 ${endingsCount}개` : "홍해를 건너기 위한 믿음과 선택의 순간"}</em>
      </button>
      <button class="chapter-card locked"><span>준비 중</span><strong>2장 광야의 메아리</strong><em>만나, 원망, 기다림의 이야기</em></button>
      <button class="chapter-card locked"><span>준비 중</span><strong>3장 무너진 성벽</strong><em>사사시대 확장 후보</em></button>
      <button class="chapter-card locked"><span>준비 중</span><strong>4장 불 가운데서</strong><em>엘리야 확장 후보</em></button>
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
  return `
    <section class="home-hero archive-hero">
      <p class="eyebrow">ACHIEVEMENTS</p>
      <h2>업적</h2>
      <p>반복 플레이를 통해 열리는 작은 표식들입니다.</p>
    </section>
    <section class="archive-grid">
      ${achievements.map((item) => {
        const done = unlocked.includes(item.title);
        return `<article class="archive-card ${done ? "" : "locked"}"><span>${done ? "달성" : "잠김"}</span><strong>${done ? item.title : "???"}</strong><em>${item.desc}</em></article>`;
      }).join("")}
    </section>
  `;
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
  return `
    <section class="home-hero archive-hero">
      <p class="eyebrow">ARTIFACTS</p>
      <h2>유물</h2>
      <p>장면과 신학적 상징을 짧은 기록으로 남기는 공간입니다. 엔딩과 상태에 따라 해금됩니다.</p>
    </section>
    <section class="archive-grid">
      ${artifacts.map(([title, desc]) => {
        const open = unlocked.includes(title);
        return `<article class="archive-card ${open ? "" : "locked"}"><span>${open ? "해금" : "미발견"}</span><strong>${open ? title : "???"}</strong><em>${open ? desc : "다른 엔딩과 선택으로 발견 가능"}</em></article>`;
      }).join("")}
    </section>
  `;
}

function settingsPage() {
  return `
    <section class="home-hero archive-hero">
      <p class="eyebrow">SETTINGS</p>
      <h2>설정</h2>
      <p>현재는 저장 초기화만 제공합니다. 이후 사운드, 텍스트 속도, 화면 효과 설정을 추가할 수 있습니다.</p>
      <button class="secondary danger" onclick="window.NW_SAVE?.reset()">저장 데이터 초기화</button>
    </section>
    <section class="archive-grid">
      <article class="archive-card"><span>예정</span><strong>BGM</strong><em>메뉴 / 플레이 / 엔딩 음악 설정</em></article>
      <article class="archive-card"><span>예정</span><strong>효과음</strong><em>선택, 판정, 엔딩 효과음 설정</em></article>
      <article class="archive-card"><span>예정</span><strong>텍스트</strong><em>글자 크기와 표시 속도</em></article>
      <article class="archive-card"><span>예정</span><strong>접근성</strong><em>고대비 모드와 흔들림 감소</em></article>
    </section>
  `;
}

function homeContent(activeMenu, save) {
  const pages = {
    chapters: () => chaptersPage(save),
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
    <main class="home-screen">
      ${menuNav(activeMenu)}
      <section class="home-content">
        ${homeContent(activeMenu, save)}
      </section>
    </main>
  `;
}

window.NW_UI_PAGES = {
  homeScreen,
};
