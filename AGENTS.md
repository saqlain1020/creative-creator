# AGENTS.md — Creative Creator

Guidance for AI agents and humans working on this repo.

## What this is

A React + Vite webapp that builds **1080×1080** (and optionally **1080×1350 / 4:5**) social creatives from templates. Users pick a layout, edit text/colors, upload logo + product image, and download a PNG.

Brand context from the original briefs: jewelry / luxury social ads (AIZÉL-style), but templates should stay **content-driven** via shared fields — not hard-coded to one brand.

## Commands

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # tsc -b && vite build
npm run lint
```

Stack: React 19, TypeScript, Vite 8, `html-to-image` for export. No router, no state library.

## Architecture (read this first)

| Path | Role |
|------|------|
| `src/types.ts` | `TemplateId`, `CreativeContent`, `CreativeColors`, `CreativeLayout`, `TemplateMeta` |
| `src/data/templates.ts` | Classic templates + merges other batches; **rewrites `preview` to `/templates/preview-{id}.png`** |
| `src/data/newTemplates.ts` | Extra imaginative templates (batch 1) |
| `src/data/wave2Templates.ts` | Extra imaginative templates (batch 2) + photo overlays |
| `src/data/starThemeTemplates.ts` | Stars / constellation-themed templates |
| `src/data/templateFields.ts` | **Per-template editor fields + colors** (what the form shows) |
| `src/data/fieldTune.ts` | Shared size tokens + `offsetY` helpers (`fieldSizePx`, `fieldOffsetY`, `patchFieldTune`) |
| `src/components/editor/` | Reusable form controls: `ChoiceRow`, `SizePicker`, `OffsetYPicker` |
| `src/components/templates/registry.tsx` | Maps `TemplateId` → component |
| `src/components/templates/*.tsx` | Classic layouts |
| `src/components/templates/extras/*.tsx` | Newer layouts |
| `src/components/templates/templates.css` | Classic layout CSS |
| `src/components/templates/extras/extras.css` | Extra layout CSS (batch 1) |
| `src/components/templates/extras/wave2.css` | Extra layout CSS (batch 2 + overlays) |
| `src/components/CreativeCanvas.tsx` | Scaled artboard + export target (size from `getArtboardSize`) |
| `src/utils/artboardSize.ts` | Square 1080×1080 vs 4:5 1080×1350 |
| `src/components/EditorForm.tsx` | Uploads + fields driven by `templateFieldConfig` |
| `src/components/TemplatePicker.tsx` | Compact grid; thumbs are captured PNGs |
| `src/App.tsx` | State: `templateId`, `content`; preserve user uploads on switch |
| `src/utils/exportCreative.ts` | PNG export via `html-to-image` |
| `src/utils/embedFonts.ts` | Inline Google Fonts as data URLs for export |
| `src/utils/templateQuery.ts` | Read/write `?template=` in the URL |
| `src/utils/colorTone.ts` | `isLightColor()` for white vs black overlays |
| `src/CapturePreviews.tsx` | Dev-only PNG capture of every template |
| `vite.config.ts` | Dev middleware `POST /__save-preview` writes thumb files |
| `public/samples/` | Default product images |
| `public/logos/` | Default brand marks (e.g. AIZÉL watermark) |
| `public/templates/` | Picker thumbs: `preview-{templateId}.png` |

### Data flow

```
URL ?template=id → App initial template (unknown id → split-editorial)
TemplatePicker  → set templateId + write ?template= + load defaults (keep data: URLs)
EditorForm      → mutates CreativeContent (only configured fields)
CreativeCanvas  → renderTemplate(id, content) inside artboard (1080×1080 or 1080×1350)
Download PNG    → html-to-image on artboard node (not the scaled wrapper)
```

### Shared content model

Every template reads from `CreativeContent`:

- Text: `brandPrefix`, `brandName`, `brandTagline`, `headline`, `subheadline`, `accentLine`, `bodyTitle`, `bodyText`, `ctaText`, `website`, `sideText`
- Layout: optional `layout` (`CreativeLayout`) — per-field `{ size?: SizeToken, offsetY?: number }`. Use this instead of stuffing size/position into unused text fields.
- Media: `logoUrl`, `productImageUrl` (`null` or URL / data URL)
- Colors: `background`, `accent`, `text`, `muted`, `surface` (CSS variables on the root `.tpl`)

**Rule:** If a control appears in the editor, it must affect the visible creative. If a template doesn’t use a field/color, omit it from `templateFieldConfig`.

## URL query params

No router. `App` syncs the active layout with the address bar:

- Param: `template` (value = `TemplateId`, e.g. `?template=logo-watermark`)
- Selecting a template calls `writeTemplateQuery()` (`history.replaceState`)
- Visiting with a valid param auto-selects that template and loads its defaults
- Invalid / missing param falls back to `split-editorial`
- Helpers: `src/utils/templateQuery.ts`

Shareable links are the `TemplateId` string. New ids work automatically once they are on the union and in `templates`.

## Picker thumbnails

Thumbs are **real exported creatives**, not product-crop CSS mocks.

- File: `public/templates/preview-{id}.png` (e.g. `preview-script-overlay.png`)
- `templates.ts` overwrites every `preview` field via `templatePreviewPath()`
- `TemplatePicker` always renders `template.preview` as a square `<img>`
- Do **not** add `.picker__thumb--{id}` CSS; those rules were removed

### Regenerating thumbs

Dev-only capture page (not in the production bundle):

1. `npm run dev` (the Vite plugin that saves files only runs in `serve`)
2. Open `http://localhost:5173/?capture=1` (or whatever port Vite prints)
3. Optional: `&only=script-overlay` to recapture one template
4. Wait until the page says `Saved N previews`
5. Files land in `public/templates/preview-{id}.png`

`src/CapturePreviews.tsx` renders each template at 1080, waits for images + fonts, `toPng` at `pixelRatio: 0.5`, then `POST /__save-preview`. Recapture after any visual change to a template (layout, default copy, font, default photo).

## Adding a new template (checklist)

Do **all** of these or the template will be broken / show dead controls / a broken thumb:

1. **Add id** to `TemplateId` union in `src/types.ts`.
2. **Add defaults** in `src/data/wave2Templates.ts` (or `newTemplates.ts` / `templates.ts`) — copy, colors, sample `productImageUrl`.
3. **Add field config** in `src/data/templateFields.ts` — only used fields/colors; set `showLogo` / `logoReplacesBrand` / `logoHint` if needed. For per-field size or Y offset, add `layoutControls` and matching `defaults.layout`.
4. **Create component** under `src/components/templates/` or `extras/`.
   - Root: `<div className="tpl tpl-yourname" style={{ '--bg', '--accent', ... }}>`
   - Product: `<ImageSlot className="tpl-product-image" ... />`
   - Logo: use `className="tpl-logo"` (never rely on global `img { width/height: 100% }`).
5. **Register** in `src/components/templates/registry.tsx`.
6. **CSS** in `templates.css`, `extras/extras.css`, or `extras/wave2.css` — default artboard is **1080×1080**; Script Overlay can switch to **1080×1350** (4:5) via `ctaText`. Use absolute/grid inside `.tpl`.
7. **Capture picker PNG** with `/?capture=1&only=your-id` (see above).
8. **Verify:** `npm run build`, open `?template=your-id`, change every exposed field/color, confirm export.

### Template CSS conventions

- Artboard default **1080×1080** (`.tpl`). Script Overlay may set inline `width`/`height` to **1080×1350** for 4:5. Preview scales via transform in `CreativeCanvas` — export node must **not** include the scale transform. Size helper: `src/utils/artboardSize.ts`.
- Prefer CSS variables: `--bg`, `--accent`, `--text`, `--muted`, `--surface`.
- Product fills: `.tpl-product-image { width/height: 100%; object-fit: cover }`.
- Logos: `.tpl-logo` / `.tpl-logo--sm` only (watermark template overrides size on `.tpl-mark__logo`).
- Decorative overflow (watermarks) is OK if `.tpl { overflow: hidden }` clips it.
- Keep layers intentional (`z-index`); badges that sit on seams should outrank footers.

### Editor / upload behavior

- Switching templates loads that template’s defaults but **keeps** `logoUrl` / `productImageUrl` only if they are `data:` URLs (user uploads). Sample paths reset per template.
- Reset restores full defaults for the active template (clears uploads).
- `logoReplacesBrand: true` hides brand prefix/name fields when a logo is present — component should replace brand typography with the logo image.
- `logoHint` is the empty-state copy under the logo uploader (e.g. watermark templates).
- Color fields may set `swatches: [{ label, value }]` instead of a free color picker. Use this for **White / Black** overlay templates; store the choice in `colors.text` (`#ffffff` / `#000000`).
- `fontChoices` renders a typeface picker (sample of “New” in each face). Store the selected `family` in an unused text field (script overlay uses `sideText`). Options live in `src/data/scriptFonts.ts`.
- `choiceSets` renders compact option rows via `ChoiceRow` (alignment, aspect, etc.). Script overlay stores alignment in `brandTagline` (`left` / `center` / `right`) and aspect in `ctaText` (`1:1` / `4:5`).
- `layoutControls` renders reusable size/position pickers. `kind: 'size'` → `SizePicker` (XS–XL, stored in `content.layout[key].size`). `kind: 'offsetY'` → `OffsetYPicker` (slider in px, stored in `content.layout[key].offsetY`). Templates read these with `fieldSizePx` / `fieldOffsetY` from `src/data/fieldTune.ts`. To add the same controls to another template: declare `layoutControls` in `templateFieldConfig`, set `defaults.layout`, then apply the helpers in the template component.
- `isLightColor()` in `src/utils/colorTone.ts` decides light vs dark overlay CSS (text color, logo `filter: brightness(0) invert(1)` for white).

### Photo overlay templates

Full-bleed photo + type/logo on top. Keep using the shared schema (no extra content fields for “tone”).

| Id | Name | Notes |
|----|------|--------|
| `logo-watermark` | Logo Watermark | Default logo `/logos/aizel-logo-3d.png` (cropped AIZÉL wordmark). Semi-transparent centered watermark; optional `website` at the bottom. `showLogo: true`. White/black tints the PNG via CSS filter. |
| `script-overlay` | Script Overlay | Script `headline` + `subheadline` at top; `bodyText` + `website` at bottom. Type as written (no forced caps). White/black via `colors.text`. Font in `sideText`. Align in `brandTagline`. Aspect in `ctaText` (`1:1` = 1080×1080, `4:5` = 1080×1350). Per-field sizes + script Y offset in `content.layout`. Empty lines hide. No logo. |

Script faces (Google Fonts, loaded in `index.html`): **Ballet** (default, `opsz` 72), **Bodoni Moda** (`opsz` 96, serif), Fleur De Leah, Lavishly Yours, Miss Fajardose, Rouge Script, The Nautigal. ALS Script is **not** a free webfont — Miss Fajardose is the closest looping alternative. To use a licensed/local TTF, add it under `public/fonts/` with `@font-face` and add a `SCRIPT_FONTS` entry.

## UI / layout (desktop)

- App is **viewport-locked** on desktop (`100dvh`, `overflow: hidden`).
- Left sidebar splits:
  - **Picker** — compact 2-col grid, own scroll, capped height
  - **Editor** — fills remaining height, scrolls independently; scrolls to top on template change
- Preview panel fills the right column and scales the artboard to fit.
- Stack / horizontal template strip only below ~980px.

When changing chrome CSS, preserve this split-scroll behavior — don’t put picker + editor in one long scroll on desktop.

## Design direction

- Luxury / editorial / experimental social ads are in scope.
- Avoid generic AI-looking chrome: purple gradients, default Inter-only UI, cluttered dashboards.
- Template creatives can be bold; the **app chrome** stays warm neutral + forest green (`App.css` / `index.css` variables).
- Fonts loaded in `index.html`: Playfair Display, Cormorant Garamond, Great Vibes, Montserrat, DM Sans, Bebas Neue, Syne, Caveat, The Nautigal, Ballet, **Bodoni Moda**, Fleur De Leah, Lavishly Yours, Miss Fajardose, Rouge Script. Add new Google fonts there if a template needs them — and to `SCRIPT_FONTS` if they are script-overlay choices.

## Export

- Target: `.canvas-panel__artboard` (unscaled).
- `pixelRatio: 2` in `exportCreative.ts` (`artboardToPngDataUrl`).
- Cross-origin images can break export; prefer `/public` samples or data URLs from uploads.
- Google Fonts stylesheets are cross-origin, so `html-to-image` cannot read `@font-face` from `document.styleSheets` and the PNG falls back to Times/Arial/cursive. **Fix:** `src/utils/embedFonts.ts` fetches the Google CSS, inlines used `woff2` files as data URLs, and passes `fontEmbedCSS` into `toPng`. First export per session may be a second slower while fonts download.
- Wait for `document.fonts.ready` before capture/export. Do not set `skipFonts: true`.

## Quality bar before finishing a task

- [ ] `npm run build` passes
- [ ] No dead editor fields for the templates you touched
- [ ] No element overflowing the 1080 canvas unintentionally
- [ ] Logo + product upload still work
- [ ] Desktop sidebar still split-scrolls (templates visible while editing)
- [ ] PNG download still works after layout changes
- [ ] New/changed templates have a fresh `public/templates/preview-{id}.png`
- [ ] `?template={id}` selects the new layout

## Don’t

- Don’t add exploit/malware tooling or unrelated scope.
- Don’t commit secrets.
- Don’t use `img { width: 100%; height: 100% }` under `.tpl` without excluding logos.
- Don’t put export `ref` on the scaled zoom wrapper.
- Don’t show Website/CTA/color pickers that the template never reads.
- Don’t invent a second content schema — extend `CreativeContent` only if many templates need a new field, then wire types + forms + consumers.
- Don’t fake picker thumbs with CSS. Capture a real PNG.
- Don’t add a router just for `?template=`.

## Quick file map for common tasks

| Task | Touch |
|------|--------|
| New creative layout | `types` → data file → `templateFields` → component → `registry` → CSS → capture PNG |
| Photo overlay (text/logo on image) | Same as new layout; `swatches` on `colors.text`; `colorTone.ts` |
| Per-field size or Y offset | `layoutControls` + `defaults.layout` + `fieldTune` helpers in the template |
| Script overlay typefaces | `scriptFonts.ts` + `index.html` Google Fonts URL + `fontChoices` |
| Fix dead form fields | `templateFields.ts` + template component |
| Fix overlap / spacing | that template’s CSS (`templates.css`, `extras.css`, or `wave2.css`) |
| Change app chrome / sidebar | `App.css`, maybe `App.tsx` / picker / editor |
| Change export quality | `utils/exportCreative.ts` |
| Export font mismatch | `utils/embedFonts.ts` (inline Google Fonts into PNG) |
| Default sample photos | `public/samples/` + template `defaults.productImageUrl` |
| Default watermark logo | `public/logos/` + template `defaults.logoUrl` |
| Shareable template URL | automatic via `templateQuery.ts` once `TemplateId` exists |
| Artboard aspect (1:1 / 4:5) | `utils/artboardSize.ts` + Script Overlay `ctaText` choice |
| Refresh picker thumbs | `/?capture=1` or `/?capture=1&only={id}` with `npm run dev` |
