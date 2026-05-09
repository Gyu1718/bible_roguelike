// Premium scene art overrides
// 업로드된 WebP 장면 삽화가 있는 경우 기존 SVG artSrc를 고해상도 이미지로 교체합니다.

(function applyPremiumSceneOverrides() {
  if (!window.EXODUS_DATA || !Array.isArray(window.EXODUS_DATA.scenes)) return;

  const premiumArt = {
    scene_01_brickyard: "./assets/premium/play/scenes/scene_01_brickyard.webp",
    scene_02_overseer_whip: "./assets/premium/play/scenes/scene_02_overseer_whip.webp",
    scene_08_blood_door: "./assets/premium/play/scenes/scene_08_blood_door.webp",
    scene_10_chariots_dust: "./assets/premium/play/scenes/scene_10_chariots_dust.webp",
    scene_11_red_sea_waiting: "./assets/premium/play/scenes/scene_11_red_sea_waiting.webp",
    scene_12_red_sea_crossing: "./assets/premium/play/scenes/scene_12_red_sea_crossing.webp",
  };

  window.EXODUS_DATA.scenes = window.EXODUS_DATA.scenes.map((scene) => {
    if (!premiumArt[scene.id]) return scene;
    return {
      ...scene,
      artSrc: premiumArt[scene.id],
    };
  });
})();
