import { Component, Prop, h } from "@stencil/core";

declare global {
  interface Window {
    DocuSign: any;
  }
}

@Component({
  tag: "sqm-docusign-embed",
  shadow: true,
})
export class DocusignEmbedComponent {
  @Prop() url: string;
  // private iframe: HTMLIFrameElement;

  // async componentDidLoad() {
  //   // TODO: Replace with actual endpoint when it's ready
  //   const url = await (await fetch("http://localhost:5555/geturl")).text();
  //   this.iframe.src = url;

  //   // this.iframe.src =
  //   //   "https://demo.docusign.net/Signing/MTRedeem/v1/81222592-d65d-4d8f-b847-04856779a9f4?slt=eyJ0eXAiOiJNVCIsImFsZyI6IlJTMjU2Iiwia2lkIjoiNjgxODVmZjEtNGU1MS00Y2U5LWFmMWMtNjg5ODEyMjAzMzE3In0.AQYAAAABAAMABwAAIIekfxjcSAgAAMCYK6EY3EgYAAEAAAAAAAAAIQDwAgAAeyJUb2tlbklkIjoiYzMyZjkwZDAtOGYyMy00MzZhLWFlNTctN2Q1MDgxZGRkZjAxIiwiRXhwaXJhdGlvbiI6IjIwMjQtMDEtMThUMjM6NTE6MDgrMDA6MDAiLCJJc3N1ZWRBdCI6IjIwMjQtMDEtMThUMjM6NDY6MDguNDY0OTEwNCswMDowMCIsIlJlc291cmNlSWQiOiIxMGIzZDE3MS1hNGI3LTQ1NDUtYjBmNy00OTEwNGI0ZjJhNTQiLCJSZXNvdXJjZXMiOiJ7XCJFbnZlbG9wZUlkXCI6XCIxMGIzZDE3MS1hNGI3LTQ1NDUtYjBmNy00OTEwNGI0ZjJhNTRcIixcIkFjdG9yVXNlcklkXCI6XCI1ZTg0M2IwMS0wNjUwLTRkZTYtOGJkZS00OTBjYzBkYmFhMDVcIixcIlJlY2lwaWVudElkXCI6XCIwYTMwZDdhNC1iZWYzLTRhYjUtYjg0YS0wMjBiMTllZTgzMjZcIixcIkZha2VRdWVyeVN0cmluZ1wiOlwidD1iN2ZmOGNjZC0yNzE4LTQ1MWEtYmRhYS0zMDk2OTcxYjY3OGJcIixcIkludGVncmF0b3JLZXlcIjpcIklNUEEtMmE1YzM5YWItYTlmNi00NThiLTgzZWYtM2Y3ZGVkOTNhZWE1XCIsXCJDcmVhdGVkQXRcIjpcIjIwMjQtMDEtMThUMjM6NDY6MDguMzY1NTgzWlwifSIsIlRva2VuVHlwZSI6MSwiQXVkaWVuY2UiOiIyNWUwOTM5OC0wMzQ0LTQ5MGMtOGU1My0zYWIyY2E1NjI3YmYiLCJSZWRpcmVjdFVyaSI6Imh0dHBzOi8vZGVtby5kb2N1c2lnbi5uZXQvU2lnbmluZy9TdGFydEluU2Vzc2lvbi5hc3B4IiwiSGFzaEFsZ29yaXRobSI6MCwiSGFzaFJvdW5kcyI6MCwiVG9rZW5TdGF0dXMiOjAsIklzU2luZ2xlVXNlIjpmYWxzZX0_AIDnvlaAGNxI.pz7FN5reKM0PrJ1vCyu8fgCCYBLlzkVnQgbgrrE4errETVxTYz88j51emxqthnUz0MlKvpQ7v8vf09CF22bHtM7jPtriMMILMhhTrii2nUMpYpchgKUIayIZhcvlCgL7hET6DxjsLTcEvuFr11Bumn-1qmNZHh7KJvfBHN3Fve1F031dJUxhxC2XK2EKGcUvM8yXLGWMCFpkYPQBY-m6lfSqdoRIoTUzqFA9H1331kr1zUsfkR8ygyANItyf1a9eTpVuPfpVi9Sv8eRFE1Jvtj8B2Jzi4dghG9IFyBYrRNoKAUP0R2cB8QU-VdPbos5w8Wgp8OXxuqLwXeP9D3WLtA";
  // }

  render() {
    return (
      <iframe
        // ref={(el) => (this.iframe = el)}
        src={this.url}
        width="100%"
        height="100%"
        class="docusign-iframe"
      ></iframe>
    );
  }
}
