import { sync } from "./main";
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
  frame!.contentWindow!.widgetIdent = {
    programId: config.programId,
    appDomain: "https://staging.referralsaasquatch.com",
    tenantAlias,
    // userId: "testuser",
    // accountId: "testuser",
    // token:
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoidGVzdHVzZXIiLCJhY2NvdW50SWQiOiJ0ZXN0dXNlciIsImVtYWlsIjoidGVzdHVzZXJAZXhhbXBsZS5jb20ifX0.tegzTaLms4g47rwcWoyhk1WW4hqB16PulQV9zouJNfU",
  };
}
