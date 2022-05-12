import { h, Component, Prop } from "@stencil/core";
import { css } from "emotion";

/**
 * @uiName Image Component
 * @canvasRenderer always-replace
 */
@Component({
  tag: "sqh-image-component",
  styleUrl: "image-component.scss",
})
export class ImageComponent {
  /**
   * @undocumented
   * @uiName Hide Image
   */
  @Prop() ishidden: boolean;
  /**
   * @uiName Image URL
   * @uiWidget imageUpload
   * @format url
   * 
   */
  @Prop() url: string;
  /**
   * Define the width of the image with a pixel amount.
   *
   * @uiName Width
   */
  @Prop() width: number;
  /**
   * Define the radius of the corners with a pixel amount.
   *
   * @uiName Border Radius
   */
  @Prop() borderradius: number;
  /**
   * @uiName Horizontal Alignment
   * @uiEnum ["left", "center", "right"]
   * @uiEnumNames ["Left", "Center", "Right"]
   * @default "center"
   */
  @Prop() alignment: string;
  /**
   * Additional CSS applied to the image element
   *
   * @uiName CSS
   * @uiWidget textArea
   * @default "padding-top: 38px; padding-bottom: 7px;"
   */
  @Prop() css: string;

  render() {
    const imageString = this.url;
    const alignment = css`
       {
        text-align: ${this.alignment};
      }
    `;
    const myStyle = css`
       {
        width: ${this.width}px;
        border-radius: ${this.borderradius}px;
        ${this.css}
      }
    `;

    return (
      !this.ishidden && (
        <div class={alignment}>
          <img src={imageString} class={myStyle} />
        </div>
      )
    );
  }
}
