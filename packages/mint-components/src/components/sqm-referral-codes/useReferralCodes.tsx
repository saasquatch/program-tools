import {
  useEngagementMedium,
  usePaginatedQuery,
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { ReferralCodes } from "./sqm-referral-codes";
import { GraphQlRequestError } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import { useEffect } from "@saasquatch/universal-hooks";

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

export const SET_CODE_USED = gql`
mutation test {}
`;

type ReferralCode = {
  code: string | null;
  shareLinkCodes: {
    direct: string | null;
    email: string | null;
    fbMessenger: string | null;
    whatsApp: string | null;
  }[];
};

export type ReferralCodeContext = {
  loading?: boolean;
  referralCode: string;
  shareLink: string;
  email: {
    messageLink: string;
  };
  fbMessenger: {
    messageLink: string;
    shareLink: string;
  };
  whatsApp: { messageLink: string };
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
    refetch: (variables?: unknown) => Promise<any>;
    setLimit: (newLimit: number) => void;
    setCurrentPage: (newPage: number) => void;
  };
};

export function useReferralCodes(props: ReferralCodes) {
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();

  console.log({ props });

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
        loading: true,
        referralCode: "",
        shareLink: "",
        email: {
          messageLink: "",
        },
        fbMessenger: {
          messageLink: "",
          shareLink: "",
        },
        whatsApp: { messageLink: "" },
      },
    });

  useEffect(() => {
    if (referralData?.data?.length) {
      const data = referralData.data[0];
      setReferralCodesContext({
        referralCode: data.code,
        shareLink: data.shareLinkCodes?.[0]?.direct,
        email: {
          messageLink: data.shareLinkCodes?.[0]?.email,
        },
        fbMessenger: {
          messageLink: data.shareLinkCodes?.[0]?.fbMessenger,
          shareLink: data.shareLinkCodes?.[0]?.fbMessenger,
        },
        whatsApp: { messageLink: data.shareLinkCodes?.[0]?.whatsApp },
      });
    }
  }, [referralData]);

  useEffect(() => {
    setPaginationContext({ states, callbacks });
  }, [states.loading]);

  console.log({ referralData, states });

  return {
    states: {
      ...states,
      noCodes: referralData.totalCount === 0,
    },
    data: referralCodesContext,
    callbacks: {
      // onPrev: () => callbacks.setCurrentPage(states.currentPage - 1),
      // onNext: () => callbacks.setCurrentPage(states.currentPage + 1),
    },
  };
}
