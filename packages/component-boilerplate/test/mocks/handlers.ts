import { graphql } from "msw";

let prevReq: Object = {}

export const handlers = [
  graphql.query("MockTest", (req, res, ctx) => {
    prevReq = req;
    return res(
      ctx.data({
        greeting: `Hello, ${req.variables.name}!`,
      })
    );
  }),
];
