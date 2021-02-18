/**
 * Provided by the SaaSquatch GraphQL backend when a widget is rendered.
 *
 * Source: https://github.com/saasquatch/saasquatch/blob/805e51284f818f8656b6458bcee6181f378819d3/packages/saasquatch-core/app/saasquatch/controllers/api/widget/WidgetApi.java
 *
 */
export interface WidgetIdent {
  tenantAlias: string;
  appDomain: string;
  token: string;
  userId: string;
  accountId: string;

  engagementMedium: "POPUP" | "EMBED" | string;
  programId?: string;
}
