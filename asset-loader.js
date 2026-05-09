const SCENE_ASSET_MAP = [
  {
    match: ["진흙", "벽돌", "채찍", "짚"],
    src: "./assets/scenes/exodus/scene_01_brickyard.svg",
    alt: "벽돌 노동 장면",
  },
  {
    match: ["바다 앞", "병거", "광야의 먼지"],
    src: "./assets/scenes/exodus/scene_11_red_sea_waiting.svg",
    alt: "홍해 앞에서 기다리는 장면",
  },
  {
    match: ["물벽", "바다 사이", "목격의 끝"],
    src: "./assets/scenes/exodus/scene_12_red_sea_crossing.svg",
    alt: "홍해를 건너는 장면",
  },
];

function findSceneAsset(label = "") {
  const found = SCENE_ASSET_MAP.find((item) => item.match.some((word) => label.includes(word)));
  return found || SCENE_ASSET_MAP[0];
}

function applySceneAssets() {
  document.querySelectorAll(".scene-art, .art").forEach((panel) => {
    const title = panel.querySelector("h2")?.textContent || "";
    const asset = findSceneAsset(title);

    panel.classList.add("asset-art");
    panel.style.setProperty("--scene-image", `url('${asset.src}')`);

    let img = panel.querySelector(".scene-asset-img");
    if (!img) {
      img = document.createElement("img");
      img.className = "scene-asset-img";
      img.setAttribute("aria-hidden", "true");
      panel.prepend(img);
    }
    img.src = asset.src;
    img.alt = asset.alt;
  });

  document.querySelectorAll(".choice-icon.dice").forEach((icon) => {
    icon.innerHTML = `<img src="./assets/ui/icons/icon_dice.svg" alt="판정" />`;
  });
}

const originalRender = window.render;
if (typeof originalRender === "function") {
  window.render = function patchedRender() {
    originalRender();
    applySceneAssets();
  };
}

applySceneAssets();
