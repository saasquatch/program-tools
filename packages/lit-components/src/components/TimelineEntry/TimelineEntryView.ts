import { html } from 'lit';
import { UI } from '../../ui';
import { TimelineEntryProps } from './TimelineEntry';

export function TimelineEntryView(props: TimelineEntryProps) {
  const markerColor =
    props.status === 'complete'
      ? 'var(--sl-color-success-500)'
      : props.status === 'active'
        ? props.entryColor
        : 'var(--sl-color-neutral-300)';

  return html`
    <style>
      :host {
        display: block;
        position: relative;
        padding-bottom: var(--sl-spacing-medium);
      }

      .entry {
        display: flex;
        gap: var(--sl-spacing-medium);
      }

      .entry-marker {
        position: absolute;
        left: calc(-1 * var(--sl-spacing-large) + 2px);
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: ${markerColor};
        border: 2px solid var(--sl-color-neutral-0);
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--sl-color-neutral-0);
      }

      .entry-marker sl-icon {
        font-size: 10px;
      }

      .entry-content {
        flex: 1;
      }

      .entry-label {
        font-weight: var(--sl-font-weight-semibold);
        font-size: var(--sl-font-size-medium);
      }

      .entry-description {
        font-size: var(--sl-font-size-small);
        color: var(--sl-color-neutral-600);
        margin-top: var(--sl-spacing-x-small);
      }

      .entry-date {
        font-size: var(--sl-font-size-x-small);
        color: var(--sl-color-neutral-400);
        margin-top: var(--sl-spacing-x-small);
      }
    </style>
    <div class="entry" part="sqm-base">
      <div class="entry-marker">${UI.Icon({ name: props.entryIcon })}</div>
      <div class="entry-content">
        <div class="entry-label">${props.entryLabel}</div>
        ${props.entryDescription
          ? html`<div class="entry-description">${props.entryDescription}</div>`
          : null}
        ${props.entryDate ? html`<div class="entry-date">${props.entryDate}</div>` : null}
        <slot></slot>
      </div>
    </div>
  `;
}
