import { VNode } from "../../stencil-public-runtime";
import { Spacing } from "../../global/mixins";
export interface HeroImageViewProps {
  layout: "overlay" | "columns";
  imageUrl: string;
  overlayColor: string;
  overlayOpacity: string;
  textColor?: string;
  backgroundColor?: string;
  minHeight?: string;
  header?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
  buttonNewTab?: boolean;
  padding: Spacing;
  imagePos: "left" | "center" | "right";
  imageMobilePos: "top" | "bottom";
}
export declare function HeroImageView(props: HeroImageViewProps, children: VNode): any;
