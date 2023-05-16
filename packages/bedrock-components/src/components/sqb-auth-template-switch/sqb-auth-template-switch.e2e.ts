import { E2EPage, newE2EPage } from '@stencil/core/testing';

function newTemplate(slot: string) {
  return /*html*/ `
  <template slot="${slot}">
    <div id="${slot}">my content</div>
  </template>`;
}

function newPageFunctions(page: Readonly<E2EPage>) {
  return {
    expectElement: async (selector: string) =>
      // convert to string because jest pretty printing the object causes errors
      expect((await page.find(selector))?.id).not.toBeUndefined(),
    dontExpectElement: async (selector: string) => expect((await page.find(selector))?.id).toBeUndefined(),
    expectTemplate: async (selector: string) => expect((await page.find('#' + selector))?.id).toBe(selector),
    dontExpectTemplate: async (selector: string) => expect((await page.find('#' + selector))?.id).not.toBe(selector),
  };
}

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  //   log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // suppress error logs - graphql errors are thrown on log out in test/demo environment
  error: jest.fn(),
};

describe('sqb-auth-template-switch', () => {
  test('Default template shown', async () => {
    const html = /*html*/ `
    <sqb-auth-template-switch>
      ${newTemplate('logged-in')}
      ${newTemplate('logged-out')}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const { expectElement, expectTemplate, dontExpectTemplate } = newPageFunctions(page);

    await expectElement('sqb-auth-template-switch');

    await expectTemplate('logged-out');
    await dontExpectTemplate('logged-in');

    page.close();
  });

  test('Logging in', async () => {
    const html = /*html*/ `
    <sqb-auth-template-switch>
      ${newTemplate('logged-in')}
      ${newTemplate('logged-out')}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const { expectElement, expectTemplate, dontExpectTemplate } = newPageFunctions(page);

    await expectElement('sqb-auth-template-switch');

    await expectTemplate('logged-out');
    await dontExpectTemplate('logged-in');

    await page.evaluate(() => {
      window.squatchUserIdentity.context = {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs',
        accountId: 'testuser',
        id: 'testuser',
      };
      return true;
    });

    await page.waitForChanges();

    await expectTemplate('logged-in');
    await dontExpectTemplate('logged-out');

    page.close();
  });

  test('Logging out', async () => {
    const html = /*html*/ `
    <sqb-auth-template-switch>
      ${newTemplate('logged-in')}
      ${newTemplate('logged-out')}
    </sqm-router>
    `;

    const page = await newE2EPage();
    await page.setContent(html);

    const { expectElement, expectTemplate, dontExpectTemplate } = newPageFunctions(page);

    await expectElement('sqb-auth-template-switch');

    await page.evaluate(() => {
      window.squatchUserIdentity.context = {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImFjY291bnRJZCI6InRlc3Rlc3Rlc3QiLCJpZCI6InRlc3Rlc3Rlc3QifX0.qYnU5hNeIj9C_G3NogfG7btgCPGZC7JRXY0MG6a63zs',
        accountId: 'testuser',
        id: 'testuser',
      };
      return true;
    });

    await page.waitForChanges();

    await expectTemplate('logged-in');
    await dontExpectTemplate('logged-out');

    await page.evaluate(() => {
      window.squatchUserIdentity.context = undefined;
      return true;
    });

    await page.waitForChanges();

    await expectTemplate('logged-out');
    await dontExpectTemplate('logged-in');

    page.close();
  });
});

// nice debugging tool
//   console.log(await page.evaluate(()=>document.body.innerHTML))
