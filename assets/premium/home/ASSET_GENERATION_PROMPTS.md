# Home Asset Generation Prompts

이 문서는 홈 화면을 기준 이미지처럼 구현하기 위해 필요한 분리 에셋 생성 프롬프트입니다.

중요 원칙:

```text
Do not include any Korean text, English text, UI labels, buttons, icons, menus, borders, frames, or readable symbols unless specifically requested. This asset will be used behind HTML/CSS UI.
```

## 1. home-bg.png

Target path:

```text
assets/premium/home/home-bg.png
```

Size:

```text
1672x941
```

Prompt:

```text
Create a 1672x941 dark biblical fantasy background illustration for a game home screen.

No UI, no text, no buttons, no icons, no menus, no borders, no frames, no readable symbols.

Scene:
An ancient biblical city at night beside a dark sea. Many exhausted people are building stone walls with bricks and torches. The atmosphere is solemn and sacred. A large lone witness figure is positioned in the lower-left foreground, sitting or standing on an unfinished stone wall, looking over the city. In the distance are unfinished walls, workers, small firelights, a dark coastline, waves, and a moonlit sea.

Composition requirements:
- Leave the left side dark enough for a vertical sidebar UI.
- Leave the right-center area visually rich but not too bright, so chapter cards can be placed over it.
- Keep the top center dark enough for a small chapter banner.
- The lower center should have enough dark space for a scripture quote.
- Do not place any readable text anywhere.
- Do not include modern objects.
- Do not include UI elements.

Style:
dark biblical fantasy, ancient Near Eastern atmosphere, cinematic lighting, painterly realism, deep navy shadows, black stone, burnt umber torchlight, antique gold highlights, dramatic clouds, sacred solemn mood, high detail, game background art.
```

## 2. chapter-1-bg.png

Target path:

```text
assets/premium/home/chapter-1-bg.png
```

Size:

```text
909x292
```

Prompt:

```text
Create a 909x292 dark biblical fantasy chapter card background.

No text, no UI, no borders, no button, no icons.

Scene:
Ancient workers building a massive stone wall by the sea at night. The left side should be darker to allow Korean title text overlay. The right side should show the sea, moonlight, torches, and distant city lights. The mood is solemn, sacred, and cinematic.

Style:
dark biblical fantasy, painterly realism, antique gold torchlight, deep navy night sky, ancient Near Eastern stone city, high detail, dramatic atmosphere.

Composition:
- Left 35% must be dark and readable for text overlay.
- Right 65% may contain the main visual action.
- No readable text.
- No frame.
```

## 3. chapter-2-bg.png

Target path:

```text
assets/premium/home/chapter-2-bg.png
```

Size:

```text
426x160
```

Prompt:

```text
Create a 426x160 dark biblical fantasy chapter preview background.

No text, no UI, no border, no lock icon.

Scene:
Ruined ancient city streets after hardship, broken stones, dim torchlight, dark sky, solemn biblical atmosphere.

Style:
very dark, desaturated, antique gold highlights, painterly realism, cinematic, low contrast because this is a locked chapter preview.
```

## 4. chapter-3-bg.png

Target path:

```text
assets/premium/home/chapter-3-bg.png
```

Size:

```text
470x160
```

Prompt:

```text
Create a 470x160 dark biblical fantasy chapter preview background.

No text, no UI, no border, no lock icon.

Scene:
A stormy dark sea at night, moonlight breaking through clouds, waves and rocks, sacred and ominous biblical atmosphere.

Style:
very dark, deep navy, antique gold accents, painterly realism, cinematic, low contrast because this is a locked chapter preview.
```

## 5. chapter-4-bg.png

Target path:

```text
assets/premium/home/chapter-4-bg.png
```

Size:

```text
426x160
```

Prompt:

```text
Create a 426x160 dark biblical fantasy chapter preview background.

No text, no UI, no border, no lock icon.

Scene:
A distant ancient city burning under a dark sky, orange firelight, smoke, silhouettes of people, solemn biblical judgment atmosphere.

Style:
dark biblical fantasy, painterly realism, burnt umber firelight, black shadows, low contrast, cinematic.
```

## 6. chapter-5-bg.png

Target path:

```text
assets/premium/home/chapter-5-bg.png
```

Size:

```text
470x160
```

Prompt:

```text
Create a 470x160 dark biblical fantasy chapter preview background.

No text, no UI, no border, no lock icon.

Scene:
A dark ancient fortress or temple gate under moonlight, ruined walls, distant torches, sacred ominous atmosphere.

Style:
dark biblical fantasy, painterly realism, deep shadows, antique gold torchlight, low contrast.
```

## 7. logo-flame.svg or logo-flame.png

Target path:

```text
assets/premium/home/ui/logo-flame.svg
```

Prompt:

```text
Create a transparent emblem logo for a dark biblical fantasy game titled Unnamed Witnesses.

No text.

Subject:
A sacred flame shaped like an ancient biblical seal, with subtle cross-like geometry inside. It should feel like a holy witness mark, not a modern church logo.

Style:
antique gold, engraved metal, ancient manuscript ornament, sacred flame, symmetrical, high detail, dark fantasy biblical UI, transparent background.

Size:
512x512 source, centered, icon must remain readable at 74x103 pixels.

Colors:
antique gold, muted bronze, slight warm glow, no bright modern colors.
```

## 8. icon-lock.svg

Target path:

```text
assets/premium/home/ui/icon-lock.svg
```

Prompt:

```text
Create a transparent SVG or PNG lock icon for a dark biblical fantasy game UI.

Subject:
An antique lock placed inside a thin diamond-shaped ornamental frame.

Style:
ancient gold engraved line art, biblical manuscript ornament, dark fantasy UI, symmetrical, readable at 67x67 pixels, transparent background.

Colors:
antique gold stroke, dark bronze shadow, subtle inner glow.

No text.
No background.
```
