# AGENTS.md — Creative Creator

Guidance for AI agents and humans working on this repo.

## What this is

A React + Vite webapp that builds **1080×1080 social creatives** from templates. Users pick a layout, edit text/colors, upload logo + product image, and download a PNG.

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
| `src/types.ts` | `TemplateId`, `CreativeContent`, `CreativeColors`, `TemplateMeta` |
| `src/data/templates.ts` | Classic templates + merges `newTemplates` |
| `src/data/newTemplates.ts` | Extra imaginative templates |
| `src/data/templateFields.ts` | **Per-template editor fields + colors** (what the form shows) |
| `src/components/templates/registry.tsx` | Maps `TemplateId` → component |
| `src/components/templates/*.tsx` | Classic layouts |
| `src/components/templates/extras/*.tsx` | Newer layouts |
| `src/components/templates/templates.css` | Classic layout CSS |
| `src/components/templates/extras/extras.css` | Extra layout CSS |
| `src/components/CreativeCanvas.tsx` | Scaled 1080 artboard + export target |
| `src/components/EditorForm.tsx` | Uploads + fields driven by `templateFieldConfig` |
| `src/components/TemplatePicker.tsx` | Compact template grid |
| `src/App.tsx` | State: `templateId`, `content`; preserve user uploads on switch |
| `src/utils/exportCreative.ts` | PNG export via `html-to-image` |
| `public/samples/` | Default product images |
| `public/templates/` | Classic picker preview PNGs |

### Data flow

```
TemplatePicker → set templateId + load defaults (keep data: URLs)
EditorForm     → mutates CreativeContent (only configured fields)
CreativeCanvas → renderTemplate(id, content) inside 1080 artboard
Download PNG   → html-to-image on artboard node (not the scaled wrapper)
```

### Shared content model

Every template reads from `CreativeContent`:

- Text: `brandPrefix`, `brandName`, `brandTagline`, `headline`, `subheadline`, `accentLine`, `bodyTitle`, `bodyText`, `ctaText`, `website`, `sideText`
- Media: `logoUrl`, `productImageUrl` (`null` or URL / data URL)
- Colors: `background`, `accent`, `text`, `muted`, `surface` (CSS variables on the root `.tpl`)

**Rule:** If a control appears in the editor, it must affect the visible creative. If a template doesn’t use a field/color, omit it from `templateFieldConfig`.

## Adding a new template (checklist)

Do **all** of these or the template will be broken / show dead controls:

1. **Add id** to `TemplateId` union in `src/types.ts`.
2. **Add defaults** in `src/data/newTemplates.ts` (or `templates.ts`) — copy, colors, sample `productImageUrl`.
3. **Add field config** in `src/data/templateFields.ts` — only used fields/colors; set `showLogo` / `logoReplacesBrand` if needed.
4. **Create component** under `src/components/templates/` or `extras/`.
   - Root: `<div className="tpl tpl-yourname" style={{ '--bg', '--accent', ... }}>`
   - Product: `<ImageSlot className="tpl-product-image" ... />`
   - Logo: use `className="tpl-logo"` (never rely on global `img { width/height: 100% }`).
5. **Register** in `src/components/templates/registry.tsx`.
6. **CSS** in `templates.css` or `extras/extras.css` — artboard is always **1080×1080**; use absolute/grid inside `.tpl`.
7. **Picker thumb** (optional): add `.picker__thumb--your-id` rules in `src/App.css` if the default product thumb looks wrong.
8. **Verify:** `npm run build`, click template in UI, change every exposed field/color, confirm export.

### Template CSS conventions

- Artboard fixed at `1080×1080` (`.tpl`). Preview scales via transform in `CreativeCanvas` — export node must **not** include the scale transform.
- Prefer CSS variables: `--bg`, `--accent`, `--text`, `--muted`, `--surface`.
- Product fills: `.tpl-product-image { width/height: 100%; object-fit: cover }`.
- Logos: `.tpl-logo` / `.tpl-logo--sm` only.
- Decorative overflow (watermarks) is OK if `.tpl { overflow: hidden }` clips it.
- Keep layers intentional (`z-index`); badges that sit on seams should outrank footers.

### Editor / upload behavior

- Switching templates loads that template’s defaults but **keeps** `logoUrl` / `productImageUrl` only if they are `data:` URLs (user uploads). Sample paths reset per template.
- Reset restores full defaults for the active template (clears uploads).
- `logoReplacesBrand: true` hides brand prefix/name fields when a logo is present — component should replace brand typography with the logo image.

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
- Fonts loaded in `index.html`: Playfair Display, Cormorant Garamond, Great Vibes, Montserrat, DM Sans, Bebas Neue, Syne, Caveat. Add new Google fonts there if a template needs them.

## Export

- Target: `.canvas-panel__artboard` (unscaled).
- `pixelRatio: 2` in `exportCreative.ts`.
- Cross-origin images can break export; prefer `/public` samples or data URLs from uploads.

## Quality bar before finishing a task

- [ ] `npm run build` passes
- [ ] No dead editor fields for the templates you touched
- [ ] No element overflowing the 1080 canvas unintentionally
- [ ] Logo + product upload still work
- [ ] Desktop sidebar still split-scrolls (templates visible while editing)
- [ ] PNG download still works after layout changes

## Don’t

- Don’t add exploit/malware tooling or unrelated scope.
- Don’t commit secrets.
- Don’t use `img { width: 100%; height: 100% }` under `.tpl` without excluding logos.
- Don’t put export `ref` on the scaled zoom wrapper.
- Don’t show Website/CTA/color pickers that the template never reads.
- Don’t invent a second content schema — extend `CreativeContent` only if many templates need a new field, then wire types + forms + consumers.

## Quick file map for common tasks

| Task | Touch |
|------|--------|
| New creative layout | `types` → `newTemplates` → `templateFields` → component → `registry` → CSS |
| Fix dead form fields | `templateFields.ts` + template component |
| Fix overlap / spacing | that template’s CSS (`templates.css` or `extras.css`) |
| Change app chrome / sidebar | `App.css`, maybe `App.tsx` / picker / editor |
| Change export quality | `utils/exportCreative.ts` |
| Default sample photos | `public/samples/` + template `defaults.productImageUrl` |
