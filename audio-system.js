let audioContext = null;
let audioEnabled = false;
let currentBgm = null;

const BGM_PATHS = {
  menu: "./assets/audio/bgm/bgm_menu_dark_bricks.mp3",
  play: "./assets/audio/bgm/bgm_play_exodus_night.mp3",
  roll: "./assets/audio/bgm/bgm_roll_tension.mp3",
  ending: "./assets/audio/bgm/bgm_ending_liberation.mp3",
};

function getAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

function unlockAudio() {
  const ctx = getAudioContext();
  if (!ctx) return false;
  if (ctx.state === "suspended") ctx.resume();
  audioEnabled = true;
  return true;
}

function beep({ frequency = 440, duration = 0.08, type = "sine", gain = 0.04 } = {}) {
  if (!audioEnabled) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const volume = ctx.createGain();

  osc.type = type;
  osc.frequency.value = frequency;
  volume.gain.value = gain;

  osc.connect(volume);
  volume.connect(ctx.destination);

  const now = ctx.currentTime;
  volume.gain.setValueAtTime(gain, now);
  volume.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.start(now);
  osc.stop(now + duration);
}

function playSfx(name) {
  const presets = {
    click: { frequency: 460, duration: 0.055, type: "triangle", gain: 0.035 },
    hover: { frequency: 360, duration: 0.045, type: "sine", gain: 0.018 },
    roll: { frequency: 180, duration: 0.12, type: "square", gain: 0.025 },
    success: { frequency: 660, duration: 0.16, type: "triangle", gain: 0.045 },
    fail: { frequency: 145, duration: 0.18, type: "sawtooth", gain: 0.035 },
    ending: { frequency: 520, duration: 0.24, type: "sine", gain: 0.05 },
    badEnding: { frequency: 110, duration: 0.24, type: "sawtooth", gain: 0.04 },
  };
  beep(presets[name] || presets.click);
}

function stopBgm() {
  if (currentBgm) {
    currentBgm.pause();
    currentBgm.currentTime = 0;
    currentBgm = null;
  }
}

function playBgm(key) {
  if (!audioEnabled) return;
  const src = BGM_PATHS[key];
  if (!src) return;

  if (currentBgm?.dataset?.key === key) return;
  stopBgm();

  const audio = new Audio(src);
  audio.dataset.key = key;
  audio.loop = true;
  audio.volume = 0.28;
  audio.play().catch(() => {
    // BGM files may not exist yet or autoplay may be blocked. SFX still works after user interaction.
  });
  currentBgm = audio;
}

function bgmKeyForScreen(screen) {
  if (screen === "home") return "menu";
  if (screen === "roll") return "roll";
  if (screen === "ending") return "ending";
  return "play";
}

function syncToScreen(screen) {
  playBgm(bgmKeyForScreen(screen));
}

function installAudioEvents() {
  document.addEventListener("click", (event) => {
    unlockAudio();
    if (event.target.closest("button")) playSfx("click");
  }, { capture: true });

  document.addEventListener("mouseover", (event) => {
    if (event.target.closest("button")) playSfx("hover");
  });
}

window.NW_AUDIO = {
  unlock: unlockAudio,
  sfx: playSfx,
  playBgm,
  stopBgm,
  syncToScreen,
  installAudioEvents,
};

installAudioEvents();
