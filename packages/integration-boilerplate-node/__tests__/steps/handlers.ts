import assert from "node:assert/strict";
import { Given, When, Then } from "@cucumber/cucumber";
import { Router, type Application } from "express";

import { createIntegrationService } from "../../src/index.ts";
import { graphqlShouldError } from "../../mocks/graphql.ts";
import { makeMock } from "../support/mocks.ts";
import type { TestWorld } from "../support/world.ts";

const mockWebhookHandler = makeMock((_s: any, _w: any, _c: any, _g: any, r: any) =>
  r.sendStatus(200),
);

const mockIntrospectionHandler = makeMock(
  (_s: any, _c: any, t: any, _ta: any) => t,
);

const mockBrokenWebhookHandler = makeMock(() => {
  throw new Error("broken webhook handler");
});

const mockFormSubmitHandler = makeMock(() => ({ results: [] }));

const mockFormValidateHandler = makeMock(() => ({ valid: true, errors: [] }));

const mockFormIntrospectionHandler = makeMock(() => ({
  actions: [],
  inputData: [],
  inputDataSchema: {},
}));

const mockFormInitialDataHandler = makeMock(() => ({ inputData: {} }));

const mockBrokenFormHandler = makeMock(() => {
  throw new Error("broken form handler");
});

const mockErrorFormHandler = makeMock(() => ({
  errorCode: "NOT_HAPPY",
  error: "form handler failed",
}));

Given(
  "a default integration service with no custom handlers",
  async function (this: TestWorld) {
    const service = await createIntegrationService();
    return this.setupService(service);
  },
);

Given(
  /the introspection path is (\S+)/,
  function (this: TestWorld, path: string) {
    this.config!.introspectionEndpointPath = path;
  },
);

Given(
  "an integration service with custom handlers",
  async function (this: TestWorld) {
    const service = await createIntegrationService({
      handlers: {
        webhookHandler: mockWebhookHandler,
        introspectionHandler: mockIntrospectionHandler,
        formSubmitHandler: mockFormSubmitHandler,
        formValidateHandler: mockFormValidateHandler,
        formIntrospectionHandler: mockFormIntrospectionHandler,
        formInitialDataHandler: mockFormInitialDataHandler,
      },
    });
    return this.setupService(service);
  },
);

Given(
  "an integration service with a webhook handler that throws an exception",
  async function (this: TestWorld) {
    const service = await createIntegrationService({
      handlers: {
        webhookHandler: mockBrokenWebhookHandler,
      },
    });
    return this.setupService(service);
  },
);

Given(
  "an integration service with a form handler that throws an exception",
  async function (this: TestWorld) {
    const service = await createIntegrationService({
      handlers: {
        formSubmitHandler: mockBrokenFormHandler,
      },
    });
    return this.setupService(service);
  },
);

Given(
  "an integration service with a form handler that returns a form error",
  async function (this: TestWorld) {
    const service = await createIntegrationService({
      handlers: {
        formSubmitHandler: mockErrorFormHandler,
      },
    });
    return this.setupService(service);
  },
);

Given(
  "an integration service with a custom router",
  async function (this: TestWorld) {
    const router = Router();
    const service = await createIntegrationService({
      handlers: {},
      customRouter: router,
    });

    router.get("/test", (_req, res) => res.send({ custom: "result" }));

    return this.setupService(service);
  },
);

Given(
  "an integration service with a custom router that requires a tenant-scoped token",
  async function (this: TestWorld) {
    const router = Router();
    const service = await createIntegrationService({
      handlers: {},
      customRouter: router,
    });

    router.get(
      "/test",
      service.tenantScopedTokenMiddleware,
      async (req, res) => {
        const { config: _config, graphql: _graphql } = await service.getTenant(
          req.tenantAlias!,
        );

        res.send({ tenantAlias: req.tenantAlias! });
      },
    );

    return this.setupService(service);
  },
);

Given(
  "an integration service with a custom router that makes a GraphQL query",
  async function (this: TestWorld) {
    const router = Router();
    const service = await createIntegrationService({
      handlers: {},
      customRouter: router,
    });

    router.get(
      "/test",
      service.tenantScopedTokenMiddleware,
      async (req, res) => {
        const { config: _config, graphql } = await service.getTenant(
          req.tenantAlias!,
        );

        let response;
        try {
          response = await graphql("query tenantAlias { tenantAlias }");
        } catch (e: any) {
          res.send(e.response);
        }

        res.send(response);
      },
    );

    return this.setupService(service);
  },
);

Given("the GraphQL query returns an error", function () {
  graphqlShouldError.flag = true;
});

Given(
  /there is a (.*) request to (.*)/,
  function (this: TestWorld, method: string, route: string) {
    this.requestInit = {
      ...this.requestInit,
      method: method,
      headers: { "Content-Type": "application/json" },
    };
    this.url = `http://localhost:${this.port}${route}`;
  },
);

Given(
  /the (.*) header is:/,
  function (this: TestWorld, header: string, value: string) {
    this.requestInit = {
      ...this.requestInit,
      headers: {
        ...(this.requestInit.headers as Record<string, string>),
        [header]: value,
      },
    };
  },
);

Given("the body is:", function (this: TestWorld, body: string) {
  this.requestInit = {
    ...this.requestInit,
    body: JSON.stringify(JSON.parse(body)),
  };
});

When("the request is sent", async function (this: TestWorld) {
  this.response = await fetch(this.url, this.requestInit);
});

Then(
  /^there is no "(.*)" route configured$/,
  function (this: TestWorld, route: string) {
    assert.notStrictEqual(this.app, null);
    const routeIsConfigured = !!(this.app as Application)["_router"].stack.find(
      (layer: any) => {
        return layer?.route?.path === route;
      },
    );
    assert.strictEqual(routeIsConfigured, false);
  },
);

Then(
  /the response status will be (\d+)/,
  function (this: TestWorld, status: string) {
    assert.strictEqual(this.response!.status, Number(status));
  },
);

Then("the response will be:", async function (this: TestWorld, body: string) {
  assert.deepStrictEqual(await this.response!.json(), JSON.parse(body));
});

Then("the custom webhook handler will be called", function () {
  assert.strictEqual(mockWebhookHandler.mock.callCount(), 1);
});

Then(
  /the custom introspection handler (will|will not) be called/,
  function (willWillNot: string) {
    assert.strictEqual(
      mockIntrospectionHandler.mock.callCount(),
      willWillNot === "will" ? 1 : 0,
    );
  },
);

Then("the custom form submit handler will be called", function () {
  assert.strictEqual(mockFormSubmitHandler.mock.callCount(), 1);
});

Then("the custom form validation handler will be called", function () {
  assert.strictEqual(mockFormValidateHandler.mock.callCount(), 1);
});

Then("the custom form introspection handler will be called", function () {
  assert.strictEqual(mockFormIntrospectionHandler.mock.callCount(), 1);
});

Then("the custom form initial data handler will be called", function () {
  assert.strictEqual(mockFormInitialDataHandler.mock.callCount(), 1);
});
