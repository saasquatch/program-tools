import { isDemo } from '@saasquatch/component-boilerplate';
import { getProps } from '../../helpers';
import { useComponent } from '../../hooks/useComponent';
import { DocusignFormView } from './DocusignFormView';
import { useDemoDocusignForm, useDocusignForm } from './useDocusignForm';

export interface DocusignFormProps {
  headerText: string;
  descriptionText: string;
  iframeUrl?: string;
  iframeHeight: string;
  programId?: string;
}

declare global {
  interface HTMLElementTagNameMap {
    'sql-docusign-form': HTMLElement;
  }
}

export const DocusignForm = useComponent<DocusignFormProps>(
  (host) => {
    const rawProps = getProps(host) as Partial<Record<keyof DocusignFormProps, unknown>>;
    const props: DocusignFormProps = {
      headerText:
        typeof rawProps.headerText === 'string' ? rawProps.headerText : 'Tax Document Signing',
      descriptionText:
        typeof rawProps.descriptionText === 'string'
          ? rawProps.descriptionText
          : 'Please sign the tax document to continue.',
      iframeUrl: typeof rawProps.iframeUrl === 'string' ? rawProps.iframeUrl : undefined,
      iframeHeight: typeof rawProps.iframeHeight === 'string' ? rawProps.iframeHeight : '600px',
      programId: typeof rawProps.programId === 'string' ? rawProps.programId : undefined,
    };

    const hookProps = isDemo() ? useDemoDocusignForm(props) : useDocusignForm(props);

    return DocusignFormView({ ...props, ...hookProps });
  },
  'sql-docusign-form',
  ['header-text', 'description-text', 'iframe-url', 'iframe-height', 'program-id'] as const
);
