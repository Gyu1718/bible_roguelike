(() => {
  const BASE_WIDTH = 1672;
  const BASE_HEIGHT = 941;

  function resizeHomeCanvas() {
    const canvas = document.querySelector(".home-screen");
    if (!canvas) return;

    const scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
    canvas.style.transform = `scale(${scale})`;
  }

  function installHomeCanvasScaler() {
    resizeHomeCanvas();

    const root = document.getElementById("root") || document.body;
    const observer = new MutationObserver(resizeHomeCanvas);
    observer.observe(root, { childList: true, subtree: true });

    window.addEventListener("resize", resizeHomeCanvas);
    window.addEventListener("orientationchange", resizeHomeCanvas);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", installHomeCanvasScaler);
  } else {
    installHomeCanvasScaler();
  }
})();
