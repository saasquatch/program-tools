<h1 align="center">@saasquatch/integration-boilerplate-node</h1>

<p align="center">Node/Express boilerplate for building SaaSquatch integrations.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-node"><img src="https://img.shields.io/npm/v/@saasquatch/integration-boilerplate-node/latest.svg?style=flat-square" alt="NPM version" /> </a>
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-node"><img src="https://img.shields.io/npm/dm/@saasquatch/integration-boilerplate-node.svg?style=flat-square" alt="NPM downloads"/> </a>
</p>

[SaaSquatch](https://saasquatch.com) provides an application for managing referral and rewards programs for digital
businesses. Integrations with SaaSquatch are typically built as microservices which respond to
[webhooks](https://docs.saasquatch.com/api/webhooks/) and form handler triggers from SaaSquatch's forms platform.

This boilerplate allows you to very quickly stand up a Node/Express microservice in TypeScript which can act as a SaaSquatch
integration. It provides easy ways to do the easy things, and hooks for adding advanced configuration to make the more
advanced things possible when building your integration.

## Getting Started

Here's an example of the most basic integration that handles SaaSquatch webhooks:

```ts
import { createIntegrationService } from "@saasquatch/integration-boilerplate-node";

async function main() {
  const service = await createIntegrationService({
    handlers: {
      webhookHandler(service, webhook, config, graphql, res) {
        service.logger.info("Handling a webhook! %o", webhook);
        res.sendStatus(200);
      },
    },
  });

  service.run();
}

main();
```

## Concepts

### Authentication

SaaSquatch integrations are authenticated in two primary ways:

- As an OAuth application which provides access to SaaSquatch APIs from your integration. This requires an Auth0
  application configured in SaaSquatch's backend for your integration.
- With a tenant-scoped token provided to your integration's frontend in the various contexts in which it is called from
  the SaaSquatch portal.

We are working on making it easier for customers to build their own integrations, however for now only SaaSquatch's
integration team is able to properly configure the necessary resources for authenticating an integration.

### Configuration

There are three different types of configuration relevant to an integration. They can be provided as type parameters to
`createIntegrationService` in order to customize them for your integration:

```ts
createIntegrationService<ServiceConfig, IntegrationConfig, FormConfig>();
```

#### Service configuration

Service configuration parameters are configured with environment variables, which are typed through the use of the
[`typed-config`](https://github.com/christav/typed-config) package. There are a number of built-in service configuration
parameters common to all integrations. These are:

| Environment Variable       | Property                | Default                    | Description                                                                                                  |
| -------------------------- | ----------------------- | -------------------------- | ------------------------------------------------------------------------------------------------------------ |
| PORT                       | port                    | 10000                      | The port on which to run the microservice                                                                    |
| SERVER_LOG_LEVEL           | serverLogLevel          | info                       | The log level for the default logger                                                                         |
| ENFORCE_HTTPS              | enforceHttps            | true                       | Enforce HTTPS on the Express server                                                                          |
| PROXY_FRONTEND             | proxyFrontend           | <none>                     | Proxy the integration frontend through the Express server, specify a URL like http://localhost:3000          |
| STATIC_FRONTEND_PATH       | staticFrontendPath      | .../../frontend/build      | The location (relative to your main module) of the integration's frontend (ignored if PROXY_FRONTEND is set) |
| STATIC_FRONTEND_INDEX      | staticFrontendIndex     | index.html                 | The root file of your integration frontend (ignored if PROXY_FRONTEND is set)                                |
| SAASQUATCH_APP_DOMAIN      | saasquatchAppDomain     | app.referralsaasquatch.com | The domain of the SaaSquatch core application                                                                |
| SAASQUATCH_AUTH0_DOMAIN    | saasquatchAuth0Domain   | <none>                     | The Auth0 domain for OAuth authentication to the SaaSquatch API                                              |
| SAASQUATCH_AUTH0_CLIENT_ID | saasquatchAuth0ClientId | <none>                     | The Auth0 client ID for OAuth authentication to the SaaSquatch API                                           |
| SAASQUATCH_AUTH0_SECRET    | saasquatchAuth0Secret   | <none>                     | The Auth0 client secret for OAuth authentication to the SaaSquatch API                                       |

The authentication parameters `SAASQUATCH_AUTH0_*` are required, and do not have defaults. Your service will not start
without them.

Service configuration can be customized by extending `BaseConfig` using the primitives of `typed-config`:

```ts
import { key, optional } from "typed-config";
import {
  createIntegrationService,
  BaseConfig,
  asBoolean,
} from "@saasquatch/integration-boilerplate-node";

class MyCustomConfig extends BaseConfig {
  @key("REQUIRED_CUSTOM_SETTING")
  public requiredCustomSetting!: string;

  @key("OPTIONAL_CUSTOM_SETTING", asBoolean)
  @optional("default_value")
  public optionalCustomSetting!: asBoolean;
}

async function main() {
  const service = await createIntegrationService({
    configClass: MyCustomConfig,
  });

  // The config of the service is always available at service.config
  service.logger.debug(service.config.requiredCustomSetting);
}

main();
```

_NOTE_: At the the time of writing the `asBoolean` and `asNumber` transformers from `typed-config` were broken, so this
package exports versions that work correctly. See [this issue](https://github.com/christav/typed-config/issues/1).

#### Integration configuration

Integration configuration is saved by your integration's configuration frontend and stored with the tenant in
SaaSquatch. These parameters are the tenant's specific configuration for the integration, and are made available
automatically to webhook and form handlers.

#### Form handler configuration

Form handler configuration is configuration specific to a particular form, and is configured by your integration's
configuration frontend when called in a form's configuration context (either to configure initial data actions, or
submit actions).

### Handlers

A number of "on-rails" handler function definitions are available making simple integrations easy to develop.

#### Webhook handler

TODO

#### Form submit handler

TODO

#### Form initial data handler

TODO

#### Form validation handler

TODO

#### Form introspection handler

TODO

## Advanced Use Cases

TODO

### Custom routing

TODO

### GraphQL

TODO
