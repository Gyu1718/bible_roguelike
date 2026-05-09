function isRollChoice(choice) {
  return !choice?.badEnding && (choice?.risk || 0) >= 70 && (choice?.risk || 0) < 100;
}

function roll2d6() {
  const d1 = Math.floor(Math.random() * 6) + 1;
  const d2 = Math.floor(Math.random() * 6) + 1;
  return { d1, d2, total: d1 + d2 };
}

function rollTarget(choice) {
  const risk = choice?.risk || 0;
  if (risk >= 85) return 9;
  if (risk >= 70) return 8;
  return 7;
}

function rollModifier(choice, stats = {}) {
  let mod = 0;
  if ((choice?.effects?.witness || 0) > 0 && stats.witness >= 6) mod += 1;
  if ((choice?.effects?.endurance || 0) < 0 && stats.endurance >= 8) mod += 1;
  if (stats.panic >= 9) mod -= 1;
  if (stats.panic >= 12) mod -= 1;
  return mod;
}

function failureEffects(choice) {
  return {
    endurance: choice?.failEffects?.endurance ?? -1,
    panic: choice?.failEffects?.panic ?? 2,
    witness: choice?.failEffects?.witness ?? -1,
  };
}

function makeRoll(choice, stats) {
  const dice = roll2d6();
  const target = rollTarget(choice);
  const modifier = rollModifier(choice, stats);
  const score = dice.total + modifier;
  return {
    ...dice,
    target,
    modifier,
    score,
    success: score >= target,
  };
}

window.NW_ROLL = {
  isRollChoice,
  roll2d6,
  target: rollTarget,
  modifier: rollModifier,
  failureEffects,
  makeRoll,
};
