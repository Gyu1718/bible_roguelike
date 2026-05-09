export const gameTitle = "이름 없는 증인들";
export const gameSubtitle = "성경 세계관 텍스트 로그라이크";

export const endings = {
  witness: {
    title: "해방의 증인",
    text: "당신은 바다 사이를 걸었다. 벽돌을 굽던 발은 이제 제국의 흙이 아니라 약속의 길을 밟는다.",
  },
  survivor: {
    title: "원망 속의 생존자",
    text: "당신은 살아남았다. 그러나 바다를 건넌 뒤에도, 마음속에는 아직 애굽의 채찍 소리가 남아 있다.",
  },
  family: {
    title: "가족을 건넨 자",
    text: "당신은 끝까지 가족의 손을 놓지 않았다. 바다보다 먼저 갈라진 것은 두려움이었다.",
  },
  broken: {
    title: "무너진 노예",
    text: "몸은 버텼지만 마음은 버티지 못했다. 해방의 소문은 들렸으나, 당신은 그 길 앞에서 쓰러졌다.",
  },
  afraid: {
    title: "두려움에 묶인 자",
    text: "당신은 출발했지만 마음은 애굽에 남았다. 자유는 길이 아니라, 그것을 받아들이는 마음에서 시작되었다.",
  },
};

const exodusScenes = [
  {
    id: "brick_pit",
    title: "벽돌 굽는 날",
    image: "brick",
    text: "새벽이 오기 전, 당신은 진흙 구덩이에 발을 넣는다. 짚은 부족하고, 감독관은 오늘도 같은 수량의 벽돌을 요구한다. 누군가 쓰러졌지만 아무도 오래 바라보지 못한다.",
    choices: [
      { label: "할당량을 채우기 위해 무리한다", effects: { body: -2, fear: 1, hope: -1 }, log: "당신은 손이 갈라질 때까지 벽돌을 찍었다." },
      { label: "지친 동료의 몫을 조금 돕는다", effects: { body: -3, community: 2, hope: 1 }, log: "동료는 아무 말 없이 고개를 숙였다. 그것이 감사였다." },
      { label: "남은 빵을 가족에게 남긴다", effects: { body: -1, family: 2 }, log: "당신은 배고픔을 삼키고 빵 조각을 품에 넣었다." },
    ],
  },
  {
    id: "rumor_moses",
    title: "모세라는 이름",
    image: "staff",
    text: "일이 끝난 뒤, 장로들 사이에서 한 이름이 돈다. 모세. 그는 바로에게 가서 우리를 보내라고 말했다고 한다. 그러나 다음 날부터 짚은 주어지지 않았다.",
    choices: [
      { label: "모세를 원망한다", effects: { hope: -2, fear: 1, community: -1 }, log: "당신은 처음으로 해방의 말이 고통을 더할 수도 있음을 배웠다." },
      { label: "장로들의 말을 더 들어본다", effects: { memory: 1, hope: 1, fear: 1 }, log: "확신은 없었지만, 당신은 그 이름을 마음에 담아두었다." },
      { label: "가족에게 조용히 준비하자고 말한다", effects: { family: 1, hope: 1 }, log: "가족은 당신을 보았다. 믿음보다 두려움이 먼저 대답했다." },
    ],
  },
  {
    id: "plagues",
    title: "재앙의 땅",
    image: "plague",
    text: "나일은 피처럼 붉어지고, 어둠이 대낮을 삼킨다. 애굽의 신들은 하나씩 침묵한다. 그러나 노예의 집에도 두려움은 들어온다.",
    choices: [
      { label: "애굽인 이웃의 두려움을 지켜본다", effects: { memory: 1, fear: 1 }, log: "강하던 자들의 얼굴에도 공포가 있었다." },
      { label: "아이들을 집 안에 머물게 한다", effects: { family: 2, body: -1 }, log: "당신은 문틈을 막고 아이들의 숨소리를 세었다." },
      { label: "이 모든 일을 마음에 새긴다", effects: { hope: 2, memory: 2 }, log: "재앙은 혼돈이 아니라 누군가의 선언처럼 느껴졌다." },
    ],
  },
  {
    id: "passover",
    title: "문설주의 피",
    image: "door",
    text: "그 밤, 말씀은 구체적이었다. 어린 양, 피, 문설주, 허리에 띤 띠, 발의 신, 손의 지팡이. 해방은 감정이 아니라 순종의 자세로 다가왔다.",
    choices: [
      { label: "문설주에 피를 바른다", effects: { hope: 2, fear: -1, memory: 2 }, log: "붉은 표식이 문 위에서 마르기 시작했다." },
      { label: "가족을 집 안으로 모은다", effects: { family: 3, community: 1 }, log: "당신은 한 사람씩 이름을 불러 집 안으로 들였다." },
      { label: "이웃에게 마지막으로 경고한다", effects: { community: 2, fear: 1, body: -1 }, log: "몇몇은 비웃었고, 몇몇은 문을 열었다." },
    ],
  },
  {
    id: "flight",
    title: "급히 떠나는 새벽",
    image: "desert",
    text: "울음소리와 외침이 애굽을 가른다. 당신은 아직 부풀지 않은 반죽을 들고 집을 나선다. 자유는 노래보다 먼저 혼란의 발걸음으로 왔다.",
    choices: [
      { label: "짐보다 가족을 먼저 챙긴다", effects: { family: 2, supplies: -1, hope: 1 }, log: "당신은 남길 것을 남기고, 잡을 손을 잡았다." },
      { label: "가능한 많은 양식을 챙긴다", effects: { supplies: 2, body: -1 }, log: "당신은 등에 멜 수 있는 만큼의 빵과 물을 챙겼다." },
      { label: "공동체 뒤처진 이들을 기다린다", effects: { community: 2, fear: 1 }, log: "기다림은 위험했지만, 혼자 사는 자유는 자유가 아니었다." },
    ],
  },
  {
    id: "red_sea",
    title: "바다 앞에서",
    image: "sea",
    text: "뒤에서는 병거 소리가 가까워진다. 앞에는 바다가 있다. 사람들은 모세를 원망하고, 아이들은 울고, 밤바람은 소금 냄새를 실어온다.",
    choices: [
      { label: "가족의 손을 잡고 기다린다", effects: { family: 2, fear: -1, hope: 1 }, log: "당신은 도망칠 길 대신 붙잡을 손을 택했다." },
      { label: "원망하는 무리에 선다", effects: { fear: 2, hope: -2, community: -1 }, log: "입술은 자유를 원했지만, 마음은 애굽의 무덤을 떠올렸다." },
      { label: "아이들에게 유월절 밤을 기억하라고 말한다", effects: { memory: 2, hope: 2, fear: -1 }, log: "당신의 목소리는 떨렸지만, 아이들은 들었다." },
    ],
  },
  {
    id: "crossing",
    title: "벽돌 굽던 발이 바다 사이를 걷다",
    image: "crossing",
    text: "모세가 지팡이를 든다. 밤새 바람이 분다. 바다가 물러난다. 당신은 진흙과 벽돌만 알던 발로, 물벽 사이의 마른 길을 밟는다.",
    final: true,
  },
];

export const chapters = [
  {
    id: "brick-and-sea",
    title: "벽돌과 바다",
    subtitle: "핍박받던 히브리 노예가 출애굽을 경험하는 이야기",
    reference: "출애굽기 1–14장 모티프",
    tone: "억압, 두려움, 해방, 기억",
    stats: { body: 10, fear: 5, hope: 2, family: 5, community: 3, memory: 0, supplies: 2 },
    scenes: exodusScenes,
    complete: true,
  },
  {
    id: "everyone-right",
    title: "각기 옳은 대로",
    subtitle: "사사시대 무너진 마을의 생존 이야기",
    reference: "사사기 순환 구조 모티프",
    tone: "무질서, 약탈, 타협, 부르짖음",
    stats: { body: 9, fear: 6, hope: 1, family: 4, community: 2, memory: 0, supplies: 3 },
    prototypeText: "왕은 없고, 마을마다 자기 소견이 법이 되었다. 당신은 산지 마을의 이름 없는 사람으로, 약탈과 우상과 생존 사이에서 하루를 버틴다.",
    complete: false,
  },
  {
    id: "decree-hand",
    title: "금령을 쓴 손",
    subtitle: "다니엘을 죽이는 법령을 베껴 쓰는 궁정 서기관 이야기",
    reference: "다니엘 6장 모티프",
    tone: "관료제, 음모, 양심, 새벽",
    stats: { body: 8, fear: 5, hope: 2, family: 3, community: 2, memory: 1, supplies: 1 },
    prototypeText: "당신은 페르시아 궁정의 서기관이다. 오늘 베껴 쓴 문서가 한 의인을 사자굴로 밀어 넣을 수 있다는 사실을 뒤늦게 깨닫는다.",
    complete: false,
  },
  {
    id: "scarlet-cord",
    title: "붉은 줄 아래",
    subtitle: "여리고 성 안에서 라합의 붉은 줄을 본 이웃 이야기",
    reference: "여호수아 2장, 6장 모티프",
    tone: "소문, 공포, 성벽, 피난",
    stats: { body: 9, fear: 7, hope: 1, family: 5, community: 2, memory: 0, supplies: 2 },
    prototypeText: "성 안에는 소문이 돈다. 요단이 갈라졌고, 이스라엘이 가까이 왔다. 당신은 라합의 창에 걸린 붉은 줄을 본다.",
    complete: false,
  },
  {
    id: "laid-down-spear",
    title: "창을 내려놓은 자",
    subtitle: "십자가 아래에서 예수의 죽음을 목격한 로마 병사 이야기",
    reference: "마가복음 15장 모티프",
    tone: "폭력, 명령, 어둠, 고백",
    stats: { body: 10, fear: 4, hope: 0, family: 2, community: 1, memory: 2, supplies: 0 },
    prototypeText: "당신은 로마 병사다. 오늘의 처형은 그저 또 하나의 명령이라고 믿었다. 그러나 정오의 어둠이 모든 것을 바꾸기 시작한다.",
    complete: false,
  },
  {
    id: "burning-road",
    title: "마음이 뜨겁던 길",
    subtitle: "엠마오 길의 이름 없는 동행자 이야기",
    reference: "누가복음 24장 모티프",
    tone: "상실, 말씀, 식탁, 귀환",
    stats: { body: 8, fear: 3, hope: 1, family: 2, community: 3, memory: 2, supplies: 1 },
    prototypeText: "예루살렘을 떠나는 길, 당신은 실망한 이들과 함께 걷는다. 한 낯선 사람이 말씀을 풀어주기 전까지, 길은 끝난 이야기처럼 보였다.",
    complete: false,
  },
  {
    id: "patmos-waves",
    title: "밧모의 파도",
    subtitle: "제국의 끝 섬에서 요한의 환상을 곁에서 본 감시병 이야기",
    reference: "요한계시록 1장 모티프",
    tone: "제국, 유배, 환상, 소망",
    stats: { body: 9, fear: 5, hope: 1, family: 1, community: 2, memory: 3, supplies: 2 },
    prototypeText: "제국은 늙은 증인을 섬에 가두었다. 그러나 어느 주의 날, 바다보다 넓은 음성이 섬의 침묵을 찢는다.",
    complete: false,
  },
];

export function evaluateEnding(stats) {
  if (stats.body <= 0 || stats.fear >= 12) return endings.broken;
  if (stats.family >= 9) return endings.family;
  if (stats.hope + stats.memory >= 9) return endings.witness;
  if (stats.fear > stats.hope + 4) return endings.afraid;
  return endings.survivor;
}

export const statLabels = {
  body: "몸",
  fear: "두려움",
  hope: "소망",
  family: "가족",
  community: "공동체",
  memory: "기억",
  supplies: "양식",
};
