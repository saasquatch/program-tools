import { rest } from "msw";
import sinon from "sinon";
export const registerWebhookSpy = sinon.spy();
export const authenticateWebhookSpy = sinon.spy();
export default [
  rest.post("http://localhost:3000/webhook/register", async (req, res, ctx) => {
    registerWebhookSpy(req, res, ctx);
    return await res(
      ctx.set("Content-Type", "application/json"),
      ctx.json({
        userUpsert: {
          ...(req.body as any),
          customFields: {
            accountNumber: "1234555",
          },
        },
        sessionData: {
          accountNumber: "1234555",
        },
      })
    );
  }),
  rest.post(
    "http://localhost:3000/webhook/authenticate",
    async (req, res, ctx) => {
      authenticateWebhookSpy(req, res, ctx);
      return await res(
        ctx.set("Content-Type", "application/json"),
        ctx.json({
          sessionData: {
            something: "important",
          },
        })
      );
    }
  ),
];
