import { h, Component, Prop, Host } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { useWidget } from './useWidget';

/**
 * Shows a widget as a component inside of a widget. Useful for breaking down multi-page widgets into
 * a single widget per page.
 *
 * @uiName Widget
 */
@Component({
  tag: 'sqb-widget',
})
export class SqbWidget {
  /**
   * The type of widget to load. Can be a program's widget, a global widget, or a classic widget.
   * If this prop is missing, then nothing is shown.
   *
   * @uiName Widget Type
   */
  @Prop() widgetType: string;

  /**
   * When enabled then this widget is hidden until a user is logged in. Defaults to false.
   *
   * @uiName Auth Required
   */
  @Prop() requireAuth: boolean = false;

  constructor() {
    withHooks(this);
  }

  disconnectedCallback() {}

  render() {
    const { data } = useWidget(this);
    return <Host style={{ display: 'contents' }} innerHTML={data.html || ''} />;
  }
}
