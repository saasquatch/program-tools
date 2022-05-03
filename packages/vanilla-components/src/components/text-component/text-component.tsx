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
   * Hide or show the component
   *
   * @uiName Hide Text
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
   * @uiName Text
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
   * @uiWidget color
   * @format color
   */
  @Prop() color: string;
  /**
   * Size of the text
   *
   * @uiName Font Size
   */
  @Prop() fontsize: string;
  /**
   * Top padding on text
   *
   * @uiName Padding Top
   */
  @Prop() paddingtop: string;
  /**
   * Bottom padding on text
   *
   * @uiName Padding Bottom
   */
  @Prop() paddingbottom: string;
  /**
   * Text alignment
   *
   * @uiName Text Align
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   */
  @Prop() textalign: string;
  /**
   * Background the container, color or url
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
