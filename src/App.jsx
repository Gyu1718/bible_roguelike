import { useEffect, useMemo, useRef, useState } from "react";
import { chapters, evaluateEnding, gameSubtitle, gameTitle, statLabels } from "./gameData";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function applyEffects(stats, effects = {}) {
  const next = { ...stats };
  Object.entries(effects).forEach(([key, value]) => {
    next[key] = clamp((next[key] ?? 0) + value, 0, key === "fear" ? 14 : 12);
  });
  return next;
}

function saveRun(payload) {
  localStorage.setItem("unnamedWitnessesSave", JSON.stringify(payload));
}

function loadRun() {
  try {
    const raw = localStorage.getItem("unnamedWitnessesSave");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function getCompletedEndings() {
  try {
    return JSON.parse(localStorage.getItem("unnamedWitnessesEndings") || "[]");
  } catch {
    return [];
  }
}

function setCompletedEnding(title) {
  const prev = getCompletedEndings();
  const next = Array.from(new Set([...prev, title]));
  localStorage.setItem("unnamedWitnessesEndings", JSON.stringify(next));
  return next;
}

function SceneIllustration({ type }) {
  const palette = {
    brick: ["#21140f", "#8b3f24", "#d6a15d"],
    staff: ["#171820", "#52402d", "#d2b176"],
    plague: ["#160c0c", "#6f1212", "#d4462d"],
    door: ["#170f12", "#4b1f1f", "#b94b3b"],
    desert: ["#17120d", "#80613b", "#d5b678"],
    sea: ["#07111f", "#143a58", "#76b9d6"],
    crossing: ["#06101a", "#204b6a", "#e8d7a0"],
  }[type] || ["#111", "#444", "#ddd"];

  return (
    <div className="illustration" aria-label="장면 삽화">
      <svg viewBox="0 0 900 620" role="img">
        <defs>
          <linearGradient id={`sky-${type}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={palette[0]} />
            <stop offset="60%" stopColor={palette[1]} />
            <stop offset="100%" stopColor={palette[2]} />
          </linearGradient>
          <radialGradient id={`light-${type}`} cx="50%" cy="38%" r="58%">
            <stop offset="0%" stopColor="rgba(255,232,175,0.92)" />
            <stop offset="35%" stopColor="rgba(255,206,126,0.34)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </radialGradient>
          <filter id={`grain-${type}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.16" />
            </feComponentTransfer>
            <feBlend mode="overlay" in2="SourceGraphic" />
          </filter>
        </defs>
        <rect width="900" height="620" fill={`url(#sky-${type})`} />
        <rect width="900" height="620" fill={`url(#light-${type})`} opacity="0.65" />
        {type === "brick" && <BrickScene />}
        {type === "staff" && <StaffScene />}
        {type === "plague" && <PlagueScene />}
        {type === "door" && <DoorScene />}
        {type === "desert" && <DesertScene />}
        {type === "sea" && <SeaScene />}
        {type === "crossing" && <CrossingScene />}
        <rect width="900" height="620" fill="rgba(0,0,0,0.18)" filter={`url(#grain-${type})`} />
        <rect x="18" y="18" width="864" height="584" fill="none" stroke="rgba(232,215,160,0.26)" strokeWidth="2" />
      </svg>
    </div>
  );
}

function Human({ x, y, scale = 1, light = false }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity="0.95">
      <circle cx="0" cy="-62" r="18" fill={light ? "#e8d7a0" : "#16100d"} />
      <path d="M-22 -42 C-34 18 -28 72 0 98 C28 72 34 18 22 -42 Z" fill={light ? "#b98b4f" : "#21140f"} />
      <path d="M-44 -14 C-14 -4 14 -4 44 -14" stroke={light ? "#e8d7a0" : "#0b0705"} strokeWidth="9" fill="none" strokeLinecap="round" />
    </g>
  );
}

function BrickScene() {
  return (
    <g>
      <rect x="0" y="420" width="900" height="200" fill="rgba(47,26,16,0.88)" />
      {Array.from({ length: 12 }).map((_, i) => (
        <rect key={i} x={40 + i * 70} y={440 + (i % 3) * 35} width="56" height="26" fill="rgba(160,83,43,0.58)" stroke="rgba(32,15,10,0.6)" />
      ))}
      <Human x="230" y="430" scale="1.05" />
      <Human x="330" y="455" scale="0.82" />
      <path d="M680 210 L720 405" stroke="#170c09" strokeWidth="12" strokeLinecap="round" />
      <circle cx="680" cy="190" r="20" fill="#140b08" />
      <path d="M640 245 C720 260 750 320 735 390" stroke="#140b08" strokeWidth="24" fill="none" strokeLinecap="round" />
    </g>
  );
}

function StaffScene() {
  return (
    <g>
      <path d="M0 448 C190 390 320 438 480 395 C610 360 710 370 900 315 L900 620 L0 620 Z" fill="rgba(46,32,21,0.82)" />
      <path d="M470 165 C445 210 455 315 450 442" stroke="#d2b176" strokeWidth="10" fill="none" strokeLinecap="round" />
      <Human x="450" y="425" scale="1.05" light />
      <Human x="200" y="455" scale="0.7" />
      <Human x="680" y="450" scale="0.7" />
      <path d="M520 180 C610 210 682 260 744 330" stroke="rgba(232,215,160,0.18)" strokeWidth="60" fill="none" strokeLinecap="round" />
    </g>
  );
}

function PlagueScene() {
  return (
    <g>
      <path d="M0 470 C160 420 300 495 450 440 C620 380 760 430 900 360 L900 620 L0 620 Z" fill="rgba(42,10,10,0.76)" />
      <path d="M0 380 C140 340 280 360 420 330 C620 285 720 340 900 300" stroke="rgba(200,30,24,0.72)" strokeWidth="42" fill="none" />
      <circle cx="710" cy="150" r="110" fill="rgba(143,18,18,0.35)" />
      <Human x="230" y="455" scale="0.7" />
      <Human x="315" y="472" scale="0.55" />
      <Human x="620" y="445" scale="0.8" />
    </g>
  );
}

function DoorScene() {
  return (
    <g>
      <rect x="220" y="120" width="460" height="430" fill="rgba(32,18,14,0.86)" />
      <rect x="320" y="210" width="260" height="340" fill="rgba(13,9,8,0.94)" />
      <path d="M300 205 L600 205 M310 205 L310 550 M590 205 L590 550" stroke="#b94b3b" strokeWidth="18" strokeLinecap="round" />
      <Human x="450" y="505" scale="0.82" light />
      <circle cx="450" cy="270" r="95" fill="rgba(232,215,160,0.12)" />
    </g>
  );
}

function DesertScene() {
  return (
    <g>
      <path d="M0 420 C170 360 270 430 430 385 C620 330 740 365 900 290 L900 620 L0 620 Z" fill="rgba(115,82,43,0.76)" />
      <path d="M0 500 C160 455 330 510 480 470 C640 425 760 470 900 430" stroke="rgba(221,180,106,0.3)" strokeWidth="28" fill="none" />
      {Array.from({ length: 7 }).map((_, i) => <Human key={i} x={140 + i * 95} y={455 + (i % 2) * 25} scale={0.48 + (i % 3) * 0.08} />)}
      <circle cx="730" cy="150" r="75" fill="rgba(232,215,160,0.22)" />
    </g>
  );
}

function SeaScene() {
  return (
    <g>
      <path d="M0 360 C180 300 280 385 450 330 C650 265 760 340 900 280 L900 620 L0 620 Z" fill="rgba(9,38,65,0.82)" />
      <path d="M0 475 C160 410 305 488 450 430 C630 355 765 425 900 380" stroke="rgba(118,185,214,0.42)" strokeWidth="30" fill="none" />
      <Human x="420" y="475" scale="0.92" />
      <Human x="500" y="485" scale="0.72" />
      <path d="M690 310 C745 340 795 385 825 455" stroke="rgba(12,10,14,0.82)" strokeWidth="30" fill="none" strokeLinecap="round" />
    </g>
  );
}

function CrossingScene() {
  return (
    <g>
      <path d="M0 0 C190 180 210 360 145 620 L0 620 Z" fill="rgba(26,78,110,0.8)" />
      <path d="M900 0 C700 185 690 390 760 620 L900 620 Z" fill="rgba(26,78,110,0.8)" />
      <path d="M210 620 C250 440 320 330 450 260 C580 330 650 440 690 620 Z" fill="rgba(174,130,76,0.72)" />
      <path d="M450 105 L450 255" stroke="rgba(232,215,160,0.8)" strokeWidth="18" strokeLinecap="round" />
      <circle cx="450" cy="92" r="80" fill="rgba(232,215,160,0.16)" />
      {Array.from({ length: 9 }).map((_, i) => <Human key={i} x={260 + i * 48} y={510 - Math.abs(4 - i) * 22} scale="0.44" light={i === 4} />)}
    </g>
  );
}

function useAmbientAudio() {
  const audioRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  function toggle() {
    if (!enabled) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioContext();
      const master = ctx.createGain();
      master.gain.value = 0.045;
      master.connect(ctx.destination);

      const oscillators = [55, 82.41, 110].map((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = index === 0 ? "sine" : "triangle";
        osc.frequency.value = freq;
        gain.gain.value = index === 0 ? 0.6 : 0.25;
        osc.connect(gain);
        gain.connect(master);
        osc.start();
        return osc;
      });

      audioRef.current = { ctx, oscillators };
      setEnabled(true);
    } else {
      audioRef.current?.oscillators?.forEach((osc) => osc.stop());
      audioRef.current?.ctx?.close();
      audioRef.current = null;
      setEnabled(false);
    }
  }

  useEffect(() => {
    return () => {
      audioRef.current?.oscillators?.forEach((osc) => osc.stop());
      audioRef.current?.ctx?.close();
    };
  }, []);

  return { enabled, toggle };
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [chapter, setChapter] = useState(chapters[0]);
  const [sceneIndex, setSceneIndex] = useState(0);
  const [stats, setStats] = useState(chapters[0].stats);
  const [log, setLog] = useState(["새로운 목격자의 기록이 열렸다."]);
  const [ending, setEnding] = useState(null);
  const [completedEndings, setCompletedEndings] = useState(getCompletedEndings());
  const { enabled, toggle } = useAmbientAudio();

  const scene = chapter.scenes?.[sceneIndex];
  const isFailed = stats.body <= 0 || stats.fear >= 14;
  const totalScenes = chapter.scenes?.length ?? 0;

  useEffect(() => {
    saveRun({ chapterId: chapter.id, sceneIndex, stats, log, screen });
  }, [chapter.id, sceneIndex, stats, log, screen]);

  const statEntries = useMemo(() => Object.entries(stats), [stats]);

  function startChapter(nextChapter) {
    setChapter(nextChapter);
    setSceneIndex(0);
    setStats(nextChapter.stats);
    setEnding(null);
    setLog([`${nextChapter.title} 기록을 시작했다.`]);
    setScreen(nextChapter.complete ? "play" : "prototype");
  }

  function continueSaved() {
    const saved = loadRun();
    if (!saved) return;
    const savedChapter = chapters.find((item) => item.id === saved.chapterId) || chapters[0];
    setChapter(savedChapter);
    setSceneIndex(saved.sceneIndex || 0);
    setStats(saved.stats || savedChapter.stats);
    setLog(saved.log || ["저장된 기록을 불러왔다."]);
    setScreen(saved.screen === "prototype" ? "prototype" : "play");
  }

  function choose(choice) {
    const nextStats = applyEffects(stats, choice.effects);
    setStats(nextStats);
    setLog((prev) => [choice.log, ...prev].filter(Boolean).slice(0, 9));

    if (nextStats.body <= 0 || nextStats.fear >= 14) {
      const result = evaluateEnding(nextStats);
      setEnding(result);
      setCompletedEndings(setCompletedEnding(result.title));
      setScreen("ending");
      return;
    }

    const nextSceneIndex = sceneIndex + 1;
    const nextScene = chapter.scenes[nextSceneIndex];

    if (!nextScene) {
      const result = evaluateEnding(nextStats);
      setEnding(result);
      setCompletedEndings(setCompletedEnding(result.title));
      setScreen("ending");
      return;
    }

    if (nextScene.final) {
      setSceneIndex(nextSceneIndex);
      setTimeout(() => {
        const result = evaluateEnding(nextStats);
        setEnding(result);
        setCompletedEndings(setCompletedEnding(result.title));
        setScreen("ending");
      }, 900);
      return;
    }

    setSceneIndex(nextSceneIndex);
  }

  function resetProgress() {
    localStorage.removeItem("unnamedWitnessesSave");
    setChapter(chapters[0]);
    setSceneIndex(0);
    setStats(chapters[0].stats);
    setEnding(null);
    setLog(["기록이 새로 시작되었다."]);
    setScreen("home");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">BIBLICAL WITNESS ROGUELIKE</p>
          <h1>{gameTitle}</h1>
          <p>{gameSubtitle}</p>
        </div>
        <div className="top-actions">
          <button onClick={toggle} className="ghost-btn">{enabled ? "BGM 끄기" : "BGM 켜기"}</button>
          <button onClick={resetProgress} className="ghost-btn">처음으로</button>
        </div>
      </header>

      {screen === "home" && (
        <main className="home-grid">
          <section className="hero-card">
            <SceneIllustration type="crossing" />
            <div className="hero-copy">
              <p className="eyebrow">시리즈 콘셉트</p>
              <h2>중심 인물이 아니라, 사건 곁의 이름 없는 사람이 된다.</h2>
              <p>모세가 아니라 벽돌 굽던 노예. 다니엘이 아니라 금령을 베껴 쓰는 서기관. 성경의 사건은 바꾸지 않고, 그 사건 앞에서 한 사람이 무엇을 두려워하고 무엇을 붙드는지를 선택한다.</p>
              <div className="button-row">
                <button className="primary-btn" onClick={() => startChapter(chapters[0])}>1편 시작</button>
                <button className="secondary-btn" onClick={continueSaved}>저장 기록 이어하기</button>
              </div>
            </div>
          </section>

          <section className="chapter-list">
            {chapters.map((item, index) => (
              <button key={item.id} className="chapter-card" onClick={() => startChapter(item)}>
                <span>EP {index + 1}</span>
                <strong>{item.title}</strong>
                <em>{item.subtitle}</em>
                <small>{item.complete ? "완주 가능" : "기획 프로토타입"}</small>
              </button>
            ))}
          </section>
        </main>
      )}

      {screen === "prototype" && (
        <main className="prototype-screen">
          <section className="story-panel wide">
            <p className="eyebrow">기획 프로토타입</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.prototypeText}</p>
            <div className="meta-grid">
              <div><span>본문 모티프</span><strong>{chapter.reference}</strong></div>
              <div><span>톤</span><strong>{chapter.tone}</strong></div>
            </div>
            <p className="muted">이 챕터는 아직 완주형 스토리로 확장 전이다. 현재 1편 《벽돌과 바다》가 완주 가능한 기준 챕터이다.</p>
            <button className="primary-btn" onClick={() => startChapter(chapters[0])}>완주 가능한 1편으로 이동</button>
          </section>
        </main>
      )}

      {screen === "play" && scene && (
        <main className="game-layout">
          <section className="visual-column">
            <SceneIllustration type={scene.image} />
            <div className="progress-card">
              <span>진행도</span>
              <strong>{sceneIndex + 1} / {totalScenes}</strong>
              <div className="progress-bar"><div style={{ width: `${((sceneIndex + 1) / totalScenes) * 100}%` }} /></div>
            </div>
          </section>

          <section className="story-panel">
            <p className="eyebrow">{chapter.title}</p>
            <h2>{scene.title}</h2>
            <p className="story-text">{scene.text}</p>

            {!scene.final && !isFailed && (
              <div className="choices">
                {scene.choices.map((choice) => (
                  <button key={choice.label} onClick={() => choose(choice)}>{choice.label}</button>
                ))}
              </div>
            )}

            {scene.final && <p className="muted">잠시 후 목격의 결과가 기록된다.</p>}
          </section>

          <aside className="side-panel">
            <section className="stats-card">
              <h3>목격자 상태</h3>
              {statEntries.map(([key, value]) => (
                <div className="stat-row" key={key}>
                  <span>{statLabels[key] || key}</span>
                  <div className="mini-bar"><div className={key === "fear" ? "fear" : ""} style={{ width: `${Math.min(100, value * 8)}%` }} /></div>
                  <strong>{value}</strong>
                </div>
              ))}
            </section>

            <section className="log-card">
              <h3>기록</h3>
              {log.map((entry, index) => <p key={`${entry}-${index}`}>{entry}</p>)}
            </section>
          </aside>
        </main>
      )}

      {screen === "ending" && ending && (
        <main className="ending-screen">
          <SceneIllustration type="crossing" />
          <section className="story-panel wide ending-card">
            <p className="eyebrow">목격의 끝</p>
            <h2>{ending.title}</h2>
            <p className="story-text">{ending.text}</p>
            <div className="meta-grid">
              <div><span>해금 엔딩</span><strong>{completedEndings.length}개</strong></div>
              <div><span>이번 챕터</span><strong>{chapter.title}</strong></div>
            </div>
            <div className="button-row">
              <button className="primary-btn" onClick={() => startChapter(chapter)}>다시 도전</button>
              <button className="secondary-btn" onClick={() => setScreen("home")}>챕터 선택</button>
            </div>
          </section>
        </main>
      )}
    </div>
  );
}
