import { h, Component, Prop, Host } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { useWidget } from './useWidget';

/**
 * @uiName Widget Component
 */

@Component({
  tag: 'sqb-widget',
})
export class PortalEntrypoint {
  @Prop() widgetType: string;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { states, data } = useWidget(this);
    return (
      <Host style={{ display: 'contents' }}>
        <div innerHTML={data.html || ''} style={{ display: states.loading ? 'none' : 'contents' }}></div>
      </Host>
    );
  }
}
