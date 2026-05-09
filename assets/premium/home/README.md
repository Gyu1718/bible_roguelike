# Home Assets Pack

이 폴더는 홈 화면 전용 에셋을 보관하기 위한 경로입니다.

현재 `home-assets.css`는 안전한 구동을 위해 기존 에셋을 참조하고 있습니다. 이후 홈 전용 이미지가 준비되면 아래 파일명으로 교체합니다.

## Backgrounds

- `bg_home_exodus.webp`  
  홈 화면 전체 배경. 예시 화면처럼 어두운 성벽, 노역장, 바다, 밤하늘 분위기를 하나의 시네마틱 배경으로 사용합니다.

## Chapter Cards

- `card_chapter_01.webp`  
  1장 대표 카드. 넓고 낮은 가로형 카드에 맞춘 이미지입니다.

- `card_chapter_02_locked.webp`  
  2장 잠금 카드.

- `card_chapter_03_locked.webp`  
  3장 잠금 카드.

- `card_chapter_04_locked.webp`  
  4장 잠금 카드.

- `card_chapter_05_locked.webp`  
  5장 잠금 카드.

## UI

UI 프레임과 아이콘은 `assets/premium/home/ui/`에 둡니다.

## 적용 방식

이미지를 교체할 때는 `home-screen.css`를 직접 수정하지 않고, 루트의 `home-assets.css` 변수만 변경합니다.
