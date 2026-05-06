import {
  useLazyQuery,
  useParentState,
  useSetParent,
} from "@saasquatch/component-boilerplate";
import { useState } from "@saasquatch/stencil-hooks";
import { useEffect } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import {
  PARTNER_CREATED_NAMESPACE,
  SHOW_CODE_NAMESPACE,
  SHOW_PARTNER_MODAL_NAMESPACE,
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
      }
    }
  }
`;

export function useWidgetVerification() {
  const [showCode] = useParentState<boolean>({
    namespace: SHOW_CODE_NAMESPACE,
    initialValue: false,
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

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await fetch({});
        if (!res || res instanceof Error) throw new Error();

        // Flow changed to send email -> verify code -> show early partner creation modal
        const emailVerified =
          res?.viewer?.emailVerified ||
          res?.viewer?.managedIdentity?.emailVerified;
        const isConnected = res?.viewer?.impactConnection?.connected;

        if (isConnected) {
          // Partner already created, show widget content
          setContext(true);
        } else if (emailVerified) {
          // Email verified but no partner yet, show partner modal
          setShowPartnerModal(true);
        }
      } catch (e) {
        console.error("Could not fetch user information:", e);
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  const onVerification = () => {
    setShowPartnerModal(true);
  };

  const onPartnerModalComplete = () => {
    setShowPartnerModal(false);
    setPartnerCreated(false);
    setContext(true);
  };

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
