import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useEffect, useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { DocusignFormProps } from './DocusignForm';

const DOCUSIGN_URL_QUERY = gql`
  query getDocusignUrl($programId: ID) {
    viewer {
      ... on User {
        taxHandling(programId: $programId) {
          publisher {
            docusignUrl
          }
        }
      }
    }
  }
`;

export function useDocusignForm(props: DocusignFormProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(DOCUSIGN_URL_QUERY, { programId }, !user?.jwt);
  const [signed, setSigned] = useState(false);

  const docusignUrl = props.iframeUrl || data?.viewer?.taxHandling?.publisher?.docusignUrl || '';

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const onMessage = (event: MessageEvent<{ type?: string }>) => {
      if (event.data?.type === 'docusign-complete') {
        setSigned(true);
      }
    };

    window.addEventListener('message', onMessage as EventListener);

    return () => {
      window.removeEventListener('message', onMessage as EventListener);
    };
  }, []);

  return { docusignUrl, loading, signed };
}

export function useDemoDocusignForm(props: DocusignFormProps): ReturnType<typeof useDocusignForm> {
  return {
    docusignUrl: props.iframeUrl || 'https://example.com/demo-docusign',
    loading: false,
    signed: false,
  };
}
