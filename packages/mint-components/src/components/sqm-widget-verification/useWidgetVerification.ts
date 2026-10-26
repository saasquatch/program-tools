import {
  useLazyQuery,
  useParentState,
  useSetParent,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { getVerificationStep, VerificationViewer } from "./getVerificationStep";
import {
  PARTNER_CREATED_NAMESPACE,
  SHOW_CODE_NAMESPACE,
  SHOW_PARTNER_MODAL_NAMESPACE,
  VERIFICATION_EMAIL_NAMESPACE,
  VERIFICATION_PARENT_NAMESPACE,
} from "./keys";

const USER_LOOKUP = gql`
  query checkUserVerification {
    viewer {
      ... on User {
        id
        accountId
        email
        emailVerified
        managedIdentity {
          email
          emailVerified
        }
        impactConnection {
          connected
        }
        cashRewards: rewards(
          limit: 1
          filter: {
            rewardedCash_eq: true
            statuses_nin: [{ status: CANCELLED }, { status: EXPIRED }]
          }
        ) {
          totalCount
        }
      }
    }
  }
`;

export interface WidgetVerificationProps {
  showCode: boolean;
  showPartnerModal: boolean;
  onVerification: () => void;
  onPartnerModalComplete: () => void;
  onInitialFocus?: (e: any) => void;
  loading: boolean;
}

export function useWidgetVerification(): WidgetVerificationProps {
  const [showCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
  });

  useParentState<string | undefined>({
    namespace: VERIFICATION_EMAIL_NAMESPACE,
    initialValue: undefined,
  });

  const setContext = useSetParent(VERIFICATION_PARENT_NAMESPACE);
  const [loading, setLoading] = useState(true);
  const [showPartnerModal, setShowPartnerModal] = useParentState<boolean>({
    namespace: SHOW_PARTNER_MODAL_NAMESPACE,
    initialValue: false,
  });

  const [partnerCreated, setPartnerCreated] = useParentState<boolean>({
    namespace: PARTNER_CREATED_NAMESPACE,
    initialValue: false,
  });
  const [fetch] = useLazyQuery(USER_LOOKUP);
  const [viewer, setViewer] = useState<VerificationViewer | undefined>(
    undefined
  );

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch({});
        if (!res || res instanceof Error) throw new Error();

        setViewer(res.viewer);
        const step = getVerificationStep(res.viewer);
        if (step === "content") setContext(true);
        else if (step === "partner") setShowPartnerModal(true);
      } catch (e) {
        console.error("Could not fetch user information:", e);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const onVerification = () => {
    const step = getVerificationStep({ ...viewer, emailVerified: true });
    if (step === "partner") setShowPartnerModal(true);
    else setContext(true);
  };

  const onPartnerModalComplete = () => {
    setShowPartnerModal(false);
    // Reset the latch so a later partner creation can re-trigger this effect
    setPartnerCreated(false);
    setContext(true);
  };

  // The modal signals completion by flipping partnerCreated; advance the flow here
  useEffect(() => {
    if (partnerCreated) onPartnerModalComplete();
  }, [partnerCreated]);

  return {
    showCode,
    showPartnerModal,
    onVerification,
    onPartnerModalComplete,
    loading,
  };
}
