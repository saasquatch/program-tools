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
   * @uiName Text Input with default
   */
  @Prop() textInput?: string = "short text string";

  /**
   * Description here
   * @uiName Number Input with default
   */
  @Prop() numberInput?: number = 5;

  /**
   * Description here
   * @uiName Boolean Switch with default
   */
  @Prop() booleanSwitch?: boolean = true;

  /**
   * Description here
   * @uiName Text Area Input
   * @uiWidget textArea with default
   */
  @Prop() textAreaInput?: string = "Really Really Really long text";

  /**
   * Description here
   * @uiName String Enum Select with default
   * @uiEnum ["option1","option2","option3"]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() stringEnumSelect?: string = "option2";

  /**
   * Description here
   * @uiName Number Enum Select with default
   * @uiEnum [1,2,3]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() numberEnumSelect?: number = 3;

  /**
   * Description here
   * @uiName Color with default
   * @uiWidget color
   * @format color
   */
  @Prop() color?: string = "blue";

  /**
   * Description here
   * @uiName Image Upload with default
   * @uiWidget ImageUpload
   * @format url
   */
  @Prop() imageUpload?: string =
    "https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png";

  /**
   * Description here
   * @uiName Date Interval with default
   * @uiWidget dateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @format date-interval
   */
  @Prop() dateInterval?: string =
    "2020-07-07T12:00:00-08:00/2021-08-08T12:00:00-08:00";

  /**
   * Description here
   * @uiName Stat Selector with default
   * @uiWidget statTypeSelectWidget
   */
  @Prop() statSelector?: string = "/referralCount";

  /**
   * Description here
   * @uiName Program Selector with default
   * @uiWidget programSelector
   */
  @Prop() programSelector?: string = "program1";

  /**
   * Description here
   * @uiName Text Input with no default
   */
  @Prop() textInputNoDefault?: string;

  /**
   * Description here
   * @uiName Number Input with no default
   */
  @Prop() numberInputNoDefault?: number;

  /**
   * Description here
   * @uiName Boolean Switch with no default
   */
  @Prop() booleanSwitchNoDefault?: boolean;

  /**
   * Description here
   * @uiName Text Area Input
   * @uiWidget textArea with no default
   */
  @Prop() textAreaInputNoDefault?: string;

  /**
   * Description here
   * @uiName String Enum Select with no default
   * @uiEnum ["option1","option2","option3"]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() stringEnumSelectNoDefault?: string;

  /**
   * Description here
   * @uiName Number Enum Select with no default
   * @uiEnum [1,2,3]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() numberEnumSelectNoDefault?: number;

  /**
   * Description here
   * @uiName Color with no default
   * @uiWidget color
   * @format color
   */
  @Prop() colorNoDefault?: string;

  /**
   * Description here
   * @uiName Image Upload with no default
   * @uiWidget ImageUpload
   * @format url
   */
  @Prop() imageUploadNoDefault?: string;

  /**
   * Description here
   * @uiName Date Interval with no default
   * @uiWidget dateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @format date-interval
   */
  @Prop() dateIntervalNoDefault?: string;

  /**
   * Description here
   * @uiName Stat Selector with no default
   * @uiWidget statTypeSelectWidget
   */
  @Prop() statSelectorNoDefault?: string;

  /**
   * Description here
   * @uiName Program Selector with no default
   * @uiWidget programSelector
   */
  @Prop() programSelectorNoDefault?: string;

  /**
   * Description here
   * @uiName String required with no default
   * @required
   */
  @Prop() stringRequired?: string;

  /**
   * Description here
   * @uiName Number required with no default
   * @required
   */
  @Prop() numberRequired?: number;
  /**
   * Description here
   * @uiName Boolean Switch required with no default
   * @required
   */
  @Prop() booleanSwitchRequiredNoDefault?: boolean;

  /**
   * Description here
   * @uiName Text Area Input
   * @uiWidget textArea required with no default
   * @required
   */
  @Prop() textAreaInputRequiredNoDefault?: string;

  /**
   * Description here
   * @uiName String Enum Select required with no default
   * @required
   * @uiEnum ["option1","option2","option3"]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() stringEnumSelectRequiredNoDefault?: string;

  /**
   * Description here
   * @uiName Number Enum Select required with no default
   * @required
   * @uiEnum [1,2,3]
   * @uiEnumNames ["Option 1", "Option 2", "Option 3"]
   */
  @Prop() numberEnumSelectRequiredNoDefault?: number;

  /**
   * Description here
   * @uiName Color required with no default
   * @required
   * @uiWidget color
   * @format color
   */
  @Prop() colorRequiredNoDefault?: string;

  /**
   * Description here
   * @uiName Image Upload required with no default
   * @required
   * @uiWidget ImageUpload
   * @format url
   */
  @Prop() imageUploadRequiredNoDefault?: string;

  /**
   * Description here
   * @uiName Date Interval required with no default
   * @required
   * @uiWidget dateRange
   * @uiWidgetOptions {"allowPastDates":true, "months": 1}
   * @format date-interval
   */
  @Prop() dateIntervalRequiredNoDefault?: string;

  /**
   * Description here
   * @uiName Stat Selector required with no default
   * @required
   * @uiWidget statTypeSelectWidget
   */
  @Prop() statSelectorRequiredNoDefault?: string;

  /**
   * Description here
   * @uiName Program Selector required with no default
   * @required
   * @uiWidget programSelector
   */
  @Prop() programSelectorRequiredNoDefault?: string;

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
