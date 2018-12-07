import { render } from '@stencil/core/testing';
import { BalancesComponent } from './balances-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new BalancesComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [BalancesComponent],
        html: '<sqh-balance-component></sqh-balance-component>'
      });
    });
  });
});