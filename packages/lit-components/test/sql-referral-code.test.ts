import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { SqlReferralCode } from '../src/SqlReferralCode.js';
import '../src/sql-referral-code.js';

describe('SqlReferralCode', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<SqlReferralCode>(html`<sql-referral-code></sql-referral-code>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<SqlReferralCode>(html`<sql-referral-code></sql-referral-code>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<SqlReferralCode>(html`<sql-referral-code header="attribute header"></sql-referral-code>`);

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<SqlReferralCode>(html`<sql-referral-code></sql-referral-code>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
