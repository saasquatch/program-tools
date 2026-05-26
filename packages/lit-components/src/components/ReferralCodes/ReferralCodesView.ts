import { html } from 'lit';
import { UI } from '../../ui';
import { ReferralCodesProps } from './ReferralCodes';
import { useReferralCodes } from './useReferralCodes';

export function ReferralCodesView(props: ReferralCodesProps & ReturnType<typeof useReferralCodes>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .referral-codes-container {
        display: block;
        width: 100%;
      }
    </style>
    <div class="referral-codes-container">
      ${props.loading ? html`${UI.Spinner({})}` : html`<slot></slot>`}
    </div>
  `;
}
