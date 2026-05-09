window.EXODUS_DATA = {
  meta: {
    id: "exodus",
    title: "벽돌과 바다",
    subtitle: "출애굽을 목격한 이름 없는 히브리 노예의 기록",
    chapterNumber: 1,
    theme: "oppression-to-liberation",
  },
  endings: {
    trueWitness: { title: "해방의 증인", text: "당신은 바다 사이를 걸었다. 제국은 당신의 몸을 부렸지만, 당신의 마지막 말까지 소유하지는 못했다. 당신은 그 밤을 살아남았고, 그 사건을 증언으로 남겼다." },
    survivor: { title: "살아남은 자", text: "당신은 바다를 건넜다. 그러나 아직 그 밤의 의미를 다 알지는 못한다. 생존은 끝이 아니라, 해방을 배워가는 긴 시작이었다." },
    terror: { title: "공포에 붙잡힌 자", text: "당신은 애굽을 떠났지만, 애굽의 공포는 당신을 놓아주지 않았다. 자유의 길은 열렸으나, 마음은 아직 닫힌 문 앞에 서 있었다." },
    collapse: { title: "무너진 자", text: "채찍과 밤과 도망의 무게를 몸이 견디지 못했다. 해방의 소문은 가까이 있었지만, 당신은 그 길 위에 끝까지 서지 못했다." },
    silent: { title: "침묵한 생존자", text: "당신은 모든 것을 보았다. 그러나 그것을 말로 남기지 못했다. 바다는 갈라졌지만, 당신 안의 언어는 아직 열리지 않았다." },
    rebellionCrushed: { title: "채찍 아래의 반란", text: "당신은 감독관에게 달려들었다. 분노는 정당했지만, 그날의 힘은 당신 편이 아니었다. 제국은 당신의 분노를 빌미로 더 많은 등을 찢었다." },
    informer: { title: "밀고자의 밤", text: "당신은 모세의 소문을 감독관에게 넘겼다. 그날 밤, 노예들의 집에는 더 긴 침묵이 내려앉았다." },
    egyptianShelter: { title: "남의 문 아래 숨은 자", text: "당신은 애굽인의 집으로 숨어들었다. 익숙한 권력 곁이면 안전할 줄 알았다. 그러나 그 밤, 남의 문은 당신을 지켜주지 못했다." },
    unmarkedDoor: { title: "표식 없는 문", text: "당신은 피를 바르지 않았다. 그 밤이 지나간 뒤, 집 안의 침묵은 다시는 이전의 침묵이 아니었다." },
    leftHouse: { title: "문밖의 밤", text: "당신은 불안을 견디지 못하고 문밖으로 나갔다. 그 밤에는 머무름이 순종이었다." },
    returnEgypt: { title: "돌아간 발걸음", text: "병거 소리가 가까워지자 당신은 행렬을 벗어나 애굽 쪽으로 달렸다. 뒤돌아간 발은 자유의 길을 보지 못했다." },
    chariotRush: { title: "병거 앞으로 달려간 자", text: "당신은 공포를 이기기 위해 앞으로 달렸다. 그러나 애굽의 병거는 개인의 용기로 막을 수 있는 것이 아니었다." },
    drownedFear: { title: "먼저 뛰어든 자", text: "당신은 기다리지 못하고 어둠 속 바다로 뛰어들었다. 두려움은 때로 용기처럼 위장한다. 그러나 길은 열리기 전에 붙잡을 수 있는 것이 아니었다." }
  },
  scenes: [
    { id: "scene_01_brickyard", title: "벽돌 굽는 날", art: "진흙 구덩이와 벽돌 노동", artLabel: "벽돌 노동장", artSrc: "./assets/scenes/exodus/scene_01_brickyard.svg", text: "새벽이 오기 전, 당신은 진흙 구덩이에 발을 넣는다. 짚은 부족하고, 감독관은 오늘도 같은 수량의 벽돌을 요구한다.", choices: [
      { label: "할당량을 채우기 위해 이를 악문다", risk: 35, effects: { endurance: -2, panic: 1 }, profile: { survival: 2, fear: 1 }, title: "몸은 버텼지만 마음은 굳어졌다", text: "손이 갈라질 때까지 벽돌을 찍었다. 살아남는 법은 배웠지만, 사람을 보는 눈은 조금 흐려졌다." },
      { label: "쓰러진 동료를 일으킨다", risk: 55, effects: { endurance: -3, witness: 2 }, profile: { witness: 2, resistance: 1 }, title: "채찍보다 먼저 보인 얼굴", text: "그 선택은 몸을 더 지치게 했지만, 훗날 증언이 될 기억 하나를 남겼다." },
      { label: "감독관의 눈을 피해 숨을 고른다", risk: 25, effects: { endurance: 1, panic: 1 }, profile: { survival: 2, avoidance: 1 }, title: "숨은 고르지만 공포도 자란다", text: "당신은 몸을 낮췄다. 그러나 숨어 있는 동안 두려움도 함께 자리를 잡았다." }
    ]},
    { id: "scene_02_overseer_whip", title: "채찍 소리", art: "감독관과 채찍", artLabel: "채찍 아래의 노동장", artSrc: "./assets/scenes/exodus/scene_02_overseer_whip.svg", text: "감독관이 노인을 끌어낸다. 그는 오늘 몫을 채우지 못했다. 사람들은 고개를 숙이고, 채찍은 이미 올라가 있다.", choices: [
      { label: "고개를 숙이고 살아남는다", risk: 40, effects: { endurance: 1, panic: 2, witness: -1 }, profile: { survival: 2, fear: 1 }, title: "살아남았지만 장면이 남았다", text: "몸은 안전했지만, 채찍 소리는 마음 안쪽에 더 오래 남았다." },
      { label: "노인을 대신해 한 걸음 나선다", risk: 70, effects: { endurance: -3, witness: 3, panic: 1 }, profile: { witness: 2, resistance: 2 }, title: "한 걸음의 대가", text: "제국은 그것을 어리석음이라 불렀지만, 당신은 그 얼굴을 잊지 않았다." },
      { label: "감독관에게 달려든다", risk: 100, badEnding: "rebellionCrushed", profile: { resistance: 3, fear: 1 }, title: "즉시 배드엔딩 분기", text: "분노는 정당했다. 그러나 지금 이 자리의 반란은 공동체 전체를 더 위험하게 만들었다." }
    ]},
    { id: "scene_03_straw_decree", title: "짚 없는 명령", art: "짚 없는 벽돌", artLabel: "짚 없는 벽돌", artSrc: "./assets/scenes/exodus/scene_03_straw_decree.svg", text: "짚은 주어지지 않았다. 그러나 벽돌 수량은 그대로였다. 사람들은 모세의 이름을 원망하기 시작한다.", choices: [
      { label: "모세 때문에 고통이 커졌다고 원망한다", risk: 55, effects: { panic: 2, witness: -1 }, profile: { fear: 2 }, title: "해방의 말이 채찍처럼 들렸다", text: "원망은 고통을 설명해주어도, 길을 열어주지는 못했다." },
      { label: "그 이름을 마음에 담아둔다", risk: 45, effects: { witness: 2, panic: 1 }, profile: { witness: 1, obedience: 1 }, title: "아직 믿음은 아니지만 기억이 되었다", text: "확신은 없었다. 그래도 당신은 모세라는 이름을 지우지 않았다." },
      { label: "그 소문을 감독관에게 알린다", risk: 100, badEnding: "informer", profile: { avoidance: 3, fear: 1 }, title: "즉시 배드엔딩 분기", text: "당신은 위험을 피하려고 소문을 넘겼다. 하지만 공동체의 밤은 더 어두워졌다." }
    ]},
    { id: "scene_06_darkness_plague", title: "어둠의 사흘", art: "재앙이 덮은 애굽", artLabel: "어둠의 재앙", artSrc: "./assets/scenes/exodus/scene_06_darkness_plague.svg", text: "낮인데도 어둠이 내려앉는다. 애굽의 집들은 숨죽이고, 사람들은 벽을 더듬는다.", choices: [
      { label: "어둠 속에서 본 일을 마음에 새긴다", risk: 30, effects: { witness: 3, panic: -1 }, profile: { witness: 3 }, title: "어둠 속의 구별", text: "당신은 빛을 설명하지 못했다. 그러나 그 구별을 보았다." },
      { label: "공포에 눌려 아무 말도 하지 않는다", risk: 50, effects: { panic: 2, witness: -1 }, profile: { fear: 2, avoidance: 1 }, title: "침묵이 깊어진다", text: "침묵은 때로 두려움의 방이 되었다." },
      { label: "애굽인의 집으로 숨어들어 보호를 구한다", risk: 100, badEnding: "egyptianShelter", profile: { avoidance: 3, fear: 2 }, title: "즉시 배드엔딩 분기", text: "권력 곁이 안전하다고 생각했다. 그러나 그 밤의 안전은 권력의 지붕 아래 있지 않았다." }
    ]},
    { id: "scene_08_blood_door", title: "문설주의 피", art: "피가 발린 문설주", artLabel: "유월절의 문", artSrc: "./assets/scenes/exodus/scene_08_blood_door.svg", text: "그 밤, 말씀은 구체적이었다. 어린 양, 피, 문설주, 허리에 띤 띠, 발의 신, 손의 지팡이.", choices: [
      { label: "문설주에 피를 바른다", risk: 25, effects: { witness: 3, panic: -1 }, profile: { obedience: 3, witness: 1 }, title: "표식은 말보다 먼저 남았다", text: "당신은 그 의미를 다 알지 못했지만, 말씀을 몸으로 따랐다." },
      { label: "피를 바르지 않고 안에서 버틴다", risk: 100, badEnding: "unmarkedDoor", profile: { resistance: 1, avoidance: 2 }, title: "즉시 배드엔딩 분기", text: "당신은 표식을 미루었다. 그러나 그 밤은 미룬 결정을 기다려주지 않았다." },
      { label: "불안을 견디지 못해 문밖으로 나간다", risk: 100, badEnding: "leftHouse", profile: { fear: 3, avoidance: 2 }, title: "즉시 배드엔딩 분기", text: "당신은 상황을 확인하고 싶었다. 그러나 그 밤에는 머무름이 순종이었다." }
    ]},
    { id: "scene_09_departure_dawn", title: "급히 떠나는 새벽", art: "급히 떠나는 새벽", artLabel: "떠나는 새벽", artSrc: "./assets/scenes/exodus/scene_09_departure_dawn.svg", text: "울음소리와 외침이 애굽을 가른다. 자유는 노래보다 먼저 혼란의 발걸음으로 왔다.", choices: [
      { label: "뒤돌아보지 않고 행렬을 따라간다", risk: 35, effects: { endurance: -1, witness: 1 }, profile: { obedience: 2 }, title: "노예의 길에서 낯선 길로", text: "당신은 익숙한 길을 버리고 낯선 길에 발을 올렸다." },
      { label: "망설이는 이들을 기다리다 늦어진다", risk: 60, effects: { endurance: -2, witness: 2, panic: 1 }, profile: { witness: 2, survival: 1 }, title: "함께 늦게 걷는 길", text: "혼자 빠르게 사는 길보다 함께 늦게 걷는 길을 택했다." },
      { label: "애굽으로 돌아가 숨는다", risk: 100, badEnding: "returnEgypt", profile: { avoidance: 3, fear: 2 }, title: "즉시 배드엔딩 분기", text: "익숙한 공포가 낯선 자유보다 안전하다고 느꼈다. 그러나 돌아간 길은 더 이상 집이 아니었다." }
    ]},
    { id: "scene_10_chariots_dust", title: "뒤에서 들리는 병거", art: "광야의 먼지와 병거 소리", artLabel: "뒤쫓는 병거", artSrc: "./assets/scenes/exodus/scene_10_chariots_dust.svg", text: "광야의 먼지 사이로 낮은 진동이 들린다. 병거다. 애굽이 따라오고 있다.", choices: [
      { label: "행렬 안쪽으로 들어가 숨을 고른다", risk: 30, effects: { panic: -1, endurance: 1 }, profile: { survival: 2 }, title: "공포를 늦추다", text: "공포는 사라지지 않았지만, 당신을 끌고 가지도 못했다." },
      { label: "주변 사람들에게 병거가 온다고 외친다", risk: 55, effects: { panic: 2, witness: 1 }, profile: { witness: 1, fear: 1 }, title: "경고는 필요했지만 공포도 번졌다", text: "당신의 외침은 사람들을 깨웠다. 그러나 공포도 함께 퍼졌다." },
      { label: "병거 쪽으로 달려가 항복하겠다고 외친다", risk: 100, badEnding: "returnEgypt", profile: { avoidance: 3, fear: 2 }, title: "즉시 배드엔딩 분기", text: "목숨을 구하려고 돌아섰다. 그러나 그 길은 구원이 아니라 다시 묶임으로 이어졌다." }
    ]},
    { id: "scene_11_red_sea_waiting", title: "바다 앞에서", art: "바다 앞의 밤", artLabel: "홍해 앞의 밤", artSrc: "./assets/scenes/exodus/scene_11_red_sea_waiting_final.svg", text: "뒤에서는 병거 소리가 가까워진다. 앞에는 바다가 있다. 사람들은 원망하고, 밤바람은 소금 냄새를 실어온다.", choices: [
      { label: "원망하는 무리에 섞인다", risk: 70, effects: { panic: 3, witness: -2 }, profile: { fear: 3 }, title: "말은 쉬웠고 공포는 빨랐다", text: "공포는 사람을 과거로 되돌린다." },
      { label: "가만히 서서 바다를 바라본다", risk: 45, effects: { panic: -1, witness: 2 }, profile: { obedience: 2, witness: 1 }, title: "아무것도 못할 때 보는 법을 배운다", text: "그 밤의 침묵은 패배가 아니었다." },
      { label: "병거 앞으로 달려가 막으려 한다", risk: 100, badEnding: "chariotRush", profile: { resistance: 3, fear: 1 }, title: "즉시 배드엔딩 분기", text: "용기와 무모함은 같은 말이 아니었다." },
      { label: "기다리지 못하고 바다로 먼저 뛰어든다", risk: 100, badEnding: "drownedFear", profile: { resistance: 2, fear: 2 }, title: "즉시 배드엔딩 분기", text: "아직 길은 열리지 않았다." }
    ]},
    { id: "scene_12_red_sea_crossing", title: "벽돌 굽던 발이 바다 사이를 걷다", art: "물벽 사이의 길", artLabel: "홍해 도하", artSrc: "./assets/scenes/exodus/scene_12_red_sea_crossing_final.svg", text: "모세가 지팡이를 든다. 밤새 바람이 분다. 바다가 물러난다. 당신은 진흙과 벽돌만 알던 발로, 물벽 사이의 마른 길을 밟는다.", final: true }
  ]
};
