import { Spacing } from "../../global/mixins";
/**
 * @uiName Hero Image
 */
export declare class HeroImage {
  /**
   * @uiName Image Link
   */
  imageUrl: string;
  /**
   * @uiName Minimum Image Height
   */
  minHeight: string;
  /**
   * @uiName Overlay Color
   */
  overlayColor: string;
  /**
   * @uiName Overlay Opacity
   */
  overlayOpacity: string;
  /**
   * @uiName Text Color
   */
  textColor?: string;
  /**
   * @uiName Background Color
   */
  backgroundColor?: string;
  /**
   * @uiName Image Link
   * @uiType string
   * @uiEnum ["overlay", "columns"]
   */
  layout: "overlay" | "columns";
  /**
   * @uiName Image Position
   * @uiType string
   * @uiEnum ["left", "center", "right"]
   */
  imagePos: "left" | "center" | "right";
  /**
   * @uiName Image Mobile Position
   * @uiType string
   * @uiEnum ["top", "bottom"]
   */
  imageMobilePos: "top" | "bottom";
  /**
   * @uiName Title Text
   */
  header?: string;
  /**
   * @uiName Description Text
   */
  description?: string;
  /**
   * @uiName CTA Button Text
   */
  buttonText?: string;
  /**
   * @uiName CTA Button Link
   */
  buttonLink?: string;
  /**
   * @uiName CTA Button Link Open in New Tab
   */
  buttonNewTab?: boolean;
  /**
   * @uiName Padding
   * @uiType string
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   */
  padding: Spacing;
  constructor();
  disconnectedCallback(): void;
  render(): any;
}
