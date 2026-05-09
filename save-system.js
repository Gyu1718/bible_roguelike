const SAVE_KEY = "nameless_witnesses_save_v1";

function defaultSaveData() {
  return {
    version: 1,
    unlockedChapters: ["exodus"],
    clearedChapters: [],
    endingsSeen: [],
    testimonyTypesSeen: [],
    totalRuns: 0,
    lastRun: null,
    updatedAt: null,
  };
}

function loadSaveData() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSaveData();
    return { ...defaultSaveData(), ...JSON.parse(raw) };
  } catch (error) {
    console.warn("저장 데이터를 불러오지 못했습니다.", error);
    return defaultSaveData();
  }
}

function writeSaveData(next) {
  const payload = {
    ...defaultSaveData(),
    ...next,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(payload));
  window.NW_SAVE_DATA = payload;
  return payload;
}

function uniquePush(list, value) {
  if (!value) return list || [];
  return Array.from(new Set([...(list || []), value]));
}

function readEndingFromDom() {
  const panel = document.querySelector(".ending-panel");
  if (!panel) return null;

  const endingTitle = panel.querySelector("h2")?.textContent?.trim();
  const typeText = panel.querySelector(".type-ribbon")?.textContent?.replace("당신의 증언 유형:", "")?.trim();
  const statTexts = Array.from(panel.querySelectorAll(".meta div")).map((node) => node.textContent.trim());

  if (!endingTitle) return null;

  return {
    chapterId: window.GAME_DATA?.meta?.id || "exodus",
    chapterTitle: window.GAME_DATA?.meta?.title || "벽돌과 바다",
    endingTitle,
    testimonyType: typeText || "알 수 없음",
    stats: statTexts,
    completedAt: new Date().toISOString(),
  };
}

function recordEndingIfVisible() {
  const ending = readEndingFromDom();
  if (!ending) return;

  const save = loadSaveData();
  const endingKey = `${ending.chapterId}:${ending.endingTitle}`;
  const chapterCleared = ending.endingTitle === "해방의 증인" || ending.endingTitle === "살아남은 자";

  writeSaveData({
    ...save,
    totalRuns: Math.max(save.totalRuns || 0, 0) + 1,
    clearedChapters: chapterCleared ? uniquePush(save.clearedChapters, ending.chapterId) : save.clearedChapters,
    endingsSeen: uniquePush(save.endingsSeen, endingKey),
    testimonyTypesSeen: uniquePush(save.testimonyTypesSeen, ending.testimonyType),
    lastRun: ending,
  });
}

function decorateHomeWithSaveData() {
  const save = loadSaveData();
  const hero = document.querySelector(".home-hero");
  if (!hero || hero.querySelector(".save-summary")) return;

  const summary = document.createElement("div");
  summary.className = "save-summary";
  summary.innerHTML = `
    <span>회차 ${save.totalRuns || 0}</span>
    <span>엔딩 ${save.endingsSeen?.length || 0}</span>
    <span>증언 유형 ${save.testimonyTypesSeen?.length || 0}</span>
  `;
  hero.appendChild(summary);
}

function decorateRecordsMenu() {
  const save = loadSaveData();
  document.querySelectorAll(".menu-item.disabled").forEach((item) => {
    if (item.textContent.includes("기록")) {
      item.classList.remove("disabled");
      item.classList.add("soft-active");
      item.title = `본 엔딩 ${save.endingsSeen?.length || 0}개`;
    }
  });
}

function afterRenderSaveHook() {
  recordEndingIfVisible();
  decorateHomeWithSaveData();
  decorateRecordsMenu();
}

function installSaveSystem() {
  window.NW_SAVE_DATA = loadSaveData();

  const originalRender = window.render;
  if (typeof originalRender === "function" && !window.__NW_SAVE_PATCHED__) {
    window.render = function saveAwareRender() {
      originalRender();
      afterRenderSaveHook();
    };
    window.__NW_SAVE_PATCHED__ = true;
  }

  afterRenderSaveHook();
}

window.NW_SAVE = {
  load: loadSaveData,
  write: writeSaveData,
  reset() {
    localStorage.removeItem(SAVE_KEY);
    window.NW_SAVE_DATA = defaultSaveData();
    location.reload();
  },
};

installSaveSystem();
