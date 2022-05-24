import { Request, Response } from "express";

import { Webhook, TenantScopedGraphQLFn } from "./types";
import { handleError, errorToString, UnhandledWebhookError } from "./errors";
import { BaseConfig } from "./config";
import { IntegrationService } from "./service";

export async function webhookHandler<
  ServiceConfig extends BaseConfig,
  IntegrationConfig,
  FormConfig
>(
  req: Request,
  res: Response,
  service: IntegrationService<ServiceConfig, IntegrationConfig, FormConfig>,
  graphql: TenantScopedGraphQLFn
) {
  const webhook = req.body as Webhook;

  service.logger.debug(
    "SaaSquatch webhook received: [%s] [%s] [%s]",
    webhook.id,
    webhook.type,
    webhook.tenantAlias
  );

  try {
    const config = await service.getIntegrationConfig(webhook.tenantAlias);
    if (service.options?.handlers?.webhookHandler) {
      try {
        await service.options.handlers.webhookHandler!(
          service,
          webhook,
          config,
          graphql,
          res
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
