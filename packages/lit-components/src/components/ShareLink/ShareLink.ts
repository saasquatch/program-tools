import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { ShareLinkView } from './ShareLinkView';
import { useDemoShareLink, useShareLink } from './useShareLink';

export interface ShareLinkProps {
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
    'sql-share-link': HTMLElement;
  }
}

export const ShareLink = useComponent<ShareLinkProps>(
  (host) => {
    const props: ShareLinkProps = {
      tooltipText: 'Copied to Clipboard',
      tooltipLifespan: 1000,
      textAlign: 'left',
      copyButtonLabel: 'Copy Link',
      buttonStyle: 'icon',
      buttonType: 'primary',
      ...getProps(host),
    };

    const hookProps = isDemo() ? useDemoShareLink(props) : useShareLink(props);

    return ShareLinkView({ ...props, ...hookProps });
  },
  'sql-share-link',
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
