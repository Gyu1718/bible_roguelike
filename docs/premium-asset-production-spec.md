# 이름 없는 증인들 — 프리미엄 에셋 제작 명세서

이 문서는 예시 화면 수준에 가까운 고해상도 게임 화면을 구현하기 위한 에셋 제작 기준이다.

현재 저장소는 16:9 `game-stage` 구조로 전환되어 있다. 따라서 이제 핵심은 코드가 아니라 실제 이미지 에셋 품질이다. 이 문서의 기준에 따라 WebP/PNG 이미지를 제작하고 `assets/premium/` 경로에 넣으면, `premium-assets.css`에서 경로만 전환하여 적용할 수 있다.

---

## 1. 전체 원칙

### 1.1 기준 해상도

- PC 기준 해상도: 1920 × 1080
- 화면 비율: 16:9
- 구현 방식: 배경/프레임은 이미지, 텍스트/버튼 클릭 영역은 HTML
- 모바일: 별도 축약 레이아웃으로 대응

### 1.2 이미지에 넣지 말아야 할 것

다음 요소는 이미지 안에 넣지 않는다.

- 게임 제목 텍스트
- 메뉴 텍스트
- 선택지 문구
- 상태 숫자
- 엔딩 제목
- 설명문
- 버튼 글자

이유: 게임 데이터에 따라 바뀌어야 하므로 HTML로 얹어야 한다.

### 1.3 이미지에 넣어도 되는 것

다음 요소는 이미지 안에 넣을 수 있다.

- 배경 일러스트
- 빛 효과
- 인물 실루엣
- 건축물
- 바다, 광야, 벽돌가마, 횃불
- 장식 프레임
- 패널 질감
- 버튼 장식
- 금속 테두리
- 양피지 질감

---

## 2. 메인 메뉴 화면 에셋

### 2.1 최종 목표

메인 메뉴는 어두운 성경 판타지 게임의 챕터 선택 화면처럼 보여야 한다. 배경은 히브리 노예들의 벽돌 노동장과 애굽 도시 실루엣을 담는다. 좌측에는 세로 메뉴 패널이 있고, 우측에는 1장 대표 카드와 잠긴 챕터 카드들이 배치된다.

### 2.2 필수 파일

```text
assets/premium/main/main_bg.webp
assets/premium/main/left_menu_panel.webp
assets/premium/main/chapter_panel.webp
assets/premium/main/featured_chapter_frame.webp
assets/premium/main/locked_chapter_card.webp
```

### 2.3 `main_bg.webp`

- 해상도: 1920 × 1080
- 형식: WebP 권장, PNG 가능
- 텍스트: 없음
- 분위기: 어두운 청흑색, 청동빛, 횃불빛, 금빛 하이라이트
- 내용:
  - 밤의 벽돌 노동장
  - 애굽 도시 실루엣
  - 멀리 보이는 불빛
  - 노동자 실루엣
  - 중앙/우측 UI가 얹힐 수 있도록 너무 복잡하지 않은 여백

### 2.4 메인 배경 제작 프롬프트

```text
A premium dark biblical-fantasy game main menu background, 1920x1080, no text, no UI text, no logos. Nighttime Hebrew brickworks under Egyptian oppression, torchlit city silhouettes in the distance, workers as small dark silhouettes, mud bricks and dust in the foreground, deep navy-black shadows, warm bronze-gold torchlight, subtle sacred atmosphere, painterly high-detail commercial game art, cinematic lighting, ornate dark fantasy mood, enough empty space on the left and right for UI panels, no modern objects, no readable letters.
```

한국어 의도:

```text
성경 판타지 게임의 메인 메뉴 배경. 밤의 벽돌 노동장, 애굽 도시 실루엣, 횃불빛, 노동자 실루엣, 청흑색 그림자와 청동빛 조명. 텍스트와 로고는 넣지 않는다.
```

---

## 3. 플레이 화면 에셋

### 3.1 최종 목표

플레이 화면은 예시 화면의 핵심이다. 왼쪽에는 대형 장면 삽화, 중앙에는 이야기 패널과 선택지, 오른쪽에는 증인단/상태 패널이 있어야 한다. 전체 화면은 완성된 상업 게임 UI처럼 보여야 한다.

### 3.2 필수 파일

```text
assets/premium/play/play_bg.webp
assets/premium/play/illustration_frame.webp
assets/premium/play/story_panel.webp
assets/premium/play/witness_panel.webp
assets/premium/play/top_bar.webp
assets/premium/play/bottom_bar.webp
assets/premium/play/choice_button_normal.webp
assets/premium/play/choice_button_hover.webp
assets/premium/play/choice_button_pressed.webp
```

### 3.3 `play_bg.webp`

- 해상도: 1920 × 1080
- 형식: WebP 권장
- 텍스트: 없음
- 내용:
  - 어두운 광야 또는 홍해 앞 밤 배경
  - 청흑색 바다빛
  - 따뜻한 횃불빛
  - 화면 중앙과 우측 패널 뒤가 너무 복잡하지 않아야 함

### 3.4 플레이 배경 제작 프롬프트

```text
A premium dark biblical-fantasy gameplay background, 1920x1080, no text, no UI text, no logos. A nighttime Exodus wilderness near the Red Sea, dark blue-black sea atmosphere, distant Egyptian silhouettes, torchlight and dust, sacred tension, painterly commercial game quality, cinematic lighting, bronze and gold highlights, rich atmospheric depth, enough visual calm in the center and right side for story and status UI panels, no modern elements, no readable text.
```

---

## 4. 플레이 장면 삽화 에셋

장면 삽화는 `stage-art` 영역에 들어간다. 현재 CSS는 `object-fit: cover`로 표시한다.

### 4.1 권장 사양

- 권장 비율: 세로형 3:4 또는 4:5
- 최소 해상도: 1200 × 1600
- 권장 해상도: 1536 × 2048 또는 1600 × 2133
- 형식: WebP 권장
- 텍스트: 없음

### 4.2 파일 목록

```text
assets/premium/play/scenes/scene_01_brickyard.webp
assets/premium/play/scenes/scene_02_overseer_whip.webp
assets/premium/play/scenes/scene_03_straw_decree.webp
assets/premium/play/scenes/scene_06_darkness_plague.webp
assets/premium/play/scenes/scene_08_blood_door.webp
assets/premium/play/scenes/scene_09_departure_dawn.webp
assets/premium/play/scenes/scene_10_chariots_dust.webp
assets/premium/play/scenes/scene_11_red_sea_waiting.webp
assets/premium/play/scenes/scene_12_red_sea_crossing.webp
```

### 4.3 공통 장면 삽화 프롬프트 기본형

```text
A premium dark biblical-fantasy scene illustration, vertical 3:4 composition, no text, no UI, no logos. Painterly commercial game art, cinematic lighting, deep navy-black shadows, warm bronze-gold highlights, subtle sacred atmosphere, realistic ancient Near Eastern clothing and environment, emotionally dramatic but not comic-like, high detail, unified art direction, suitable for a story panel in a biblical roguelike game.
```

### 4.4 장면별 프롬프트

#### scene_01_brickyard.webp

```text
A Hebrew slave brickyard before dawn under Egyptian oppression, mud pits, straw, stacked bricks, exhausted workers as silhouettes, an overseer in the background, torchlight and dust, dark biblical fantasy painterly style, vertical 3:4, no text.
```

#### scene_02_overseer_whip.webp

```text
An Egyptian overseer raising a whip over exhausted Hebrew workers, one elderly slave on the ground, tense crowd with lowered heads, dust and torchlight, dark bronze and navy palette, cinematic biblical fantasy, vertical 3:4, no text.
```

#### scene_03_straw_decree.webp

```text
Hebrew slaves struggling to make bricks without straw, piles of unfinished bricks, anxious workers, harsh Egyptian labor yard, dry dust, oppressive atmosphere, dark biblical fantasy painterly art, vertical 3:4, no text.
```

#### scene_06_darkness_plague.webp

```text
The plague of darkness over Egypt, ancient houses and city silhouettes almost swallowed by deep black shadow, people feeling along walls, faint sacred light on the Hebrew side, ominous blue-black atmosphere, vertical 3:4, no text.
```

#### scene_08_blood_door.webp

```text
A Hebrew household door at night with blood on the doorposts and lintel, family silhouettes inside, warm lamp glow, fearful sacred stillness, Passover night atmosphere, dark biblical fantasy painterly style, vertical 3:4, no text.
```

#### scene_09_departure_dawn.webp

```text
Hebrew families leaving Egypt in the chaotic dawn, bundles, staffs, children, distant crying city behind them, warm sunrise and cold shadows, liberation beginning in confusion, painterly biblical fantasy, vertical 3:4, no text.
```

#### scene_10_chariots_dust.webp

```text
Egyptian chariots approaching through desert dust behind fleeing Hebrew people, low dramatic angle, dust cloud, fear and urgency, bronze wheels, torch sparks, dark blue and orange cinematic palette, vertical 3:4, no text.
```

#### scene_11_red_sea_waiting.webp

```text
Hebrew refugees trapped before the Red Sea at night, sea ahead, Egyptian chariots far behind, anxious crowd, torches, salt wind, Moses only as a distant silhouette not central, sacred suspense, dark biblical fantasy painterly art, vertical 3:4, no text.
```

#### scene_12_red_sea_crossing.webp

```text
The Red Sea parted at night, walls of water on both sides, Hebrew refugees walking on dry ground, a nameless witness in the foreground, divine light breaking through clouds, cinematic sacred liberation, premium painterly biblical fantasy, vertical 3:4, no text.
```

---

## 5. 엔딩 화면 에셋

### 5.1 최종 목표

엔딩 화면은 해방, 증언, 거룩한 빛을 강조한다. 중앙 결과 패널은 양피지/금속 프레임 느낌이며, 뒤에는 갈라진 바다와 빛이 있어야 한다.

### 5.2 필수 파일

```text
assets/premium/ending/ending_liberation_bg.webp
assets/premium/ending/ending_result_panel.webp
assets/premium/ending/testimony_ribbon.webp
assets/premium/ending/ending_button_normal.webp
assets/premium/ending/ending_button_hover.webp
```

### 5.3 엔딩 배경 프롬프트

```text
A premium biblical-fantasy ending background, 1920x1080, no text, no UI text, no logos. The Red Sea parted in a grand luminous scene, walls of water on both sides, a path of dry ground glowing with divine golden light, small silhouettes of liberated witnesses at the bottom, sacred triumphant atmosphere, painterly commercial game splash art, gold and deep blue palette, cinematic lighting, enough empty center space for a result panel.
```

---

## 6. UI 프레임/패널 제작 기준

### 6.1 공통 스타일

- 색상: 청흑색, 청동색, 금색, 어두운 갈색
- 질감: 금속, 양피지, 오래된 나무, 돌, 먼지
- 모서리: 장식적이지만 과하지 않게
- 투명 배경이 필요한 경우 PNG 사용 가능
- WebP 사용 시 배경 포함 여부를 명확히 결정

### 6.2 패널별 기준

#### story_panel.webp

- 중앙 본문 영역
- 어두운 반투명 패널 느낌
- 긴 본문과 선택지를 읽기 쉬워야 함

#### witness_panel.webp

- 오른쪽 상태창
- 인물 초상화와 상태 바가 들어갈 수 있는 영역 필요

#### illustration_frame.webp

- 왼쪽 삽화 위에 얹는 프레임
- 중앙은 투명이어야 함

#### choice_button_normal.webp / hover / pressed

- 동일 크기와 비율
- 텍스트가 들어갈 중앙 영역 확보
- hover는 금빛 강조
- pressed는 어둡게 눌린 느낌

---

## 7. 적용 절차

### 7.1 파일 업로드

각 파일을 해당 경로에 업로드한다.

예:

```text
assets/premium/play/play_bg.webp
assets/premium/play/scenes/scene_12_red_sea_crossing.webp
```

### 7.2 `premium-assets.css` 수정

현재는 SVG fallback을 사용한다.

```css
--premium-play-bg: url("./assets/premium/play/play_bg.svg");
```

최종 WebP 투입 후 다음처럼 바꾼다.

```css
--premium-play-bg: url("./assets/premium/play/play_bg.webp");
```

### 7.3 장면 삽화 경로 수정

`content/exodus/data.js`에서 각 `artSrc`를 다음처럼 바꾼다.

```js
artSrc: "./assets/premium/play/scenes/scene_12_red_sea_crossing.webp"
```

### 7.4 확인 주소

GitHub Pages에서 캐시를 피하기 위해 쿼리 버전을 올린다.

```text
https://gyu1718.github.io/bible_roguelike/?v=asset-test-1
```

---

## 8. 품질 판정 기준

다음 기준을 통과해야 예시 화면에 가까워졌다고 판단한다.

1. PC 16:9에서 배경이 잘리지 않고 의도대로 보이는가?
2. 이미지 안에 불필요한 글자가 없는가?
3. 텍스트가 HTML로 선명하게 표시되는가?
4. UI 프레임이 삽화와 따로 놀지 않는가?
5. 버튼 hover/pressed 상태가 구분되는가?
6. 메인 / 플레이 / 엔딩의 색감이 통일되는가?
7. 장면 삽화의 인물·빛·질감이 같은 세계관처럼 보이는가?
8. 모바일에서는 축약 레이아웃이 깨지지 않는가?

---

## 9. 현재 한계와 다음 병목

현재 저장소는 16:9 stage 구조를 갖췄지만, 최종 품질은 이미지 에셋에 달려 있다.

현재 한계:

- SVG fallback은 예시 화면의 회화적 밀도를 대체하지 못한다.
- 실제 예시 수준을 원하면 WebP/PNG 고해상도 에셋이 필요하다.
- 정확한 폰트 재현은 폰트 파일과 라이선스가 있어야 가능하다.

다음 병목:

```text
고해상도 WebP/PNG 이미지 제작 및 업로드
```

이 병목이 해결되면, 이후 작업은 좌표 보정과 CSS 미세 조정이다.
