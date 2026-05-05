![Built With Stencil](https://img.shields.io/badge/-Built%20With%20Stencil-16161d.svg?logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE5LjIuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI%2BCjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI%2BCgkuc3Qwe2ZpbGw6I0ZGRkZGRjt9Cjwvc3R5bGU%2BCjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik00MjQuNywzNzMuOWMwLDM3LjYtNTUuMSw2OC42LTkyLjcsNjguNkgxODAuNGMtMzcuOSwwLTkyLjctMzAuNy05Mi43LTY4LjZ2LTMuNmgzMzYuOVYzNzMuOXoiLz4KPHBhdGggY2xhc3M9InN0MCIgZD0iTTQyNC43LDI5Mi4xSDE4MC40Yy0zNy42LDAtOTIuNy0zMS05Mi43LTY4LjZ2LTMuNkgzMzJjMzcuNiwwLDkyLjcsMzEsOTIuNyw2OC42VjI5Mi4xeiIvPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNNDI0LjcsMTQxLjdIODcuN3YtMy42YzAtMzcuNiw1NC44LTY4LjYsOTIuNy02OC42SDMzMmMzNy45LDAsOTIuNywzMC43LDkyLjcsNjguNlYxNDEuN3oiLz4KPC9zdmc%2BCg%3D%3D&colorA=16161d&style=flat-square)

# Mint Components

Mint components for the SaaSquatch content platform. Built with Stencil.

## Contributing

### Version Management with Changesets

This project uses [Changesets](https://github.com/changesets/changesets) to manage versioning and changelogs.

#### Adding a Changeset

When you make changes that should be included in the next release, create a changeset:

```bash
npm run changeset
```

Follow the prompts to:

1. Select the type of change (major, minor, or patch)
2. Provide a summary of your changes

This will create a new file in the `.changeset` directory that will be used to automatically update the version and changelog when the changes are released.

#### Releasing a New Version

When changesets are merged to the `master` branch, the mint-components release workflow will automatically:

1. Create or update a "Version Packages" pull request that:
   - Bumps the version in `package.json`
   - Updates `package-lock.json`
   - Updates `CHANGELOG.md` with all changeset summaries
   - Removes the processed changeset files

2. When you're ready to release, simply **merge the "Version Packages" PR** to `master`

3. The workflow will then automatically:
   - Publish the new version to npm
   - Deploy the production Stencilbook site for mint-components
   - Create a git tag for the release

mint-components stable releases use the mint-specific **Mint Components Release** workflow (Changesets), and prereleases use the shared **Publish Package** workflow.

**Local `npm publish` is blocked.** A `prepublishOnly` script in `package.json` aborts publishes that aren't running in CI (where `CI=true`). All publishes must go through the GitHub Actions workflows below.

#### Manual Development Releases (Prereleases)

For development and testing purposes, use the shared **Publish Package** GitHub Actions workflow:

1. Run the workflow from the branch you want to publish.
2. Set `package` to `mint-components`.
3. Set `increment-type` to `prerelease`. The workflow rejects `patch` / `minor` / `major` for mint-components — stable releases must go through the **Mint Components Release** (Changesets) workflow.

The workflow will:

- Compute the next semver from `package.json` (e.g. `2.1.8` → `2.1.9-0` for `prerelease`)
- Build mint-components automatically via the `prepack` lifecycle script
- Publish to npm with `--access public --provenance`, tagged `next` for prereleases or `latest` for stable
- Commit the version bump and create a signed `@saasquatch/mint-components@<version>` git tag via `saasquatch/git-commit-action`

Stable releases should still flow through `master` via the Changesets "Version Packages" PR. When the next stable Changesets release runs, `changeset version` will compute the next stable version from changesets and overwrite any manual prerelease version in `package.json` — that is intentional.

## About Stencil

Stencil is a compiler for building fast web apps using Web Components.

Stencil combines the best concepts of the most popular frontend frameworks into a compile-time rather than run-time tool. Stencil takes TypeScript, JSX, a tiny virtual DOM layer, efficient one-way data binding, an asynchronous rendering pipeline (similar to React Fiber), and lazy-loading out of the box, and generates 100% standards-based Web Components that run in any browser supporting the Custom Elements v1 spec.

Stencil components are just Web Components, so they work in any major framework or with no framework at all.
