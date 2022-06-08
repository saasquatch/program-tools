import { h, Component, Prop, Element } from "@stencil/core";
import { css } from "emotion";
import marked from "marked";

/**
 * @uiName Text Component
 * @canvasRenderer always-replace
 * @exampleGroup Common Components
 * @example Header Text - <sqh-text-component sqhheader="true" ishidden="false" ismarkdown="false" text="Give $10 and Get $10!" color="#4486E1" fontsize="30" textalign="center" paddingtop="30" paddingbottom="10"></sqh-text-component>
 * @example Paragraph Text - <sqh-text-component sqhbody="true" ishidden="false" ismarkdown="true" text="Give a friend a $10 and receive $10 for yourself when they purchase.<br/><br/>Share the link below or use the code **<sqh-referral-code />**" color="#000000" fontsize="13" textalign="center" paddingtop="5" paddingbottom="20"></sqh-text-component>
 */
@Component({
  tag: "sqh-text-component",
  styleUrl: "text-component.scss",
})
export class TextComponent {
  /**
   * @undocumented
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
   * @uiWidget textArea
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
   * @uiName Font Size
   */
  @Prop() fontsize: string;
  /**
   * Define the top padding of the container with a pixel amount.
   *
   * @uiName Padding Top
   */
  @Prop() paddingtop: string;

  /**
   * @uiName Font Weight
   */
  @Prop() fontweight: string;
  /**
   * Define the bottom padding of the container with a pixel amount.
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
   * Fill the background with a color or image. Input color values as a HEX code and an image as a URL.
   *
   * @uiName Background
   */
  @Prop() background: string;
  /**
   * Define the height of the container with a pixel amount.
   *
   * @uiName Height
   */
  @Prop() height: string;

  @Element() textEl: HTMLElement;

  render() {
    const regex =
      /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

    const textStyle = css`
      font-family: ${this.fontfamily || "inherit"};
      font-size: ${this.fontsize ? this.fontsize + "px" : "inherit"};
      font-weight: ${this.fontweight ? this.fontweight : "inherit"};
      text-align: ${this.textalign};
      color: ${this.color || "inherit"};
      padding-top: ${this.paddingtop ? this.paddingtop + "px" : "inherit"};
      padding-bottom: ${this.paddingbottom
        ? this.paddingbottom + "px"
        : "inherit"};
      overflow-wrap: break-word;
    `;

    const divStyle = css`
      background: ${this.background
        ? this.background.match(regex)
          ? `url(${this.background}) no-repeat center center;`
          : this.background
        : "inherit"};
      height: ${this.height || "inherit"};
      background-size: contain;
    `;

    const content = this.ismarkdown ? (
      <div innerHTML={marked(this.text)} />
    ) : (
      this.text
    );

    return (
      !this.ishidden && (
        <div class={divStyle}>
          <p class={textStyle}>{content}</p>
        </div>
      )
    );
  }
}
