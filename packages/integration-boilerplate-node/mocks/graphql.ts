import { graphql } from "msw";

export default [
  graphql.query("tenantAlias", (req, res, ctx) => {
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
