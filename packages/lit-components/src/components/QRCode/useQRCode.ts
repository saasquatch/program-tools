import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { gql } from 'graphql-request';
import { QRCodeProps } from './QRCode';

const QR_CODE_QUERY = gql`
  query getShareLink($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
      }
    }
  }
`;

export function useQRCode(props: QRCodeProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const { data, loading } = useQuery(QR_CODE_QUERY, { programId }, !user?.jwt);

  const shareLink = data?.user?.shareLink || '';
  const size = Number(props.size) || 200;
  const bg = (props.backgroundColor || '#ffffff').replace('#', '');
  const fg = (props.foregroundColor || '#000000').replace('#', '');
  const qrUrl = shareLink
    ? `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(shareLink)}&bgcolor=${bg}&color=${fg}`
    : '';

  return { qrUrl, shareLink, loading };
}

export function useDemoQRCode(props: QRCodeProps) {
  const shareLink = 'https://www.example.com/sharelink/abc';
  const size = Number(props.size) || 200;
  const bg = (props.backgroundColor || '#ffffff').replace('#', '');
  const fg = (props.foregroundColor || '#000000').replace('#', '');
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(shareLink)}&bgcolor=${bg}&color=${fg}`;

  return { qrUrl, shareLink, loading: false };
}
