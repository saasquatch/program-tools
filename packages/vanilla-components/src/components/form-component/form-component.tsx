import { Component, Prop, State, Watch } from '@stencil/core';
import { css } from 'emotion';
import debugFn from "debug";
import { shadeColor } from '../../utilities';
import { API } from '../../services/WidgetHost';

const debug = debugFn("sqh-form-component")

interface FormState extends FormData{
  failed?: boolean;
  registered?: boolean;
  completedRegister?: boolean;
  errors?: FormErrors;

}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
}
type FormErrors = {
  [key in keyof FormData]:string;
}

@Component({
  tag: 'sqh-form-component',
  styleUrl: 'form-component.scss'
})

export class FormComponent {
  @State() formData: FormState = {};
  @State() failMessage: string = "";
  @State() loading?: boolean;

  @Prop() ishidden: boolean;
  @Prop() skipregister: boolean;

  // heading props
  @Prop() headingtext: string;
  @Prop() headingtextcolor: string;
  @Prop() headingfontsize: string;

  // status props
  @Prop() successtext: string;
  @Prop() failuretext: string;
  @Prop() loadingtext: string;
  
  // button props
  @Prop() buttoncolor: string;
  @Prop() buttontextcolor: string;
  @Prop() buttontext: string;
  @Prop() buttonwidth: string;
  @Prop() buttonfontsize: string;
  @Prop() buttonborderradius: string;

  // form props
  @Prop() paddingtop: string;
  @Prop() includefirstname: boolean = false;
  @Prop() includelastname: boolean = false;
  @Prop() includeemail: boolean = false;
  @Prop() requirefirstname: boolean = false;
  @Prop() requirelastname: boolean = false;
  @Prop() requireemail: boolean = false;
  @Prop() fieldwidth: string;
  @Prop() fieldborderradius: string;

  componentWillLoad(){
    this.formData.errors = {
      firstName: "",
      lastName: "",
      email: ""
    }

    this.checkSkipRegister(this.skipregister);
    if(API.graphql.checkRegisteredUser()){
      this.formData = {
        ...this.formData,
        registered: true,
        completedRegister: true
      }
    }
  }

  @Watch('skipregister')
  skipRegister(newValue: boolean, oldValue: boolean) {
    if (newValue !== oldValue) this.checkSkipRegister(newValue);
  }

  checkSkipRegister(newValue: boolean = false) {
    this.formData = {
      ...this.formData,
      registered: newValue,
      completedRegister: newValue
    }
  }

  async addUser() { 
    // TODO: check if optional, don't include empty strings otherwise they'll overwrite whats there (null is ok)
    const dataToSend = {
      firstName: this.formData.firstName ? this.formData.firstName : null,
      lastName: this.formData.lastName ? this.formData.lastName : null,
      email: this.formData.email ? this.formData.email : null
    }
    return API.graphql.addUserDetails(dataToSend).then(res => {
      debug(res, "Form submission success")
      this.formData = {
        ...this.formData,
        registered: true

      }
    }).catch(e => {
      this.onError(e);
    });
    ;
  }

  onError(e: Error) {
    debug("Error loading via GraphQL.", e);
    // Form re-enabled on fail
    this.formData = {
      ...this.formData,
      failed: true
    }
    this.loading = false;
  }

 loadNextSection(registered, loadNext) {
    debug("registered:", registered)
    if(registered){
      loadNext();
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    debug("Submitted", this.formData);

    // disable form and load
    this.loading = true
    await this.addUser();
  }

  validateField(event, fieldName) {
    this.formData[fieldName] = event.target.value;

    if (event.target.validity.typeMismatch || !event.target.value) { 
      this.formData.errors[fieldName] = "invalid"
    } else {
      this.formData.errors[fieldName] = "valid"
    }

    this.formData = {
      ...this.formData
    }
  }

  render() {
    if(this.formData.failed) this.failMessage = this.failuretext;
    const hiddenStyle = { display: "none" };

    const divStyle = css`
      padding-top:${this.paddingtop}px;
      display: ${this.ishidden ? 'none' : 'inherit'};
    `

    const fieldStyle = css`
       max-width:${this.fieldwidth}px;
       border-radius:${this.fieldborderradius}px;
     `

    const buttonStyle = css`
      font-size:${this.buttonfontsize}px;
      width: ${this.buttonwidth}px;
      background-color:${this.buttoncolor};
      border: 1px solid ${this.buttoncolor};
      color:${this.buttontextcolor};
      border-radius:${this.buttonborderradius}px;
      &:hover {
        background-color: ${shadeColor(this.buttoncolor, 10)};
        border-color: ${shadeColor(this.buttoncolor, 12)};
      }
    `;

    return ([
      !this.formData.registered ?
          <div class={`input-group ${divStyle}`} style={!this.formData.registered ? null: hiddenStyle}>
          <sqh-text-component ismarkdown={true} text={this.headingtext} lineheight="1.428571429"
          color={this.headingtextcolor} fontsize={this.headingfontsize} textalign="center" padding="0" paddingtop="10" paddingbottom="5"></sqh-text-component>
            <form class="signup-form" onSubmit={(e) => this.handleSubmit(e)}>
            {/* TODO: Create input component to allow rearranging of these fields? (maybe not) */}
              {this.includefirstname
                ? <input type="text"
                  value={this.formData.firstName}
                  class={`form-input ${fieldStyle} ${this.formData.errors.firstName}`}
                  onInput={(e) => this.validateField(e, "firstName")}
                  placeholder={`First Name ${this.requirefirstname ? "" : "(Optional)"}`}
                  disabled={this.loading}
                  required={this.requirefirstname}
                />
                : '' }
              {this.includelastname
                ? <input type="text"
                  value={this.formData.lastName}
                  class={`form-input ${fieldStyle} ${this.formData.errors.lastName}`}
                  onInput={(e) => this.validateField(e, "lastName")}
                  placeholder={`Last Name ${this.requirelastname ? "" : "(Optional)"}`}
                  disabled={this.loading}
                  required={this.requirelastname}
                />
                : '' }
              {this.includeemail
                ? <input type="email"
                  value={this.formData.email}
                  class={`form-input ${fieldStyle} ${this.formData.errors.email}`}
                  onInput={(e) => this.validateField(e, "email")}
                  placeholder={`Email ${this.requireemail ? "" : "(Optional)"}`}
                  disabled={this.loading}
                  required={this.requireemail}
                />
                : '' }
              <p class="failed">{ this.failMessage }</p>
              <input type="submit"
                class={buttonStyle}
                value={this.loading ? this.loadingtext : this.buttontext} disabled={this.loading} />
            </form>
          </div>
          : '',
          this.formData.registered
          ? <slot />
          : <span style={this.formData.registered ? null : hiddenStyle}><slot /></span>
          
    ]);

  }        
}