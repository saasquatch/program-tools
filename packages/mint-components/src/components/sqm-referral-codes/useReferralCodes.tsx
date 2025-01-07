import {
  useEngagementMedium,
  usePaginatedQuery,
  useParentState,
  useRefreshDispatcher,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { GraphQlRequestError } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import { useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { ReferralCodes } from "./sqm-referral-codes";

const GET_REFERRAL_CODES = gql`
  query getCodes(
    $limit: Int!
    $offset: Int!
    $engagementMedium: UserEngagementMedium!
  ) {
    viewer {
      ... on User {
        referralCodeList(
          limit: $limit
          offset: $offset
          filter: { fuelTank_eq: true }
        ) {
          data {
            code
            dateUsed
            dateCopied
            shareLinkCodes(limit: $limit, offset: $offset) {
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

  console.log({ props });

  const { refresh } = useRefreshDispatcher();

  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<ReferralCode>(
    GET_REFERRAL_CODES,
    (data) => {
      console.log({ queryData: data });
      return data?.viewer?.referralCodeList;
    },
    {
      limit: 1,
      offset: 0,
    },
    { engagementMedium },
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

  console.log({ referralData, states });

  return {
    states: {
      ...states,
      noCodes: referralData?.totalCount === 0,
    },
    data: referralCodesContext,
    callbacks: {
      // onPrev: () => callbacks.setCurrentPage(states.currentPage - 1),
      // onNext: () => callbacks.setCurrentPage(states.currentPage + 1),
    },
  };
}
