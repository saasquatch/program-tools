import { html } from 'lit';
import { UI } from '../../ui';
import { TaxAndCashDashboardProps } from './TaxAndCashDashboard';
import { useTaxAndCashDashboard } from './useTaxAndCashDashboard';

export function TaxAndCashDashboardView(
  props: TaxAndCashDashboardProps & ReturnType<typeof useTaxAndCashDashboard>
) {
  return html`
    <style>
      :host {
        display: block;
      }

      .dashboard {
        display: flex;
        flex-direction: column;
        gap: var(--sl-spacing-small);
      }

      .dashboard-step {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: var(--sl-spacing-medium);
        border: 1px solid var(--sl-color-neutral-200);
        border-radius: var(--sl-border-radius-medium);
        cursor: pointer;
      }

      .dashboard-step:hover {
        border-color: var(--sl-color-primary-300);
        background: var(--sl-color-neutral-50);
      }

      .step-label {
        font-weight: var(--sl-font-weight-semibold);
      }

      .step-status {
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-x-small);
      }
    </style>
    <div class="dashboard" part="sqm-base">
      ${props.loading
        ? html`${UI.Spinner({})}`
        : props.steps.map(
            (step) => html`
              <div
                class="dashboard-step"
                @click="${() => {
                  const event = new CustomEvent('sq:tax-step', {
                    bubbles: true,
                    composed: true,
                    detail: { step: step.key },
                  });
                  document.dispatchEvent(event);
                }}"
              >
                <span class="step-label">${step.label}</span>
                <div class="step-status">
                  ${UI.Badge({ variant: props.getStatusVariant(step.status), children: props.getStatusText(step.status) })}
                  ${UI.Icon({ name: 'chevron-right' })}
                </div>
              </div>
            `
          )}
    </div>
  `;
}
