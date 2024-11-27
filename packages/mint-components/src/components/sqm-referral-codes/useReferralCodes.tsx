import {
  usePaginatedQuery,
  useParentState,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { gql } from "graphql-request";
import { ReferralCodes } from "./sqm-referral-codes";
import { GraphQlRequestError } from "@saasquatch/component-boilerplate/dist/hooks/graphql/useBaseQuery";
import { useEffect } from "@saasquatch/universal-hooks";

const GET_REFERRAL_CODES = gql`query getReferralCodes {
}`;

export const REFERRAL_CODES_NAMESPACE = "sq:referral-codes";

export const REFERRAL_CODES_PAGINATION_CONTEXT = "sq:referral-codes-pagination";

type ReferralCodesQuery = {
  viewer: {
    // TODO: not known yet
    referralCodes: any[];
  };
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

  const {
    envelope: referralData,
    states,
    callbacks,
  } = usePaginatedQuery<Referral>(
    GET_REFERRAL_CODES,
    (data) => data?.viewer?.referralCodes,
    {
      limit: 1,
      offset: 0,
    },
    {},
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
    if (referralData?.data)
      setReferralCodesContext({
        referralCode: "EXAMPLECODE",
        shareLink: "https://example.com",
        email: {
          messageLink: "https://example.com",
        },
        fbMessenger: {
          messageLink: "https://example.com",
          shareLink: "https://example.com",
        },
        whatsApp: { messageLink: "https://example.com" },
      });
  }, [referralData]);

  useEffect(() => {
    setPaginationContext({ states, callbacks });
  }, [states]);

  console.log({ referralData, states });

  return {
    states: {
      ...states,
    },
    data: {
      referralCode: "EXAMPLECODE",
      shareLink: "https://example.com",
      email: {
        messageLink: "https://example.com",
      },
      fbMessenger: {
        messageLink: "https://example.com",
        shareLink: "https://example.com",
      },
      whatsApp: { messageLink: "https://example.com" },
    },
    callbacks: {
      // onPrev: () => callbacks.setCurrentPage(states.currentPage - 1),
      // onNext: () => callbacks.setCurrentPage(states.currentPage + 1),
    },
  };
}
