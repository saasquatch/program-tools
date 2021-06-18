import http from "http";
import { Router } from "express";
import { StepDefinitions } from "jest-cucumber";
import fetch, { Response, RequestInit } from "node-fetch";

import { createIntegrationService } from "../../src";

const mockWebhookHandler = jest
  .fn()
  .mockImplementation((_s, _w, _c, _g, r) => r.sendStatus(200));

const mockBrokenWebhookHandler = jest.fn().mockImplementation(() => {
  throw new Error("broken webhook handler");
});

const mockFormSubmitHandler = jest
  .fn()
  .mockImplementation(() => ({ results: [] }));

const mockFormValidateHandler = jest
  .fn()
  .mockImplementation(() => ({ valid: true, errors: [] }));

const mockFormIntrospectionHandler = jest.fn().mockImplementation(() => ({
  actions: [],
  inputData: [],
  inputDataSchema: {},
}));

const mockFormInitialDataHandler = jest
  .fn()
  .mockImplementation(() => ({ inputData: {} }));

const mockBrokenFormHandler = jest.fn().mockImplementation(() => {
  throw new Error("broken form handler");
});

const mockErrorFormHandler = jest.fn().mockImplementation(() => ({
  errorCode: "NOT_HAPPY",
  error: "form handler failed",
}));

const handlerSteps: StepDefinitions = ({ given, and, when, then }) => {
  let server: http.Server;
  let port: number;
  let url: string = "";
  let requestInit: RequestInit = {};
  let response: Response;

  function setupService(service: any) {
    return new Promise<void>((resolve, _reject) => {
      server = service.server.listen(() => {
        port = (server.address() as any).port;
        resolve();
      });
    });
  }

  afterEach((done) => {
    server.close(done);
    url = "";
    requestInit = {};
  });

  given("a default integration service", async () => {
    const service = await createIntegrationService();
    return setupService(service);
  });

  given("an integration service with custom handlers", async () => {
    const service = await createIntegrationService({
      handlers: {
        webhookHandler: mockWebhookHandler,
        formSubmitHandler: mockFormSubmitHandler,
        formValidateHandler: mockFormValidateHandler,
        formIntrospectionHandler: mockFormIntrospectionHandler,
        formInitialDataHandler: mockFormInitialDataHandler,
      },
    });
    return setupService(service);
  });

  given(
    "an integration service with a webhook handler that throws an exception",
    async () => {
      const service = await createIntegrationService({
        handlers: {
          webhookHandler: mockBrokenWebhookHandler,
        },
      });
      return setupService(service);
    }
  );

  given(
    "an integration service with a form handler that throws an exception",
    async () => {
      const service = await createIntegrationService({
        handlers: {
          formSubmitHandler: mockBrokenFormHandler,
        },
      });
      return setupService(service);
    }
  );

  given(
    "an integration service with a form handler that returns a form error",
    async () => {
      const service = await createIntegrationService({
        handlers: {
          formSubmitHandler: mockErrorFormHandler,
        },
      });
      return setupService(service);
    }
  );

  given("an integration service with a custom router", async () => {
    const router = Router();
    const service = await createIntegrationService({
      handlers: {},
      customRouter: router,
    });

    router.get("/test", (_req, res) => res.send({ custom: "result" }));

    return setupService(service);
  });

  given(
    "an integration service with a custom router that requires a tenant-scoped token",
    async () => {
      const router = Router();
      const service = await createIntegrationService({
        handlers: {},
        customRouter: router,
      });

      router.get(
        "/test",
        service.tenantScopedTokenMiddleware,
        async (req, res) => {
          const { config: _config, graphql: _graphql } =
            await service.getTenant(req.tenantAlias!);

          res.send({ tenantAlias: req.tenantAlias! });
        }
      );

      return setupService(service);
    }
  );

  given(
    "an integration service with a custom router that makes a GraphQL query",
    async () => {
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
            req.tenantAlias!
          );

          const response = await graphql("query tenantAlias { tenantAlias }");

          res.send(response);
        }
      );

      return setupService(service);
    }
  );

  and(/there is a (.*) request to (.*)/, async (method, route) => {
    requestInit = {
      ...requestInit,
      method: method,
      headers: { "Content-Type": "application/json" },
    };
    url = `http://localhost:${port}${route}`;
  });

  and(/the (.*) header is:/, (header, value) => {
    requestInit = {
      ...requestInit,
      headers: { ...requestInit.headers, [header]: value },
    };
  });

  and("the body is:", (body) => {
    requestInit = { ...requestInit, body };
  });

  when("the request is sent", async () => {
    response = await fetch(url, requestInit);
  });

  then(/the response status will be (\d+)/, (status) => {
    const statusNumber = Number(status);
    expect(response.status).toBe(statusNumber);
  });

  then("the response will be:", async (body) => {
    expect(JSON.parse(body)).toStrictEqual(await response.json());
  });

  then("the custom webhook handler will be called", () => {
    expect(mockWebhookHandler.mock.calls.length).toBe(1);
  });

  then("the custom form submit handler will be called", () => {
    expect(mockFormSubmitHandler.mock.calls.length).toBe(1);
  });

  then("the custom form validation handler will be called", () => {
    expect(mockFormValidateHandler.mock.calls.length).toBe(1);
  });

  then("the custom form introspection handler will be called", () => {
    expect(mockFormIntrospectionHandler.mock.calls.length).toBe(1);
  });

  then("the custom form initial data handler will be called", () => {
    expect(mockFormInitialDataHandler.mock.calls.length).toBe(1);
  });
};

export default handlerSteps;
