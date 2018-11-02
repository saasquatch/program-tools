import { Component, Prop, State } from '@stencil/core';
import { shadeColor } from '../../utilities';
import { css } from 'emotion';

interface FormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  valid?: boolean;
  loading?: boolean;
  failed?: boolean;
  signedUp?: boolean;
}

function delayPromise(duration) { 
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

@Component({
  tag: 'sqh-sam-component',
  styleUrl: 'sam-component.scss'
})

export class SamComponent {
  @State() formData: FormState = {};

  @Prop() successtext: string;
  @Prop() failuretext: string;
  
  // button props
  @Prop() buttoncolor: string;
  @Prop() buttontextcolor: string;
  @Prop() buttontext: string;

  async handleSubmit(e) {
    console.log(e)
    e.preventDefault()

    // disable form and load
    this.formData = {
      ...this.formData,
      loading: true
    }
    
    console.log("Submitted", this.formData);

    //API.graphql
    // send data to our backend
    // display Loading... text
    await delayPromise(3000);

    if(Math.random() >= 0.5){
      // Successfully signed up!
      // Hide form
      this.formData = {
        ...this.formData,
        signedUp: true
      }
      console.log(this.formData, "Form submission failed")
    } else {
      // Form re-enabled
      this.formData = {
        ...this.formData,
        loading: false,
        failed: true
      }

      console.log(this.formData, "Form submission failed")
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
    let failMessage = "";
    if(this.formData.failed) failMessage = this.failuretext;

    const buttonStyle= css`
      background-color:${this.buttoncolor};
      color:${this.buttontextcolor};
      &:hover {
        background-color: ${shadeColor(this.buttoncolor, 10)};
        border-color: ${shadeColor(this.buttoncolor, 12)};
      }
    `;

    return !this.formData.signedUp ? (
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
  
            <p>{ failMessage }</p>
            <input type="submit" class={`sqh-continue-btn ${buttonStyle}`} value={this.buttontext} disabled={this.formData.loading} />
          </form>
        </div>
      </div>
    )
    : (
      <div>
        <h3>{ this.successtext }</h3>
      </div>
    )
 
  }
}