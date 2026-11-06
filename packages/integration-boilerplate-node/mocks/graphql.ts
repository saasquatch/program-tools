import { graphql, HttpResponse } from "msw";
export const graphqlShouldError = { flag: false };

export default [
  graphql.query("tenantAlias", ({ request }) => {
    if (graphqlShouldError.flag) {
      return HttpResponse.json({
        errors: [{ message: "an error", extensions: { code: "BAD_CODE" } }],
      });
    }
    const tenantAlias = request.url.match(
      /https:\/\/mocked_saasquatch\/api\/v1\/(.*)\/graphql/,
    )![1];

    return HttpResponse.json({
      data: {
        tenantAlias,
      },
    });
  }),
];
