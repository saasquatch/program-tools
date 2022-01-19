import { useLazyQuery, useLocale, useMutation, useProgramId, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useEffect, useRef } from '@saasquatch/universal-hooks';
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

const WIDGET_LOAD_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

export function useWidget(props: SqbWidget) {
  const userIdent = useUserIdentity();
  const programId = useProgramId();

  const locale = useLocale();
  console.log(locale);
  const [fetch, { data }] = useLazyQuery<GetWidget>(GET_WIDGET);
  const [sendLoadEvent] = useMutation(WIDGET_LOAD_EVENT);

  const analyticsEventSent = useRef(false);

  if (props.trackLoads && !analyticsEventSent.current && userIdent !== undefined) {
    analyticsEventSent.current = true;
    sendLoadEvent({
      eventMeta: {
        programId,
        id: userIdent.id,
        accountId: userIdent.accountId,
        type: 'USER_REFERRAL_PROGRAM_LOADED_EVENT',
        meta: {
          engagementMedium: 'EMBED',
        },
      },
    });
  }

  const canLoad =
    // No auth required
    !props.requireAuth ||
    // Or auth required and logged in
    userIdent !== undefined;
  useEffect(() => {
    console.log("locale updated", locale);
    if (props.widgetType && canLoad) {
      fetch({
        widgetType: props.widgetType,
        // TODO: This should use `useLocale` from component boilerplate, but that implementation is incomplete
        // because it doesn't pull the user's locale from GraphQL
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
