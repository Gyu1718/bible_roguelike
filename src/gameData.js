export const gameTitle = "이름 없는 증인들";
export const gameSubtitle = "성경 세계관 선택지형 로그라이크";

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
  rebellionCrushed: {
    title: "채찍 아래의 반란",
    text: "당신은 감독관에게 달려들었다. 분노는 정당했지만, 그날의 힘은 당신 편이 아니었다. 제국은 당신의 분노를 빌미로 더 많은 등을 찢었다.",
  },
  informer: {
    title: "밀고자의 밤",
    text: "당신은 모세의 소문을 감독관에게 넘겼다. 그날 밤, 노예들의 집에는 더 긴 침묵이 내려앉았다. 살아남았지만, 당신의 이름은 누구의 증언에도 남지 않았다.",
  },
  egyptianShelter: {
    title: "남의 문 아래 숨은 자",
    text: "당신은 애굽인의 집으로 숨어들었다. 익숙한 권력 곁이면 안전할 줄 알았다. 그러나 그 밤, 남의 문은 당신을 지켜주지 못했다.",
  },
  unmarkedDoor: {
    title: "표식 없는 문",
    text: "당신은 피를 바르지 않았다. 그 밤이 지나간 뒤, 집 안의 침묵은 다시는 이전의 침묵이 아니었다. 말씀을 판단 대상으로만 남겨둔 대가는 너무 무거웠다.",
  },
  leftHouse: {
    title: "문밖의 밤",
    text: "당신은 불안을 견디지 못하고 문밖으로 나갔다. 밤은 이미 지나가고 있었고, 당신은 표식 아래 머무르라는 말의 무게를 너무 늦게 이해했다.",
  },
  returnEgypt: {
    title: "돌아간 발걸음",
    text: "병거 소리가 가까워지자 당신은 행렬을 벗어나 애굽 쪽으로 달렸다. 그러나 노예의 땅은 도망자를 품어주지 않았다. 뒤돌아간 발은 자유의 길을 보지 못했다.",
  },
  chariotRush: {
    title: "병거 앞으로 달려간 자",
    text: "당신은 공포를 이기기 위해 앞으로 달렸다. 그러나 애굽의 병거는 개인의 용기로 막을 수 있는 것이 아니었다. 무모함은 용기가 아니었다.",
  },
  drownedFear: {
    title: "먼저 뛰어든 자",
    text: "당신은 기다리지 못하고 어둠 속 바다로 뛰어들었다. 두려움은 때로 용기처럼 위장한다. 그러나 길은 열리기 전에 붙잡을 수 있는 것이 아니었다.",
  },
};

const exodusScenes = [
  {
    id: "brick_pit",
    title: "벽돌 굽는 날",
    image: "brick",
    text: "새벽이 오기 전, 당신은 진흙 구덩이에 발을 넣는다. 짚은 부족하고, 감독관은 오늘도 같은 수량의 벽돌을 요구한다. 누군가 쓰러졌지만 아무도 오래 바라보지 못한다.",
    choices: [
      {
        label: "할당량을 채우기 위해 이를 악문다",
        effects: { endurance: -2, panic: 1 },
        feedbackTitle: "몸은 버텼지만 마음은 굳어졌다",
        feedback: "당신은 손이 갈라질 때까지 벽돌을 찍었다. 살아남는 법은 배웠지만, 사람을 보는 눈은 조금 흐려졌다.",
      },
      {
        label: "쓰러진 동료를 일으킨다",
        effects: { endurance: -3, witness: 2 },
        feedbackTitle: "채찍보다 먼저 보인 얼굴",
        feedback: "당신은 잠시 멈췄다. 그 선택은 당신의 몸을 더 지치게 했지만, 훗날 증언이 될 기억 하나를 남겼다.",
      },
      {
        label: "감독관의 눈을 피해 숨을 고른다",
        effects: { endurance: 1, panic: 1 },
        feedbackTitle: "숨은 고르지만 공포도 자란다",
        feedback: "당신은 살아남기 위해 몸을 낮췄다. 그러나 숨어 있는 동안 두려움도 함께 자리를 잡았다.",
      },
    ],
  },
  {
    id: "overseer_beating",
    title: "채찍 소리",
    image: "brick",
    text: "정오가 가까워질 때, 감독관이 노인을 끌어낸다. 그는 오늘 몫을 채우지 못했다. 사람들은 고개를 숙이고, 채찍은 이미 올라가 있다.",
    choices: [
      {
        label: "고개를 숙이고 살아남는다",
        effects: { endurance: 1, panic: 2, witness: -1 },
        feedbackTitle: "살아남았지만 장면이 남았다",
        feedback: "당신은 눈을 내렸다. 몸은 안전했지만, 채찍 소리는 마음 안쪽에 더 오래 남았다.",
      },
      {
        label: "노인을 대신해 한 걸음 나선다",
        effects: { endurance: -3, witness: 3, panic: 1 },
        feedbackTitle: "한 걸음의 대가",
        feedback: "당신은 맞을 것을 알면서도 한 걸음 나섰다. 제국은 그것을 어리석음이라 불렀지만, 당신은 그 얼굴을 잊지 않았다.",
      },
      {
        label: "감독관에게 달려든다",
        badEnding: "rebellionCrushed",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "분노는 정당했다. 그러나 지금 이 자리의 반란은 공동체 전체를 더 위험하게 만들었다.",
      },
    ],
  },
  {
    id: "straw_decree",
    title: "짚 없는 명령",
    image: "brick",
    text: "다음 날, 짚은 주어지지 않았다. 그러나 벽돌 수량은 그대로였다. 사람들은 모세의 이름을 원망하기 시작하고, 장로들의 얼굴은 굳어간다.",
    choices: [
      {
        label: "모세 때문에 고통이 커졌다고 원망한다",
        effects: { panic: 2, witness: -1 },
        feedbackTitle: "해방의 말이 채찍처럼 들렸다",
        feedback: "당신의 원망은 이해할 만했다. 그러나 원망은 고통을 설명해주어도, 길을 열어주지는 못했다.",
      },
      {
        label: "그 이름을 마음에 담아둔다",
        effects: { witness: 2, panic: 1 },
        feedbackTitle: "아직 믿음은 아니지만 기억이 되었다",
        feedback: "확신은 없었다. 그래도 당신은 모세라는 이름을 지우지 않았다. 증언은 때로 작은 기억에서 시작된다.",
      },
      {
        label: "그 소문을 감독관에게 알린다",
        badEnding: "informer",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 위험을 피하려고 소문을 넘겼다. 하지만 그 선택은 공동체의 밤을 더 어둡게 만들었다.",
      },
    ],
  },
  {
    id: "night_whisper",
    title: "밤의 속삭임",
    image: "staff",
    text: "밤이 되자 장로들이 낮은 목소리로 말한다. ‘여호와께서 우리를 돌보셨다.’ 누군가는 울고, 누군가는 비웃는다. 당신도 아직 무엇을 믿어야 할지 모른다.",
    choices: [
      {
        label: "듣기만 하고 판단을 미룬다",
        effects: { witness: 1, panic: -1 },
        feedbackTitle: "성급한 판단을 멈추다",
        feedback: "당신은 대답하지 않았다. 그러나 듣는 일을 멈추지도 않았다. 어떤 증언은 침묵 속에서 자란다.",
      },
      {
        label: "장로들의 말을 조심스럽게 되묻는다",
        effects: { witness: 2, endurance: -1 },
        feedbackTitle: "질문은 남았다",
        feedback: "당신은 믿는다고 말하지 못했다. 하지만 질문했다. 그 질문은 무너짐이 아니라 길을 찾는 움직임이었다.",
      },
      {
        label: "모두 헛소리라며 자리를 박차고 나간다",
        effects: { panic: 2, witness: -2 },
        feedbackTitle: "비웃음은 방패가 되지 못했다",
        feedback: "당신은 웃으며 자리를 떴다. 그러나 웃음은 오래가지 않았다. 두려움은 조롱 뒤에 숨어 있었다.",
      },
    ],
  },
  {
    id: "blood_nile",
    title: "피처럼 변한 강",
    image: "plague",
    text: "나일이 붉게 변했다는 소식이 퍼진다. 애굽인들이 강가에 모여 소리친다. 당신은 그들이 처음으로 자기 신들을 의심하는 얼굴을 본다.",
    choices: [
      {
        label: "강하던 자들의 두려움을 지켜본다",
        effects: { witness: 2, panic: 1 },
        feedbackTitle: "제국도 떨 수 있다",
        feedback: "당신은 처음으로 강한 자들의 얼굴에서 공포를 보았다. 세상은 생각보다 단단하지 않았다.",
      },
      {
        label: "집 안으로 돌아가 문을 닫는다",
        effects: { panic: -1, endurance: 1 },
        feedbackTitle: "살아남는 일도 선택이다",
        feedback: "당신은 문을 닫았다. 비겁함만은 아니었다. 어떤 날은 해석보다 생존이 먼저다.",
      },
      {
        label: "이 일이 우연이 아니라고 생각한다",
        effects: { witness: 3, panic: -1 },
        feedbackTitle: "혼돈이 아니라 선언처럼 보였다",
        feedback: "재앙은 무작위의 공포가 아니었다. 당신은 그 안에서 누군가의 뜻이 움직이고 있음을 어렴풋이 느꼈다.",
      },
    ],
  },
  {
    id: "darkness",
    title: "어둠의 사흘",
    image: "plague",
    text: "낮인데도 어둠이 내려앉는다. 애굽의 집들은 숨죽이고, 사람들은 벽을 더듬는다. 그러나 히브리인의 집마다 희미한 빛과 속삭임이 남아 있다.",
    choices: [
      {
        label: "어둠 속에서 본 일을 마음에 새긴다",
        effects: { witness: 3, panic: -1 },
        feedbackTitle: "어둠 속의 구별",
        feedback: "당신은 빛을 설명하지 못했다. 그러나 그 구별을 보았다. 훗날 증언은 설명보다 목격에서 시작될 것이다.",
      },
      {
        label: "공포에 눌려 아무 말도 하지 않는다",
        effects: { panic: 2, witness: -1 },
        feedbackTitle: "침묵이 깊어진다",
        feedback: "말하지 않는다고 공포가 사라지지는 않았다. 침묵은 때로 두려움의 방이 되었다.",
      },
      {
        label: "애굽인의 집으로 숨어들어 보호를 구한다",
        badEnding: "egyptianShelter",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 권력 곁이 안전하다고 생각했다. 그러나 그 밤의 안전은 권력의 지붕 아래 있지 않았다.",
      },
    ],
  },
  {
    id: "passover_prep",
    title: "어린 양을 고르는 날",
    image: "door",
    text: "집마다 어린 양을 고른다. 누군가는 손을 떨고, 누군가는 왜 이런 일을 해야 하느냐고 묻는다. 당신도 아직 그 의미를 다 알지 못한다.",
    choices: [
      {
        label: "말씀대로 준비를 돕는다",
        effects: { witness: 2, endurance: -1 },
        feedbackTitle: "이해보다 먼저 온 순종",
        feedback: "당신은 다 이해하지 못했다. 그러나 준비했다. 때로 길은 납득한 뒤가 아니라 따르는 동안 열린다.",
      },
      {
        label: "의미를 묻고 어른들의 설명을 듣는다",
        effects: { witness: 2, panic: -1 },
        feedbackTitle: "질문이 기억을 만든다",
        feedback: "당신의 질문은 불신만이 아니었다. 누군가의 대답은 그 밤을 기억으로 바꾸기 시작했다.",
      },
      {
        label: "준비를 거부하고 혼자 버티겠다고 말한다",
        effects: { panic: 2, witness: -2 },
        feedbackTitle: "혼자 버티는 마음",
        feedback: "당신은 홀로 서고 싶었다. 그러나 그 밤은 개인의 용기만으로 통과하는 밤이 아니었다.",
      },
    ],
  },
  {
    id: "passover_night",
    title: "문설주의 피",
    image: "door",
    text: "그 밤, 말씀은 구체적이었다. 어린 양, 피, 문설주, 허리에 띤 띠, 발의 신, 손의 지팡이. 해방은 감정이 아니라 순종의 자세로 다가왔다.",
    choices: [
      {
        label: "문설주에 피를 바른다",
        effects: { witness: 3, panic: -1 },
        feedbackTitle: "표식은 말보다 먼저 남았다",
        feedback: "붉은 표식이 문 위에서 마르기 시작했다. 당신은 그 의미를 다 알지 못했지만, 말씀을 몸으로 따랐다.",
      },
      {
        label: "피를 바르지 않고 안에서 버틴다",
        badEnding: "unmarkedDoor",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 표식을 미루었다. 그러나 그 밤은 미룬 결정을 기다려주지 않았다.",
      },
      {
        label: "불안을 견디지 못해 문밖으로 나간다",
        badEnding: "leftHouse",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 문밖의 상황을 확인하고 싶었다. 그러나 그 밤에는 머무름이 순종이었다.",
      },
    ],
  },
  {
    id: "departure",
    title: "급히 떠나는 새벽",
    image: "desert",
    text: "울음소리와 외침이 애굽을 가른다. 당신은 아직 부풀지 않은 반죽을 들고 집을 나선다. 자유는 노래보다 먼저 혼란의 발걸음으로 왔다.",
    choices: [
      {
        label: "뒤돌아보지 않고 행렬을 따라간다",
        effects: { endurance: -1, witness: 1 },
        feedbackTitle: "노예의 길에서 낯선 길로",
        feedback: "당신은 익숙한 길을 버리고 낯선 길에 발을 올렸다. 자유는 아직 기쁨보다 불안에 가까웠다.",
      },
      {
        label: "망설이는 이들을 기다리다 늦어진다",
        effects: { endurance: -2, witness: 2, panic: 1 },
        feedbackTitle: "함께 늦게 걷는 길",
        feedback: "당신은 혼자 빠르게 사는 길보다 함께 늦게 걷는 길을 택했다. 대가는 있었지만, 그 장면은 증언이 되었다.",
      },
      {
        label: "애굽으로 돌아가 숨는다",
        badEnding: "returnEgypt",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 익숙한 공포가 낯선 자유보다 안전하다고 느꼈다. 그러나 돌아간 길은 더 이상 집이 아니었다.",
      },
    ],
  },
  {
    id: "wilderness_noise",
    title: "뒤에서 들리는 병거",
    image: "desert",
    text: "광야의 먼지 사이로 낮은 진동이 들린다. 처음에는 바람인 줄 알았지만, 곧 모두가 안다. 병거다. 애굽이 따라오고 있다.",
    choices: [
      {
        label: "행렬 안쪽으로 들어가 숨을 고른다",
        effects: { panic: -1, endurance: 1 },
        feedbackTitle: "공포를 늦추다",
        feedback: "당신은 멈추지 않았다. 다만 숨을 고르고 다시 걸었다. 공포는 사라지지 않았지만, 당신을 끌고 가지도 못했다.",
      },
      {
        label: "주변 사람들에게 병거가 온다고 외친다",
        effects: { panic: 2, witness: 1 },
        feedbackTitle: "경고는 필요했지만 공포도 번졌다",
        feedback: "당신의 외침은 사람들을 깨웠다. 그러나 공포도 함께 퍼졌다. 말은 살리기도 하고 흔들기도 한다.",
      },
      {
        label: "병거 쪽으로 달려가 항복하겠다고 외친다",
        badEnding: "returnEgypt",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 목숨을 구하려고 돌아섰다. 그러나 그 길은 구원이 아니라 다시 묶임으로 이어졌다.",
      },
    ],
  },
  {
    id: "red_sea",
    title: "바다 앞에서",
    image: "sea",
    text: "뒤에서는 병거 소리가 가까워진다. 앞에는 바다가 있다. 사람들은 모세를 원망하고, 아이들은 울고, 밤바람은 소금 냄새를 실어온다.",
    choices: [
      {
        label: "원망하는 무리에 섞인다",
        effects: { panic: 3, witness: -2 },
        feedbackTitle: "말은 쉬웠고 공포는 빨랐다",
        feedback: "입술은 자유를 원했지만, 마음은 애굽의 무덤을 떠올렸다. 공포는 사람을 과거로 되돌린다.",
      },
      {
        label: "가만히 서서 바다를 바라본다",
        effects: { panic: -1, witness: 2 },
        feedbackTitle: "아무것도 못할 때 보는 법을 배운다",
        feedback: "할 수 있는 일이 없을 때, 당신은 처음으로 보는 일을 배웠다. 그 밤의 침묵은 패배가 아니었다.",
      },
      {
        label: "병거 앞으로 달려가 막으려 한다",
        badEnding: "chariotRush",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 공포를 이기기 위해 몸을 던졌다. 그러나 용기와 무모함은 같은 말이 아니었다.",
      },
      {
        label: "기다리지 못하고 바다로 먼저 뛰어든다",
        badEnding: "drownedFear",
        feedbackTitle: "즉시 배드엔딩 분기",
        feedback: "당신은 두려움을 용기라고 착각했다. 그러나 아직 길은 열리지 않았다.",
      },
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
  if (stats.witness >= 14 && stats.panic <= 7) return endings.trueWitness;
  if (stats.witness <= 5) return endings.silent;
  return endings.survivor;
}

export const statLabels = {
  endurance: "생존",
  panic: "공포",
  witness: "증언",
};
