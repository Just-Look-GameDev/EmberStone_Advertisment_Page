# AI Image Generation Prompts for EmberStone Server

This file contains prompts for generating images to use in the promotional page (`single.html`). Use these prompts with AI image generators like DALL-E, Midjourney, Stable Diffusion, or similar tools.

## Image Specifications
- **Recommended Resolution**: 1920x1080 or 1920x800 (16:9 or wider)
- **Style**: Dark fantasy, atmospheric, fire/ember themed
- **Color Palette**: Deep blacks, oranges, reds, amber/gold accents
- **Mood**: Mysterious, epic, slightly ominous, magical

---

## 1. Hero Image
**File**: `images/hero.jpg` or `images/hero.png`  
**Placement**: Main hero section, top of page  
**Aspect Ratio**: 16:9 or 21:9 (wide)

### Prompt:
```
A dark fantasy landscape showing a fractured Minecraft world at sunset. Massive floating shards of glowing orange and red stone drift in the sky. The ground below is cracked and broken, with embers floating upward. In the distance, a massive glowing crystal (the Emberstone) pulses with inner fire. The sky is dark purple and black with streaks of orange light. Minecraft blocky aesthetic but with dramatic lighting and atmospheric effects. Cinematic, epic, mysterious mood. Dark fantasy art style.
```

### Alternative Prompt (More Abstract):
```
Abstract representation of the EmberStone world: fractured reality with glowing orange and red shards floating in darkness. Embers drift upward like fireflies. A central glowing crystal pulses with energy. Dark fantasy, atmospheric, mysterious. Cinematic lighting with deep shadows and warm firelight. Minecraft-inspired but highly stylized.
```

---

## 2. Dungeon Interior Image
**File**: `images/dungeon.jpg` or `images/dungeon.png`  
**Placement**: Dungeons gamemode section  
**Aspect Ratio**: 16:9

### Prompt:
```
Interior of a dark, broken dungeon in Minecraft style. Stone walls are cracked and bent at impossible angles, as if reality itself is fractured. Glowing orange embers float in the air. Ancient mechanisms and gears are embedded in the walls, pulsing with warm light. Corridors repeat and fold in on themselves. A player character (Minecraft style) stands in the foreground, holding a glowing weapon. The atmosphere is ominous but magical. Dark fantasy, atmospheric lighting with orange and red glows. Cinematic perspective.
```

### Alternative Prompt (More Action-Oriented):
```
Minecraft dungeon scene: A player character in armor stands ready in a fractured stone corridor. The walls bend and warp unnaturally. Glowing orange shards float in the air. In the background, a massive boss creature made of fire and stone (a "prisoner boss") looms. The dungeon feels alive and wrong. Dark fantasy, dramatic lighting, orange and red color palette. Epic, cinematic composition.
```

---

## 3. Future Gamemodes Teaser Image
**File**: `images/future.jpg` or `images/future.png`  
**Placement**: "More Gamemodes Coming" section  
**Aspect Ratio**: 16:9

### Prompt:
```
A mysterious, wide shot of the EmberStone world showing multiple different landscapes connected by glowing paths of fire. On the left, a dungeon entrance glows. In the center, a massive city carved into a mountain (hinting at future gamemodes). On the right, a vast wasteland with floating shards. The sky shows the fractured reality with multiple layers. Embers drift everywhere. Minecraft blocky style but with epic, cinematic composition. Dark fantasy, atmospheric. The image should tease multiple possible gamemodes without being too specific.
```

### Alternative Prompt (More Abstract):
```
Concept art showing the fractured EmberStone world with multiple paths branching out like a tree. Each path leads to a different glowing area: one to a dungeon, one to a city, one to a wasteland, one to unknown territories. The central Emberstone crystal pulses at the heart. Glowing orange and red embers connect everything. Dark fantasy, mysterious, epic scale. Minecraft-inspired but highly stylized. Teaser/promotional art style.
```

---

## 4. Optional: Base/Personal Area Image
**File**: `images/base.jpg` or `images/base.png`  
**Placement**: Could be added to Personal Bases feature  
**Aspect Ratio**: 16:9

### Prompt:
```
A player's personal base in Minecraft, carved downward into the earth like a spiral. Multiple levels descend deeper, each level glowing warmer with orange and red light. Forges, crafting tables, and storage areas are visible. The architecture is ancient and fire-themed, with ember veins running through the stone walls. A player character stands at the entrance, looking down into the depths. Warm, inviting but mysterious atmosphere. Dark fantasy, atmospheric lighting. Minecraft blocky style with dramatic lighting.
```

---

## 5. Optional: Emberbound Character Image
**File**: `images/emberbound.jpg` or `images/emberbound.png`  
**Placement**: Could be added to Emberbound section  
**Aspect Ratio**: 4:3 or 16:9

### Prompt:
```
A Minecraft character (the Emberbound) standing heroically. They wear armor that glows with inner fire, orange and red embers floating around them. Their eyes glow with warm light. In their hand, a weapon that pulses with energy, as if it "remembers" them. The background is a fractured, dark landscape with floating shards. The character radiates heat and power. Dark fantasy, epic, cinematic. Minecraft character style but with dramatic lighting and effects.
```

---

## 6. Optional: Boss/Prisoner Image
**File**: `images/boss.jpg` or `images/boss.png`  
**Placement**: Could be added to Prisoner Bosses feature  
**Aspect Ratio**: 16:9

### Prompt:
```
A massive boss creature in Minecraft style, bound by glowing orange chains made of fire and reality shards. The creature is a "prisoner boss" - part stone, part fire, part something else. It's trapped in a dungeon chamber, its body reforged and bound to unstable reality. The creature looks both powerful and tragic, a warning rather than just an enemy. Dark fantasy, dramatic, atmospheric. Cinematic boss encounter composition. Orange and red color palette with deep shadows.
```

---

## Usage Instructions

1. **Generate Images**: Use the prompts above with your preferred AI image generator (DALL-E, Midjourney, Stable Diffusion, etc.)

2. **Save Images**: Save generated images in an `images/` folder:
   - `images/hero.jpg` (or `.png`)
   - `images/dungeon.jpg`
   - `images/future.jpg`
   - (Optional: `images/base.jpg`, `images/emberbound.jpg`, `images/boss.jpg`)

3. **Update HTML**: In `single.html`, uncomment and update the image loading code at the bottom:
   ```javascript
   loadImage(document.querySelector('.hero-img'), 'images/hero.jpg');
   loadImage(document.querySelector('.dungeon-img'), 'images/dungeon.jpg');
   loadImage(document.querySelector('.future-img'), 'images/future.jpg');
   ```

4. **Optimize**: Compress images for web use (use tools like TinyPNG or ImageOptim) to keep page load times fast.

---

## Style Guidelines for All Images

- **Color Palette**: 
  - Primary: Deep black (#0a0a0a), Dark red/brown (#1a0a0a)
  - Accent: Orange (#ff6a00), Amber (#ff8c42), Gold (#b8860b)
  - Glow: Warm orange/red glows, fire effects

- **Mood**: 
  - Mysterious, epic, slightly ominous
  - Not too dark/horror, but not bright/cheerful
  - Magical, atmospheric, cinematic

- **Minecraft Style**: 
  - Blocky, pixelated aesthetic
  - But with dramatic lighting and atmospheric effects
  - Should feel like Minecraft but look epic and cinematic

- **Consistency**: 
  - All images should feel like they're from the same world
  - Similar color palette and mood across all images
  - Consistent lighting style (warm firelight, deep shadows)

---

## Tips for Best Results

1. **Iterate**: Generate multiple variations and pick the best ones
2. **Adjust Prompts**: Modify prompts based on what works with your AI tool
3. **Negative Prompts** (if supported): Add things like "no bright colors, no happy mood, no modern elements"
4. **Aspect Ratios**: Specify the exact aspect ratio in your prompt if the tool supports it
5. **Style References**: You can reference "dark fantasy game art" or "concept art style" if your tool supports it

---

## Alternative: Manual Creation

If AI generation doesn't work well, you can also:
- Commission an artist
- Use Minecraft screenshots with heavy post-processing
- Create composite images from existing assets
- Use placeholder images temporarily and replace later

