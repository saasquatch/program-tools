import { Component } from '@stencil/core';

@Component({
    tag: 'sqh-sam-component',
    styleUrl: 'sam-component.scss'
  })

  export class SamComponent {
    render() {
        return (
            <div>
							<select name="select1">
								<option value="ref-widget">Referrer's Widget</option>
							</select>
							<select name="select2">
								<option value="registered">Registered State</option>
								<option value="unregistered">Unregistered State</option>
							</select>
						</div>
        );
      }
  }