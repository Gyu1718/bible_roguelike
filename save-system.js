const SAVE_KEY = "nameless_witnesses_save_v1";
let lastRecordedRunSignature = null;

function defaultSaveData() {
  return {
    version: 1,
    unlockedChapters: ["exodus"],
    clearedChapters: [],
    endingsSeen: [],
    testimonyTypesSeen: [],
    artifactsUnlocked: [],
    achievementsUnlocked: [],
    totalRuns: 0,
    runHistory: [],
    lastRun: null,
    updatedAt: null,
  };
}

function loadSaveData() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return defaultSaveData();
    const parsed = JSON.parse(raw);
    return { ...defaultSaveData(), ...parsed };
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

function uniquePushMany(list, values = []) {
  return Array.from(new Set([...(list || []), ...values.filter(Boolean)]));
}

function extractStatValue(statTexts, label) {
  const found = statTexts.find((item) => item.includes(label));
  if (!found) return null;
  const number = found.match(/\d+/)?.[0];
  return number ? Number(number) : null;
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
    stats: {
      endurance: extractStatValue(statTexts, "생존"),
      panic: extractStatValue(statTexts, "공포"),
      witness: extractStatValue(statTexts, "증언"),
    },
    completedAt: new Date().toISOString(),
  };
}

function artifactsForEnding(ending) {
  const artifacts = [];
  if (ending.chapterId === "exodus") artifacts.push("벽돌");
  if (["해방의 증인", "살아남은 자"].includes(ending.endingTitle)) artifacts.push("물벽의 길");
  if (ending.endingTitle === "해방의 증인") artifacts.push("지팡이의 그림자");
  if ((ending.stats?.witness || 0) >= 8) artifacts.push("기억의 조각");
  if ((ending.stats?.panic || 0) >= 10) artifacts.push("떨리는 숨");
  return artifacts;
}

function achievementsForSave(save, ending) {
  const nextTotalRuns = Math.max(save.totalRuns || 0, 0) + 1;
  const nextEndings = uniquePush(save.endingsSeen, `${ending.chapterId}:${ending.endingTitle}`);
  const nextTypes = uniquePush(save.testimonyTypesSeen, ending.testimonyType);
  const cleared = ["해방의 증인", "살아남은 자"].includes(ending.endingTitle);
  const badEnding = !cleared;

  return [
    nextTotalRuns >= 1 ? "첫 기록" : null,
    cleared ? "해방의 길" : null,
    nextTypes.length >= 3 ? "다른 증언들" : null,
    badEnding ? "죽음도 기록이다" : null,
    nextEndings.length >= 5 ? "다섯 갈래의 기억" : null,
  ].filter(Boolean);
}

function recordEndingIfVisible() {
  const ending = readEndingFromDom();
  if (!ending) return;

  const signature = `${ending.chapterId}:${ending.endingTitle}:${ending.testimonyType}:${ending.stats.endurance}:${ending.stats.panic}:${ending.stats.witness}`;
  if (lastRecordedRunSignature === signature) return;
  lastRecordedRunSignature = signature;

  const save = loadSaveData();
  const endingKey = `${ending.chapterId}:${ending.endingTitle}`;
  const chapterCleared = ending.endingTitle === "해방의 증인" || ending.endingTitle === "살아남은 자";
  const runRecord = {
    ...ending,
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };
  const runHistory = [runRecord, ...(save.runHistory || [])].slice(0, 20);

  writeSaveData({
    ...save,
    totalRuns: Math.max(save.totalRuns || 0, 0) + 1,
    clearedChapters: chapterCleared ? uniquePush(save.clearedChapters, ending.chapterId) : save.clearedChapters,
    endingsSeen: uniquePush(save.endingsSeen, endingKey),
    testimonyTypesSeen: uniquePush(save.testimonyTypesSeen, ending.testimonyType),
    artifactsUnlocked: uniquePushMany(save.artifactsUnlocked, artifactsForEnding(ending)),
    achievementsUnlocked: uniquePushMany(save.achievementsUnlocked, achievementsForSave(save, ending)),
    runHistory,
    lastRun: runRecord,
  });
}

function afterRenderSaveHook() {
  recordEndingIfVisible();
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
