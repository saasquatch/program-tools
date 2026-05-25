import { useProgramId, useQuery, useUserIdentity } from '@saasquatch/component-boilerplate';
import { useState } from '@saasquatch/universal-hooks';
import { gql } from 'graphql-request';
import { InvoiceTableProps } from './InvoiceTable';

const INVOICE_TABLE_QUERY = gql`
  query getInvoices($programId: ID, $offset: Int, $limit: Int) {
    user: viewer {
      ... on User {
        payoutInvoices(filter: { programId_eq: $programId }, limit: $limit, offset: $offset) {
          totalCount
          count
          data {
            id
            dateCreated
            invoiceNumber
            downloadUrl
            amount
            currency
          }
        }
      }
    }
  }
`;

export function useInvoiceTable(props: InvoiceTableProps) {
  const programId = useProgramId() || props.programId;
  const user = useUserIdentity();
  const perPage = Number(props.perPage) || 4;
  const [currentPage, setCurrentPage] = useState(0);

  const { data, loading } = useQuery(
    INVOICE_TABLE_QUERY,
    { programId, offset: currentPage * perPage, limit: perPage },
    !user?.jwt
  );

  const invoices = data?.user?.payoutInvoices?.data || [];
  const totalCount = data?.user?.payoutInvoices?.totalCount || 0;
  const totalPages = Math.ceil(totalCount / perPage);

  function nextPage() {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  }

  function prevPage() {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  }

  return {
    invoices,
    loading,
    totalCount,
    totalPages,
    currentPage,
    nextPage,
    prevPage,
    empty: !loading && invoices.length === 0,
  };
}
