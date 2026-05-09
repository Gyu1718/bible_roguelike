(() => {
  const params = new URLSearchParams(window.location.search);
  const enabled = params.get("blueprint") === "1" || params.get("bp") === "1";

  function installBlueprintLayer() {
    if (!enabled) return;
    document.body.classList.add("show-home-blueprint");

    const tryInstall = () => {
      const home = document.querySelector(".home-screen");
      if (!home || home.querySelector(".home-blueprint-layer")) return;

      const layer = document.createElement("div");
      layer.className = "home-blueprint-layer";
      layer.setAttribute("aria-hidden", "true");

      const grid = document.createElement("div");
      grid.className = "home-blueprint-grid";
      grid.setAttribute("aria-hidden", "true");

      const labels = document.createElement("div");
      labels.className = "home-blueprint-label";
      labels.setAttribute("aria-hidden", "true");
      labels.innerHTML = `
        <span class="bp-sidebar">SIDEBAR</span>
        <span class="bp-title">ACT TITLE</span>
        <span class="bp-main-card">MAIN CARD</span>
        <span class="bp-lock-grid">LOCK GRID</span>
        <span class="bp-footer">FOOTER</span>
      `;

      home.appendChild(layer);
      home.appendChild(grid);
      home.appendChild(labels);
    };

    tryInstall();
    const observer = new MutationObserver(tryInstall);
    observer.observe(document.getElementById("root") || document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installBlueprintLayer);
  } else {
    installBlueprintLayer();
  }
})();
