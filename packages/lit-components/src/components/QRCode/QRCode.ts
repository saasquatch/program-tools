import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { QRCodeView } from './QRCodeView';
import { useQRCode } from './useQRCode';

export interface QRCodeProps {
  size: number;
  programId?: string;
  backgroundColor?: string;
  foregroundColor?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-qr-code': HTMLElement;
  }
}

export const QRCode = useComponent<QRCodeProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<QRCodeProps>;
    const props: QRCodeProps = {
      size: rawProps.size ? Number(rawProps.size) : 200,
      programId: rawProps.programId,
      backgroundColor: rawProps.backgroundColor || '#ffffff',
      foregroundColor: rawProps.foregroundColor || '#000000',
    };

    const hookProps = useQRCode(props);

    return QRCodeView({ ...props, ...hookProps });
  },
  'sql-qr-code',
  ['size', 'program-id', 'background-color', 'foreground-color'] as const
);
