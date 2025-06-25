import { isDemo, setUserIdentity } from "@saasquatch/component-boilerplate";
import { withHooks } from "@saasquatch/stencil-hooks";
import { Component, Prop, State, h } from "@stencil/core";
import deepmerge from "deepmerge";
import { DemoData } from "../../global/demo";
import {
  EmailRegistrationView,
  EmailRegistrationViewProps,
} from "../views/email-registration-view";
import { useInstantAccessRegistration } from "./useInstantAccessRegistration";

/**
 * @uiName Instant Access Registration
 * @validParents ["sqm-portal-container","div","sqm-hero","template", "sqb-program-section", "sqb-conditional-section"]
 * @compatibility Built for instant access
 * @exampleGroup Instant Access
 * @example Instant Access Registration - <sqm-instant-access-registration></sqm-instant-access-registration>
 * @slots [{"name":"top","title":"Top Content"},{"name":"bottom","title":"Bottom Content"}]
 */
@Component({
  tag: "sqm-instant-access-registration",
  shadow: true,
})
export class InstantAccessRegistration {
  @State()
  ignored = true;

  /**
   * @uiName Email field label
   */
  @Prop()
  emailLabel: string = "Email";

  /**
   * @uiName First name field label
   */
  @Prop()
  firstNameLabel: string = "First Name";

  /**
   * @uiName Last name field label
   */
  @Prop()
  lastNameLabel: string = "Last Name";

  /**
   * @uiName Register button text
   */
  @Prop()
  registerLabel: string = "Start Referring";

  /**
   * Require your participants to enter their first and last name.
   *
   * @uiName Include name fields
   */
  @Prop() includeName: boolean = false;

  /**
   * @uiName Hide border
   * @uiGroup Card style
   */
  @Prop() hideBorder: boolean = false;

  /**
   * Display this message when a required field has not been filled out.
   *
   * @uiName Required field message
   * @uiWidget textArea
   * @uiGroup Error messages
   */
  @Prop() requiredFieldErrorMessage: string = "Cannot be empty";

  /**
   * Display this message when the given email is invalid.
   *
   * @uiName Invalid email message
   * @uiWidget textArea
   * @uiGroup Error messages
   */
  @Prop() invalidEmailErrorMessage: string =
    "Please enter a valid email address";

  /**
   * Display this message when the form submission unexpectedly fails.
   *
   * @uiName Network error message
   * @uiWidget textArea
   * @uiGroup Error messages
   */
  @Prop() networkErrorMessage: string =
    "There was a problem signing you in. Please wait a moment and try again. If this problem continues, contact Support for help resolving this issue.";

  /**
   * @uiName Top padding
   * @uiGroup Card style
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingTop: string = "large";
  /**
   * @uiName Right padding
   * @uiGroup Card style
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingRight: string = "large";
  /**
   * @uiName Bottom padding
   * @uiGroup Card style
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingBottom: string = "large";
  /**
   * @uiName Left padding
   * @uiGroup Card style
   * @uiEnum ["none", "xxx-small", "xx-small", "x-small", "small", "medium", "large", "x-large", "xx-large", "xxx-large", "xxxx-large"]
   * @uiEnumNames ["None", "XXX-Small", "XX-Small", "X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large", "XXX-Large", "XXXX-Large"]
   */
  @Prop() paddingLeft: string = "large";

  /**
   * @uiName Background color
   * @uiWidget color
   * @uiGroup Card style
   * @uiType string
   */
  @Prop() backgroundColor: string = "var(--sqm-portal-background)";

  /**
   * @undocumented
   * @uiType boolean
   */
  @Prop() includeCookies?: boolean = false;

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<EmailRegistrationViewProps>;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, callbacks } = isDemo()
      ? useRegistrationDemo(this)
      : useInstantAccessRegistration(this);

    const content = {
      emailLabel: this.emailLabel,
      registerLabel: this.registerLabel,
      firstNameLabel: this.firstNameLabel,
      lastNameLabel: this.lastNameLabel,
      includeName: this.includeName,
      hideBorder: this.hideBorder,
      invalidEmailErrorMessage: this.invalidEmailErrorMessage,
      requiredFieldErrorMessage: this.requiredFieldErrorMessage,
      paddingTop: this.paddingTop,
      paddingBottom: this.paddingBottom,
      paddingLeft: this.paddingLeft,
      paddingRight: this.paddingRight,
      backgroundColor: this.backgroundColor,

      // slots
      topSlot: <slot name="top" />,
      bottomSlot: <slot name="bottom" />,
    };
    return (
      <EmailRegistrationView
        states={states}
        callbacks={callbacks}
        content={content}
      ></EmailRegistrationView>
    );
  }
}
function useRegistrationDemo(
  props: InstantAccessRegistration
): Partial<EmailRegistrationViewProps> {
  const submit = async (_event: any) => {
    setUserIdentity({
      id: "referrer@example.com",
      accountId: "referrer@example.com",
      jwt: "eyJraWQiOiJlNjI2NzQxNy1jMzZlLTRlM2EtYjM5NS1lYTFmY2YyNmU3YzIiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJjbVZtWlhKeVpYSkFaWGhoYlhCc1pTNWpiMjA9OmNtVm1aWEp5WlhKQVpYaGhiWEJzWlM1amIyMD1AdGVzdF9heGJndGF0dzF0Y2NwOnVzZXJzIiwicGFzc3dvcmRsZXNzIjp0cnVlLCJpc3MiOiJodHRwczovL3N0YWdpbmcucmVmZXJyYWxzYWFzcXVhdGNoLmNvbS8iLCJleHAiOjE2ODA4ODU5MTksImlhdCI6MTY4MDc5OTUxOX0.kjmTVVf_BTb-uMNKnadLyNLxMFwpkefsY02O3iAfBVIJJZZfeZMwunPlKsS3Vbp28aYRClBjH5Wj4pYxDn23D0CdZx8KNCqiJ8yF6149O9SPMkRseoJkliqS6LyvMOEDjGDkuLfcC8_hq1AHBXFt5BdCtWOk1gwf_5R9A0w5gXEIvprBzbNDLbuo88bVAlrmFNvfttXXryrpUeruMal7cBKuy02YblBrB4kKoyJiprU5GLEjciBA4A56u8TwQc0kbsPf2YcQaJsY_IvkC7S1u4sPyObpq6iF6Ed8UYHAo6nU5KjZXyVtoUyeIS11mf_6OtDO6LyMNHV2FtEUUDdPCg",
    });
  };

  return deepmerge(
    {
      states: {
        loading: false,
        error: "",
      },
      callbacks: {
        submit,
      },
    },
    props.demoData || {},
    { arrayMerge: (_, a) => a }
  );
}
