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
   * @uiName Button Text
   */
  @Prop() text: string;
  /**
   * @uiName Font Family
   */
  @Prop() fontfamily: string;
  /**
   * @uiName Text Color
   * @uiWidget color
   */
  @Prop() color: string;
  /**
   * Define the font size of the button text with pixel amount.
   * 
   * @uiName Font Size
   */
  @Prop() fontsize: string;
  /**
   * Define the top padding with a pixel amount.
   *
   * @uiName Padding Top
   */
  @Prop() paddingtop: string;

  /**
   * Define the font weight of the button text.
   * 
   * @uiName Font Weight
   */
  @Prop() fontweight: string;
  /**
   * Define the bottom padding with a pixel amount.
   *
   * @uiName Padding Bottom
   */
  @Prop() paddingbottom: string;
  /**
   * @uiName Button Alignment
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() textalign: string;
  /**
   * @uiName Container Background Color
   * @uiWidget color
   */
   @Prop() background: string;
   /**
    * @uiName Button Color
    * @uiWidget color
    * @default #F5A100
    */
  @Prop() buttonbackground: string;
  /**
   * Define the height of the container with a pixel amount.
   *
   * @uiName Button Height
   */
  @Prop() height: string;
  /**
   * Define the width of the button with a pixel amount.
   *
   * @uiName Button Width
   */
  @Prop() width: string;
  /**
   * Define the border radius of the button with a pixel amount.
   * 
   * @uiName Border Radius
   * @default 8
   * @uiWidget number
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
