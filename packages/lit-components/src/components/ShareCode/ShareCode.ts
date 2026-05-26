import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ShareCodeView } from './ShareCodeView';
import { useDemoShareCode, useShareCode } from './useShareCode';

export interface ShareCodeProps {
  tooltipText: string;
  tooltipLifespan: number;
  textAlign: 'left' | 'center' | 'right';
  copyButtonLabel: string;
  buttonStyle: 'icon' | 'button-outside' | 'button-below';
  buttonType: 'primary' | 'secondary';
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  borderRadius?: number;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-share-code': HTMLElement;
  }
}

export const ShareCode = useComponent<ShareCodeProps>(
  (host) => {
    const props: ShareCodeProps = {
      tooltipText: 'Copied to Clipboard',
      tooltipLifespan: 1000,
      textAlign: 'left',
      copyButtonLabel: 'Copy Code',
      buttonStyle: 'icon',
      buttonType: 'primary',
      ...getProps(host),
    };

    const hookProps = isDemo() ? useDemoShareCode(props) : useShareCode(props);

    return ShareCodeView({ ...props, ...hookProps });
  },
  'sql-share-code',
  [
    'tooltip-text',
    'tooltip-lifespan',
    'text-align',
    'copy-button-label',
    'button-style',
    'button-type',
    'background-color',
    'border-color',
    'text-color',
    'border-radius',
    'program-id',
  ] as const
);
