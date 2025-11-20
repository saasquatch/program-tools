import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
// import { setImplementation } from '@saasquatch/universal-hooks';
// import * as haunted from 'haunted';
// setImplementation(haunted);
// @ts-ignore
import { useQuery, useProgramId } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-tag';
const MessageLinkQuery = gql `
  query getReferralCode($programId: ID) {
    user: viewer {
      ... on User {
        referralCode(programId: $programId)
      }
    }
  }
`;
export class SqlReferralCode extends LitElement {
    constructor() {
        super();
        this.header = 'Hey there';
        this.counter = 5;
        console.log('yay');
        const programId = useProgramId();
        // const user = useUserIdentity();
        const { data } = useQuery(MessageLinkQuery, { programId });
        // console.log({ user });
    }
    __increment() {
        this.counter += 1;
    }
    render() {
        return html `
      <h2>${this.header} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
    }
}
SqlReferralCode.styles = css `
    :host {
      display: block;
      padding: 25px;
      color: var(--sql-referral-code-text-color, #000);
    }
  `;
__decorate([
    property({ type: String })
], SqlReferralCode.prototype, "header", void 0);
__decorate([
    property({ type: Number })
], SqlReferralCode.prototype, "counter", void 0);
//# sourceMappingURL=SqlReferralCode.js.map