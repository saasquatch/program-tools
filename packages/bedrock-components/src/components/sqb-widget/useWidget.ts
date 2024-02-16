import { useLazyQuery, useLoadEvent, useLocale, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useEffect } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { SqbWidget } from './sqb-widget';

declare global {
  interface Window {
    squatchJsApi: API;
  }
}

type API = {
  close: () => void;
};

type GetWidget = {
  renderWidget: {
    widgetConfig: {
      // Defined by JSON Schema project
      values: {
        htmlTemplate: string;
        meta: {
          plugins: unknown[];
          // TODO: Should load dependencies...
          // We can add this later and that should be forward compatible because it should not RE-load existing dependencies
          // And this only planned to be used for the time being where dependencies already exist
          dependencies: unknown[];
        };
      };
    };
  };
};

const GET_WIDGET = gql`
  query getWidget($widgetType: WidgetType!, $locale: RSLocale) {
    renderWidget(widgetType: $widgetType, locale: $locale) {
      widgetConfig {
        values
      }
    }
  }
`;

export function useWidget(props: SqbWidget) {
  const userIdent = useUserIdentity();
  const locale = useLocale();
  const [fetch, { data }] = useLazyQuery<GetWidget>(GET_WIDGET);

  if (props.trackLoads && userIdent !== undefined) {
    useLoadEvent();
  }

  const canLoad =
    // No auth required
    !props.requireAuth ||
    // Or auth required and logged in
    (userIdent !== undefined && locale !== undefined);

  useEffect(() => {
    if (props.widgetType && canLoad) {
      fetch({
        widgetType: props.widgetType,
        locale,
      });
    }
  }, [props.widgetType, props.requireAuth, userIdent?.jwt, locale]);

  const html = data?.renderWidget?.widgetConfig?.values?.htmlTemplate || '';

  return {
    states: {
      loading: typeof data === 'undefined',
    },
    data: {
      html,
    },
  };
}
