# CSS Token Migration Plan — `@saasquatch/lit-components`

> Plan for the day we swap out the underlying UI primitive framework
> (Shoelace today) and therefore lose the `--sl-*` CSS custom properties.
> Scope is **CSS tokens only**: the component markup is already abstracted
> behind the `UI` adapter (`src/ui/registry.ts`, `src/ui/types.ts`), so
> swapping markup is a separate, already-solved concern.

---

## The problem in one paragraph

Component views (`src/components/**/*View.ts`) and several stories
reference Shoelace's design tokens directly — e.g.
`var(--sl-spacing-medium)`, `var(--sl-color-neutral-200)`,
`var(--sl-border-radius-medium)`, `var(--sl-font-size-large)`. These
tokens are provided at runtime by
`@shoelace-style/shoelace/dist/themes/light.css`, loaded once via
`src/ui/shoelace/bootstrap.ts`. The moment we stop loading Shoelace's
theme, every `var(--sl-*)` resolves to its (often missing) fallback and
the UI breaks visually. There are ~**396 `--sl-*` references** across
~**90 files**, drawing from ~**64 unique tokens** in five families:
spacing, color (neutral/primary/success/warning/danger scales),
border-radius, font-size, font-weight, shadow, and one stray
`--sl-input-color`.

---

## Goal

Decouple the codebase from the `--sl-*` namespace so a future UI
framework swap is a one-file change to the token mappings, not a
sweep of every view.

---

## Strategy: introduce a `--sq-*` token layer

Stop referencing `--sl-*` directly from component code. Instead:

1. Define a **`--sq-*` design-token namespace** owned by this package
   (e.g. `--sq-spacing-md`, `--sq-color-neutral-200`,
   `--sq-radius-md`, `--sq-font-size-lg`, `--sq-font-weight-bold`,
   `--sq-shadow-sm`). These names express _intent_ in our design
   language, not Shoelace's.
2. Ship a single **token stylesheet per UI adapter** that maps
   `--sq-*` to the underlying framework's tokens. For Shoelace today
   that file is one-liners like
   `--sq-spacing-md: var(--sl-spacing-medium);`. For a future
   framework it becomes `--sq-spacing-md: var(--md-sys-spacing-3);`
   or hard-coded values, with no view edits required.
3. Migrate every `var(--sl-*)` occurrence in `src/components/**` to
   the `--sq-*` equivalent.
4. From then on, "swap the UI framework" = write a new adapter under
   `src/ui/<new>/` (already the convention per `src/ui/registry.ts`)
   plus a new token stylesheet, and update the bootstrap import.

This mirrors what the existing UI adapter already does for markup
(`UIComponents` interface) — we're just extending the same
abstraction to the CSS layer.

---

## Inventory (snapshot at time of writing)

Unique tokens referenced from `src/`:

- **Spacing** (8): `--sl-spacing-2x-small`, `--sl-spacing-x-small`,
  `--sl-spacing-small`, `--sl-spacing-medium`, `--sl-spacing-large`,
  `--sl-spacing-x-large`, plus bare prefix matches.
- **Color – neutral** (10): `--sl-color-neutral-0`, `-50`, `-100`,
  `-200`, `-300`, `-400`, `-500`, `-600`, `-700`.
- **Color – primary** (6): `--sl-color-primary-50`, `-100`, `-300`,
  `-500`, `-600`, `-700`.
- **Color – success** (6): `-50`, `-100`, `-300`, `-500`, `-600`, `-700`.
- **Color – warning** (2): `-100`, `-700`.
- **Color – danger** (1): `--sl-color-danger-600` (used inside
  `src/ui/shoelace/index.ts` for the form-field error slot).
- **Border-radius** (2): `--sl-border-radius-medium`,
  `--sl-border-radius-large`.
- **Font-size** (7): `x-small`, `small`, `medium`, `large`,
  `x-large`, `xx-large`, `xxx-large`.
- **Font-weight** (3): `normal`, `semibold`, `bold`.
- **Shadow** (2): `--sl-shadow-small`, `--sl-shadow-x-large`.
- **Misc** (1): `--sl-input-color`.

Generate a fresh inventory before starting with:

```sh
cd packages/lit-components
grep -rhoE -- '--sl-[a-z0-9-]+' src | sort -u
grep -rE 'var\(--sl-' src | wc -l
```

---

## Migration steps

### Step 1 — Define the `--sq-*` token set

- [ ] Create `src/ui/tokens/tokens.css` defining every `--sq-*` the
  codebase will need (one entry per item in the inventory above).
  Pick stable, framework-neutral names —
  `--sq-spacing-md`, `--sq-color-neutral-200`, `--sq-radius-md`,
  `--sq-font-size-lg`, etc.
- [ ] Create `src/ui/tokens/types.ts` exporting a TypeScript
  string-literal union (`type SqToken = '--sq-spacing-md' | ...`) for
  any code that needs to reference tokens programmatically. (Optional;
  most tokens are used in static CSS strings.)
- [ ] Decide the scope selector. Two viable options:
  - `:root, :host` (covers light DOM consumers + every component's
    shadow root) — recommended.
  - `:root` only, plus per-component `:host { ... }` re-declaration —
    only if a downstream consumer needs to override on a per-host
    basis.

### Step 2 — Add the Shoelace mapping layer

- [ ] Create `src/ui/shoelace/tokens.css` containing the
  Shoelace→`--sq-*` mappings, e.g.

  ```css
  :root, :host {
    --sq-spacing-md: var(--sl-spacing-medium);
    --sq-color-neutral-200: var(--sl-color-neutral-200);
    --sq-radius-md: var(--sl-border-radius-medium);
    /* ...one line per token in the inventory... */
  }
  ```
- [ ] Update `src/ui/shoelace/bootstrap.ts` to also import this file
  (alongside the existing `@shoelace-style/shoelace/.../light.css`).
  The Shoelace theme must load first so the right-hand side resolves.
- [ ] Verify the mapping covers every token in the inventory — fail
  loudly during code review if `tokens.css` lists fewer keys than
  `grep -rhoE -- '--sq-[a-z0-9-]+' src | sort -u`.

### Step 3 — Codemod the references in `src/components/**`

- [ ] Build a one-shot mapping table (Shoelace token → `--sq-*` name)
  derived from Step 1.
- [ ] Run a search-and-replace across `src/components/**/*.ts`
  (views, stories, any inline `<style>`) replacing each
  `var(--sl-<x>)` with the matching `var(--sq-<y>)`. Because tokens
  appear in tagged-template string literals, a plain regex
  replacement is safe — no AST work needed.
- [ ] Leave `src/ui/shoelace/index.ts` referencing `--sl-*` directly:
  it is the Shoelace adapter and is allowed to be framework-specific
  (this is why the existing memory says views must not use `<sl-*>`,
  but the adapter file may).
- [ ] Run `npm run lint`, `npm run type-check`, `npm test`, `npm run build`.
- [ ] Manually walk a representative set of stories in Storybook
  (TaskCard, RewardExchangeList, BankingInfoForm, PortalLogin,
  ReferralCode, Hero, RewardsTable) before and after the codemod —
  pixel parity should be exact because every `--sq-*` resolves to the
  same `--sl-*` it replaced.

### Step 4 — Lock the boundary

- [ ] Add a lint rule (custom ESLint rule or a `grep` check in CI)
  that fails if any file under `src/components/**` references
  `--sl-` directly. Allow it in `src/ui/shoelace/**` only.
- [ ] Update the repo memory / README note: "views must not reference
  `--sl-*` tokens directly; use `--sq-*` tokens defined in
  `src/ui/tokens/tokens.css`." This is the CSS analogue of the
  existing rule about not using `<sl-*>` markup in views.

### Step 5 — Future swap is now trivial

When the UI framework actually changes:

- [ ] Create `src/ui/<new>/index.ts` implementing `UIComponents`
  (existing pattern).
- [ ] Create `src/ui/<new>/tokens.css` mapping each `--sq-*` to the
  new framework's tokens (or to literal values where no equivalent
  exists). The exhaustive list to satisfy lives in
  `src/ui/tokens/tokens.css` from Step 1.
- [ ] Create `src/ui/<new>/bootstrap.ts` importing the new framework's
  base stylesheet + the new `tokens.css`.
- [ ] In `src/index.ts`, replace the three Shoelace lines
  (`import './ui/shoelace/bootstrap'; import { shoelaceUI } ...;
  setUI(shoelaceUI);`) with the equivalent for the new adapter.
- [ ] No edits to `src/components/**` required.

---

## Risks & mitigations

| Risk | Mitigation |
| --- | --- |
| A token mapping is missed in Step 2, causing one component to render with the unstyled fallback. | The Step 3 inventory check (`grep --sq` vs. `grep --sq` in `tokens.css`) is mandatory in code review; back it up with a visual review of Storybook. |
| The new framework lacks a 1:1 equivalent for a Shoelace token (e.g. `--sl-color-success-50` has no peer). | The `--sq-*` layer is _ours_; in the new adapter's `tokens.css`, pick the closest equivalent or hard-code a literal value. View code stays untouched. |
| Downstream consumers were styling our components via `::part(...) { color: var(--sl-color-primary-600); }`. | Out of scope — they own that risk. Document the new `--sq-*` tokens in the release notes so consumers can migrate their overrides. |
| Stories reference `--sl-*` for layout/demo backgrounds, not just for component styling. | Step 3 covers `.stories.ts` too; treat them like views. |
| `src/ui/shoelace/index.ts` itself uses `var(--sl-color-danger-600)` in `helpTextSlot`. | Leave as-is — adapter files are the one place `--sl-*` may live. If we want symmetry, mirror it as `--sq-color-danger-600` and use that here too; preference, not requirement. |

---

## Effort sketch

- Step 1 — half a day (writing the token list, naming review).
- Step 2 — small; mechanical one-liner per token.
- Step 3 — bulk of the work but mechanical (regex sweep + visual QA).
  Roughly 90 files, 400 occurrences, 64 distinct tokens.
- Step 4 — small; one CI check + one doc paragraph.
- Step 5 — done only when an actual UI framework swap is greenlit;
  then it is genuinely a "write one tokens.css" change.
