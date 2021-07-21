import { useLazyQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
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
  const [fetch, { data }] = useLazyQuery<GetWidget>(GET_WIDGET);

  const canLoad =
    // No auth required
    !props.requireAuth ||
    // Or auth required and logged in
    userIdent !== undefined;

  useEffect(() => {
    if (props.widgetType && canLoad) {
      fetch({
        widgetType: props.widgetType,
        // TODO: This should use `useLocale` from component boilerplate, but that implementation is incomplete
        // because it doesn't pull the user's locale from GraphQL
        locale: undefined,
      });
    }
  }, [props.widgetType, canLoad]);

  const html = data?.renderWidget?.widgetConfig?.values?.htmlTemplate;

  return {
    states: {
      loading: typeof data === 'undefined',
    },
    data: {
      html,
    },
  };
}
