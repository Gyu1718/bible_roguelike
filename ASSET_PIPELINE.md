# 이름 없는 증인들 에셋 제작 파이프라인

## 목표

이 문서는 『이름 없는 증인들』을 여러 시리즈로 확장하기 위한 에셋 구조 기준이다.

핵심 목표는 다음이다.

```text
코드와 시스템은 고정한다.
텍스트와 삽화, 오디오만 바꾸면 새 챕터와 새 시리즈를 만들 수 있게 한다.
```

---

# 1. 최종 폴더 구조

권장 구조는 다음과 같다.

```text
/assets
  /ui
    /frames
    /buttons
    /icons
    /panels
    /overlays
    /portraits
  /scenes
    /exodus
    /judges
    /daniel
    /gospels
  /backgrounds
    /menu
    /play
    /ending
  /audio
    /bgm
    /sfx
/content
  /exodus
    chapter.json
    scenes.json
    endings.json
    profiles.json
  /judges
    chapter.json
    scenes.json
    endings.json
    profiles.json
/docs
  DESIGN_PLAN.md
  ASSET_PIPELINE.md
```

현재는 단순 구조로 시작해도 되지만, 최종적으로는 위 구조를 목표로 한다.

---

# 2. 에셋 제작 원칙

## 1) 텍스트는 이미지에 박지 않는다

UI 이미지에는 글자를 넣지 않는다.

나쁜 방식:

```text
이미지 안에 “벽돌과 바다”, “다시 도전”, “해방의 증인”을 직접 넣음
```

좋은 방식:

```text
이미지는 빈 패널과 프레임만 제공
텍스트는 HTML/CSS/JS로 올림
```

이유:

```text
수정이 쉽다.
번역이 가능하다.
글자 깨짐을 막을 수 있다.
모바일 반응형에 대응하기 쉽다.
```

---

## 2) UI 프레임과 장면 삽화는 분리한다

플레이 화면은 다음 레이어로 구성한다.

```text
1. 배경 이미지
2. 장면 삽화
3. UI 프레임 / 패널 / 오버레이
4. 텍스트와 버튼
5. 효과 / 애니메이션
```

즉, 장면마다 전체 화면 이미지를 새로 만들지 않는다.

```text
고정:
- UI 프레임
- 패널
- 선택지 버튼
- 상태창
- 아이콘

교체:
- 장면 삽화
- 본문 텍스트
- 선택지 텍스트
- 엔딩 문구
```

---

## 3) 버튼과 아이콘은 개별 이미지로 관리한다

버튼은 상태별로 나눈다.

```text
normal
hover
pressed
disabled
selected
```

아이콘도 별도 파일로 둔다.

```text
주사위
생존
공포
증언
잠금
기록
설정
챕터
```

---

# 3. 파일명 규칙

## 기본 원칙

```text
영어 소문자
언더스코어 사용
숫자는 두 자리 이상
의미가 드러나게 작성
```

좋은 예:

```text
scene_01_brickyard.png
btn_choice_normal.png
icon_dice_gold.png
portrait_slave_fear.png
bgm_exodus_dark.mp3
```

나쁜 예:

```text
image1.png
new-final-real.png
button완성.png
홍해최종최최종.png
```

---

# 4. UI 에셋 목록

## 4-1. 메인 메뉴 에셋

경로:

```text
/assets/ui/frames
/assets/backgrounds/menu
```

필요 파일:

```text
menu_bg_brickyard.png
menu_overlay_frame.png
menu_sidebar_frame.png
menu_chapter_card_normal.png
menu_chapter_card_hover.png
menu_chapter_card_locked.png
menu_chapter_card_active.png
```

역할:

```text
menu_bg_brickyard.png
- 벽돌 노동과 도시가 보이는 메인 배경

menu_overlay_frame.png
- 전체 화면 테두리와 장식

menu_sidebar_frame.png
- 왼쪽 메뉴 배경 프레임

menu_chapter_card_*.png
- 챕터 카드 상태별 이미지
```

---

## 4-2. 플레이 화면 에셋

경로:

```text
/assets/ui/frames
/assets/ui/panels
/assets/ui/buttons
/assets/ui/icons
```

필요 파일:

```text
play_bg_dark.png
play_frame_overlay.png
play_illustration_frame.png
play_story_panel.png
play_status_panel.png
play_log_panel.png
btn_choice_normal.png
btn_choice_hover.png
btn_choice_pressed.png
btn_choice_disabled.png
icon_dice.png
icon_endurance.png
icon_panic.png
icon_witness.png
icon_log.png
```

역할:

```text
play_bg_dark.png
- 플레이 화면 전체 배경

play_frame_overlay.png
- 전체 화면 장식 프레임

play_illustration_frame.png
- 장면 삽화가 들어가는 왼쪽 프레임

play_story_panel.png
- 본문과 선택지를 담는 중앙 패널

play_status_panel.png
- 생존 / 공포 / 증언 상태창

play_log_panel.png
- 오른쪽 기록창

btn_choice_*.png
- 선택지 버튼 상태별 이미지

icon_dice.png
- 주사위 판정 선택지 표시
```

---

## 4-3. 판정 화면 에셋

경로:

```text
/assets/ui/panels
/assets/ui/icons
/assets/audio/sfx
```

필요 파일:

```text
roll_panel.png
roll_dice_frame.png
icon_dice_01.png
icon_dice_02.png
icon_dice_03.png
icon_dice_04.png
icon_dice_05.png
icon_dice_06.png
sfx_dice_roll.wav
sfx_roll_success.wav
sfx_roll_fail.wav
```

역할:

```text
roll_panel.png
- 판정 결과를 보여주는 패널

roll_dice_frame.png
- 주사위 결과 표시 영역

icon_dice_01~06.png
- 실제 주사위 눈 이미지

sfx_dice_roll.wav
- 주사위 굴림 효과음
```

---

## 4-4. 엔딩 화면 에셋

경로:

```text
/assets/backgrounds/ending
/assets/ui/panels
/assets/ui/buttons
```

필요 파일:

```text
ending_bg_liberation.png
ending_panel_parchment.png
ending_result_ribbon.png
ending_stat_card.png
btn_ending_retry_normal.png
btn_ending_retry_hover.png
btn_ending_home_normal.png
btn_ending_home_hover.png
```

역할:

```text
ending_bg_liberation.png
- 홍해 도하 후 해방과 빛의 배경

ending_panel_parchment.png
- 엔딩 텍스트가 들어가는 중앙 패널

ending_result_ribbon.png
- 당신의 증언 유형 표시 리본

ending_stat_card.png
- 최종 생존 / 공포 / 증언 표시 카드
```

---

## 4-5. 초상화 에셋

초상화는 2단계 이후에 적용한다.

경로:

```text
/assets/ui/portraits
```

플레이어 초상화:

```text
portrait_witness_idle.png
portrait_witness_fear.png
portrait_witness_resolve.png
portrait_witness_wounded.png
portrait_witness_silent.png
```

주변 인물 초상화:

```text
portrait_elder_idle.png
portrait_worker_idle.png
portrait_overseer_idle.png
portrait_child_idle.png
portrait_moses_shadow.png
```

주의:

```text
모세, 다니엘, 예수 등 중심 인물은 직접 조작 대상이 아니므로 과도하게 전면화하지 않는다.
필요할 경우 실루엣, 뒷모습, 상징적 표현을 우선한다.
```

---

# 5. 장면 삽화 에셋 목록

## 5-1. 출애굽 1편: 벽돌과 바다

경로:

```text
/assets/scenes/exodus
```

필요 파일:

```text
scene_01_brickyard.png
scene_02_overseer_whip.png
scene_03_straw_decree.png
scene_04_night_whisper.png
scene_05_blood_nile.png
scene_06_darkness_plague.png
scene_07_passover_lamb.png
scene_08_blood_door.png
scene_09_departure_dawn.png
scene_10_chariots_dust.png
scene_11_red_sea_waiting.png
scene_12_red_sea_crossing.png
```

권장 제작 우선순위:

```text
1순위:
scene_01_brickyard.png
scene_08_blood_door.png
scene_11_red_sea_waiting.png
scene_12_red_sea_crossing.png

2순위:
scene_02_overseer_whip.png
scene_06_darkness_plague.png
scene_10_chariots_dust.png

3순위:
나머지 장면
```

---

# 6. 오디오 에셋 목록

경로:

```text
/assets/audio/bgm
/assets/audio/sfx
```

## BGM

```text
bgm_menu_dark_bricks.mp3
bgm_play_exodus_night.mp3
bgm_roll_tension.mp3
bgm_ending_liberation.mp3
```

## SFX

```text
sfx_click_soft.wav
sfx_choice_hover.wav
sfx_dice_roll.wav
sfx_roll_success.wav
sfx_roll_fail.wav
sfx_bad_ending.wav
sfx_ending_unlock.wav
```

---

# 7. 콘텐츠 데이터 구조

장면 데이터는 다음 형식으로 통일한다.

```json
{
  "id": "scene_01_brickyard",
  "title": "벽돌 굽는 날",
  "art": "assets/scenes/exodus/scene_01_brickyard.png",
  "text": "새벽이 오기 전...",
  "choices": [
    {
      "label": "할당량을 채우기 위해 이를 악문다",
      "risk": 35,
      "effects": {
        "endurance": -2,
        "panic": 1
      },
      "profile": {
        "survival": 2
      },
      "feedbackTitle": "몸은 버텼지만 마음은 굳어졌다",
      "feedback": "당신은 손이 갈라질 때까지 벽돌을 찍었다."
    }
  ]
}
```

---

# 8. 시리즈 제작 템플릿

새 시리즈를 만들 때 필요한 목록은 다음이다.

```text
1. 시리즈 제목
2. 본문 모티프
3. 주인공 위치
4. 목표
5. 주요 상태값
6. 장면 10~15개
7. 즉시 배드엔딩 5~8개
8. 일반 엔딩 3~5개
9. 굿엔딩 1개
10. 숨은 증언 유형 5~6개
11. 장면 삽화 목록
12. BGM / 효과음 목록
```

예시:

```text
시리즈 제목: 각기 옳은 대로
본문 모티프: 사사기
주인공 위치: 산지 마을의 이름 없는 생존자
목표: 무너진 시대 속에서 부르짖음에 이르는 것
```

---

# 9. 제작 우선순위

## 1차 제작

```text
play_frame_overlay.png
play_illustration_frame.png
play_story_panel.png
btn_choice_normal.png
btn_choice_hover.png
icon_dice.png
scene_11_red_sea_waiting.png
scene_12_red_sea_crossing.png
```

## 2차 제작

```text
menu_bg_brickyard.png
menu_chapter_card_normal.png
menu_chapter_card_locked.png
ending_bg_liberation.png
ending_panel_parchment.png
ending_result_ribbon.png
```

## 3차 제작

```text
초상화 세트
주사위 눈 1~6
효과음
BGM
기록 보관소 UI
```

---

# 10. 최종 제작 원칙 요약

```text
1. 글자는 이미지에 넣지 않는다.
2. UI와 삽화는 분리한다.
3. 버튼, 아이콘, 초상화는 개별 이미지로 만든다.
4. 장면 삽화는 챕터별 폴더에 둔다.
5. 같은 시스템으로 여러 시리즈를 만들 수 있게 한다.
6. 새 시리즈는 텍스트와 삽화만 바꿔도 돌아가야 한다.
```
