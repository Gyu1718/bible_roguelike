// Premium choice UX overrides
// 모든 선택마다 결과창을 띄우지 않고, 중요한 선택만 결과 화면으로 보여주기 위한 설정입니다.
// inline: 선택 후 로그에만 남기고 바로 다음 장면으로 진행
// modal: 선택 후 결과 화면 표시
// badEnding / roll 선택은 game.js가 자동으로 결과 화면을 유지합니다.

(function applyPremiumChoiceUxOverrides() {
  if (!window.EXODUS_DATA || !Array.isArray(window.EXODUS_DATA.scenes)) return;

  const modeByScene = {
    scene_01_brickyard: ["inline", "modal", "inline"],
    scene_02_overseer_whip: ["inline", "modal", "modal"],
    scene_03_straw_decree: ["inline", "modal", "modal"],
    scene_06_darkness_plague: ["modal", "inline", "modal"],
    scene_08_blood_door: ["modal", "modal", "modal"],
    scene_09_departure_dawn: ["inline", "modal", "modal"],
    scene_10_chariots_dust: ["inline", "modal", "modal"],
    scene_11_red_sea_waiting: ["inline", "modal", "modal", "modal"],
  };

  window.EXODUS_DATA.scenes = window.EXODUS_DATA.scenes.map((scene) => {
    const modes = modeByScene[scene.id];
    if (!modes || !Array.isArray(scene.choices)) return scene;

    return {
      ...scene,
      choices: scene.choices.map((choice, index) => ({
        ...choice,
        feedbackMode: modes[index] || choice.feedbackMode,
      })),
    };
  });
})();
