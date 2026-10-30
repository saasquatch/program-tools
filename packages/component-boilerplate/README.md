# SaaSquatch Component Boilerplate

This is a collection of essential universal hooks for use in building web components for the SaaSquatch platform.

## Documentation

See [index.ts](src/index.ts) for API documentation directly in Typescript.

## Stories and tests without a real tenant

`@saasquatch/component-boilerplate/canned` answers GraphQL from a snapshot of the
SaaSquatch schema with realistic, deterministic data. Use it instead of pointing
stories at a real tenant with a real JWT: anything committed to a story ships in
the package's `dist/`.

```tsx
import { useCannedEnvironment } from "@saasquatch/component-boilerplate/canned";

export const ReferralTable = createHookStory(() => {
  useCannedEnvironment({
    programId: "referral-program",
    user: { id: "jane", accountId: "jane" },
    // optional: override specific types or fields
    mocks: { User: () => ({ locale: "fr" }) },
  });
  return <sqm-referral-table />;
});
```

- Every query the components send, including runtime-built ones, gets a response
  with exactly the shape the API would return. An invalid query fails the same way.
- Requests that bypass the GraphQL client (e.g. the locale lookup) are answered
  through `fetch` for the canned endpoint only. The canned app domain
  (`https://canned.invalid`) can never resolve, so anything that escapes fails
  instead of reaching a real server.
- `fakeJwt(payload)` makes an unsigned token for code that only decodes it.

Refresh the schema snapshot with `npm run sync-canned-schema -- <path to the saasquatch repo>`.
