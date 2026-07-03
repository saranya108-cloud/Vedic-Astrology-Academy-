# User Testing Report — Vedic Astrology Academy

**Date:** 2026-07-03
**Method:** Automated real-browser testing (Chromium via Playwright) simulating a real user: clicking every chart cell, opening all six modules, taking both quizzes (including wrong answers), and viewing the app on desktop (1280×900) and mobile (375×812) viewports. Complemented by a code review of `index.html`.

---

## 🔴 Critical — functional bug

### 1. Five of the twelve chart cells are dead — clicking them does nothing
Clicking **Meena, Mesha, Vrishaba, Mithuna, and Kumbha** produces no response. Notably, **Vrishaba is the example Lagna cell** — the first cell a curious user is likely to click. The other seven cells work.

**Root cause:** in `initChart()` the center block is inserted with `grid.innerHTML += ...` (index.html, `initChart`). Assigning to `innerHTML` re-parses the grid's existing HTML, which recreates the previously appended cells as new DOM nodes **without their `onclick` handlers** (handlers assigned as JS properties don't survive serialization). Every cell appended *before* the center block (the first five in `gridOrder`) loses its click handler.

**Fix:** build the center block with `document.createElement` + `appendChild` (or `insertAdjacentHTML`) instead of `innerHTML +=`.

Verified click-by-click:

| Cell | Result |
|------|--------|
| Meena, Mesha, Vrishaba (Lagna), Mithuna, Kumbha | ❌ Dead — no lesson shown |
| Karka, Makara, Simha, Dhanu, Vrischika, Tula, Kanya | ✅ Lesson shown, house numbers correct |

---

## 🟠 Major — mobile layout breaks

### 2. Horizontal overflow on phones
At a 375px-wide viewport (iPhone size) the page scrolls sideways: document width measured **438px vs a 375px viewport**. The `.jyotish-grid` (fixed `width: 400px` + 4px borders = 408px) and `.panel` (400px + padding = 428px) don't shrink. The chart's right column is clipped off-screen.

**Fix:** `width: min(400px, 100%)` (with `aspect-ratio: 1` for the grid) or media queries; use `box-sizing: border-box` on the panel.

---

## 🟠 Major — quiz experience

### 3. Quizzes give feedback via blocking `alert()` popups
Every answer triggers a browser alert. The educational payoff (degrees, ruler, deity) appears **inside the alert** and vanishes the instant it's dismissed. On correct answers the next question loads immediately with no pause to absorb the answer.

### 4. Quizzes can be brute-forced and never end
A wrong answer just shows "Try again!" and leaves all options clickable — in testing, clicking options in order reached "Correct!" in 3 clicks with no penalty. There is **no score, no question counter, no completion state** — the quiz loops forever until the user gives up and clicks Back. A real learner gets no sense of progress or mastery.

### 5. Yoga quiz mangles the question text
Question text is generated with `.toLowerCase()` on the formation rule, destroying proper nouns. Real questions observed:

> "Which yoga is formed when **moon and mars** conjunct or in mutual aspect?"
> "Which yoga is formed when **saturn** in its own sign (**capricorn/aquarius**) or exalted (**libra**) in a kendra from the **lagna**?"

Sun, Moon, sign names, and "Lagna" should stay capitalized; the lowercasing also makes some questions grammatically awkward.

### 6. Ambiguous nakshatra quiz questions
Symbols overlap between nakshatras: **"Elephant Tusk"** appears for both Purva Ashadha and Uttara Ashadha, and **"Lotus"** for both Pushya and Anuradha. When both appear as options for a symbol question, a knowledgeable learner can defensibly pick the "wrong" one.

### 7. Repeated questions
Questions are picked with `Math.random()` and no memory, so the same question can appear twice in a row. (The `sort(() => Math.random() - 0.5)` shuffle is also statistically biased — minor.)

---

## 🟡 Accessibility

### 8. Core interactions are mouse-only
Chart cells and quiz options are plain `<div>`s with `onclick`: not focusable (`tabIndex` unset), no `role`, no keyboard handlers, no focus styles, and no ARIA labels. A keyboard-only or screen-reader user cannot click chart cells or answer a single quiz question. Module buttons are real `<button>`s and work fine.

**Fix:** use `<button>` for cells/options, or add `tabindex="0"`, `role="button"`, and Enter/Space handlers; add `:focus-visible` styles.

---

## 🟢 Minor / polish

9. **Title mismatch:** browser tab says "Vedic **Jyotish** Academy", the page heading says "Vedic **Astrology** Academy".
10. **Center label** reads "MY CHART" though it's a fixed example chart — "Example Chart" would set expectations better.
11. **Spelling:** "Vrishaba" — commonly transliterated "Vrishabha" (also in README).
12. **No feedback when a lesson loads** on desktop: the lesson text swaps silently in the right panel; on smaller screens where the panel is below the chart, the user may not notice anything happened at all (once the dead-cell bug is fixed, this matters more on mobile).

---

## ✅ What works well

- All six modules render complete, correct content (27 nakshatras, 26 yogas across both tabs, 9 grahas, 10 dasha cards, 12 houses, 6 aspect rules) and every "Back to Study" button returns correctly.
- House numbering relative to the Taurus Lagna is calculated correctly on the working cells.
- Element color-coding of signs is correct (fire/earth/air/water).
- No JavaScript console errors anywhere in the session.
- Desktop layout is attractive and readable.

## Suggested fix priority

1. Dead chart cells (one-line cause, breaks the headline feature)
2. Mobile overflow
3. Replace `alert()` quizzes with inline feedback + scoring
4. Keyboard/ARIA accessibility
5. Text polish (lowercased yoga questions, title mismatch, spelling)
