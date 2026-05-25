import { html } from 'lit';
import { TaskCardProps } from './TaskCard';
import { TaskCardHookResult } from './useTaskCard';

export function TaskCardView(props: TaskCardProps & TaskCardHookResult) {
  const classes = ['task-card'];

  if (props.isComplete) classes.push('complete');
  if (props.isExpired) classes.push('expired');

  return html`
    <style>
      :host {
        display: block;
      }

      .task-card {
        display: flex;
        align-items: center;
        gap: var(--sl-spacing-medium);
        padding: var(--sl-spacing-medium);
        border: 1px solid var(--sl-color-neutral-200);
        border-radius: var(--sl-border-radius-medium);
        background: var(--sl-color-neutral-0);
      }

      .task-card.complete {
        border-color: var(--sl-color-success-300);
        background: var(--sl-color-success-50);
      }

      .task-card.expired {
        opacity: 0.6;
      }

      .task-icon {
        font-size: 1.5rem;
      }

      .task-content {
        flex: 1;
      }

      .task-title {
        font-weight: var(--sl-font-weight-semibold);
        margin-bottom: var(--sl-spacing-x-small);
      }

      .task-description {
        font-size: var(--sl-font-size-small);
        color: var(--sl-color-neutral-600);
      }

      .task-meta {
        display: flex;
        flex-wrap: wrap;
        gap: var(--sl-spacing-small);
        margin-top: var(--sl-spacing-x-small);
        font-size: var(--sl-font-size-x-small);
        color: var(--sl-color-neutral-500);
      }

      .task-reward {
        text-align: right;
        font-weight: var(--sl-font-weight-semibold);
        color: var(--sl-color-primary-600);
      }

      .progress-bar {
        height: 6px;
        background: var(--sl-color-neutral-200);
        border-radius: 3px;
        margin-top: var(--sl-spacing-x-small);
        overflow: hidden;
      }

      .progress-fill {
        height: 100%;
        background: var(--sl-color-primary-600);
        border-radius: 3px;
        transition: width 0.3s;
      }

      .completed-badge {
        color: var(--sl-color-success-600);
        font-weight: var(--sl-font-weight-semibold);
        font-size: var(--sl-font-size-small);
      }
    </style>
    <div class="${classes.join(' ')}" part="sqm-base">
      ${props.cardIcon ? html`<sl-icon class="task-icon" name="${props.cardIcon}"></sl-icon>` : null}
      <div class="task-content">
        <div class="task-title">${props.taskCardTitle}</div>
        ${props.taskCardDescription
          ? html`<div class="task-description">${props.taskCardDescription}</div>`
          : null}
        ${props.showProgressBar && !props.isComplete
          ? html`
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${props.progress}%"></div>
              </div>
            `
          : null}
        ${props.isComplete ? html`<span class="completed-badge">${props.completedText}</span>` : null}
        ${props.repeatable || props.dateExpires
          ? html`
              <div class="task-meta">
                ${props.repeatable ? html`<span>Repeatable</span>` : null}
                ${props.dateExpires ? html`<span>Expires ${props.dateExpires}</span>` : null}
              </div>
            `
          : null}
      </div>
      <div class="task-reward">
        ${props.rewardAmount ? html`<div>${props.rewardAmount} ${props.rewardUnit}</div>` : null}
        ${!props.isComplete && !props.isExpired
          ? html`
              <sl-button size="small" variant="primary" @click=${props.onClick}>${props.buttonText}</sl-button>
            `
          : null}
      </div>
    </div>
  `;
}
