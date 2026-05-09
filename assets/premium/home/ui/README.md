# Home UI Assets

홈 화면 전용 UI 프레임과 아이콘을 보관하는 폴더입니다.

## Frame Images

- `frame_outer.png`  
  홈 화면 전체 외곽 금장 프레임입니다.

- `panel_sidebar.png`  
  좌측 메뉴 패널 프레임입니다.

- `panel_act_title.png`  
  상단 중앙 막 제목 패널 프레임입니다.

- `frame_chapter_large.png`  
  1장 대표 카드용 대형 프레임입니다.

- `frame_chapter_small.png`  
  잠금 카드 4개에 공통으로 쓰는 소형 프레임입니다.

- `footer_frame.png`  
  하단 성구 영역 프레임입니다.

## Menu Button Images

- `button_menu_normal.png`  
  기본 메뉴 버튼입니다.

- `button_menu_active.png`  
  선택된 메뉴 버튼입니다.

## Icon Images

- `icon_story.png`
- `icon_witness.png`
- `icon_record.png`
- `icon_achievement.png`
- `icon_training.png`
- `icon_setting.png`
- `icon_hourglass.png`

## 적용 방식

실제 이미지가 준비되면 `home-assets.css`에 아래와 같은 변수를 추가해 연결합니다.

```css
:root {
  --home-ui-outer-frame: url("./assets/premium/home/ui/frame_outer.png");
  --home-ui-sidebar-panel: url("./assets/premium/home/ui/panel_sidebar.png");
  --home-ui-act-title: url("./assets/premium/home/ui/panel_act_title.png");
  --home-ui-large-card: url("./assets/premium/home/ui/frame_chapter_large.png");
  --home-ui-small-card: url("./assets/premium/home/ui/frame_chapter_small.png");
}
```
