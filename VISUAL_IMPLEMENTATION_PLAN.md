# 완성형 비주얼 구현 계획

## 목표

이 문서는 생성된 완성형 시안 이미지를 실제 게임 화면으로 구현하기 위한 에셋 분해표이다.

핵심 목표는 다음이다.

```text
시안 이미지는 기준이다.
실제 게임은 그 시안을 배경, 프레임, 패널, 버튼, 아이콘, 텍스트 영역으로 분해해 재조립한다.
```

즉, 단순히 한 장의 이미지를 배경으로 깔지 않는다. 게임으로 작동해야 하므로 다음 요소를 분리한다.

```text
배경 이미지
UI 프레임
텍스트 패널
선택지 버튼
상태창
기록창
아이콘
장면 삽화 슬롯
엔딩 패널
```

---

# 1. 화면별 구현 전략

## 1) 메인 메뉴 / 챕터 선택 화면

기준 시안:

```text
어두운 벽돌 노동장 + 밤의 도시 + 왼쪽 메뉴 + 챕터 카드
```

구현 방식:

```text
배경 아트는 큰 이미지로 사용한다.
왼쪽 메뉴, 챕터 카드, 시작 버튼은 개별 UI 요소로 구현한다.
텍스트는 HTML로 올린다.
```

이 화면은 게임의 첫인상을 담당한다.

---

## 2) 플레이 화면

기준 시안:

```text
왼쪽 큰 삽화 프레임
가운데 서사/선택지 패널
오른쪽 상태/기록 패널
주사위 아이콘 선택지
```

구현 방식:

```text
왼쪽 삽화 슬롯은 비워둔다.
장면 삽화는 artSrc로 교체한다.
중앙 패널과 오른쪽 패널은 고정 UI로 둔다.
선택지 버튼은 상태별 이미지 또는 CSS+이미지 하이브리드로 만든다.
```

플레이 화면은 가장 오래 보는 화면이므로 가독성이 최우선이다.

---

## 3) 엔딩 화면

기준 시안:

```text
홍해 도하 이후의 빛
중앙 엔딩 패널
당신의 증언 유형 리본
최종 상태 요약
다시 도전 / 처음으로 버튼
```

구현 방식:

```text
배경은 큰 엔딩 배경 이미지로 사용한다.
중앙 결과 패널은 별도 레이어로 둔다.
엔딩명, 증언 유형, 해석문, 상태값은 HTML 텍스트로 올린다.
```

엔딩 화면은 감정적 보상 화면이므로 가장 장엄하게 처리한다.

---

# 2. 메인 메뉴 에셋 분해표

## 배경 계열

```text
/assets/backgrounds/menu/menu_bg_brickworks.webp
```

역할:

```text
벽돌 노동장, 밤의 도시, 바다, 횃불, 제국의 분위기
```

주의:

```text
텍스트를 이미지에 넣지 않는다.
왼쪽 메뉴와 챕터 카드는 배경에 고정해서 넣지 않는다.
```

---

## 프레임 / 오버레이

```text
/assets/ui/frames/menu_screen_border.svg
/assets/ui/overlays/menu_dark_vignette.png
```

역할:

```text
화면 외곽 장식
금색 테두리
어두운 비네팅
```

---

## 왼쪽 메뉴 버튼

```text
/assets/ui/buttons/menu_button_normal.svg
/assets/ui/buttons/menu_button_active.svg
/assets/ui/buttons/menu_button_hover.svg
/assets/ui/buttons/menu_button_disabled.svg
```

사용 위치:

```text
챕터
증인
기록
유물
업적
설정
```

구현:

```text
button.menu-item
```

상태:

```text
normal
active
hover
disabled
```

---

## 챕터 카드

```text
/assets/ui/cards/chapter_card_normal.svg
/assets/ui/cards/chapter_card_active.svg
/assets/ui/cards/chapter_card_locked.svg
/assets/ui/cards/chapter_card_hover.svg
```

구현:

```text
button.chapter-card
```

카드 내부는 HTML 텍스트와 썸네일 이미지로 구성한다.

필요한 썸네일:

```text
/assets/scenes/exodus/thumb_chapter_01.webp
/assets/scenes/exodus/thumb_chapter_02_locked.webp
/assets/scenes/exodus/thumb_chapter_03_locked.webp
```

---

# 3. 플레이 화면 에셋 분해표

## 전체 배경

```text
/assets/backgrounds/play/play_bg_dark_sea.webp
```

역할:

```text
어두운 바다, 고대 도시, 연기, 횃불 분위기
```

---

## 왼쪽 삽화 프레임

```text
/assets/ui/frames/play_illustration_frame.svg
/assets/ui/overlays/play_illustration_overlay.png
```

역할:

```text
장면 삽화가 들어가는 고정 프레임
삽화 위에 얹는 어두운 그라데이션
```

구현 구조:

```html
<section class="scene-slot">
  <img class="scene-art-img" src="현재 장면 artSrc">
  <img class="scene-frame-overlay" src="play_illustration_frame.svg">
</section>
```

---

## 중앙 스토리 패널

```text
/assets/ui/panels/play_story_panel.svg
```

역할:

```text
챕터명
장면명
본문
선택지
```

구현:

```text
.story-card
```

텍스트는 HTML로 올린다.

---

## 선택지 버튼

```text
/assets/ui/buttons/choice_button_normal.svg
/assets/ui/buttons/choice_button_hover.svg
/assets/ui/buttons/choice_button_pressed.svg
/assets/ui/buttons/choice_button_roll.svg
/assets/ui/buttons/choice_button_disabled.svg
```

사용 규칙:

```text
일반 선택지 → choice_button_normal.svg
hover → choice_button_hover.svg
클릭 중 → choice_button_pressed.svg
주사위 판정 선택지 → choice_button_roll.svg + icon_dice.svg
```

주의:

```text
위험도 바는 표시하지 않는다.
치명 선택지도 별도 표시하지 않는다.
```

---

## 오른쪽 상태창

```text
/assets/ui/panels/status_panel.svg
/assets/ui/icons/icon_endurance.svg
/assets/ui/icons/icon_panic.svg
/assets/ui/icons/icon_witness.svg
```

표시 항목:

```text
생존
공포
증언
```

구현:

```text
statBar(label, value, key)
```

---

## 오른쪽 기록창

```text
/assets/ui/panels/log_panel.svg
/assets/ui/icons/icon_log.svg
```

역할:

```text
최근 선택 결과
판정 결과
상태 변화 요약
```

---

# 4. 주사위 판정 화면 에셋 분해표

## 판정 패널

```text
/assets/ui/panels/roll_panel.svg
/assets/ui/frames/roll_result_frame.svg
```

표시 항목:

```text
선택한 행동
주사위 값
보정치
목표값
성공 / 실패
```

---

## 주사위 아이콘 / 눈 이미지

```text
/assets/ui/icons/icon_dice.svg
/assets/ui/dice/dice_01.svg
/assets/ui/dice/dice_02.svg
/assets/ui/dice/dice_03.svg
/assets/ui/dice/dice_04.svg
/assets/ui/dice/dice_05.svg
/assets/ui/dice/dice_06.svg
```

효과:

```text
굴림 애니메이션
성공 시 금빛 발광
실패 시 붉은 흔들림
```

---

# 5. 엔딩 화면 에셋 분해표

## 배경

```text
/assets/backgrounds/ending/ending_bg_liberation.webp
```

역할:

```text
홍해가 열린 장면
금빛 광휘
해방의 길
백성의 행렬
```

---

## 중앙 결과 패널

```text
/assets/ui/panels/ending_result_panel.svg
```

표시 항목:

```text
엔딩명
엔딩 설명
증언 유형
증언 유형 해석문
최종 상태
```

---

## 증언 유형 리본

```text
/assets/ui/ribbons/testimony_type_ribbon.svg
```

예시 텍스트:

```text
당신의 증언 유형: 해방의 증언자
```

---

## 엔딩 버튼

```text
/assets/ui/buttons/ending_button_primary_normal.svg
/assets/ui/buttons/ending_button_primary_hover.svg
/assets/ui/buttons/ending_button_secondary_normal.svg
/assets/ui/buttons/ending_button_secondary_hover.svg
```

버튼:

```text
다시 도전
처음으로
```

---

# 6. 장면 삽화 분해표

## 1편 벽돌과 바다 필수 장면

```text
/assets/scenes/exodus/scene_01_brickyard.webp
/assets/scenes/exodus/scene_02_overseer_whip.webp
/assets/scenes/exodus/scene_03_straw_decree.webp
/assets/scenes/exodus/scene_04_night_whisper.webp
/assets/scenes/exodus/scene_05_blood_nile.webp
/assets/scenes/exodus/scene_06_darkness_plague.webp
/assets/scenes/exodus/scene_07_passover_lamb.webp
/assets/scenes/exodus/scene_08_blood_door.webp
/assets/scenes/exodus/scene_09_departure_dawn.webp
/assets/scenes/exodus/scene_10_chariots_dust.webp
/assets/scenes/exodus/scene_11_red_sea_waiting.webp
/assets/scenes/exodus/scene_12_red_sea_crossing.webp
```

## 제작 우선순위

```text
1순위:
scene_01_brickyard.webp
scene_08_blood_door.webp
scene_11_red_sea_waiting.webp
scene_12_red_sea_crossing.webp

2순위:
scene_02_overseer_whip.webp
scene_06_darkness_plague.webp
scene_10_chariots_dust.webp

3순위:
나머지 장면
```

---

# 7. 코드 구현 순서

## 1단계: artSrc 정식화

현재는 asset-loader.js가 장면명을 보고 임시 매칭한다. 다음 단계에서는 game-data.js에 직접 artSrc를 넣는다.

예:

```js
{
  id: "scene_11_red_sea_waiting",
  title: "바다 앞에서",
  artLabel: "홍해 앞의 밤",
  artSrc: "./assets/scenes/exodus/scene_11_red_sea_waiting.webp",
  text: "뒤에서는 병거 소리가 가까워진다..."
}
```

---

## 2단계: asset-loader 제거

artSrc가 정식화되면 asset-loader.js는 제거하거나 보조용으로만 둔다.

```text
game.js가 scene.artSrc를 직접 읽는다.
```

---

## 3단계: 화면별 배경 이미지 연결

```text
screen-home → menu_bg_brickworks.webp
screen-play → play_bg_dark_sea.webp
screen-ending → ending_bg_liberation.webp
```

---

## 4단계: 버튼 이미지 연결

선택지 버튼을 CSS 배경 이미지 기반으로 변경한다.

```css
.choice-btn {
  background-image: url("./assets/ui/buttons/choice_button_normal.svg");
}
.choice-btn:hover {
  background-image: url("./assets/ui/buttons/choice_button_hover.svg");
}
.choice-btn.roll {
  background-image: url("./assets/ui/buttons/choice_button_roll.svg");
}
```

---

## 5단계: 상태창 아이콘 연결

```text
생존 → icon_endurance.svg
공포 → icon_panic.svg
증언 → icon_witness.svg
```

---

# 8. 제작 기준

## 해상도

권장 기본 비율:

```text
16:9
1920 x 1080 기준
```

웹 표시 기준:

```text
데스크톱: 1280~1440px 폭 중심
모바일: 추후 별도 축약 레이아웃
```

---

## 이미지 포맷

```text
큰 배경 / 삽화 → webp 우선
아이콘 / 프레임 / 버튼 → svg 우선
복잡한 회화형 UI → png 또는 webp
```

---

## 텍스트 규칙

```text
최종 텍스트는 이미지에 직접 박지 않는다.
모든 본문, 선택지, 상태값, 엔딩명은 HTML로 올린다.
```

예외:

```text
장식용 심볼
아이콘
문양
텍스트가 아닌 상징 도안
```

---

# 9. 최종 목표

이 구조가 완성되면 새 시리즈는 다음만 추가하면 된다.

```text
/content/series-name/scenes.json
/content/series-name/endings.json
/assets/scenes/series-name/*.webp
```

게임 엔진과 UI는 그대로 유지한다.

즉, 최종 목표는 다음이다.

```text
새 텍스트 + 새 삽화 + 새 음악 = 새 시리즈
```
