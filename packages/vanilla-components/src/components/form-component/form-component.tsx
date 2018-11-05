import { Component, Prop, State } from '@stencil/core';
import { css } from 'emotion';
import debugFn from "debug";

import { shadeColor } from '../../utilities';
import { API } from '../../services/WidgetHost';

const debug = debugFn("sqh-form-component")

interface FormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  valid?: boolean;
  loading?: boolean;
  failed?: boolean;
}

@Component({
  tag: 'sqh-form-component',
  styleUrl: 'form-component.scss'
})

export class FormComponent {
  @State() formData: FormState = {};
  @State() failMessage: string = "";
  @State() signedUp?: boolean;

  @Prop() successtext: string;
  @Prop() failuretext: string;
  @Prop() loadingtext: string;
  
  // button props
  @Prop() buttoncolor: string;
  @Prop() buttontextcolor: string;
  @Prop() buttontext: string;

  
  testAdd() { 
    const dataToSend = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
    }

    return API.graphql.addUserDetails(dataToSend);
  }

  async handleSubmit(e) {
    debug(e)
    e.preventDefault()

    // display Loading... text
    // disable form and load
    this.formData = {
      ...this.formData,
      loading: true
    }
    
    debug("Submitted", this.formData);

    //API.graphql
    // send data to our backend
    
    if(Math.random() >= 0.5){
      // Successfully signed up!
      // Hide form
      await this.testAdd();
      this.signedUp = true;
      debug(this.formData, "Form submission success")
    } else {
      // Form re-enabled
      this.formData = {
        ...this.formData,
        loading: false,
        failed: true
      }

      debug(this.formData, "Form submission failed")
    }
  }

  handleFirstName(event) {
    let valid;

    if(!event.target.value){
      event.target.className = "invalid"
      valid = false;
    } else {
      event.target.className = "valid"
      valid = true;
    }

    this.formData = {
      ...this.formData,
      firstName: event.target.value,
      valid
    }
  }

  handleLastName(event) {
    let valid;

    if(!event.target.value){
      event.target.className = "invalid"
      valid = false;
    } else {
      event.target.className = "valid"
      valid = true;
    }

    this.formData = {
      ...this.formData,
      lastName: event.target.value,
      valid
    }
  }

  handleEmail(event) {
    let valid;

    if (event.target.validity.typeMismatch || !event.target.value) { 
      event.target.className = "invalid"
      valid = false;
    } else {
      event.target.className = "valid"
      valid = true;
    }

    this.formData = {
      ...this.formData,
      email: event.target.value,
      valid
    }
  }

  render() {
    if(this.formData.failed) this.failMessage = this.failuretext;

    const buttonStyle= css`
      background-color:${this.buttoncolor};
      color:${this.buttontextcolor};
      &:hover {
        background-color: ${shadeColor(this.buttoncolor, 10)};
        border-color: ${shadeColor(this.buttoncolor, 12)};
      }
    `;

    return !this.signedUp ? (
      <div>
        <div class="input-group">
          <form id="signup-form" onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" id="form-input" 
              value={this.formData.firstName} 
              onInput={(e) => this.handleFirstName(e)} 
              placeholder="First Name" 
              disabled={this.formData.loading}
              required 
            />
            <input type="text" id="form-input" 
              value={this.formData.lastName} 
              onInput={(e) => this.handleLastName(e)} 
              placeholder="Last Name" 
              disabled={this.formData.loading}
              required 
            />
            <input type="email" id="form-input" 
              value={this.formData.email} 
              onInput={(e) => this.handleEmail(e)} 
              placeholder="Email" 
              disabled={this.formData.loading}
              required 
            />
  
            <p class="failed">{ this.failMessage }</p>
            <input type="submit" 
              class={`sqh-continue-btn ${buttonStyle}`} 
              value={this.formData.loading ? this.loadingtext : this.buttontext} disabled={this.formData.loading} />
          </form>
        </div>
      </div>
    )
    : (
      <div>
        <h3>
          <img class="success" src="https://d2rcp9ak152ke1.cloudfront.net/theme/test_azu3qtbbzj0ta/assets/WkKexbBO/images/conversion.png" />
        { this.successtext }
        </h3>
      </div>
    )
 
  }
}