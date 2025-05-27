import {
  useEngagementMedium,
  usePaginatedQuery,
  useParentState,
  useProgramId,
  useQuery,
  useRefreshDispatcher,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { GraphQlRequestError } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import { useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { ReferralCodes } from "./sqm-referral-codes";

const GET_REFERRAL_CODES = gql`
  query getCodes(
    $engagementMedium: UserEngagementMedium!
    $limit: Int!
    $offset: Int!
    $filter: ReferralCodeFilterInput
  ) {
    viewer {
      ... on User {
        referralCodeList(limit: $limit, offset: $offset, filter: $filter) {
          data {
            code
            dateUsed
            dateCopied
            singleUse
            shareLinkCodes(limit: $limit) {
              data {
                linkCode
                shareLink: shortUrl(
                  shareMedium: DIRECT
                  engagementMedium: EMBED
                )
                email: shortUrl(
                  shareMedium: EMAIL
                  engagementMedium: $engagementMedium
                )
                whatsApp: shortUrl(
                  shareMedium: WHATSAPP
                  engagementMedium: $engagementMedium
                )
                fbMessenger: shortUrl(
                  shareMedium: FBMESSENGER
                  engagementMedium: $engagementMedium
                )
              }
            }
          }
          count
          totalCount
        }
      }
    }
  }
`;

export const REFERRAL_CODES_NAMESPACE = "sq:referral-codes";

export const REFERRAL_CODES_PAGINATION_CONTEXT = "sq:referral-codes-pagination";

export const SET_CODE_COPIED = gql`
  mutation markReferralCodeCopied($referralCode: String!) {
    markReferralCodeCopied(referralCode: $referralCode) {
      referralCode {
        dateCopied
      }
    }
  }
`;

type ReferralCode = {
  dateUsed: number | null;
  dateCopied: number | null;
  code: string | null;
  singleUse: boolean;
  shareLinkCodes: {
    data: {
      direct: string | null;
      email: string | null;
      fbMessenger: string | null;
      whatsApp: string | null;
    }[];
  };
};

export type ReferralCodeContext = {
  refresh: () => void;
  loading?: boolean;
  referralCode: string;
  isUsed: boolean;
  isCopied: boolean;
  shareLink: string;
  singleUse: boolean;
  email: {
    messageLink: string;
  };
  fbmessenger: {
    messageLink: string;
    shareLink: string;
  };
  whatsapp: { messageLink: string };
};

export type PaginationContext = {
  states: {
    errors: GraphQlRequestError<any>;
    loading: boolean;
    limit: number;
    currentPage: number;
    pageCount: number;
    pageProgress: string;
  };
  callbacks: {
    refetch: (variables: unknown) => Promise<any>;
    setLimit: (newLimit: number) => void;
    setCurrentPage: (newPage: number) => void;
  };
};

export function useReferralCodes(props: ReferralCodes) {
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();
  const programId = props.programId || useProgramId();

  const { refresh } = useRefreshDispatcher();

  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<ReferralCode>(
    GET_REFERRAL_CODES,
    (data) => data?.viewer?.referralCodeList,
    {
      limit: 1,
      offset: 0,
    },
    {
      engagementMedium,
      programId,
      filter: {
        fuelTank_eq: true,
        programId_eq: programId,
        dateUsed_exists: false,
      },
    },
    !user?.jwt
  );

  const [paginationContext, setPaginationContext] =
    useParentState<PaginationContext>({
      namespace: REFERRAL_CODES_PAGINATION_CONTEXT,
      initialValue: { states, callbacks },
    });

  const [referralCodesContext, setReferralCodesContext] =
    useParentState<ReferralCodeContext>({
      namespace: REFERRAL_CODES_NAMESPACE,
      initialValue: {
        refresh,
        loading: true,
        referralCode: "",
        shareLink: "",
        isCopied: false,
        isUsed: false,
        singleUse: false,
        email: {
          messageLink: "",
        },
        fbmessenger: {
          messageLink: "",
          shareLink: "",
        },
        whatsapp: { messageLink: "" },
      },
    });

  useEffect(() => {
    if (referralData?.data?.length) {
      const data = referralData.data[0];
      setReferralCodesContext({
        refresh,
        referralCode: data.code,
        isCopied: !!data.dateCopied,
        isUsed: !!data.dateUsed,
        singleUse: !!data.singleUse,
        shareLink: data.shareLinkCodes?.data?.[0]?.direct,
        email: {
          messageLink: data.shareLinkCodes?.data?.[0]?.email,
        },
        fbmessenger: {
          messageLink: data.shareLinkCodes?.data?.[0]?.fbMessenger,
          shareLink: data.shareLinkCodes?.data?.[0]?.fbMessenger,
        },
        whatsapp: { messageLink: data.shareLinkCodes?.data?.[0]?.whatsApp },
      });
      setPaginationContext({ states, callbacks });
    }
  }, [referralData]);

  return {
    states: {
      ...states,
      noCodes: referralData?.totalCount === 0,
    },
    data: referralCodesContext,
    callbacks: {},
  };
}
