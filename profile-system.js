const TESTIMONY_TYPES = {
  obedience: {
    title: "두려움 속의 순종자",
    text: "당신은 모든 것을 이해해서 움직인 사람이 아니다. 그러나 떨림 속에서도 주어진 말씀과 표식 앞에 몸을 맞추는 쪽을 선택했다.",
  },
  witness: {
    title: "해방의 증언자",
    text: "당신은 사건을 단순한 생존으로만 넘기지 않았다. 본 것을 마음에 새기고, 그 의미를 언어로 남기려는 방향을 택했다.",
  },
  survival: {
    title: "상처 입은 생존자",
    text: "당신은 먼저 살아남아야 했다. 그 선택은 비겁함만이 아니라, 오래 억압받은 사람이 몸으로 배운 현실적인 지혜이기도 했다.",
  },
  fear: {
    title: "공포에 흔들린 사람",
    text: "당신의 선택은 자주 두려움에 끌려갔다. 그러나 그 두려움은 단순한 약함이 아니라, 노예의 시간 속에서 새겨진 상처의 흔적이었다.",
  },
  resistance: {
    title: "무모한 저항자",
    text: "당신은 불의 앞에서 쉽게 침묵하지 않았다. 다만 분노가 앞설 때, 용기와 무모함의 경계가 흐려지기도 했다.",
  },
  avoidance: {
    title: "피하려는 생존자",
    text: "당신은 위험을 피하고 익숙한 안전을 찾으려 했다. 그러나 해방의 길은 때로 안전해 보이는 곳을 떠나는 결단을 요구했다.",
  },
};

function defaultProfile() {
  return {
    obedience: 0,
    witness: 0,
    survival: 0,
    fear: 0,
    resistance: 0,
    avoidance: 0,
  };
}

function applyProfileEffect(currentProfile = defaultProfile(), effect = {}) {
  const next = { ...defaultProfile(), ...currentProfile };
  Object.entries(effect || {}).forEach(([key, value]) => {
    next[key] = (next[key] || 0) + value;
  });
  return next;
}

function getTestimonyType(profile = defaultProfile()) {
  const entries = Object.entries({ ...defaultProfile(), ...profile }).sort((a, b) => b[1] - a[1]);
  const [key, value] = entries[0];

  if (!value) {
    return {
      title: "아직 이름 붙지 않은 걸음",
      text: "당신의 선택은 아직 뚜렷한 한 방향으로 굳어지지 않았다. 그러나 그 모호함도 억압의 시간을 통과하는 한 방식이었다.",
    };
  }

  return TESTIMONY_TYPES[key] || TESTIMONY_TYPES.survival;
}

function allTestimonyTypeTitles() {
  return Object.values(TESTIMONY_TYPES).map((type) => type.title);
}

window.NW_PROFILE = {
  defaultProfile,
  apply: applyProfileEffect,
  getType: getTestimonyType,
  allTitles: allTestimonyTypeTitles,
  types: TESTIMONY_TYPES,
};
