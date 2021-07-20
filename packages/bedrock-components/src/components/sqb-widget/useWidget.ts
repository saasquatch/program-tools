import { useLazyQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
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

  const [loading, setLoading] = useState(true);

  const isAuthed = props.requireAuth ? userIdent !== undefined : true;

  useEffect(() => {
    async function initialize() {
      await fetch({
        widgetType: props.widgetType,
        // TODO: useLocale here?
        locale: 'en',
      });
      setLoading(false);
    }
    if (props.widgetType && isAuthed) initialize();
  }, [props.widgetType, userIdent]);

  const html = data?.renderWidget?.widgetConfig?.values?.htmlTemplate;

  return {
    states: {
      loading,
    },
    data: {
      html,
    },
  };
}
