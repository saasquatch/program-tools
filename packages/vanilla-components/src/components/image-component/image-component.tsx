import { h, Component, Prop } from "@stencil/core";
import { css } from "emotion";

/**
 * @uiName Image Component
 */
@Component({
  tag: "sqh-image-component",
  styleUrl: "image-component.scss",
})
export class ImageComponent {
  /**
   * Hide the component
   *
   * @uiName Is Hidden
   */
  @Prop() ishidden: boolean;
  /**
   * Image link
   *
   * @uiName URL
   */
  @Prop() url: string;
  /**
   * Image width
   *
   * @uiName Width
   */
  @Prop() width: number;
  /**
   * Configure border radius with pixel amount
   *
   * @uiName Border Radius
   */
  @Prop() borderradius: number;
  /**
   * Configure alignment of the image
   *
   * @uiName Alignment
   */
  @Prop() alignment: string;
  /**
   * Additional CSS applied to the image element
   *
   * @uiName CSS
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
