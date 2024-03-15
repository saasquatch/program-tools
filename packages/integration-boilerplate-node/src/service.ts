import {
  healthCheck,
  installShutdownManager,
  requestIdAndLogger,
  shutdownManagerConfigFromEnv,
} from "@saasquatch/express-boilerplate";
import { httpLogMiddleware } from "@saasquatch/logger";
import { IntegrationConfiguration } from "@saasquatch/schema/types/IntegrationConfig";
import compression from "compression";
import express, { Express, Response, Router } from "express";
import enforce from "express-sslify";
import { createProxyMiddleware } from "http-proxy-middleware";
import NodeCache from "node-cache";
import fetch from "node-fetch";
import { hostname } from "os";
import path from "path";
import { Logger } from "winston";
import { gql } from ".";
import { Auth } from "./auth";
import { Auth0WorkloadIdentityCredentialProvider } from "./auth0WorkloadIdentityCredentialProvider";
import { BaseConfig, loadConfig } from "./config";
import { GraphQLError, IntegrationConfigError } from "./errors";
import { formHandler } from "./formHandler";
import { installInstrumentation } from "./instrumentation";
import { introspectionHandler } from "./introspectionHandler";
import { createLogger } from "./logger";
import {
  MetricsManager,
  METRIC_FORM_COUNT,
  METRIC_INTROSPECTION_COUNT,
  METRIC_REQUEST_PROCESSING_COUNT,
  METRIC_WEBHOOK_COUNT,
} from "./metrics";
import {
  createSaasquatchRequestMiddleware,
  createSaasquatchTokenMiddleware,
} from "./middleware";
import * as types from "./types";
import { webhookHandler } from "./webhookHandler";

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
  introspectionHandler?: (
    service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
    config: IntegrationConfig,
    templateIntegrationConfig: IntegrationConfiguration,
    tenantAlias: types.TenantAlias
  ) => Promise<types.IntrospectionResponse>;
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
  readonly metricsManager: MetricsManager | undefined;
  readonly auth: Auth;
  readonly options?: ServiceOptions<
    ServiceConfig,
    IntegrationConfig,
    FormConfig
  >;
  readonly tenantScopedTokenMiddleware: ReturnType<
    typeof createSaasquatchTokenMiddleware
  >;
  readonly router: Router;

  private server: Express;
  private tenantIntegrationConfigCache: NodeCache;

  constructor(
    config: ServiceConfig,
    options?: ServiceOptions<ServiceConfig, IntegrationConfig, FormConfig>
  ) {
    this.options = options;
    this.config = config;
    this.logger = createLogger(config);
    this.metricsManager = config.metricsEnabled
      ? new MetricsManager(config.serviceName)
      : undefined;
    this.auth = new Auth(
      config.saasquatchAppDomain,
      config.saasquatchAuth0ClientId,
      config.saasquatchAuth0Secret,
      config.saasquatchAuth0Domain,
      this.logger
    );
    this.tenantScopedTokenMiddleware = createSaasquatchTokenMiddleware(
      this.auth,
      this.logger
    );
    this.router = options?.customRouter || Router();
    this.server = this.createExpressServer();
    this.tenantIntegrationConfigCache = new NodeCache({
      stdTTL: 60,
      checkperiod: 60,
    });
  }

  run(opts?: { gracefulShutdown?: boolean }) {
    const msg = `${this.config.serviceName} listening on port ${this.config.port}`;

    if (opts?.gracefulShutdown) {
      const httpServer = installShutdownManager(
        this.server,
        this.logger,
        shutdownManagerConfigFromEnv()
      );

      httpServer.listen(this.config.port, () => {
        this.logger.notice(msg);
      });
    } else {
      this.server.listen(this.config.port, () => {
        this.logger.notice(msg);
      });
    }
  }

  async getIntegrationTenants() {
    const tenantQuery = gql`
      query {
        viewer {
          ... on PortalUser {
            tenants {
              tenantAlias
            }
          }
        }
      }
    `;

    interface TenantQueryData {
      data: { viewer: { tenants: { tenantAlias: types.TenantAlias }[] } };
    }

    const result = await this.graphql<TenantQueryData>(tenantQuery);
    const tenantAliases = result.data.viewer.tenants.map(
      (tenant) => tenant.tenantAlias
    );

    return tenantAliases;
  }

  async getTenant(tenantAlias: types.TenantAlias) {
    const config = await this.getIntegrationConfig(tenantAlias);
    const graphql = this.getTenantScopedGraphQL(tenantAlias);
    return { config, graphql };
  }

  async getUserGraphQL(tenantAlias: types.TenantAlias, userJwt: string) {
    return this.getUserScopedGraphQL(tenantAlias, userJwt);
  }

  async getIntegrationConfig(
    tenantAlias: types.TenantAlias
  ): Promise<IntegrationConfig> {
    if (this.tenantIntegrationConfigCache.has(tenantAlias)) {
      this.logger.debug(
        `Retrieving integration config for tenant [${tenantAlias}] from cache`
      );
      return this.tenantIntegrationConfigCache.get(
        tenantAlias
      ) as IntegrationConfig;
    }

    try {
      const tenantAliasParam = encodeURIComponent(tenantAlias);
      const clientId = encodeURIComponent(this.config.saasquatchAuth0ClientId);
      const path = `/api/v1/${tenantAliasParam}/integration/${clientId}`;

      const response = await this.authenticatedHttpRequest("GET", path);

      if (response.status !== 200) {
        throw new Error(JSON.stringify(response.json));
      }

      const config = response.json.config as IntegrationConfig;
      this.tenantIntegrationConfigCache.set(tenantAlias, config);

      return config;
    } catch (e) {
      throw new IntegrationConfigError(
        `Failed to get integration config: ${(e as Error).message}`
      );
    }
  }

  public async authenticatedHttpRequest(
    method: "GET" | "POST",
    path: string,
    body?: any
  ): Promise<{ status: number; json: any }> {
    const apiToken = await this.auth.getSaasquatchApiToken();
    const appDomain = this.config.saasquatchAppDomain;
    const realPath = path.startsWith("/") ? path : `/${path}`;
    const response = await fetch(`https://${appDomain}${realPath}`, {
      method,
      body,
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
    });

    const json = await response.json();
    return { status: response.status, json };
  }

  private getTenantScopedGraphQL(
    tenantAlias: types.TenantAlias
  ): types.TenantScopedGraphQLFn {
    return <QueryResponseShape>(
      query: string,
      variables?: Record<string, any>,
      operationName?: string
    ) => {
      return this.graphql<QueryResponseShape>(query, {
        tenantAlias,
        variables,
        operationName,
      });
    };
  }

  private getUserScopedGraphQL(
    tenantAlias: types.TenantAlias,
    userJwt: string
  ): types.TenantScopedGraphQLFn {
    return <QueryResponseShape>(
      query: string,
      variables?: Record<string, any>,
      operationName?: string
    ) => {
      return this.graphql<QueryResponseShape>(query, {
        tenantAlias,
        variables,
        operationName,
        token: userJwt,
      });
    };
  }

  private async graphql<QueryResponseShape = unknown>(
    query: string,
    opts?: {
      tenantAlias?: types.TenantAlias;
      variables?: Record<string, any>;
      operationName?: string;
      token?: string;
    }
  ): Promise<QueryResponseShape> {
    const apiToken = opts?.token
      ? opts.token
      : await this.auth.getSaasquatchApiToken();

    try {
      const body: {
        query: string;
        variables?: Record<string, any>;
        operationName?: string;
      } = { query };

      if (opts?.variables) {
        body.variables = opts.variables;
      }

      if (opts?.operationName) {
        body.operationName = opts.operationName;
      }

      let url;
      if (opts?.tenantAlias) {
        url = `https://${
          this.config.saasquatchAppDomain
        }/api/v1/${encodeURIComponent(opts.tenantAlias)}/graphql`;
      } else {
        url = `https://${this.config.saasquatchAppDomain}/api/v1/graphql`;
      }

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
        throw new GraphQLError(JSON.stringify(json), json);
      }

      if (json.errors) {
        const errors = json.errors.map((e: any) => e.message).join("\n");
        throw new GraphQLError(errors, json);
      }

      return json;
    } catch (e) {
      if (e instanceof GraphQLError) throw e;
      throw new GraphQLError((e as Error).message);
    }
  }

  private createExpressServer() {
    const app = express();

    // Enable compression
    app.use(compression());

    // generate request IDs and derived logger
    app.use(requestIdAndLogger(this.logger));

    // Enable request logging
    app.use(httpLogMiddleware(this.logger));

    // Record the server's HTTP response times if metrics are enabled
    if (this.config.metricsEnabled) {
      app.use(async (_req, res, next) => {
        const startTimeNs = process.hrtime.bigint();
        this.metricsManager!.increment(METRIC_REQUEST_PROCESSING_COUNT);

        res.on("finish", () => {
          const endTimeNs = process.hrtime.bigint();
          const time = Number((endTimeNs - startTimeNs) / BigInt(1000));

          if (!Number.isNaN(time) && Number.isFinite(time) && time > 0) {
            this.metricsManager!.recordHistogramVal(
              "response_time",
              Number(time)
            );
          }

          this.metricsManager!.decrement(METRIC_REQUEST_PROCESSING_COUNT);
        });

        next();
      });
    }

    // Force HTTPS for all requests
    if (this.config.enforceHttps) {
      const enforceHttps = enforce.HTTPS({ trustProtoHeader: true });
      app.use((req, res, next) => {
        if (["/healthz", "/livez", "/readyz"].includes(req.path)) {
          next();
        } else {
          enforceHttps(req, res, next);
        }
      });
    }

    // Support JSON bodies
    app.use(
      express.json({
        verify: (req, _res, buf) => {
          // Save the raw body for token validation
          // NOTE: The default encoding for buf.toString() is UTF-8
          req.rawBody = buf.toString();
        },
      })
    );

    //  Support application/x-www-form-urlencoded bodies
    app.use(express.urlencoded({ extended: false }));

    const healthCheckFn = healthCheck(app, this.logger);
    app.get("/healthz", healthCheckFn);
    app.get("/livez", healthCheckFn);
    app.get("/readyz", healthCheckFn);

    const requireSaaSquatchSignature = createSaasquatchRequestMiddleware(
      this.auth,
      this.logger
    );

    if (this.options?.handlers?.webhookHandler) {
      app.post("/webhook", requireSaaSquatchSignature, async (req, res) => {
        await webhookHandler(
          req,
          res,
          this,
          this.getTenantScopedGraphQL(req.body.tenantAlias)
        );

        if (this.config.metricsEnabled) {
          this.metricsManager!.increment(METRIC_WEBHOOK_COUNT);
        }
      });
    }

    if (this.options?.handlers?.introspectionHandler) {
      app.post(
        this.config.introspectionEndpointPath,
        requireSaaSquatchSignature,
        async (req, res) => {
          await introspectionHandler(req, res, this);
          if (this.config.metricsEnabled) {
            this.metricsManager!.increment(METRIC_INTROSPECTION_COUNT);
          }
        }
      );
    }

    if (
      this.options?.handlers?.formInitialDataHandler ||
      this.options?.handlers?.formIntrospectionHandler ||
      this.options?.handlers?.formSubmitHandler ||
      this.options?.handlers?.formValidateHandler
    ) {
      app.post("/form", requireSaaSquatchSignature, async (req, res) => {
        await formHandler(
          req,
          res,
          this,
          this.getTenantScopedGraphQL(req.body.tenantAlias)
        );

        if (this.config.metricsEnabled) {
          this.metricsManager!.increment(METRIC_FORM_COUNT);
        }
      });
    }

    app.use("/", this.router);

    // Serve the frontend at the root of the server
    if (this.config.proxyFrontend) {
      app.use(
        "/",
        createProxyMiddleware({
          target: this.config.proxyFrontend,
          changeOrigin: true,
        })
      );
    } else if (this.config.staticFrontendPath) {
      const frontendPath = path.join(
        require.main!.path,
        this.config.staticFrontendPath
      );
      app.use(express.static(frontendPath));
      app.get("/*", (_req, res, next) => {
        res.sendFile(
          path.join(frontendPath, this.config.staticFrontendIndex),
          undefined,
          (err) => {
            if (err) next();
          }
        );
      });
    } else {
      app.get("/", (_req, res) => {
        res.sendStatus(204);
      });
    }

    return app;
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

  if (config.metricsEnabled) {
    const deploymentEnv = process.env["DEPLOYMENT_ENVIRONMENT"] ?? "staging";
    const hostName = `${config.serviceName}-${deploymentEnv}.${
      process.env["DYNO"] ?? hostname()
    }`;

    const url = process.env["OTEL_EXPORTER_OTLP_ENDPOINT"];
    installInstrumentation(config.serviceName, hostName, deploymentEnv, url);
  }

  // Enable workload identity federation if all the appropriate parameters have
  // been set
  if (
    config.googleWorkloadIdentityProjectId &&
    config.googleWorkloadIdentityPool &&
    config.googleWorkloadIdentityProvider &&
    config.googleWorkloadIdentityServiceAccountEmail
  ) {
    new Auth0WorkloadIdentityCredentialProvider(createLogger(config), {
      auth0Domain: config.saasquatchAuth0Domain,
      auth0ClientId: config.saasquatchAuth0ClientId,
      auth0ClientSecret: config.saasquatchAuth0Secret,
      googleWorkloadProjectId: config.googleWorkloadIdentityProjectId,
      googleWorkloadIdentityPool: config.googleWorkloadIdentityPool,
      googleWorkloadIdentityProvider: config.googleWorkloadIdentityProvider,
      googleWorkloadServiceAccountEmail:
        config.googleWorkloadIdentityServiceAccountEmail,
    });
  }

  return new IntegrationService(config, options);
}
