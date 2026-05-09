import { useEffect, useMemo, useRef, useState } from "react";
import { chapters, endings, evaluateEnding, gameSubtitle, gameTitle, statLabels } from "./gameData";

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function applyEffects(stats, effects = {}) {
  const next = { ...stats };
  Object.entries(effects).forEach(([key, value]) => {
    next[key] = clamp((next[key] ?? 0) + value, 0, key === "panic" ? 14 : 12);
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
  const labels = {
    brick: "진흙 구덩이와 벽돌 노동",
    staff: "모세라는 이름의 소문",
    plague: "재앙이 덮은 애굽",
    door: "피가 발린 문설주",
    desert: "급히 떠나는 새벽",
    sea: "바다 앞의 밤",
    crossing: "물벽 사이의 길",
  };

  return (
    <div className={`illustration scene-${type}`} aria-label="장면 삽화">
      <div style={{ padding: 28, height: "100%", display: "grid", placeItems: "end start" }}>
        <p className="eyebrow">ILLUSTRATION</p>
        <h2 style={{ margin: 0, maxWidth: 520 }}>{labels[type] || "이름 없는 증인의 장면"}</h2>
      </div>
    </div>
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
  const [feedback, setFeedback] = useState(null);
  const [completedEndings, setCompletedEndings] = useState(getCompletedEndings());
  const { enabled, toggle } = useAmbientAudio();

  const scene = chapter.scenes?.[sceneIndex];
  const totalScenes = chapter.scenes?.length ?? 0;
  const statEntries = useMemo(() => Object.entries(stats), [stats]);

  useEffect(() => {
    saveRun({ chapterId: chapter.id, sceneIndex, stats, log, screen });
  }, [chapter.id, sceneIndex, stats, log, screen]);

  function recordEnding(result) {
    setEnding(result);
    setCompletedEndings(setCompletedEnding(result.title));
    setScreen("ending");
  }

  function startChapter(nextChapter) {
    setChapter(nextChapter);
    setSceneIndex(0);
    setStats(nextChapter.stats);
    setEnding(null);
    setFeedback(null);
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
    setFeedback(null);
    setScreen(saved.screen === "prototype" ? "prototype" : "play");
  }

  function choose(choice) {
    const nextStats = applyEffects(stats, choice.effects);
    setStats(nextStats);
    setLog((prev) => [choice.feedback || choice.log, ...prev].filter(Boolean).slice(0, 9));

    if (choice.badEnding) {
      setFeedback({
        title: choice.feedbackTitle || "선택의 결과",
        text: choice.feedback || "그 선택은 돌이킬 수 없는 결과를 낳았다.",
        nextType: "badEnding",
        endingKey: choice.badEnding,
      });
      setScreen("feedback");
      return;
    }

    if (nextStats.endurance <= 0 || nextStats.panic >= 14) {
      setFeedback({
        title: "한계에 도달했다",
        text: choice.feedback || "선택의 대가가 몸과 마음을 무너뜨렸다.",
        nextType: "ending",
        ending: evaluateEnding(nextStats),
      });
      setScreen("feedback");
      return;
    }

    const nextSceneIndex = sceneIndex + 1;
    const nextScene = chapter.scenes[nextSceneIndex];

    if (!nextScene || nextScene.final) {
      setFeedback({
        title: choice.feedbackTitle || "선택의 결과",
        text: choice.feedback || "당신의 선택이 마지막 장면으로 이어졌다.",
        nextType: "final",
        nextSceneIndex: nextSceneIndex,
      });
      setScreen("feedback");
      return;
    }

    setFeedback({
      title: choice.feedbackTitle || "선택의 결과",
      text: choice.feedback || "당신의 선택이 다음 장면을 열었다.",
      nextType: "continue",
      nextSceneIndex,
    });
    setScreen("feedback");
  }

  function proceedAfterFeedback() {
    if (!feedback) return;

    if (feedback.nextType === "badEnding") {
      recordEnding(endings[feedback.endingKey]);
      return;
    }

    if (feedback.nextType === "ending") {
      recordEnding(feedback.ending);
      return;
    }

    if (feedback.nextType === "final") {
      setSceneIndex(feedback.nextSceneIndex);
      const result = evaluateEnding(stats);
      recordEnding(result);
      return;
    }

    setSceneIndex(feedback.nextSceneIndex);
    setFeedback(null);
    setScreen("play");
  }

  function resetProgress() {
    localStorage.removeItem("unnamedWitnessesSave");
    setChapter(chapters[0]);
    setSceneIndex(0);
    setStats(chapters[0].stats);
    setEnding(null);
    setFeedback(null);
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
              <p>선택은 즉시 결과를 만든다. 어떤 선택은 잠시 수치를 바꾸지만, 어떤 선택은 그 자리에서 이야기를 끝낸다.</p>
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
              <div><span>목표</span><strong>{chapter.goal}</strong></div>
            </div>
            <button className="primary-btn" onClick={() => startChapter(chapters[0])}>완주 가능한 1편으로 이동</button>
          </section>
        </main>
      )}

      {screen === "play" && scene && (
        <main className="game-layout">
          <section className="visual-column">
            <SceneIllustration type={scene.image} />
            <div className="progress-card">
              <span>목표</span>
              <strong>{chapter.goal}</strong>
              <div className="progress-bar"><div style={{ width: `${((sceneIndex + 1) / totalScenes) * 100}%` }} /></div>
            </div>
          </section>

          <section className="story-panel">
            <p className="eyebrow">{chapter.title}</p>
            <h2>{scene.title}</h2>
            <p className="story-text">{scene.text}</p>
            {!scene.final && (
              <div className="choices">
                {scene.choices.map((choice) => (
                  <button key={choice.label} onClick={() => choose(choice)}>{choice.label}</button>
                ))}
              </div>
            )}
          </section>

          <aside className="side-panel">
            <section className="stats-card">
              <h3>상태</h3>
              {statEntries.map(([key, value]) => (
                <div className="stat-row" key={key}>
                  <span>{statLabels[key] || key}</span>
                  <div className="mini-bar"><div className={key === "panic" ? "fear" : ""} style={{ width: `${Math.min(100, value * 8)}%` }} /></div>
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

      {screen === "feedback" && feedback && (
        <main className="ending-screen">
          <SceneIllustration type={scene?.image || "crossing"} />
          <section className="story-panel wide ending-card">
            <p className="eyebrow">선택의 결과</p>
            <h2>{feedback.title}</h2>
            <p className="story-text">{feedback.text}</p>
            <div className="meta-grid">
              <div><span>생존</span><strong>{stats.endurance}</strong></div>
              <div><span>공포</span><strong>{stats.panic}</strong></div>
              <div><span>증언</span><strong>{stats.witness}</strong></div>
              <div><span>분기</span><strong>{feedback.nextType === "badEnding" ? "배드엔딩" : "계속 진행"}</strong></div>
            </div>
            <button className="primary-btn" onClick={proceedAfterFeedback}>
              {feedback.nextType === "badEnding" ? "배드엔딩 확인" : "계속"}
            </button>
          </section>
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
