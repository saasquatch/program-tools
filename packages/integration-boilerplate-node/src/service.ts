import path from "path";
import express, { Express, Router, Response } from "express";
import compression from "compression";
import enforce from "express-sslify";
import { createProxyMiddleware } from "http-proxy-middleware";
import { Logger } from "winston";
import fetch from "node-fetch";
import NodeCache from "node-cache";

import * as types from "./types";
import { BaseConfig, loadConfig } from "./config";
import { createLogger } from "./logger";
import { Auth } from "./auth";
import { createSaasquatchTokenMiddleware } from "./middleware";
import { webhookHandler } from "./webhookHandler";
import { formHandler } from "./formHandler";
import { IntegrationConfigError, GraphQLError } from "./errors";

declare module "http" {
  interface IncomingMessage {
    rawBody: string;
  }
}

export interface IntegrationHandlers<
  ServiceConfig extends BaseConfig = BaseConfig,
  IntegrationConfig = {},
  FormConfig = {}
> {
  webhookHandler?: (
    service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
    webhook: types.Webhook,
    config: IntegrationConfig,
    graphql: types.TenantScopedGraphQLFn,
    res: Response
  ) => Promise<void>;
  formSubmitHandler?: (
    service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
    context: types.FormSubmitRequestContext<IntegrationConfig, FormConfig>,
    graphql: types.TenantScopedGraphQLFn
  ) => Promise<types.FormSubmissionResponse | types.FormErrorResponse>;
  formValidateHandler?: (
    service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
    context: types.FormValidateRequestContext<IntegrationConfig, FormConfig>,
    graphql: types.TenantScopedGraphQLFn
  ) => Promise<types.FormValidationResponse | types.FormErrorResponse>;
  formIntrospectionHandler?: (
    service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
    context: types.FormIntrospectionRequestContext<
      IntegrationConfig,
      FormConfig
    >,
    graphql: types.TenantScopedGraphQLFn
  ) => Promise<types.FormIntrospectionResponse | types.FormErrorResponse>;
  formInitialDataHandler?: (
    service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
    context: types.FormInitialDataRequestContext<IntegrationConfig, FormConfig>,
    graphql: types.TenantScopedGraphQLFn
  ) => Promise<types.FormInitialDataResponse | types.FormErrorResponse>;
}

export interface ServiceOptions<
  ServiceConfig extends BaseConfig,
  IntegrationConfig,
  FormConfig
> {
  handlers?: IntegrationHandlers<ServiceConfig, IntegrationConfig, FormConfig>;
  configClass?: (new () => ServiceConfig) | null;
  customRouter?: Router;
}

export class IntegrationService<
  ServiceConfig extends BaseConfig,
  IntegrationConfig,
  FormConfig
> {
  readonly config: ServiceConfig;
  readonly logger: Logger;
  readonly auth: Auth;
  readonly options?: ServiceOptions<
    ServiceConfig,
    IntegrationConfig,
    FormConfig
  >;

  private server: Express;
  private tenantIntegrationConfigCache: NodeCache;

  constructor(
    config: ServiceConfig,
    options?: ServiceOptions<ServiceConfig, IntegrationConfig, FormConfig>
  ) {
    this.options = options;
    this.config = config;
    this.logger = createLogger(config);
    this.auth = new Auth(
      config.saasquatchAppDomain,
      config.saasquatchAuth0ClientId,
      config.saasquatchAuth0Secret,
      config.saasquatchAuth0Domain,
      this.logger
    );
    this.server = this.createExpressServer();
    this.tenantIntegrationConfigCache = new NodeCache({
      stdTTL: 60,
      checkperiod: 60,
    });
  }

  run() {
    this.server.listen(this.config.port, () => {
      this.logger.info(`Listening on port ${this.config.port}`);
    });
  }

  async getTenant(tenantAlias: string) {
    const config = await this.getIntegrationConfig(tenantAlias);
    const graphql = this.getTenantScopedGraphQL(tenantAlias);
    return [config, graphql];
  }

  async getIntegrationConfig(tenantAlias: string): Promise<IntegrationConfig> {
    if (this.tenantIntegrationConfigCache.has(tenantAlias)) {
      this.logger.debug(
        `Retrieving integration config for tenant [${tenantAlias}] from cache`
      );
      return this.tenantIntegrationConfigCache.get(
        tenantAlias
      ) as IntegrationConfig;
    }

    const apiToken = await this.auth.getSaasquatchApiToken();

    try {
      const url = `https://${
        this.config.saasquatchAppDomain
      }/api/v1/${encodeURIComponent(
        tenantAlias
      )}/integration/${encodeURIComponent(
        this.config.saasquatchAuth0ClientId
      )}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });

      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(JSON.stringify(json));
      }

      const config = json.config as IntegrationConfig;
      this.tenantIntegrationConfigCache.set(tenantAlias, config);

      return config;
    } catch (e) {
      throw new IntegrationConfigError(
        `Failed to get integration config: ${e.message}`
      );
    }
  }

  private getTenantScopedGraphQL(
    tenantAlias: string
  ): types.TenantScopedGraphQLFn {
    return <QueryResponseShape>(
      query: string,
      variables?: unknown,
      operationName?: string
    ) => {
      return this.graphql<QueryResponseShape>(
        tenantAlias,
        query,
        variables,
        operationName
      );
    };
  }

  private async graphql<QueryResponseShape = unknown>(
    tenantAlias: string,
    query: string,
    variables?: unknown,
    operationName?: string
  ): Promise<QueryResponseShape> {
    const apiToken = await this.auth.getSaasquatchApiToken();

    try {
      const body: {
        query: string;
        variables?: typeof variables;
        operationName?: string;
      } = { query };

      if (variables) {
        body.variables = variables;
      }

      if (operationName) {
        body.operationName = operationName;
      }

      const url = `https://${
        this.config.saasquatchAppDomain
      }/api/v1/${encodeURIComponent(tenantAlias)}/graphql`;

      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.status !== 200) {
        throw new Error(JSON.stringify(json));
      }

      if (json.errors) {
        const errors = json.errors.map((e: any) => e.message).join("\n");
        throw new Error(errors);
      }

      return json;
    } catch (e) {
      throw new GraphQLError(e.message);
    }
  }

  private createExpressServer() {
    const server = express();

    // Enable compression
    server.use(compression());

    // Simple request logging middleware
    server.use((req, _res, next) => {
      this.logger.info(`${req.method} ${req.url}`);
      next();
    });

    // Force HTTPS for all requests
    if (this.config.enforceHttps) {
      server.use(enforce.HTTPS({ trustProtoHeader: true }));
    }

    // Support JSON bodies
    server.use(
      express.json({
        verify: (req, _res, buf) => {
          // Save the raw body for token validation
          // NOTE: The default encoding for buf.toString() is UTF-8
          req.rawBody = buf.toString();
        },
      })
    );

    //  Support application/x-www-form-urlencoded bodies
    server.use(express.urlencoded({ extended: false }));

    const requireSaaSquatchSignature = createSaasquatchTokenMiddleware(
      this.auth,
      this.logger
    );

    server.post("/webhook", requireSaaSquatchSignature, async (req, res) => {
      await webhookHandler(
        req,
        res,
        this,
        this.getTenantScopedGraphQL(req.body.tenantAlias)
      );
    });

    server.post("/form", requireSaaSquatchSignature, async (req, res) => {
      await formHandler(
        req,
        res,
        this,
        this.getTenantScopedGraphQL(req.body.tenantAlias)
      );
    });

    if (this.options?.customRouter) {
      server.use("/", this.options.customRouter);
    }

    // Serve the frontend at the root of the server
    if (this.config.proxyFrontend) {
      server.use(
        "/",
        createProxyMiddleware({
          target: this.config.proxyFrontend,
          changeOrigin: true,
        })
      );
    } else {
      const frontendPath = path.join(
        require.main!.path,
        this.config.staticFrontendPath
      );
      server.use(express.static(frontendPath));
      server.get("/*", (_req, res) => {
        res.sendFile(path.join(frontendPath, this.config.staticFrontendIndex));
      });
    }

    return server;
  }
}

export async function createIntegrationService<
  ServiceConfig extends BaseConfig = BaseConfig,
  IntegrationConfig = {},
  FormConfig = {}
>(options?: {
  handlers: IntegrationHandlers<ServiceConfig, IntegrationConfig, FormConfig>;
  configClass?: (new () => ServiceConfig) | null;
  customRouter?: Router;
}) {
  const config: ServiceConfig = options?.configClass
    ? await loadConfig(options.configClass)
    : await loadConfig();
  return new IntegrationService(config, options);
}
