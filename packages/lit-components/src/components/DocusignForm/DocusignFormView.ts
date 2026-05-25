import { html } from 'lit';
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
            <sl-alert variant="success" open>
              <sl-icon slot="icon" name="check-circle"></sl-icon>
              Document signed successfully!
            </sl-alert>
          `
        : props.loading
          ? html`<sl-spinner style="font-size: 2rem;"></sl-spinner>`
          : html`
              <div class="docusign-header">
                <h3>${props.headerText}</h3>
                <p style="color: var(--sl-color-neutral-600);">${props.descriptionText}</p>
              </div>
              ${props.docusignUrl
                ? html`<iframe src="${props.docusignUrl}"></iframe>`
                : html`<sl-alert variant="warning" open>Document signing URL not available.</sl-alert>`}
            `}
    </div>
  `;
}
