import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, h } from "@stencil/core";

/**
 * @uiName QA Component
 */
@Component({
  tag: "sqm-qa",
  shadow: true,
})
export class ShareButton {
  /**
   * Description here
   * @uiName Text Input
   */
  @Prop() textInput?: string = "short text string";

  /**
   * Description here
   * @uiName Number Input
   */
  @Prop() numberInput?: number = 5;

  /**
   * Description here
   * @uiName Boolean Switch
   */
  @Prop() booleanSwitch?: boolean = true;

  /**
   * Description here
   * @uiName Text Area Input
   * @uiWidget textArea
   */
  @Prop() textAreaInput?: string = "Really Really Really long text";

  /**
   * Description here
   * @uiName String Enum Select
   * @uiEnum ["option1","option2","option3"]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() stringEnumSelect?: string = "option2";

  /**
   * Description here
   * @uiName Number Enum Select
   * @uiEnum [1,2,3]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() numberEnumSelect?: number = 3;

  /**
   * Description here
   * @uiName Color
   * @uiWidget color
   * @format color
   */
  @Prop() color?: string = "blue";

  /**
   * Description here
   * @uiName Image Upload
   * @uiWidget imageUpload
   * @format url
   */
  @Prop() imageUpload?: string = "https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png";

  /**
   * Description here
   * @uiName Date Interval
   * @uiWidget dateInterval
   * @format date-interval
   */
  @Prop() dateInterval?: string = "2020-07-07T12:00:00-08:00/2021-08-08T12:00:00-08:00";

  /**
   * Description here
   * @uiName Stat Selector
   * @uiWidget statTypeSelectWidget
   */
  @Prop() statSelector?: string = "/referralCount";

  /**
   * Description here
   * @uiName Program Selector
   * @uiWidget programSelector
   */
  @Prop() programSelector?: string = "program1";

  /**
   * Description here
   * @uiName String Required
   * @required
   */
  @Prop() stringRequired?: string;

  /**
   * Description here
   * @uiName Number Required
   * @required
   */
  @Prop() numberRequired?: number;

  /**
   * Description here
   * @uiName Number Max 7
   * @maximum 7
   */
  @Prop() max?: number = 6;

  /**
   * Description here
   * @uiName Number Min 7
   * @minimum 7
   */
  @Prop() min?: number = 8;

  /**
   * Description here
   * @uiName String Max Length 10
   * @maxLength 10
   */
  @Prop() maxLength?: string = "default";

  /**
   * Description here
   * @uiName String Min Length 10
   * @minLength 10
   */
  @Prop() minLength?: string = "default text";

  constructor() {
    withHooks(this);
  }
  disconnectedCallback() {}

  render() {
    return (
      <div>
        <h1>I am the QA Component</h1>
      </div>
    );
  }
}
