import { h, Component, Prop } from "@stencil/core";
import { css } from "emotion";
/**
 * @uiName Global Container
 * @canvasRenderer always-replace
 * @slots [{"name":"", "title":"Widget Content"}]
 */
@Component({
  tag: "sqh-global-container",
  styleUrl: "global-container.scss",
})
export class GlobalContainer {
  /**
   * @uiName Background Color
   * @uiWidget color
   * @default #ffffff
   */
  @Prop() background: string;
  /**
   * The background colour of the component while in the loading state.
   *
   * @uiName Loading Color
   * @uiWidget color
   */
  @Prop() loadingcolor: string;
  /**
   * A font from the Google Fonts library used inside the container.
   *
   * @uiName Font Family
   * @default Roboto
   */
  @Prop() fontfamily: string;
  /**
   * @uiName Container Max Width
   */
  @Prop() maxwidth: string;
  /**
   * Hide the Powered by Impact.com link. This can only be disabled on Pro plans.
   *
   * @uiName Hide Powered By Impact.com
   */
  @Prop() poweredby: boolean;

  LoadingState(props) {
    const style = css`
      background-color: ${props.loadingcolor || "#439B76"};
    `;
    return (
      <div class="container-loading">
        <div class="loading-icon">
          <div class={`bar1 ${style}`}></div>
          <div class={`bar2 ${style}`}></div>
          <div class={`bar3 ${style}`}></div>
          <div class={`bar4 ${style}`}></div>
          <div class={`bar5 ${style}`}></div>
        </div>
      </div>
    );
  }

  render() {
    const style = css`
      background-color: ${this.background};
      font-family: ${this.fontfamily};
      position: relative;
      max-width: ${this.maxwidth};
    `;
    const robotoFont = (
      <link
        href="https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap"
        rel="stylesheet"
      />
    );
    const artifaktFont = (
      <link
        href="https://static-dc.autodesk.net/etc/designs/v201903181748/templates-general/structure/fonts/artifakt/clientlibs/artifakt.css"
        rel="stylesheet"
      />
    );

    return (
      <div class={style}>
        {this.fontfamily == "Roboto" ? robotoFont : ""}
        {this.fontfamily == "Artifakt Element" ? artifaktFont : ""}
        <slot />
        {this.poweredby ? (
          <a
            class="sqh-attribution"
            href="https://impact.com/advocate/"
            target="_blank"
          >
            Powered By Impact.com/Advocate
          </a>
        ) : (
          ""
        )}
        <this.LoadingState loadingcolor={this.loadingcolor} />
      </div>
    );
  }
}
