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
   * Show the Powered by Impact.com link. This can only be disabled on Pro plans.
   *
   * @uiName Show Powered By
   * @requiredFeatures ["CUSTOM_BRANDING"]
   * @featureTooltip <div>Integrate your brand identity further by removing impact.com’s branding from your widget. Contact <a href="mailto:saasquatch-support%40impact.com?subject=Next steps for Custom Branding feature&body=Hi Support Team, %0D%0A%0D%0A I am interested in learning more about how Leaderboards can support the growth of our referral program. Please connect me with a program strategy manager to discuss this feature further, and determine the next steps.%0D%0A%%0D%0A%0D%0A Thank you,%0D%0A[Add your name here]">Support</a> to upgrade your plan</div>
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
