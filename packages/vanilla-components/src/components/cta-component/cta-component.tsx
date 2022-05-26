import { Component, Prop, h, Element } from "@stencil/core";
import { css } from "emotion";

/**
 * @uiName Call To Action
 */
@Component({
  tag: "sqh-cta-component",
  styleUrl: "cta-component.scss",
})
export class CTAComponent {
  /**
   * @uiName Hide Text
   */
  @Prop() ishidden: boolean;
  /**
   * Compile plain text into HTML. See [markdown](https://www.markdownguide.org/getting-started/) for more details.
   *
   * @uiName Use Markdown
   */
  @Prop() ismarkdown: boolean;
  /**
   * @uiName Text
   */
  @Prop() text: string;
  /**
   * @uiName Font Family
   */
  @Prop() fontfamily: string;
  /**
   * @uiName Text Color
   * @uiWidget color
   * @format color
   */
  @Prop() color: string;
  /**
   * @uiName Font Size
   */
  @Prop() fontsize: string;
  /**
   * Top padding in pixels
   *
   * @uiName Padding Top
   */
  @Prop() paddingtop: string;

  /**
   * @uiName Font Weight
   */
  @Prop() fontweight: string;
  /**
   * Bottom padding in pixels
   *
   * @uiName Padding Bottom
   */
  @Prop() paddingbottom: string;
  /**
   * @uiName Text Alignment
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() textalign: string;
  /**
   * @uiName Background
   */
   @Prop() background: string;
   /**
    * @uiName Button Color
    * @uiWidget color
    * @format color
    * @default #F5A100
    */
  @Prop() buttonbackground: string;
  /**
   * Button height in pixels.
   *
   * @uiName Button Height
   */
  @Prop() height: string;
  /**
   * Button width in pixels.
   *
   * @uiName Button Width
   */
  @Prop() width: string;
  /**
   * @uiName Border Radius
   * @default 8px
   */
  @Prop() borderradius: string;
  /**
   * @uiName Button Link
   */
  @Prop() url: string;

  @Element() textEl: HTMLElement;

  render() {
    const buttonStyle = css`
      font-family: ${this.fontfamily || "inherit"};
      font-size: ${this.fontsize ? this.fontsize + "px" : "inherit"};
      font-weight: ${this.fontweight ? this.fontweight : "inherit"};
      color: ${this.color || "inherit"};
      padding-top: ${this.paddingtop ? this.paddingtop + "px" : "inherit"};
      padding-bottom: ${this.paddingbottom
        ? this.paddingbottom + "px"
        : "inherit"};
      width: ${this.width ? this.width + "px" : "auto"};
      overflow-wrap: break-word;
      border-radius: ${this.borderradius ? this.borderradius + "px" : "8px"};
      margin: 0 auto;
      border: none;
      background-color: ${this.buttonbackground
        ? this.buttonbackground
        : "#F5A100"};
      &:hover {
        cursor: pointer;
        opacity: 0.9;
      }
      &:focus {
        outline: none;
      }
    `;

    const divStyle = css`
      text-align: ${this.textalign};
      background: ${this.background ? this.background : "inherit"};
      height: ${this.height || "inherit"};
      background-size: contain;
    `;

    return (
      !this.ishidden && (
        <div class={divStyle}>
          <button
            class={buttonStyle}
            onClick={() => window.open(this.url, "_blank")}
          >
            {this.text}
          </button>
        </div>
      )
    );
  }
}
