import { graphql } from "msw";
export const graphqlShouldError = { flag: false };

export default [
  graphql.query("tenantAlias", (req, res, ctx) => {
    if (graphqlShouldError.flag) {
      return res(
        ctx.errors([{ message: "an error", extensions: { code: "BAD_CODE" } }])
      );
    }
    const tenantAlias = req.url.href.match(
      /https:\/\/mocked_saasquatch\/api\/v1\/(.*)\/graphql/
    )[1];

    return res(
      ctx.data({
        tenantAlias,
      })
    );
  }),
];
