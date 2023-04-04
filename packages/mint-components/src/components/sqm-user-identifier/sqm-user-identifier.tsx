import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, h, Prop, State } from "@stencil/core";
import { getProps } from "../../utils/utils";
import { UserIdentifierView } from "./sqm-user-identifier-view";

/**
 * @uiName Image
 * @exampleGroup Common Components
 * @example Image - <sqm-image image-url="https://res.cloudinary.com/saasquatch/image/upload/v1644000259/squatch-assets/tn47wOj.png" alignment="center"></sqm-image>
 */
@Component({
  tag: "sqm-user-identifier",
  shadow: true,
})
export class Image {
  /**
   * @uiWidget ImageUpload
   * @required
   * @uiName User Identification Text
   */
  @Prop() userIdentificationText: string = "{email}";
  /**
   * @uiWidget ImageUpload
   * @required
   * @uiName Switch User Link
   */
  @Prop() switchUserLink: string;
  /**
   * @uiWidget ImageUpload
   * @required
   * @uiName Switch User Text
   */
  @Prop() switchUserText: string = "not you?";

  render() {
    return <UserIdentifierView {...getProps(this)} />;
  }
}

//TODO: Write a hook to resolve ICU strings
