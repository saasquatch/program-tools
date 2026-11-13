import type { Request, Response } from "express";
import { BaseConfig } from "./config.ts";
import { handleError, errorToString, UnhandledWebhookError } from "./errors.ts";
import { IntegrationService } from "./service.ts";
import type { Webhook, TenantScopedGraphQLFn } from "./types.ts";

export async function webhookHandler<
  ServiceConfig extends BaseConfig,
  IntegrationConfig,
  FormConfig,
>(
  req: Request,
  res: Response,
  service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
  graphql: TenantScopedGraphQLFn,
) {
  const webhook: Webhook = req.body;

  service.logger.debug({
    message: "SaaSquatch webhook received",
    id: webhook.id,
    type: webhook.type,
    tenantAlias: webhook.tenantAlias,
  });

  try {
    const config = await service.getIntegrationConfig(webhook.tenantAlias);
    if (service.options?.handlers?.webhookHandler) {
      try {
        await service.options.handlers.webhookHandler(
          service,
          webhook,
          config,
          graphql,
          res,
        );
      } catch (e) {
        throw new UnhandledWebhookError(errorToString(e));
      }
    } else {
      res.sendStatus(200);
    }
  } catch (e) {
    handleError(e, service.logger, res);
    return;
  }
}
