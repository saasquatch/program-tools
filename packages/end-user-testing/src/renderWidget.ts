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

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiNzZmMzRjNDdhN2JmNzYwMzgyMGYwZDQ5MGYwZThhNzAyMWM3YTM1OGNhNTU5YTZhM2Q3OGU5Y2UyMWQ5ZTA4ZCIsImFjY291bnRJZCI6Ijc2ZjM0YzQ3YTdiZjc2MDM4MjBmMGQ0OTBmMGU4YTcwMjFjN2EzNThjYTU1OWE2YTNkNzhlOWNlMjFkOWUwOGQiLCJlbWFpbCI6ImNvbGV0b24uYW5uZXR0K3Rlc3Q4MjM0MjM0QGltcGFjdC5jb20ifX0.GHwg1f2yveU8fnMIkCvzony77LOMVbjK4EWVA-cP1dE";
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
