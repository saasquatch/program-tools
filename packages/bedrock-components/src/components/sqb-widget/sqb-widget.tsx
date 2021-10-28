import { h, Component, Prop, Host, State } from '@stencil/core';
import { withHooks } from '@saasquatch/stencil-hooks';
import { useWidget } from './useWidget';
import { isDemo } from '@saasquatch/component-boilerplate';
import { DemoData } from '../../global/demo';
import deepmerge from 'deepmerge';

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

  /**
   * When enabled then a load event will be recorded in analytics.
   *
   * @uiName Track Widget Loads
   */
  @Prop() trackLoads: boolean = false;

  /**
   * Engagement medium of widget being loaded
   *
   * @uiName Engagement Medium
   */
  @Prop() engagementMedium: string = 'EMBED';

  /**
   * @undocumented
   * @uiType object
   */
  @Prop() demoData?: DemoData<WidgetProps>;

  constructor() {
    withHooks(this);
  }

  @State()
  ignored = true;

  disconnectedCallback() {}

  render() {
    const { data } = isDemo() ? useWidgetDemo(this) : useWidget(this);
    return <Host style={{ display: 'contents' }} innerHTML={data.html} />;
  }
}

type WidgetProps = {
  data: {
    html: string;
  };
};

function useWidgetDemo(props: SqbWidget) {
  return deepmerge({ data: {} }, props.demoData || {}, { arrayMerge: (_, a) => a });
}
