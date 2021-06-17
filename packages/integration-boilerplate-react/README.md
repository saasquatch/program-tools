<h1 align="center">@saasquatch/integration-boilerplate-react</h1>

<p align="center">Utilities for building SaaSquatch integration frontends in React.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-react"><img src="https://img.shields.io/npm/v/@saasquatch/integration-boilerplate-react/latest.svg?style=flat-square" alt="NPM version" /> </a>
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-react"><img src="https://img.shields.io/npm/dm/@saasquatch/integration-boilerplate-react.svg?style=flat-square" alt="NPM downloads"/> </a>
</p>

[SaaSquatch](https://saasquatch.com) provides an application for managing referral and rewards programs for digital
businesses. Integrations with SaaSquatch are typically built as microservices which respond to
[webhooks](https://docs.saasquatch.com/api/webhooks/) and form handler triggers from SaaSquatch's forms platform.

Integrations also typically have a configuration interface where a user can configure the integration for a tenant and
various responses to form handlers.

This package currently contains a single hook, `usePenpal` which sets up the environment for an integration frontend
and provides the methods required to communicate with the SaaSquatch portal to save configuration (amongst other
actions).

## Getting Started

Here's an example of a fully functional integration frontend:

```ts
function Index() {
  const penpal = usePenpal();

  if (penpal.mode === ConfigMode.IntegrationsPage) {
    return <P>This will be shown on the Integrations page.</P>;
  }

  if (penpal.mode === ConfigMode.FormConfigInitialDataActions) {
    return (
      <P>
        This will be shown when configuring integration initial data actions for
        a form.
      </P>
    );
  }

  if (penpal.mode === ConfigMode.FormConfigSubmitActions) {
    return (
      <P>
        This will be shown when configuring integration submit actions for a
        form.
      </P>
    );
  }

  return null;
}

function App() {
  return (
    <PenpalContextProvider
      loading={
        <p>This will be shown while the Penpal connection is being made.</p>
      }
      fallback={
        <p>
          This will be shown if this frontend is accessed from outside the
          portal.
        </p>
      }
    >
      <Index />
    </PenpalContextProvider>
  );
}
```

## TODO - docs incomplete
