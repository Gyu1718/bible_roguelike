function createInitialState() {
  return {
    screen: "home",
    activeMenu: "chapters",
    index: 0,
    stats: createInitialStats(),
    profile: window.NW_PROFILE.defaultProfile(),
    feedback: null,
    pendingChoice: null,
    roll: null,
    ending: null,
    log: ["새로운 목격자의 기록이 열렸다."],
  };
}

function createInitialStats() {
  return {
    endurance: 10,
    panic: 5,
    witness: 0,
  };
}

function startRunState(currentState) {
  return {
    ...currentState,
    screen: "play",
    index: 0,
    stats: createInitialStats(),
    profile: window.NW_PROFILE.defaultProfile(),
    feedback: null,
    pendingChoice: null,
    roll: null,
    ending: null,
    log: ["벽돌과 바다 기록을 시작했다."],
  };
}

function homeState(currentState, menu = currentState?.activeMenu || "chapters") {
  return {
    ...currentState,
    screen: "home",
    activeMenu: menu,
    feedback: null,
    pendingChoice: null,
    roll: null,
  };
}

function setMenuState(currentState, menu) {
  return {
    ...currentState,
    screen: "home",
    activeMenu: menu,
  };
}

function clearTransientState(currentState, screen = currentState.screen) {
  return {
    ...currentState,
    screen,
    feedback: null,
    pendingChoice: null,
    roll: null,
  };
}

function appendLog(currentState, entry, limit = 6) {
  return {
    ...currentState,
    log: [entry, ...(currentState.log || [])].slice(0, limit),
  };
}

window.NW_STATE = {
  createInitialState,
  createInitialStats,
  startRunState,
  homeState,
  setMenuState,
  clearTransientState,
  appendLog,
};
