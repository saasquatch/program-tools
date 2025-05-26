import { sync } from "./main";
import { decodeUserJwt } from "./utils";
import html from "./widgetTemplate.html?raw";

export type WidgetConfig = {
  programId: string;
  token: string;
  context?: string;
  widgetType: string;
};

declare global {
  interface Window {
    squatch: any;
    widgetIdent: any;
  }
}
export function renderWidget(config: WidgetConfig) {
  const { mintSource, bedrockSource, tenantAlias } = sync();
  console.log({ config });

  if (!window.squatch) {
    console.error("squatchjs hasn't loaded yet");
  }

  const app = document.getElementById("app");
  const content = `
    <html>
      <head>
        <meta charset="utf-8" />
        <script src="${mintSource}" type="module"></script>
        <script src="${bedrockSource}" type="module"></script>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
  const widget = new window.squatch.EmbedWidget({
    type: config.widgetType,
    container: app,
    content: content,
    context: {
      type: "passwordless", // remove if setting user info + token
    },
    npmCdn: "https://fast.ssqt.io/npm",
  });
  widget.load();
  const frame = app!.querySelector(
    "iframe#squatchFrame"
  ) as HTMLIFrameElement | null;

  const userObj = decodeUserJwt(config.token);

  frame!.contentWindow!.widgetIdent = {
    programId: config.programId,
    appDomain: "https://staging.referralsaasquatch.com",
    tenantAlias,
    userId: userObj?.id,
    accountId: userObj?.accountId,
    email: userObj?.email,
    token: config.token,
  };
}
