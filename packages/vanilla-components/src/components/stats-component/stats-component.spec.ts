import { render } from '@stencil/core/testing';
import { StatsComponent } from './stats-component';

describe('my-app', () => {
  it('should build', () => {
    expect(new StatsComponent()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [StatsComponent],
        html: '<stats-component></stats-component>'
      });
    });
  });
});