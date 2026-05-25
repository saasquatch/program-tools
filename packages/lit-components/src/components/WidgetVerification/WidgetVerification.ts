import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { useWidgetVerification } from './useWidgetVerification';
import { WidgetVerificationView } from './WidgetVerificationView';

export interface WidgetVerificationProps {
  verificationType: 'email' | 'code';
  headerText: string;
  descriptionText?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-widget-verification': HTMLElement;
  }
}

export const WidgetVerification = useComponent<WidgetVerificationProps>(
  (host) => {
    const rawProps = getProps(host);
    const props: WidgetVerificationProps = {
      verificationType: rawProps.verificationType === 'code' ? 'code' : 'email',
      headerText: rawProps.headerText || 'Verify Your Identity',
      descriptionText: rawProps.descriptionText || '',
    };

    const hookProps = useWidgetVerification(props);

    return WidgetVerificationView({ ...props, ...hookProps });
  },
  'sql-widget-verification',
  ['verification-type', 'header-text', 'description-text'] as const
);
