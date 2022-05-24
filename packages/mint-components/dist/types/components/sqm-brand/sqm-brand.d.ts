/**
 *
 * @uiName Brand Container
 * @slot Controls the brand color and font of Mint Components wrapped by the container.
 */
export declare class BrandComponent {
  /**
   * Controls the primary brand color used in the Mint Components library. Note that this
   * does not affect vanilla components or other component libraries.
   *
   * @uiName Brand Color
   */
  brandColor: string;
  /**
   * The brand font that you want to use
   *
   * @uiName Brand Font
   */
  brandFont: string;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
