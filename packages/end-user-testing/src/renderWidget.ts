import { sync } from "./main";
import { decodeUserJwt } from "./utils";
import html from "./widgetTemplate.html?raw";

export type WidgetConfig = {
  programId: string;
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

  if (!window.squatch) {
    console.log("squatchjs hasn't loaded yet");
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
  console.log(frame);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiNzEyYmI2YmE3MTk1MTA4MWQwYzliMWQ2NDA2MDI3N2JlMjZjY2VlMDFjOGU4ZTk0ZDRiNTA2OWYwNmIyNDlmZCIsImFjY291bnRJZCI6IjcxMmJiNmJhNzE5NTEwODFkMGM5YjFkNjQwNjAyNzdiZTI2Y2NlZTAxYzhlOGU5NGQ0YjUwNjlmMDZiMjQ5ZmQiLCJlbWFpbCI6ImNvbGV0b24uYW5uZXR0K3RheDA4OTcyMzQyM0BpbXBhY3QuY29tIn19.xIfifcCGdmrbeJpw8lQz2vnA2QDkcskCLr9w4hB9vFA";
  const userObj = decodeUserJwt(token);

  frame!.contentWindow!.widgetIdent = {
    programId: config.programId,
    appDomain: "https://staging.referralsaasquatch.com",
    tenantAlias,
    userId: userObj?.id,
    accountId: userObj?.accountId,
    email: userObj?.email,
    token,
  };
}
