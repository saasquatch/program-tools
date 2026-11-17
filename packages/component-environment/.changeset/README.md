# Releasing Component Environment

Run `npm run changeset` from `packages/component-environment` for each releasable
change. Commit the generated Markdown file with the code; do not bump versions
or edit the changelog manually.

After the change merges to `master`, GitHub Actions opens or updates
`changeset-release/component-environment` with the version, lockfile, and
changelog updates. Merging that release PR publishes to npm with provenance and
creates a package-scoped GitHub release. The package builds during `prepack`.

For a prerelease, manually run **Trusted Publisher Workflow**, select
`component-environment`, and choose `prerelease`. Stable releases must use the
Changesets release PR. Direct local publishing is blocked.

## npm Trusted Publisher

The npm package must trust `saasquatch/program-tools`, workflow
`trusted-publish.yml`, with no environment restriction. The trust names the
calling workflow, not `component-release.yml`.

Inspect existing trust first with `npm trust list @saasquatch/component-environment`.
If the publisher is missing, an npm package administrator can run:

```sh
npm trust github @saasquatch/component-environment --repo=saasquatch/program-tools --file=trusted-publish.yml --allow-publish
```

Complete npm's browser authentication when prompted. GitHub Actions must also
publish within two days of creating a new trust record, or npm expires it.
Create the record close to the first release. GitHub Actions must also
be allowed to create pull requests in the repository's Actions settings.
Release PRs use `GITHUB_TOKEN`, so their creation does not trigger other
workflows automatically; required PR checks may need a manual run.