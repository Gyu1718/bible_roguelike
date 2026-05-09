window.addEventListener("error", function (event) {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;background:#050505;color:#f4d28a;font-family:serif;padding:24px;">
      <section style="max-width:860px;border:1px solid rgba(244,210,138,.35);background:rgba(0,0,0,.72);padding:28px;box-shadow:0 20px 80px rgba(0,0,0,.6);">
        <p style="letter-spacing:.18em;color:#b88b44;font-size:12px;margin:0 0 10px;">BOOT ERROR</p>
        <h1 style="margin:0 0 16px;font-size:30px;">게임 초기화 중 오류가 발생했습니다</h1>
        <p style="line-height:1.7;color:#e8d5b3;">${String(event.message || "알 수 없는 오류")}</p>
        <pre style="white-space:pre-wrap;color:#d7b46a;background:#111;padding:16px;overflow:auto;max-height:320px;">${String(event.filename || "")}:${String(event.lineno || "")}:${String(event.colno || "")}
${event.error && event.error.stack ? event.error.stack : ""}</pre>
      </section>
    </main>
  `;
});

window.addEventListener("unhandledrejection", function (event) {
  const root = document.getElementById("root");
  if (!root) return;
  const reason = event.reason || {};
  root.innerHTML = `
    <main style="min-height:100vh;display:grid;place-items:center;background:#050505;color:#f4d28a;font-family:serif;padding:24px;">
      <section style="max-width:860px;border:1px solid rgba(244,210,138,.35);background:rgba(0,0,0,.72);padding:28px;box-shadow:0 20px 80px rgba(0,0,0,.6);">
        <p style="letter-spacing:.18em;color:#b88b44;font-size:12px;margin:0 0 10px;">PROMISE ERROR</p>
        <h1 style="margin:0 0 16px;font-size:30px;">비동기 초기화 중 오류가 발생했습니다</h1>
        <pre style="white-space:pre-wrap;color:#d7b46a;background:#111;padding:16px;overflow:auto;max-height:320px;">${reason.stack || reason.message || String(reason)}</pre>
      </section>
    </main>
  `;
});

window.addEventListener("DOMContentLoaded", function () {
  setTimeout(function () {
    const root = document.getElementById("root");
    if (!root) return;
    if (root.textContent && root.textContent.includes("게임 데이터를 불러오는 중입니다")) {
      root.innerHTML = `
        <main style="min-height:100vh;display:grid;place-items:center;background:#050505;color:#f4d28a;font-family:serif;padding:24px;">
          <section style="max-width:860px;border:1px solid rgba(244,210,138,.35);background:rgba(0,0,0,.72);padding:28px;box-shadow:0 20px 80px rgba(0,0,0,.6);">
            <p style="letter-spacing:.18em;color:#b88b44;font-size:12px;margin:0 0 10px;">BOOT TIMEOUT</p>
            <h1 style="margin:0 0 16px;font-size:30px;">게임 렌더링이 완료되지 않았습니다</h1>
            <p style="line-height:1.7;color:#e8d5b3;">스크립트가 중간에 멈췄거나 game.js의 render() 호출까지 도달하지 못했습니다. 브라우저 콘솔에 표시된 오류를 확인해야 합니다.</p>
          </section>
        </main>
      `;
    }
  }, 2500);
});
