import { html } from 'lit';
import { TaxAndCashProps } from './TaxAndCash';
import { useTaxAndCash } from './useTaxAndCash';

export function TaxAndCashView(props: TaxAndCashProps & ReturnType<typeof useTaxAndCash>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .tax-cash-container {
        max-width: 600px;
        margin: 0 auto;
      }
    </style>
    <div class="tax-cash-container" part="sqm-base">
      ${props.loading
        ? html`<sl-spinner style="font-size: 2rem;"></sl-spinner>`
        : html`<slot></slot>`}
    </div>
  `;
}
