import { html } from 'lit';
import { UI } from '../../ui';
import { DocusignFormProps } from './DocusignForm';
import { useDocusignForm } from './useDocusignForm';

export function DocusignFormView(props: DocusignFormProps & ReturnType<typeof useDocusignForm>) {
  return html`
    <style>
      :host {
        display: block;
      }

      .docusign-container {
        max-width: 100%;
      }

      .docusign-header {
        margin-bottom: var(--sl-spacing-medium);
      }

      iframe {
        width: 100%;
        height: ${props.iframeHeight || '600px'};
        border: 1px solid var(--sl-color-neutral-200);
        border-radius: var(--sl-border-radius-medium);
      }
    </style>
    <div class="docusign-container" part="sqm-base">
      ${props.signed
        ? html`
            ${UI.Alert({
              variant: 'success',
              open: true,
              icon: UI.Icon({ name: 'check-circle' }),
              children: 'Document signed successfully!',
            })}
          `
        : props.loading
          ? html`${UI.Spinner({ style: 'font-size: 2rem;' })}`
          : html`
              <div class="docusign-header">
                <h3>${props.headerText}</h3>
                <p style="color: var(--sl-color-neutral-600);">${props.descriptionText}</p>
              </div>
              ${props.docusignUrl
                ? html`<iframe src="${props.docusignUrl}"></iframe>`
                : html`${UI.Alert({ variant: 'warning', open: true, children: 'Document signing URL not available.' })}`}
            `}
    </div>
  `;
}
