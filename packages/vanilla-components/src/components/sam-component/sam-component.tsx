import { Component, State } from '@stencil/core';

@Component({
    tag: 'sqh-sam-component',
    styleUrl: 'sam-component.scss'
  })

  export class SamComponent {
    @State() firstName: string;
    @State() lastName: string;
    @State() email: string;

    handleSubmit(e) {
      e.preventDefault()
      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.email);
      // send data to our backend
    }

    handleFirstName(event) {
      this.firstName = event.target.value;
    }

    handleLastName(event) {
      this.lastName = event.target.value;
    }
    handleEmail(event) {
      this.email = event.target.value;
    }

    render() {
      return (
        <div>
          <div class="input-group">
            <form onSubmit={(e) => this.handleSubmit(e)}>
              <input type="text" class="form-input" value={this.firstName} onInput={(e) => this.handleFirstName(e)} placeholder="First Name" />
              <input type="text" class="form-input"  value={this.lastName} onInput={(e) => this.handleLastName(e)} placeholder="Last Name" />
              <input type="text" class="form-input"  value={this.email} onInput={(e) => this.handleEmail(e)} placeholder="Email" />
              <input type="submit" class="sqh-continue-btn" value="Continue" />
            </form>
          </div>
        </div>
      );
    }
  }