import { Component, State } from '@stencil/core';

interface FormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  valid?: boolean;
  loading?: boolean;
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
      console.log("form submission success")
    } else {
      // Something went wrong, please try again.
      // Form re-enabled
      this.formData = {
        ...this.formData,
        loading: false
      }
      console.log("Form submission failed")
    }
  }

  handleFirstName(event) {
    if(!event.target.value){
      event.target.className = "invalid"
      this.formData= {
        ...this.formData,
         valid: false
      }
    } else {
      event.target.className = "valid"
      this.formData= {
        ...this.formData,
         valid: true
      }
    }

    this.formData = {
      ...this.formData,
      firstName: event.target.value
    }
    
  }

  handleLastName(event) {
    if(!event.target.value){
      event.target.className = "invalid"

      this.formData= {
        ...this.formData,
         valid: false
      }
    } else {
      event.target.className = "valid"

      this.formData= {
        ...this.formData,
         valid: true
      }
    }

    this.formData = {
      ...this.formData,
      lastName: event.target.value
    }
  }

  handleEmail(event) {

    if (event.target.validity.typeMismatch || !event.target.value) { 
      event.target.className = "invalid"
      this.formData= {
        ...this.formData,
         valid: false
      }
    } else {
      event.target.className = "valid"
      this.formData= {
        ...this.formData,
         valid: true
      }
    }

    this.formData = {
      ...this.formData,
      email: event.target.value
    }
  }

  render() {
    return (
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
            <input type="submit" class="sqh-continue-btn" value="Continue" disabled={this.formData.loading} />
          </form>
        </div>
      </div>
    );
  }
}