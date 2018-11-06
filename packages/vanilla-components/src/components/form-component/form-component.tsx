import { Component, Prop, State } from '@stencil/core';
import Tunnel from '../../services/Registered'; // Import the tunnel
import { css } from 'emotion';
import debugFn from "debug";

import { shadeColor } from '../../utilities';
import { API } from '../../services/WidgetHost';

const debug = debugFn("sqh-form-component")

interface FormState extends FormData{
  failed?: boolean;
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

  // form props
  @Prop() requirefirstname: boolean;
  @Prop() requirelastname: boolean;
  @Prop() requireemail: boolean;

  componentWillLoad(){
    this.formData.errors = {
      firstName: "",
      lastName: "",
      email: ""
    }
  }

  addUser() { 
    const dataToSend = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
    }
    return API.graphql.addUserDetails(dataToSend);
  }

 loadRefStats(registered, loadStats) {
    debug("registered:", registered)
    if(registered){
      loadStats();
    }
  }

  async handleSubmit(e, registerUser) {
    e.preventDefault()

    // disable form and load
    this.loading = true
    
    debug("Submitted", this.formData);
    
    if(Math.random() >= 0.5){
      // Successfully signed up!
      await this.addUser();
      debug(this.formData, "Form submission success")
      registerUser();
    } else {
      // Form re-enabled on fail
      this.formData = {
        ...this.formData,
        failed: true
      }

      this.loading = false;

      debug(this.formData, "Form submission failed")
    }
  }

  validateField(event, fieldName) {
    if (event.target.validity.typeMismatch || !event.target.value) { 
      this.formData[fieldName] = event.target.value
      this.formData.errors[fieldName] = "invalid"
      this.formData = {
        ...this.formData
      }
    } else {
      this.formData[fieldName] = event.target.value
      this.formData.errors[fieldName] = "valid"
      this.formData = {
        ...this.formData
      }
    }
  }

  render() {
    if(this.formData.failed) this.failMessage = this.failuretext;

    const buttonStyle= css`
      font-size:${this.buttonfontsize}px;
      width: ${this.buttonwidth}px;
      background-color:${this.buttoncolor};
      color:${this.buttontextcolor};
      &:hover {
        background-color: ${shadeColor(this.buttoncolor, 10)};
        border-color: ${shadeColor(this.buttoncolor, 12)};
      }
    `;
  
    return (
    <Tunnel.Consumer>
      {({ registered, registerUser, loadStats }) => (
        !registered ? (
          <div class="input-group">
            <form id="signup-form" onSubmit={(e) => this.handleSubmit(e, registerUser)}>
              <input type="text"  
                value={this.formData.firstName} 
                class={`form-input ${this.formData.errors.firstName}`}
                onInput={(e) => this.validateField(e, "firstName")} 
                placeholder="First Name" 
                disabled={this.loading}
                required={this.requirefirstname}
              />
              <input type="text" 
                value={this.formData.lastName} 
                class={`form-input ${this.formData.errors.lastName}`}
                onInput={(e) => this.validateField(e, "lastName")} 
                placeholder="Last Name" 
                disabled={this.loading}
                required={this.requirelastname}
              />
              <input type="email"
                value={this.formData.email} 
                class={`form-input ${this.formData.errors.email}`}
                onInput={(e) => this.validateField(e, "email")} 
                placeholder="Email" 
                disabled={this.loading}
                required={this.requireemail}
              />
              <p class="failed">{ this.failMessage }</p>
              <input type="submit" 
                class={buttonStyle} 
                value={this.loading ? this.loadingtext : this.buttontext} disabled={this.loading} />
            </form>
          </div>
      )
      : (
        <div>
          <h3>
            <i class="success icon icon-ok-circled" />
          { this.successtext }
          </h3>
          <input class={buttonStyle} type="button" value="Load Stats" onClick={() => this.loadRefStats(registered,loadStats)}  />
        </div>
      )
    )}
  </Tunnel.Consumer>
  );

  }
}