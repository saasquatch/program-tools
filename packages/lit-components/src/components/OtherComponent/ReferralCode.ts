import { css, html } from 'lit';
import { useComponent } from '../../hooks/useComponent';
import { useReferralCode } from './useReferralCode';

/**
 * A simple counter component demonstrating Haunted functional component with state management
 */

declare global {
  interface HTMLElementTagNameMap {
    'sql-referral-code': HTMLElement;
  }
}

export const ReferralCode = useComponent((host: HTMLElement) => {
  //   const title = host.getAttribute('title');

  const props = useReferralCode();

  console.log({ attributes: host.attributes, host, props });

  return html`
    ReferralCode:
    <sl-input value="${props.copyString}"></sl-input>
  `;
}, 'sql-referral-code');
