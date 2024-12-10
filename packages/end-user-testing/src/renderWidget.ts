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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IklSTVhzWXk2WVlxcTQ2OTQzN21HOEVSUXQ4UW9LRkJhRzEifQ.eyJ1c2VyIjp7ImlkIjoiMGVhOTQyNDUzYjA0NTJmOGU4NjlmODFmMGJjOGZmNWEyOWU4YjA3NjNmYWFkY2UzNzc2NDNhYjEzMjJmNjFkNCIsImFjY291bnRJZCI6IjBlYTk0MjQ1M2IwNDUyZjhlODY5ZjgxZjBiYzhmZjVhMjllOGIwNzYzZmFhZGNlMzc3NjQzYWIxMzIyZjYxZDQiLCJlbWFpbCI6ImNvbGV0b24uYW5uZXR0K3Rlc3QwNjk4MzczMkBpbXBhY3QuY29tIn19.48n4l410K6YVniDWDrsgymiuIn9cBTEsQ1yRNfrqhQY";
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
