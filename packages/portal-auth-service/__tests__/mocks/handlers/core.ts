import { graphql } from "msw";
import sinon from "sinon";
export const upsertSpy = sinon.spy();
export const lookUpEmailSpy = sinon.spy();
export const validateEmailSpy = sinon.spy();
export default [
  graphql.mutation("upsert", (req, res, ctx) => {
    upsertSpy(req, res, ctx);
    return res(ctx.data({ userUpsert: { id: "squatchy_123456" } }));
  }),

  graphql.query("lookupEmail", (req, res, ctx) => {
    lookUpEmailSpy(req, res, ctx);
    return res(
      ctx.data({
        users: [{ id: "squatchy_123456", accountId: "squatchy_123456" }],
      })
    );
  }),

  graphql.mutation("validateEmail", (req, res, ctx) => {
    validateEmailSpy(req, res, ctx);
    return res(ctx.data({}));
  }),
];
