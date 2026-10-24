# GI Symptoms Reference

A single-page study reference for gastrointestinal conditions. A sidebar lists the conditions, and the main panel shows the selected condition's pathophysiology, etiology, symptoms and complications, diagnosis, and treatment. The content is written to be scanned: causal pathways are drawn as flows, abbreviations have hover definitions, and increases and decreases are marked visually.

No build step, framework, or dependencies. It is plain HTML, CSS, and JavaScript.

## Conditions covered

- Esophagitis
- Esophageal motility disorders
- GERD
- Gastritis
- Peptic ulcer disease (PUD)
- Malabsorption
- Diverticular diseases
- Inflammatory bowel disease (IBD)
- Irritable bowel syndrome (IBS)
- Diarrhea
- Intestinal ischemia

## Running it

Open `index.html` in any modern browser. The three files must stay in the same folder.

```
.
├── index.html   # Structure and all condition content
├── style.css    # Design tokens and components
└── script.js    # Navigation, cross-links, tooltips
```

## Features

- **Sidebar navigation:** selecting a condition shows its article and scrolls the panel back to the top.
- **Cross-links:** buttons such as "see Malabsorption" jump to another condition and update the sidebar.
- **Abbreviation tooltips:** hover, focus, or tap an abbreviation for its definition. The tooltip is a single shared element positioned from the term's location, so it is never clipped by tables or the scrolling panel, and it stays inside the window.
- **Increase and decrease indicators:** green up-triangles, red down-triangles, and amber dots, always paired with a word so color is never the only signal.
- **Responsive layout:** the sidebar stacks above the content on narrow screens, grids collapse to fewer columns, and flow diagrams read top to bottom on phones.
- **Accessibility:** buttons are real `<button>` elements, tooltips work with the keyboard (Tab to focus, Esc to close), focus states are visible, and animations are disabled for people who prefer reduced motion.

## Page structure

Every condition is an `<article class="condition-content">` whose `id` matches its sidebar button's `data-condition`. Each article follows the same order, using `<section class="content-section">` blocks:

1. Pathophysiology
2. Etiology
3. Symptoms and complications
4. Diagnosis
5. Treatment

## Adding or editing a condition

1. In the sidebar `<nav>`, add or find the button:
   ```html
   <button type="button" class="condition-item" data-condition="my-condition">My condition</button>
   ```
2. Add (or fill in) the matching article inside `#content-panel`:
   ```html
   <article class="condition-content" id="my-condition">
       <h2>My condition</h2>
       <section class="content-section">
           <h3>Pathophysiology</h3>
           <p>...</p>
       </section>
   </article>
   ```
3. The `id` and `data-condition` values must match exactly. No JavaScript changes are needed.

## Component reference

### Abbreviations

```html
<abbr class="term" tabindex="0" data-definition="Lower esophageal sphincter">LES</abbr>
```

`tabindex="0"` is required so keyboard and touch users can reach it.

### Increase and decrease indicators

```html
<span class="change up">Increased</span> HCl production
<span class="change down">Decreased</span> mucus production
<span class="change erratic">Disorganized</span> motility
```

Wrap only the word, not the whole phrase.

### Causal chains (vertical, inside a column)

```html
<div class="etiology-column">
    <h4>Cause</h4>
    <ul class="step"><li>First step</li></ul>
    <div class="arrow-down" aria-hidden="true"></div>
    <ul class="step"><li>Next step</li></ul>
</div>
```

Place columns inside `etiology-grid-2`, `-3`, `-4`, or `-5`.

### Cause-and-effect lanes (horizontal, left to right)

```html
<div class="lane-list">
    <div class="chain-lane">
        <div class="chain">
            <div class="chain-stage chain-start">
                <div class="chain-node start">Start</div>
            </div>
            <div class="chain-arrow" aria-hidden="true"></div>
            <div class="chain-stage">
                <div class="chain-node">Result A</div>
                <div class="chain-node">Result B</div>
            </div>
        </div>
    </div>
</div>
```

Nodes in the same stage are parallel effects. Use `.node-label` inside a node for a smaller grey note. Lanes switch to vertical below 700px.

### Other components

| Component | Classes | Used for |
|---|---|---|
| Pills | `chip-list` | Short facts, symptoms, drug names |
| Plain list | `bullet-list` | Test or drug lists inside table cells |
| Table | `table-wrap` > `data-table` | Comparisons and "if there is / then" lookups. Add `<tr class="group-row">` for group headings |
| Two-column symptoms layout | `sc-grid` with `sc-heading`, `chip-list`, `complication-list` | Symptoms (pills) and complications (ledger list) |
| Flowchart | `flow` > `flow-step` (`flow-condition`, `flow-action`) | Sequential diagnostic steps |
| Diagnostic tests | `test-list` (+ `gold-standard`) | Side-by-side tests, with a highlighted preferred test |
| Branching diagnosis | `branch-grid` > `branch` (`branch-label`) | One test that splits into two paths |
| Drug formula | `formula` > `formula-item` and `formula-plus` | Combination regimens |
| Treatment pyramid | `pyramid-wrap` > `pyramid` > `pyramid-tier tier-1`..`tier-5` | Step-up therapy |
| Feature card | `etiology-column etiology-feature` + `feature-grid` | A cause that needs more room than a column |
| Callout | `note` | Important side notes |
| Badge | `badge` (`badge-block` to put it on its own line) | "Most common", "Gold standard", etc. |
| Sub-block | `subsection` | Spacing between blocks inside a section |
| Muted text | `muted`, `sc-note`, `lane-title` | Secondary labels |

### Cross-links between conditions

```html
<button type="button" class="link-button" data-goto="malabsorption">Malabsorption</button>
```

`data-goto` takes the target condition's `id`.

## Styling

Colors, radii, and the shadow are CSS variables on `:root` in `style.css` (`--color-text`, `--color-border`, `--color-accent`, and so on). Changing them there updates the whole page. The palette is intentionally black, white, and grey, with green, red, and amber used only for the increase, decrease, and disorder indicators.

## Browser support

Current versions of Chrome, Edge, Firefox, and Safari. It uses CSS grid, flexbox, custom properties, `aspect-ratio`, and `:focus-visible`.

## Content notes

- This is a study aid, not a clinical reference. It should not be used to make treatment decisions.
- Several abbreviation definitions were written from general knowledge, so verify them against your course materials or a trusted source.
- Some items depend on which guideline or course is used (for example the Rome criteria version, colonoscopy timing in diverticulitis, and the layer ulcers extend past in PUD). Check them against your own source.
