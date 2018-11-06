import { Component, Prop, State } from '@stencil/core';
import Tunnel from '../../services/Registered'; // Import the tunnel
import { css } from 'emotion';
import debugFn from "debug";

//import { shadeColor } from '../../utilities';
import { API } from '../../services/WidgetHost';

const debug = debugFn("sqh-form-component")

interface FormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  valid?: boolean;
  failed?: boolean;
}

@Component({
  tag: 'sqh-form-component',
  styleUrl: 'form-component.scss'
})

export class FormComponent {
  @State() formData: FormState = {};
  @State() failMessage: string = "";
  @State() loading?: boolean;
  @State() signedUp?: boolean;
  @State() isRegistered?: boolean;

  @Prop() successtext: string;
  @Prop() failuretext: string;
  @Prop() loadingtext: string;
  
  // button props
  @Prop() buttoncolor: string;
  @Prop() buttontextcolor: string;
  @Prop() buttontext: string;

  // form props
  @Prop() requirefirstname: boolean;
  @Prop() requirelastname: boolean;
  @Prop() requireemail: boolean;

  
  addUser() { 
    const dataToSend = {
      firstName: this.formData.firstName,
      lastName: this.formData.lastName,
      email: this.formData.email,
    }

    return API.graphql.addUserDetails(dataToSend);
  }

  async loadRefStats(registered, loadStats) {
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
      this.signedUp = true;
      debug(this.formData, "Form submission success")
      registerUser();
      this.isRegistered = true;
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
        background-color: green;
        border-color: green;
      }
    `;

  /*
    return (
      <Tunnel.Consumer>
        {({ registered, registerUser }) => (
          {registered : true} ?
            <div class='app-profile'>
              <button class="sqh-continue-btn" onClick={registerUser}>Increment Num</button>
              <p>{registered}</p>
            </div>
            :
            <p>{registered}</p>
        )}
      </Tunnel.Consumer>
    );
    */

    return (
    <Tunnel.Consumer>
    {({ registered, registerUser, loadStats }) => (
       !registered ? (
        <div class="input-group">
          <p>registered status: false</p>
          <form id="signup-form" onSubmit={(e) => this.handleSubmit(e, registerUser)}>
            <input type="text" id="form-input" 
              value={this.formData.firstName} 
              onInput={(e) => this.handleFirstName(e)} 
              placeholder="First Name" 
              disabled={this.loading}
              required={this.requirefirstname}
            />
            <input type="text" id="form-input" 
              value={this.formData.lastName} 
              onInput={(e) => this.handleLastName(e)} 
              placeholder="Last Name" 
              disabled={this.loading}
              required={this.requirelastname}
            />
            <input type="email" id="form-input" 
              value={this.formData.email} 
              onInput={(e) => this.handleEmail(e)} 
              placeholder="Email" 
              disabled={this.loading}
              required={this.requireemail}
            />
  
            <p class="failed">{ this.failMessage }</p>
            <input type="submit" 
              class={`sqh-continue-btn ${buttonStyle}`} 
              value={this.loading ? this.loadingtext : this.buttontext} disabled={this.loading} />
            <p>{registered}</p>
          </form>
        </div>
    )
    : (
      <div>
        <h3>
          <img class="success" src="https://d2rcp9ak152ke1.cloudfront.net/theme/test_azu3qtbbzj0ta/assets/WkKexbBO/images/conversion.png" />
        { this.successtext }registered status: true
        </h3>
        <input type="button" value="Load Stats" onClick={() => this.loadRefStats(registered,loadStats)}  />
      </div>
    )
  )}
  </Tunnel.Consumer>
  )

  }
}