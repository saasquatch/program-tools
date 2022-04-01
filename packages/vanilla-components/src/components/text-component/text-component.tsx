import { h, Component, Prop, Element } from "@stencil/core";
import { css } from "emotion";
import marked from "marked";

/**
 * @uiName Text Component
 */
@Component({
  tag: "sqh-text-component",
  styleUrl: "text-component.scss",
})
export class TextComponent {
  /**
   * Hide the component
   *
   * @uiName Is Hidden
   */
  @Prop() ishidden: boolean;
  /**
   * Compiles plain text into markdown
   *
   * @uiName Is Markdown
   */
  @Prop() ismarkdown: boolean;
  /**
   * The text content
   *
   * @uiName Is Hidden
   */
  @Prop() text: string;
  /**
   * Font family of the text
   *
   * @uiName Font Family
   */
  @Prop() fontfamily: string;
  /**
   * Color of the text
   *
   * @uiName Color
   */
  @Prop() color: string;
  /**
   * Size of the text
   *
   * @uiName Font Size
   */
  @Prop() fontsize: string;
  /**
   * Padding on top of the text
   *
   * @uiName Padding Top
   */
  @Prop() paddingtop: string;
  /**
   * Padding bottom on the text
   *
   * @uiName Padding Bottom
   */
  @Prop() paddingbottom: string;
  /**
   * Padding all around the text
   *
   * @uiName Padding
   */
  @Prop() padding: string = "10px 20px 15px";
  /**
   * Text alignment
   *
   * @uiName Text Align
   */
  @Prop() textalign: string;
  /**
   * Background color of the container
   *
   * @uiName Background
   */
  @Prop() background: string;
  /**
   * Height of the container
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
