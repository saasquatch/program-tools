import { Component, State } from '@stencil/core';

interface FormState {
  firstName?: string;
  lastName?: string;
  email?: string;
  valid?: boolean;
}

function delayPromise(duration) {
  return function () {
    return new Promise(function (resolve, reject) {
      // Loading...
      setTimeout(function () {
        // failure?
        resolve();
      }, duration)
    });
  };
};

@Component({
  tag: 'sqh-sam-component',
  styleUrl: 'sam-component.scss'
})

export class SamComponent {
  @State() formData: FormState = {};

  async handleSubmit(e) {
    console.log(e)
    e.preventDefault()
    console.log("Submitted", this.formData);

    //API.graphql
    // send data to our backend

    // Validation before sending


    await delayPromise(3000)

    // success?


  }

  //validation -- fields are outlined with red
  //loading -- form is disabled, loading indicator shown
  //submit success state -- form is hidden, replaced with a success message
  //submit failure state -- red alert area, form is enabled to try again

  handleFirstName(event) {
    this.formData = {
      ...this.formData,
      firstName: event.target.value
    }
  }

  handleLastName(event) {
    this.formData = {
      ...this.formData,
      lastName: event.target.value
    }
  }

  handleEmail(event) {

    if (event.target.validity.typeMismatch || !event.target.value) {
      this.formData.valid = false;
      console.log("red")
      console.log(event.target.class);
      event.target.className = "invalid"
    } else {
      console.log("green")
      event.target.className = "valid"
      this.formData.valid = true;
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
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <input type="text" id="form-input" value={this.formData.firstName} onInput={(e) => this.handleFirstName(e)} placeholder="First Name" required />
            <input type="text" id="form-input" value={this.formData.lastName} onInput={(e) => this.handleLastName(e)} placeholder="Last Name" required />
            <input type="email" id="form-input" value={this.formData.email} onInput={(e) => this.handleEmail(e)} placeholder="Email" required />
            <input type="submit" class="sqh-continue-btn" value="Continue" />
          </form>
        </div>
      </div>
    );
  }
}