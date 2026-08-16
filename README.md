# Special Delivery for Lily 💖

A simple romantic digital gift website designed for iPhone 11 screen size.

## How to use

1. Open `index.html` on your phone (or any browser).
2. For best experience, open it in Safari on iPhone and add to Home Screen.

## Files

- `index.html` – main structure
- `css/style.css` – all styling & animations
- `js/script.js` – interactions & logic
- `assets/` – the three images you provided
- `sounds/` – place your music here

## Music (important)

You asked for **“Slide Away” by Oasis**.

Because that song is copyrighted, I cannot include the actual audio file.

**To add it yourself:**

1. Put your `Slide Away.mp3` (or any soft romantic track) inside the `sounds/` folder.
2. Rename it to `ambient.mp3`  
   **or** edit this line in `index.html`:

```html
<source src="sounds/ambient.mp3" type="audio/mpeg">
```

Change the path to match your file name.

The volume is already set to **very soft** (0.18).

## Interaction Sounds

Soft tones are generated with Web Audio API (no extra files needed).  
They play when:
- the box opens
- the flower is tapped (sparkles)
- the envelope opens

## Flow

1. iPhone-style notification slides down from the top  
2. Accept → gift box appears  
3. Tap box → ribbon/opening animation + gifts appear  
4. Tap flower → zoom + butterflies + sparkles  
5. Tap envelope → opens → letter appears  
6. After reading letter → “Continue” → cute receipt appears

## Customization tips

- Change letter text → edit the `<div class="letter-paper">` section in `index.html`
- Change receipt details → edit the receipt section in `index.html`
- Colors & fonts → mainly in `css/style.css`

Enjoy giving it to Lily 💕
