const { endings, scenes } = window.GAME_DATA;

let state = {
  screen: "home",
  activeMenu: "chapters",
  index: 0,
  stats: { endurance: 10, panic: 5, witness: 0 },
  profile: window.NW_PROFILE.defaultProfile(),
  feedback: null,
  pendingChoice: null,
  roll: null,
  ending: null,
  log: ["새로운 목격자의 기록이 열렸다."],
};

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function getSaveData() {
  if (window.NW_SAVE?.load) return window.NW_SAVE.load();
  return {
    unlockedChapters: ["exodus"],
    clearedChapters: [],
    endingsSeen: [],
    testimonyTypesSeen: [],
    artifactsUnlocked: [],
    achievementsUnlocked: [],
    runHistory: [],
    totalRuns: 0,
    lastRun: null,
  };
}

function apply(effects = {}) {
  const next = { ...state.stats };
  Object.entries(effects).forEach(([key, value]) => {
    next[key] = clamp((next[key] || 0) + value, 0, key === "panic" ? 14 : 20);
  });
  state.stats = next;
}

function applyProfile(profile = {}) {
  state.profile = window.NW_PROFILE.apply(state.profile, profile);
}

function evaluate() {
  const stats = state.stats;
  if (stats.endurance <= 0) return endings.collapse;
  if (stats.panic >= 12) return endings.terror;
  if (stats.witness >= 12 && stats.panic <= 7) return endings.trueWitness;
  if (stats.witness <= 5) return endings.silent;
  return endings.survivor;
}

function needsFeedback(choice) {
  if (choice.feedbackMode === "inline") return false;
  if (choice.feedbackMode === "modal") return true;
  if (choice.badEnding) return true;
  if (window.NW_ROLL.isRollChoice(choice)) return true;

  const effects = choice.effects || {};
  if ((effects.witness || 0) >= 3) return true;
  if ((effects.panic || 0) >= 3) return true;
  return false;
}

function goNextOrEnd() {
  if (state.stats.endurance <= 0 || state.stats.panic >= 14) {
    state.ending = evaluate();
    state.screen = "ending";
    render();
    return;
  }

  state.index += 1;

  if (!scenes[state.index] || scenes[state.index]?.final) {
    state.ending = evaluate();
    state.screen = "ending";
    render();
    return;
  }

  state.feedback = null;
  state.pendingChoice = null;
  state.roll = null;
  state.screen = "play";
  render();
}

function choose(index) {
  const choice = scenes[state.index].choices[index];
  applyProfile(choice.profile);

  if (choice.badEnding) {
    state.feedback = { ...choice, next: "bad" };
    state.log.unshift(choice.text);
    state.log = state.log.slice(0, 6);
    state.screen = "feedback";
    render();
    return;
  }

  if (window.NW_ROLL.isRollChoice(choice)) {
    state.pendingChoice = choice;
    state.roll = window.NW_ROLL.makeRoll(choice, state.stats);
    state.screen = "roll";
    render();
    return;
  }

  apply(choice.effects);
  state.log.unshift(choice.text);
  state.log = state.log.slice(0, 6);
  state.feedback = { ...choice, next: state.stats.endurance <= 0 || state.stats.panic >= 14 ? "ending" : "continue" };

  if (needsFeedback(choice)) {
    state.screen = "feedback";
    render();
    return;
  }

  goNextOrEnd();
}

function resolveRoll() {
  const choice = state.pendingChoice;
  const roll = state.roll;
  if (!choice || !roll) return;

  if (roll.success) {
    apply(choice.effects);
    state.feedback = {
      ...choice,
      title: choice.successTitle || choice.title,
      text: choice.successText || choice.text,
      next: state.stats.endurance <= 0 || state.stats.panic >= 14 ? "ending" : "continue",
    };
    state.log.unshift(choice.successText || choice.text);
  } else {
    const fail = window.NW_ROLL.failureEffects(choice);
    apply(fail);
    state.feedback = {
      ...choice,
      title: choice.failTitle || "판정 실패",
      text: choice.failText || "위험한 선택은 뜻대로 풀리지 않았다. 몸과 마음이 흔들렸다.",
      next: state.stats.endurance <= 0 || state.stats.panic >= 14 ? "ending" : "continue",
    };
    state.log.unshift(state.feedback.text);
  }

  state.log = state.log.slice(0, 6);
  state.screen = "feedback";
  render();
}

function proceed() {
  if (state.feedback?.next === "bad") {
    state.ending = endings[state.feedback.badEnding];
    state.screen = "ending";
    render();
    return;
  }

  if (state.feedback?.next === "ending") {
    state.ending = evaluate();
    state.screen = "ending";
    render();
    return;
  }

  goNextOrEnd();
}

function restart() {
  state = {
    ...state,
    screen: "play",
    index: 0,
    stats: { endurance: 10, panic: 5, witness: 0 },
    profile: window.NW_PROFILE.defaultProfile(),
    feedback: null,
    pendingChoice: null,
    roll: null,
    ending: null,
    log: ["벽돌과 바다 기록을 시작했다."],
  };
  render();
}

function goHome(menu = state.activeMenu || "chapters") {
  state.screen = "home";
  state.activeMenu = menu;
  state.feedback = null;
  state.pendingChoice = null;
  state.roll = null;
  render();
}

function setMenu(menu) {
  state.activeMenu = menu;
  state.screen = "home";
  render();
}

function render() {
  const root = document.getElementById("root");
  root.innerHTML = window.NW_RENDER.renderApp(state, scenes, getSaveData());
}

window.restart = restart;
window.choose = choose;
window.proceed = proceed;
window.resolveRoll = resolveRoll;
window.goHome = goHome;
window.setMenu = setMenu;
window.state = state;
window.render = render;
render();
