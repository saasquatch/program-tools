# Framework Swap Plan — `@saasquatch/lit-components`

> Living plan for executing a **true framework swap** of this package — i.e. replacing the
> underlying component framework (currently **Lit + Haunted**) with a different one
> (e.g. React, Preact, Solid, Vue, Stencil, Svelte, vanilla custom elements, etc.).
>
> This is _not_ the same as the UI-library swap that the existing
> `src/ui` adapter already enables (Shoelace → some other primitive library).
> See [Scope](#scope) for the distinction.
>
> **How to use this document:** when the swap is greenlit, hand this file plus the
> target framework name to a coding agent (or follow it manually). Each section is
> ordered so it can be executed top-to-bottom. Mark steps as `[x]` as they are
> completed in a working branch.

---

## Scope

What this plan covers:

- Replacing the rendering / reactivity layer used by every component in
  `packages/lit-components/src/components/**` — today that means `lit`'s
  `html` tagged template, `LitElement`/`component()` from `haunted`, and the
  `@saasquatch/universal-hooks` adapter wired to Haunted in
  `src/index.ts`.
- Replacing the `useComponent` / `useHost` glue in
  `src/hooks/` so it talks to the new framework's component primitive.
- Replacing the UI adapter implementation type (`UIComponents` in
  `src/ui/types.ts`) so it returns the new framework's render type instead
  of `lit`'s `TemplateResult`, and rewriting `src/ui/shoelace/index.ts`
  (or whichever adapter is active) to emit nodes of that new type.
- Updating tooling (Vite config, Storybook, Vitest setup) so the new
  framework compiles, type-checks, tests, and renders in Storybook.

What this plan does **not** cover:

- Swapping out Shoelace for a different primitive UI library while staying on
  Lit. That is already a first-class operation: implement a new
  `UIComponents` adapter under `src/ui/<other>/` and call `setUI()` with it
  at the entry point in `src/index.ts`. See `src/ui/registry.ts` for the
  contract.
- Swapping the `@saasquatch/component-boilerplate` data layer
  (`isDemo()`, `useHost()`, GraphQL provider, etc.). That contract is
  framework-neutral and intended to survive a swap; see
  [Step 4 — Adapt the data/hook boilerplate](#step-4--adapt-the-datahook-boilerplate).
- Re-doing the Stencil → Lit port that produced this package in the first
  place. mint-components (Stencil) is treated here as a reference, not as
  something to change.

---

## Current architecture snapshot (for context)

Capturing this so the plan stays accurate even if the swap is months away.

- **Package:** `packages/lit-components`, published as
  `@saasquatch/lit-components`.
- **Framework:** Lit (`lit`) for templates + `LitElement`, with
  [Haunted](https://github.com/matthewp/haunted) providing functional
  hooks-based components via `component()`.
- **Hooks bridge:** `@saasquatch/universal-hooks` is configured to use
  Haunted via `setImplementation(haunted)` in `src/index.ts`. Every hook in
  components (`useState`, `useEffect`, etc.) ultimately routes through
  Haunted.
- **Component shape:** Each component lives at
  `src/components/<Name>/` and typically has:
  - `<Name>.ts` — defines the custom element via the
    `useComponent<Props>(renderFn, tag, observedAttrs)` helper from
    `src/hooks/useComponent.ts`. The render function reads attributes via
    `getProps(host)` (`src/helpers.ts`), normalizes them, calls the
    `use<Name>` hook for state/effects, and returns
    `<Name>View({ ...props, ...hookResult })`.
  - `<Name>View.ts` — pure presentational function returning a Lit
    `TemplateResult`. Must render UI primitives via `UI.Xxx(props)` from
    `src/ui` rather than raw `<sl-*>` tags.
  - `use<Name>.ts` — hook that owns business logic and may use
    `@saasquatch/component-boilerplate` (`isDemo`, GraphQL, etc.) and
    `@saasquatch/universal-hooks`.
  - `use<Name>.test.ts` — Vitest unit test that mocks the boilerplate and
    `universal-hooks`.
  - `<Name>.stories.ts` — Storybook story.
  - `index.ts` — barrel.
- **UI adapter:** `src/ui/{types.ts,registry.ts,index.ts,shoelace/}`
  defines a framework-neutral `UIComponents` interface; `setUI()` swaps the
  active implementation; views consume primitives through the `UI` proxy.
  Today every method returns `TemplateResult` from `lit` — this is the
  tightest binding to Lit and must change as part of the swap.
- **Entry point:** `src/index.ts` re-exports every component, installs the
  Haunted hooks implementation, installs the Shoelace UI adapter, and
  re-exports `setUI`/`getUI`/`UI`.
- **Tooling:** Vite (`vite.config.ts`) builds the library and is also used
  by Vitest (`npm test` → `vitest run --project unit`). Storybook lives
  under `.storybook/` and `src/stories/`. TypeScript via `tsconfig.json`.

Tag → component custom element name mapping is encoded inside each
`useComponent(..., '<tag-name>', ...)` call (e.g. `sql-task-card`).

---

## Decision inputs to collect before starting

Capture these in the swap PR description / a short ADR before writing any
code. They drive almost every later step.

1. **Target framework** and version (React 19? Preact 10? SolidJS 1.x?
   Stencil 4? Svelte 5? Plain custom elements?).
2. **Distribution shape:** must the package still ship custom elements
   (`<sql-task-card>`) so existing consumers (mint-components users,
   widget hosts, GrapesJS embeds, raw HTML widgets) are unaffected? If
   yes, the new framework must compile to or wrap into custom elements.
3. **Shadow DOM** — keep it (current behavior via Lit) or move to light
   DOM? This affects CSS strategy and how `UI.*` primitives render.
4. **Hook story:** does the new framework have native hooks (React,
   Preact, Solid signals…)? If yes, does
   `@saasquatch/universal-hooks` need a new `setImplementation()`
   adapter? If not, we must replace `universal-hooks` usage in every
   `use<Name>` hook.
5. **Render type** that the `UIComponents` interface should return
   (`ReactNode`, `JSX.Element`, `VNode`, `TemplateResult`, plain
   `HTMLElement`, etc.). This is the single largest type change.
6. **Reactivity model:** how attributes/properties flow into renders, and
   how events flow out. The current package uses
   `observedAttributes` + `getProps(host)` + `CustomEvent` dispatch. The
   replacement must preserve the same _external_ DOM contract.
7. **Backwards-compat strategy:** is this a major version bump
   (`@saasquatch/lit-components` 2.x?), a new sibling package
   (`@saasquatch/<new>-components`), or a rename? Decide before
   touching consumers.
8. **Test / Storybook story:** can the existing Vitest tests and
   Storybook stories be ported with mechanical edits, or do they need
   to be rewritten?

---

## High-level strategy

Two viable approaches; pick one in the decision step above.

### Strategy A — Big-bang swap in place (recommended only if the new framework also produces custom elements)

Replace Lit/Haunted directly inside `packages/lit-components`. External
custom element tag names stay identical, so downstream consumers keep
working. Version bump is a major release.

### Strategy B — Parallel package, gradual cutover (recommended otherwise)

Create `packages/<new>-components` alongside `lit-components`. Port
components a few at a time, keep both published for a deprecation
window, and let consumers migrate per component or per app. The plan
below assumes Strategy A; for Strategy B, do every "rewrite in place"
step inside the new package while leaving `lit-components` frozen.

---

## Step-by-step plan

Each step is meant to land as one or more PRs. The order matters: the
type-level changes (adapter contract, hook bridge) come first so the
codebase fails to compile until every component is migrated, surfacing
exactly what is left to do.

### Step 0 — Pre-flight

- [ ] Lock the decisions from
  [Decision inputs to collect before starting](#decision-inputs-to-collect-before-starting)
  in a short ADR or PR description.
- [ ] Tag the current `master` (or whatever is at the time) as
  `lit-components-pre-swap` so we can diff/migrate later.
- [ ] Run the existing build/lint/test commands and capture green:
  - `npm install` (from package root)
  - `npm run lint`
  - `npm run type-check`
  - `npm run build`
  - `npm test`
- [ ] Skim the components list (count via
  `ls packages/lit-components/src/components | wc -l`) and write it into
  the swap tracking issue — every one of these needs to render under the
  new framework before merging.

### Step 1 — Spike on one component end-to-end

Before touching shared infrastructure, prove the new framework works for
this codebase's component shape on a single, simple component (e.g.
`CounterComponent` — it has no hooks or UI adapter usage).

- [ ] In a throwaway branch, rewrite `CounterComponent` using the new
  framework: define a custom element with the same tag (`lit-counter`
  for the counter, or whatever the target tag is), accepting the same
  attributes, dispatching the same events.
- [ ] Mount it in `demo.html` and confirm it renders.
- [ ] Resolve any tooling questions (JSX vs templates, build target,
  shadow DOM, CSS strategy) now, _not_ later.
- [ ] Document the resulting file layout for one component — this becomes
  the template for every subsequent port.

### Step 2 — Rework tooling (Vite, TS, Storybook, Vitest)

- [ ] Update `package.json` dependencies: remove `lit`, `haunted`, and any
  Lit-only directives (`lit/directives/*`). Add the target framework and
  its types.
- [ ] Update `tsconfig.json` for the new framework (e.g. `jsx`,
  `jsxImportSource`, `lib`, `moduleResolution`).
- [ ] Update `vite.config.ts`:
  - Library entry stays at `src/index.ts`.
  - Replace any Lit-specific plugins; add the framework's Vite plugin if
    one exists (`@vitejs/plugin-react`, `vite-plugin-solid`, etc.).
  - Keep the `vitest` project config; adjust `environment`/`jsx` settings
    for tests.
- [ ] Update `.storybook/` config to render stories with the new
  framework (Storybook has separate presets per framework).
- [ ] Update `.eslintrc.json` if the framework brings its own ESLint
  rules (`eslint-plugin-react`, `eslint-plugin-solid`, etc.).
- [ ] Re-run `npm install` and confirm a clean install graph.

### Step 3 — Rewrite the UI adapter contract

The `UIComponents` interface in `src/ui/types.ts` currently declares
every method as returning Lit's `TemplateResult`. That assumption flows
into every view in the codebase.

- [ ] Change the return type of every `UIComponents` method (and the
  `Renderable` alias) to the new framework's render type
  (`ReactNode`, `JSX.Element`, `VNode`, etc.). Do **not** otherwise
  change the prop shapes — `InputProps`, `ButtonProps`, etc. are
  intentionally framework-neutral and should survive the swap.
- [ ] Rewrite `src/ui/shoelace/index.ts` so every method emits the new
  framework's node type wrapping the same `<sl-*>` elements (Shoelace
  itself is framework-agnostic web components, so the markup is the
  same; only the templating syntax changes — `html\`<sl-input ...>\``
  becomes JSX, h(), Solid JSX, etc.).
- [ ] Keep `src/ui/registry.ts` and the `setUI()` / `UI` proxy
  semantics. Only the generic over the proxy's return type changes.
- [ ] If the new framework needs explicit prop normalization for web
  components (e.g. React 18 and older required string-only attributes),
  add a small helper analogous to today's `ifDefined` calls.

### Step 4 — Adapt the data/hook boilerplate

- [ ] If the new framework has native hooks compatible with
  `@saasquatch/universal-hooks`, write a new implementation adapter and
  swap the `setImplementation(haunted)` call in `src/index.ts` for
  `setImplementation(<newAdapter>)`.
- [ ] If it does _not_ have compatible hooks (e.g. Solid signals,
  Vue reactivity), pick one:
  1. Keep `universal-hooks` API surface but reimplement each helper
     (`useState`, `useEffect`, …) in terms of the new primitives. This
     minimizes churn in every `use<Name>` hook.
  2. Drop `universal-hooks` entirely and rewrite every `use<Name>`
     against the new framework's idioms. Higher cost, more idiomatic
     result. Quantify by counting `useState`/`useEffect`/`useMemo`
     imports across `src/components/**`.
- [ ] `@saasquatch/component-boilerplate` (`isDemo`,
  `setUseHostImplementation`, GraphQL provider, etc.) is framework
  neutral. Re-implement `useHost`/`withHostProvider` in
  `src/hooks/useHost.ts` against the new framework and re-register via
  `setUseHostImplementation(useHost)`.
- [ ] Replace `src/hooks/useComponent.ts`. It currently wraps
  `component()` from Haunted and calls `customElements.define`. For the
  new framework, this becomes either:
  - A wrapper around the framework's custom-element converter
    (e.g. `@lit/react`, `preact-custom-element`, Solid's
    `customElement()`, Stencil's `@Component`, React's
    `r2wc(...)`, etc.), **or**
  - A hand-written custom element that internally mounts the framework's
    renderer into a shadow root.
  The public signature
  `useComponent<Props>(renderFn, tagName, observedAttrs)` should stay
  identical so per-component files barely change.

### Step 5 — Port components

This is the bulk of the work. Each component under `src/components/**`
has the predictable shape described in
[Current architecture snapshot](#current-architecture-snapshot-for-context).

Recommended order:

1. **Leaf presentational components first** — anything whose
   `useXxx.ts` is trivial or absent
   (e.g. `Brand`, `Empty`, `Image`, `TextSpan`, `HeaderLogo`, `Hero`,
   `HeroImage`, `BigStat`, `LinkButton`, `CloseButton`).
2. **Form fields** — `InputField`, `CheckboxField`, `DropdownField`,
   `PasswordField`, `RadioCard`, `NameFields`. These exercise event
   plumbing through the UI adapter and validate Step 3 properly.
3. **Containers** — `PortalContainer`, `PortalFrame`,
   `DividedLayout`, `TitledSection`, `StatContainer`, `PopupContainer`,
   navigation/sidebar/menu components.
4. **Data-bound components** — anything using
   `GraphQLClientProvider`, `ContextRouter`, `useQuery`-style hooks,
   tables (`ReferralTable`, `RewardsTable`, `InvoiceTable`), profile
   and registration flows, `TaxAndCash*`. These will stress-test the
   Step 4 hook adapter.
5. **Routing and context providers last** — `Router`, `Route`,
   `ContextRouter`, `GraphQLClientProvider`. These typically hand control
   to the framework's context system and may have to be rewritten more
   than ported.

For each component:

- [ ] Replace the body of `<Name>.ts` to use the new
  `useComponent` (keep the same tag name, attributes, prop
  normalization, and view-function call).
- [ ] Convert `<Name>View.ts` from Lit's `html` template to the new
  framework's templating syntax. `UI.Xxx(props)` calls do not change.
- [ ] Leave `use<Name>.ts` alone if Step 4 chose path (i) above; rewrite
  if path (ii).
- [ ] Update or recreate `use<Name>.test.ts`. The existing tests mock
  `@saasquatch/component-boilerplate` and `@saasquatch/universal-hooks`
  using `vi.hoisted()`+`vi.mock()`; that pattern is framework-neutral and
  should largely survive.
- [ ] Convert `<Name>.stories.ts` to the framework's Storybook story
  format.
- [ ] After each batch of ~5 components, run `npm run type-check` and
  `npm test` to catch regressions early.

### Step 6 — Rewire the entry point

- [ ] In `src/index.ts`:
  - Keep every component re-export.
  - Replace the
    `setImplementation(haunted)` block with the Step 4 adapter.
  - Keep the
    `import './ui/shoelace/bootstrap'; setUI(shoelaceUI);` block (or
    whichever UI adapter is active) — it is unchanged conceptually.
  - Keep the public exports of `setUI`, `getUI`, `UI`, and
    `UIComponents` (the type now resolves to the new render type;
    downstream UI-adapter authors will get a type error and must update
    their adapter — this is intentional).
- [ ] Update `README.md` (the "Built with Lit and Haunted" framing,
  the install/use snippets, the "Resources" links).

### Step 7 — Validate

- [ ] `npm run lint`
- [ ] `npm run type-check`
- [ ] `npm run build` and inspect `dist/` (size, custom-element exports,
  type declarations).
- [ ] `npm test` (Vitest unit project — see memory: `vitest run --project unit`).
- [ ] `npm run dev` and `npm run storybook` (if present); walk every
  story and confirm visual parity vs. the pre-swap tag.
- [ ] Mount the built bundle in a vanilla `demo.html` and exercise the
  major flows (counter, login portal, share button, task card,
  referral table). These mirror the entry exports.
- [ ] Run the consumer integration that lives elsewhere in the repo
  (search the repo for `@saasquatch/lit-components` usage) and confirm
  it still loads.

### Step 8 — Release

- [ ] If using Changesets at the repo level (see existing convention for
  mint-components), add a `major` changeset for
  `@saasquatch/lit-components` describing the swap.
- [ ] Cut a prerelease first (Strategy A: tag a `-next` version; let one
  or two consumers smoke-test in a staging widget) before promoting.
- [ ] Update the package `README.md` migration notes and any
  cross-package READMEs that reference Lit/Haunted as the impl detail.
- [ ] Communicate the breaking import-shape changes (if any) and the new
  `UIComponents` render type to downstream UI-adapter authors.

### Step 9 — Cleanup

- [ ] Remove any `lit`/`haunted`/`@lit/*` dependencies still present.
- [ ] Remove unused directives (`ifDefined`, `nothing`, etc.).
- [ ] Delete the throwaway spike branch from Step 1.
- [ ] Update repo-level memories
  ([Copilot memory](https://github.com/saasquatch/program-tools/settings/copilot/memory))
  that reference Lit/Haunted/`TemplateResult` so future agents have an
  accurate mental model.

---

## Risk register

| Risk | Mitigation |
| --- | --- |
| `TemplateResult` leaks beyond `src/ui/**` and `src/components/**` into consumer code we don't control. | Grep the wider repo (and any private consumers) for `from '@saasquatch/lit-components'` imports of `Renderable`/`TemplateResult`/`UIComponents` before Step 3; treat each one as a downstream migration item. |
| Hooks API mismatch breaks every `use<Name>.ts` at once. | Step 4 explicitly picks between an adapter and a rewrite. Spike at least 3 representative hooks (`useTaskCard`, a GraphQL-bound one, and a router-bound one) before committing. |
| Shadow DOM CSS regressions (e.g. `:host` selectors, slotted content). | Keep shadow DOM if at all possible; if migrating to light DOM, port one form component first and review with design. |
| External tag names or attribute names drift, silently breaking embedded widgets. | Step 1 + Step 5 both insist on identical tag names + `observedAttributes`. Add a Vitest snapshot per component that asserts `tagName` + observed attribute list to catch accidents. |
| Storybook framework switch loses existing stories. | Port one story per component category in Step 1; only delete the old `.stories.ts` files once the new ones render. |
| Bundle size regression (the new framework + runtime is heavier than Lit). | Capture pre/post `dist/` sizes in Step 0 and Step 7; treat >20% growth as a release blocker until justified. |
| `@saasquatch/component-boilerplate` assumes a hooks runtime is installed before any component renders. | Keep `setImplementation(...)` and `setUseHostImplementation(useHost)` as the _first_ statements in `src/index.ts`, before any component module is imported. |

---

## Quick reference — files that must change

Use as a checklist during the swap. Paths are relative to
`packages/lit-components/`.

- `package.json` — deps, scripts (if any change).
- `tsconfig.json` — JSX, lib targets.
- `vite.config.ts` — plugins, Vitest config.
- `.storybook/**` — framework preset.
- `.eslintrc.json` — framework lint rules.
- `src/index.ts` — hook impl wiring, UI adapter wiring, re-exports.
- `src/ui/types.ts` — `Renderable`/`UIComponents` return type.
- `src/ui/registry.ts` — typically unchanged (generic infra).
- `src/ui/shoelace/index.ts` — every method rewritten in the new
  template syntax. Bootstrap (`shoelace/bootstrap.ts`) is unchanged.
- `src/hooks/useComponent.ts` — wraps the new framework's
  custom-element story.
- `src/hooks/useHost.ts` — re-implemented against the new framework.
- `src/components/**/<Name>.ts` — minor (still calls
  `useComponent(...)`).
- `src/components/**/<Name>View.ts` — full template rewrite.
- `src/components/**/use<Name>.ts` — depends on Step 4 decision.
- `src/components/**/<Name>.stories.ts` — Storybook format rewrite.
- `src/components/**/<Name>.test.ts` (and `useX.test.ts`) — mocks
  largely survive; render assertions need updating.
- `README.md` — wording and snippets.

---

## Out-of-scope follow-ups worth tracking separately

- Bringing other web-component packages (`bedrock-components`,
  `vacay-*-components`, `vip-*-components`, `vanilla-components*`) onto
  the same framework. Each is its own decision and its own plan.
- Migrating `mint-components` (Stencil) off Stencil. That package's
  versioning is automated via Changesets (see memory:
  "Version Packages" PR on master + "Publish Package" workflow);
  any framework swap there must thread through that release pipeline.
- Replacing Shoelace itself. That is a UI-adapter swap, _not_ a
  framework swap; follow the procedure already documented in
  `src/ui/registry.ts` and `src/ui/types.ts`.
