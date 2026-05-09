export const gameTitle = "이름 없는 증인들";
export const gameSubtitle = "성경 세계관 텍스트 로그라이크";

export const endings = {
  trueWitness: {
    title: "해방의 증인",
    text: "당신은 바다 사이를 걸었다. 제국은 당신의 몸을 부렸지만, 당신의 마지막 말까지 소유하지는 못했다. 당신은 그 밤을 살아남았고, 그 사건을 증언으로 남겼다.",
  },
  survivor: {
    title: "살아남은 자",
    text: "당신은 바다를 건넜다. 그러나 아직 그 밤의 의미를 다 알지는 못한다. 생존은 끝이 아니라, 해방을 배워가는 긴 시작이었다.",
  },
  terror: {
    title: "공포에 붙잡힌 자",
    text: "당신은 애굽을 떠났지만, 애굽의 공포는 당신을 놓아주지 않았다. 자유의 길은 열렸으나, 마음은 아직 닫힌 문 앞에 서 있었다.",
  },
  collapse: {
    title: "무너진 자",
    text: "채찍과 밤과 도망의 무게를 몸이 견디지 못했다. 해방의 소문은 가까이 있었지만, 당신은 그 길 위에 끝까지 서지 못했다.",
  },
  silent: {
    title: "침묵한 생존자",
    text: "당신은 모든 것을 보았다. 그러나 그것을 말로 남기지 못했다. 바다는 갈라졌지만, 당신 안의 언어는 아직 열리지 않았다.",
  },
};

const exodusScenes = [
  {
    id: "brick_pit",
    title: "벽돌 굽는 날",
    image: "brick",
    text: "새벽이 오기 전, 당신은 진흙 구덩이에 발을 넣는다. 짚은 부족하고, 감독관은 오늘도 같은 수량의 벽돌을 요구한다. 누군가 쓰러졌지만 아무도 오래 바라보지 못한다.",
    choices: [
      { label: "할당량을 채우기 위해 이를 악문다", effects: { endurance: -2, panic: 1 }, log: "당신은 손이 갈라질 때까지 벽돌을 찍었다." },
      { label: "쓰러진 동료를 일으킨다", effects: { endurance: -3, witness: 2 }, log: "당신은 잠시 멈췄다. 채찍보다 먼저 보인 것은 사람의 얼굴이었다." },
      { label: "감독관의 눈을 피해 숨을 고른다", effects: { endurance: 1, panic: 1 }, log: "당신은 살아남기 위해 몸을 낮췄다. 그러나 두려움도 함께 몸을 낮췄다." },
    ],
  },
  {
    id: "rumor_moses",
    title: "모세라는 이름",
    image: "staff",
    text: "일이 끝난 뒤, 장로들 사이에서 한 이름이 돈다. 모세. 그는 바로에게 가서 우리를 보내라고 말했다고 한다. 그러나 다음 날부터 짚은 주어지지 않았다.",
    choices: [
      { label: "모세 때문에 고통이 커졌다고 원망한다", effects: { panic: 2, witness: -1 }, log: "해방이라는 말은 그날 당신에게 채찍처럼 들렸다." },
      { label: "그 이름을 마음에 담아둔다", effects: { witness: 2, panic: 1 }, log: "확신은 없었지만, 당신은 모세라는 이름을 잊지 않기로 했다." },
      { label: "아무 말도 믿지 않고 하루만 버틴다", effects: { endurance: 1, witness: -1 }, log: "당신은 내일의 벽돌만 생각했다. 살아남는 것 외에는 너무 멀었다." },
    ],
  },
  {
    id: "plagues",
    title: "재앙의 땅",
    image: "plague",
    text: "나일은 피처럼 붉어지고, 어둠이 대낮을 삼킨다. 애굽의 신들은 하나씩 침묵한다. 그러나 노예의 집에도 두려움은 들어온다.",
    choices: [
      { label: "강하던 자들의 두려움을 지켜본다", effects: { witness: 2, panic: 1 }, log: "당신은 처음으로 제국도 떨 수 있다는 사실을 보았다." },
      { label: "집 안에 머물며 재앙이 지나가기만 기다린다", effects: { panic: -1, endurance: 1 }, log: "당신은 문을 닫았다. 살아남는 일도 때로는 선택이었다." },
      { label: "이 일이 우연이 아니라고 생각한다", effects: { witness: 3, panic: -1 }, log: "재앙은 혼돈이 아니라 누군가의 선언처럼 느껴졌다." },
    ],
  },
  {
    id: "passover",
    title: "문설주의 피",
    image: "door",
    text: "그 밤, 말씀은 구체적이었다. 어린 양, 피, 문설주, 허리에 띤 띠, 발의 신, 손의 지팡이. 해방은 감정이 아니라 순종의 자세로 다가왔다.",
    choices: [
      { label: "문설주에 피를 바른다", effects: { witness: 3, panic: -1 }, log: "붉은 표식이 문 위에서 마르기 시작했다." },
      { label: "밤새 문 앞에서 떨며 지킨다", effects: { panic: 2, endurance: -1 }, log: "당신은 살아 있는 모든 소리에 놀랐다." },
      { label: "신을 신고 지팡이를 든 채 기다린다", effects: { witness: 2, endurance: -1 }, log: "아직 떠나지 않았지만, 당신의 몸은 이미 출발의 자세를 배웠다." },
    ],
  },
  {
    id: "flight",
    title: "급히 떠나는 새벽",
    image: "desert",
    text: "울음소리와 외침이 애굽을 가른다. 당신은 아직 부풀지 않은 반죽을 들고 집을 나선다. 자유는 노래보다 먼저 혼란의 발걸음으로 왔다.",
    choices: [
      { label: "뒤돌아보지 않고 행렬을 따라간다", effects: { endurance: -1, witness: 1 }, log: "당신은 익숙한 노예의 길을 버리고 낯선 길에 발을 올렸다." },
      { label: "망설이는 이들을 기다리다 늦어진다", effects: { endurance: -2, witness: 2, panic: 1 }, log: "당신은 혼자 빠르게 사는 길보다 함께 늦게 걷는 길을 택했다." },
      { label: "애굽에 두고 온 것들을 떠올린다", effects: { panic: 2, witness: -1 }, log: "이상하게도 고통의 땅도 떠날 때는 미련처럼 따라왔다." },
    ],
  },
  {
    id: "red_sea",
    title: "바다 앞에서",
    image: "sea",
    text: "뒤에서는 병거 소리가 가까워진다. 앞에는 바다가 있다. 사람들은 모세를 원망하고, 아이들은 울고, 밤바람은 소금 냄새를 실어온다.",
    choices: [
      { label: "원망하는 무리에 섞인다", effects: { panic: 3, witness: -2 }, log: "입술은 자유를 원했지만, 마음은 애굽의 무덤을 떠올렸다." },
      { label: "가만히 서서 바다를 바라본다", effects: { panic: -1, witness: 2 }, log: "할 수 있는 일이 없을 때, 당신은 처음으로 보는 일을 배웠다." },
      { label: "유월절 밤을 다시 떠올린다", effects: { witness: 3, panic: -1 }, log: "문설주의 피와 새벽의 외침이 바다 앞에서 하나로 이어졌다." },
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
    tone: "억압, 두려움, 해방, 증언",
    goal: "홍해 도하까지 살아남아, 해방의 사건을 증언으로 남기는 것",
    stats: { endurance: 10, panic: 5, witness: 0 },
    scenes: exodusScenes,
    complete: true,
  },
  {
    id: "everyone-right",
    title: "각기 옳은 대로",
    subtitle: "사사시대 무너진 마을의 생존 이야기",
    reference: "사사기 순환 구조 모티프",
    tone: "무질서, 약탈, 타협, 부르짖음",
    goal: "무너진 시대 속에서 부르짖음에 이르는 것",
    stats: { endurance: 9, panic: 6, witness: 0 },
    prototypeText: "왕은 없고, 마을마다 자기 소견이 법이 되었다. 당신은 산지 마을의 이름 없는 사람으로, 약탈과 우상과 생존 사이에서 하루를 버틴다.",
    complete: false,
  },
  {
    id: "decree-hand",
    title: "금령을 쓴 손",
    subtitle: "다니엘을 죽이는 법령을 베껴 쓰는 궁정 서기관 이야기",
    reference: "다니엘 6장 모티프",
    tone: "관료제, 음모, 양심, 새벽",
    goal: "사자굴의 새벽을 목격하고 침묵할지 증언할지 선택하는 것",
    stats: { endurance: 8, panic: 5, witness: 0 },
    prototypeText: "당신은 페르시아 궁정의 서기관이다. 오늘 베껴 쓴 문서가 한 의인을 사자굴로 밀어 넣을 수 있다는 사실을 뒤늦게 깨닫는다.",
    complete: false,
  },
  {
    id: "scarlet-cord",
    title: "붉은 줄 아래",
    subtitle: "여리고 성 안에서 라합의 붉은 줄을 본 이웃 이야기",
    reference: "여호수아 2장, 6장 모티프",
    tone: "소문, 공포, 성벽, 피난",
    goal: "무너지는 성 안에서 어떤 표징 아래 설지 결정하는 것",
    stats: { endurance: 9, panic: 7, witness: 0 },
    prototypeText: "성 안에는 소문이 돈다. 요단이 갈라졌고, 이스라엘이 가까이 왔다. 당신은 라합의 창에 걸린 붉은 줄을 본다.",
    complete: false,
  },
  {
    id: "laid-down-spear",
    title: "창을 내려놓은 자",
    subtitle: "십자가 아래에서 예수의 죽음을 목격한 로마 병사 이야기",
    reference: "마가복음 15장 모티프",
    tone: "폭력, 명령, 어둠, 고백",
    goal: "처형의 현장에서 고백의 가능성 앞에 서는 것",
    stats: { endurance: 10, panic: 4, witness: 0 },
    prototypeText: "당신은 로마 병사다. 오늘의 처형은 그저 또 하나의 명령이라고 믿었다. 그러나 정오의 어둠이 모든 것을 바꾸기 시작한다.",
    complete: false,
  },
  {
    id: "burning-road",
    title: "마음이 뜨겁던 길",
    subtitle: "엠마오 길의 이름 없는 동행자 이야기",
    reference: "누가복음 24장 모티프",
    tone: "상실, 말씀, 식탁, 귀환",
    goal: "상실의 길에서 말씀을 듣고 다시 돌아갈 힘을 얻는 것",
    stats: { endurance: 8, panic: 3, witness: 0 },
    prototypeText: "예루살렘을 떠나는 길, 당신은 실망한 이들과 함께 걷는다. 한 낯선 사람이 말씀을 풀어주기 전까지, 길은 끝난 이야기처럼 보였다.",
    complete: false,
  },
  {
    id: "patmos-waves",
    title: "밧모의 파도",
    subtitle: "제국의 끝 섬에서 요한의 환상을 곁에서 본 감시병 이야기",
    reference: "요한계시록 1장 모티프",
    tone: "제국, 유배, 환상, 소망",
    goal: "제국의 감시자 자리에서 환상의 증인이 되는 것",
    stats: { endurance: 9, panic: 5, witness: 0 },
    prototypeText: "제국은 늙은 증인을 섬에 가두었다. 그러나 어느 주의 날, 바다보다 넓은 음성이 섬의 침묵을 찢는다.",
    complete: false,
  },
];

export function evaluateEnding(stats) {
  if (stats.endurance <= 0) return endings.collapse;
  if (stats.panic >= 12) return endings.terror;
  if (stats.witness >= 10 && stats.panic <= 7) return endings.trueWitness;
  if (stats.witness <= 3) return endings.silent;
  return endings.survivor;
}

export const statLabels = {
  endurance: "생존",
  panic: "공포",
  witness: "증언",
};
