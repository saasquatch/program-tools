import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { TextSpanView } from './TextSpanView';

export interface TextSpanProps {
  fontSize?: number;
  textColor?: string;
  fontWeight?: number;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-text-span': HTMLElement;
  }
}

export const TextSpan = useComponent<TextSpanProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<TextSpanProps>;
    const props: TextSpanProps = {
      fontSize: rawProps.fontSize ? Number(rawProps.fontSize) : undefined,
      textColor: rawProps.textColor,
      fontWeight: rawProps.fontWeight ? Number(rawProps.fontWeight) : undefined,
    };

    return TextSpanView(props);
  },
  'sql-text-span',
  ['font-size', 'text-color', 'font-weight'] as const
);
