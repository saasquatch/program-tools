<h1 align="center">@saasquatch/integration-boilerplate-node</h1>

<p align="center">Node/Express boilerplate for building SaaSquatch integrations.</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-node"><img src="https://img.shields.io/npm/v/@saasquatch/integration-boilerplate-node/latest.svg?style=flat-square" alt="NPM version" /> </a>
  <a href="https://www.npmjs.com/package/@saasquatch/integration-boilerplate-node"><img src="https://img.shields.io/npm/dm/@saasquatch/integration-boilerplate-node.svg?style=flat-square" alt="NPM downloads"/> </a>
</p>

[SaaSquatch](https://saasquatch.com) is a platform for managing referral and rewards programs for digital
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
- With a tenant-scoped token provided to your integration's frontend on the Integrations page of the SaaSquatch portal
  and in the form configuration contexts for initial data and submit actions.

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
submit actions). The form handler configuration is available in the form handler context passed to a form handler
function.

### Handlers

A number of "on-rails" handler function definitions are available making simple integrations easy to develop.

#### Webhook handler

A webhook handler takes the following arguments:

| Argument  | Description                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------- |
| `service` | The integration service, which gives you access to service config, and the built-in logger                     |
| `webhook` | The body of the webhook. SaaSquatch webhooks contain a `type` property to determine what kind of webhook it is |
| `config`  | The integration configuration for the tenant for which the webhook was sent                                    |
| `graphql` | A tenant-scoped GraphQL function for performing queries against SaaSquatch's GraphQL API                       |
| `res`     | The Express Response object                                                                                    |

For webhooks to be considered successful by SaaSquatch, it must return a 200 HTTP status. If you define a
webhook handler, you are responsible for sending the response status.

Webhook handlers do not need to return a body.

#### Form handlers

There are 4 types of form handler: `formSubmitHandler`, `formValidateHandler`, `formIntrospectionHandler`,
`formInitialDataHandler` called at different times in a form's lifecycle. They all take the following arguments:

| Argument  | Description                                                                                                                                                                     |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `service` | The integration service, which gives you access to service config, and the built-in logger                                                                                      |
| `context` | The form context, see the [schema definition](https://github.com/saasquatch/schema/blob/master/src/json/form/FormHandlerRequestBody.schema.json) for the properties it contains |
| `graphql` | A tenant-scoped GraphQL function for performing queries against SaaSquatch's GraphQL API                                                                                        |

The expected response body of a form handler depends on the type, and the expected responses can be found in the
schema:

- [FormHandlerSubmitResponseBody](https://github.com/saasquatch/schema/blob/master/src/json/form/FormHandlerSubmitResponseBody.schema.json)
- [FormHandlerValidateResponseBody](https://github.com/saasquatch/schema/blob/master/src/json/form/FormHandlerValidateResponseBody.schema.json)
- [FormHandlerIntrospectionResponseBody](https://github.com/saasquatch/schema/blob/master/src/json/form/FormHandlerIntrospectionResponseBody.schema.json)
- [FormHandlerInitialDataResponseBody](https://github.com/saasquatch/schema/blob/master/src/json/form/FormHandlerInitialDataResponseBody.schema.json)

Form handlers can also return an error response, which is defined in
[FormHandlerErrorResponseBody](https://github.com/saasquatch/schema/blob/master/src/json/form/FormHandlerErrorResponseBody.schema.json).

The Typescript types are based on these schemas and should help you make sure your handlers are returning the right
kind of data.

## Advanced Use Cases

### Custom routing

Many integrations can get away with only providing handlers for webhooks and forms, however more complex integrations
that may respond to webhooks from 3rd party systems need to define their own routing and middleware.

There is a router available on the service as `service.router` for this purpose, which can be configured with routes
and middleware as needed.

```ts
import { createIntegrationService } from "@saasquatch/integration-boilerplate-node";

async function main() {
  const router = Router();
  const service = await createIntegrationService();

  service.router.get("/myCustomRoute", (req, res) => {
    res.send("Hello World");
  });

  service.run();
}

main();
```

_NOTE_: There are two reserved routes for the built-in handlers, `/form` and `/webhook`. Don't override these if you
want them to work.

### Custom routes called from Integrations page

Within the Integrations page in the SaaSquatch portal, your integration's configuration interface is provided with a
tenant scoped token. For routes that are called by your configuration interface, there is a special middleware which
will validate the token and place the `tenantAlias` directly on the request for you. This makes it easier to implement
things like OAuth flows with 3rd party services or use your integration to securely query GraphQL for data required by your
integration's frontend (like a list of programs, for example).

Integration configuration frontends are loaded in iframes and use [Penpal](https://github.com/Aaronius/penpal#readme) for
communication with the SaaSquatch portal. How to easily build an integration frontend is the concern of
[integration-boilerplate-react](https://github.com/saasquatch/program-tools/tree/master/packages/integration-boilerplate-react).

In your configuration interface you could do this:

```ts
fetch("/called-from-config-ui", {
  headers: { Authorization: `Bearer ${penpal.tenantScopedToken}` },
});
```

And respond to it in the integration like this (see the section on GraphQL below to understand the call to
`service.getTenant`):

```ts
import { gql } from "@saasquatch/integration-boilerplate-node";

router.get(
  "/called-from-config-ui",
  service.tenantScopedTokenMiddleware, // This is the middleware you should use
  async (req, res) => {
    // The tenantAlias is on the req object
    const { graphql } = await service.getTenant(req.tenantAlias!);

    const response = await graphql(gql`query { ... }`);

    res.sendStatus(200);
  }
);
```

### GraphQL

In your custom routes, you may need to make GraphQL queries based on data coming in from 3rd party services. The first
thing to say is **make sure you are appropriately authenticating incoming requests from 3rd parties!**

To get the integration config for the tenant and a tenant-scoped GraphQL function, you can call `getTenant` on the
service passing the tenant alias, which will return to you the integration config for the tenant and a tenant-scoped GraphQL function.

_NOTE_: If happen to pass a tenant alias for a tenant that does not have your integration enabled, then `getTenant`
will fail.

Here's an example:

```ts
import { Router } from "express";
import {
  createIntegrationService,
  gql,
} from "@saasquatch/integration-boilerplate-node";

async function main() {
  const router = express.Router();
  const service = await createIntegrationService({
    handlers: {
      webhookHandler(service, webhook, config, graphql, res) {
        service.logger.info("Handling a webhook! %o", webhook);
        res.sendStatus(200);
      },
    },
    customRouter: router,
  });

  router.get("/some3rdPartyWebhook/:tenantAlias", async (req, res) => {
    // Ensure that the webhook is legitimate - implement something like this, or a middleware for this route
    // to validate the webhook is coming from the service you expect
    validate3rdPartyWebhook();

    // config - the tenant's integration config
    // graphql - a tenant-scoped GraphQL function
    const { config, graphql } = await service.getTenant(req.params.tenantAlias);

    const response = await graphql(gql`query { ... }`);

    res.sendStatus(200);
  });

  service.run();
}

main();
```

The `graphql` function can be typed with the response, i.e `graphql<MyResponseType>(...)` and takes optional `variables` and `operationName` arguments.
