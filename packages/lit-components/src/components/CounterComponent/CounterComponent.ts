import { useUserIdentity, useProgramId, useQuery } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { css, html } from 'lit';
import { gql } from 'graphql-request';
import { useComponent } from '../../hooks/useComponent';

const MessageLinkQuery = gql`
  query getReferralCode($programId: ID) {
    user: viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;

/**
 * A simple counter component demonstrating Haunted functional component with state management
 */
const styles = css`
  :host {
    display: block;
    padding: 16px;
    font-family: sans-serif;
  }

  .counter {
    font-size: 24px;
    margin: 16px 0;
    font-weight: bold;
  }

  button {
    padding: 8px 16px;
    margin: 4px;
    cursor: pointer;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f0f0f0;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #e0e0e0;
  }
`;

declare global {
  interface HTMLElementTagNameMap {
    'lit-counter': HTMLElement;
  }
}

export const CounterComponent = useComponent((host: HTMLElement) => {
  const title = host.getAttribute('title') || 'Counter';
  const initialCount = parseInt(host.getAttribute('initial-count') || '0', 10);

  const [counter, setCounter] = useState(initialCount);

  const increment = () => setCounter(counter + 1);
  const decrement = () => setCounter(counter - 1);
  const reset = () => setCounter(initialCount);

  const programId = useProgramId();
  const user = useUserIdentity();

  const { data } = useQuery(MessageLinkQuery, { programId }, !user?.jwt);
  return html`
    <style>
      ${styles}
    </style>
    <h2>${title}</h2>
    <div class="counter">Count: ${counter}</div>
    <button @click=${increment}>Increment</button>
    <button @click=${decrement}>Decrement</button>
    <button @click=${reset}>Reset</button>
  `;
}, 'lit-counter');
