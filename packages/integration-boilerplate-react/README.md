<h1 align="center">@saasquatch/integration-boilerplate-react</h1>

<p align="center">Utilities for building SaaSquatch integration frontends in React.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-react"><img src="https://img.shields.io/npm/v/@saasquatch/integration-boilerplate-react/latest.svg?style=flat-square" alt="NPM version" /> </a>
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-react"><img src="https://img.shields.io/npm/dm/@saasquatch/integration-boilerplate-react.svg?style=flat-square" alt="NPM downloads"/> </a>
</p>

[SaaSquatch](https://saasquatch.com) is a platform for managing referral and rewards programs for digital
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

## PenpalContextProvider

The `PenpalContextProvider` is the main workhorse of connecting your frontend with the SaaSquatch portal. It takes care
of:

- Connecting to the Penpal API
- Automatically handling the resizing of the iframe in which the frontend is rendered
- Managing the state for the `usePenpal` hook

Wrap the top level of your React application in the provider to get access to `usePenpal` in any descendants:

```ts
function App() {
  return (
    <PenpalContextProvider
      <Index />
    </PenpalContextProvider>
  );
}
```

The provider takes two optional props:

- `loading`: JSX to render while the Penpal connection is being established
- `fallback`: JSX to render if the Penpal connection fails (i.e the frontend is not being rendered in the SaaSquatch
  portal)

## usePenpal

In your components, you can `usePenpal` to get access to the state and the Penpal API.

It consists of the following properties:

- `mode`: Which context is the frontend being rendered in - this is either `ConfigMode.IntegrationsPage` for main
  integration config on the Integrations page, or
  `ConfigMode.FormConfigInitialDataActions`/`ConfigMode.FormConfigSubmitActions` for configuration pages within the
  configuration of a form.
- `tenantScopedToken`: A tenant-scoped JWT can be passed to your integration backend via `fetch` or equivalent for
  authenticating requests from your frontend to the integration backend.
- `integrationConfig`: The configuration of the integration currently stored on the tenant
- `formConfig`: The integration-specific configuration for a form

You can call the following methods to interact with the portal:

- `saveIntegrationConfig(newConfig)`: Asks the portal to save new integration configuration for the tenant
- `saveFormConfig(newConfig)`: Asks the portal to save new integration-specific config for the form
- `navigatePortal(url)`: Ask the portal to navigate to a portal-relative URL
- `closeFormConfig()`: Ask the portal to close the form config modal (useful for Dismiss/Discard buttons in form config
  frontends)
