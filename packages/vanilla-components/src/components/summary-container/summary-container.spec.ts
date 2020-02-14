import { render } from '@stencil/core/testing';
import { SummaryContainer } from './summary-container';

describe('my-app', () => {
  it('should build', () => {
    expect(new SummaryContainer()).toBeTruthy();
  });

  describe('rendering', () => {
    beforeEach(async () => {
      await render({
        components: [SummaryContainer],
        html: '<sqh-text-component></sqh-text-component>'
      });
    });
  });
});