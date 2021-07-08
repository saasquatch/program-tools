import coreHandlers, {
  lookUpEmailSpy,
  upsertSpy,
  validateEmailSpy,
} from "./core";
import webhookHandlers, {
  authenticateWebhookSpy,
  registerWebhookSpy,
} from "./webhook";
export const handlers = [...coreHandlers, ...webhookHandlers];
export const spies = [
  registerWebhookSpy,
  authenticateWebhookSpy,
  upsertSpy,
  lookUpEmailSpy,
  validateEmailSpy,
];
