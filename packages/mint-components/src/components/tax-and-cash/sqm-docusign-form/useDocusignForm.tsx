import {
  useMutation,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import { useParentQueryValue } from "../../../utils/useParentQuery";
import { useParent, useParentValue } from "../../../utils/useParentState";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { DocusignStatus } from "./docusign-iframe/DocusignIframe";
import { DocusignForm } from "./sqm-docusign-form";

type CreateTaxDocumentQuery = {
  createImpactPartnerTaxDocument: {
    documentUrl: string;
  };
};

export type ParticipantType =
  | "individualParticipant"
  | "businessEntity"
  | undefined;
const GET_TAX_DOCUMENT = gql`
  mutation createImpactPartnerTaxDocument(
    $vars: CreateImpactPartnerTaxDocumentInput!
  ) {
    createImpactPartnerTaxDocument(createImpactPartnerTaxDocumentInput: $vars) {
      documentUrl
    }
  }
`;

export const DOCUSIGN_ERROR_STATES = [
  "exception",
  "decline",
  "cancel",
  "fax_pending",
];
export const DOCUSIGN_EXPIRED_STATES = ["ttl_expired", "session_timeout"];
export const DOCUSIGN_SUCCESS_STATES = ["signing_complete", "viewing_complete"];

export function useDocusignForm(props: DocusignForm) {
  const user = useUserIdentity();
  const [path, setPath] = useParent<string>(TAX_CONTEXT_NAMESPACE);
  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const {
    data,
    loading: userLoading,
    refetch,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const [docusignStatus, setDocusignStatus] =
    useState<DocusignStatus>(undefined);

  const [participantType, setParticipantType] =
    useState<ParticipantType>(undefined);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const existingDocumentType =
    data?.user?.impactPartner?.currentTaxDocument?.type || // Then current form (could be different than required)
    data?.user?.impactPartner?.requiredTaxDocumentType; // Last, the required tax form

  const [
    createTaxDocument,
    { loading: documentLoading, data: document, errors: documentErrors },
  ] = useMutation<CreateTaxDocumentQuery>(GET_TAX_DOCUMENT);

  const actualDocumentType =
    existingDocumentType || getDocumentType(participantType);

  useEffect(() => {
    if (!data?.user?.impactPartner?.currentTaxDocument?.type) return;

    const type = data.user.impactPartner.currentTaxDocument.type;
    console.log({ type });
    if (type === "W8BEN") {
      setParticipantType("individualParticipant");
    } else if (type === "W8BENE") {
      setParticipantType("businessEntity");
    }
  }, [data?.user?.impactPartner]);

  useEffect(() => {
    if (!user) return;
    if (!actualDocumentType) return;

    const fetchDocument = async () => {
      try {
        const result = await createTaxDocument({
          vars: {
            userId: user.id,
            accountId: user.accountId,
            taxDocumentType: actualDocumentType,
          },
        });

        if (!result || (result as Error).message) throw new Error();
      } catch (e) {
        setErrors({ general: true });
      }
    };

    fetchDocument();
  }, [user, actualDocumentType]);

  useEffect(() => {
    // Handled in view
    if (DOCUSIGN_ERROR_STATES.includes(docusignStatus)) return;

    if (DOCUSIGN_SUCCESS_STATES.includes(docusignStatus)) {
      setPath("/submitted");
    }

    if (DOCUSIGN_ERROR_STATES.includes(docusignStatus)) {
      setErrors({
        docusign: true,
      });
    }
  }, [docusignStatus]);

  const onSubmit = async () => {
    if (!formSubmitted) {
      setErrors({ submitCheckbox: true });
      return;
    }

    // TODO: Check document is actually registered in the backend
    try {
      setLoading(true);

      const result = await refetch();
      if ((result as Error).message) throw new Error();

      const status = (result as UserQuery).user?.impactPartner
        ?.currentTaxDocument?.status;

      // TODO : Confirm behaviour
      if (status === "NOT_VERIFIED" || status === "ACTIVE") {
        console.log("Document has been registered as submitted");
      }

      setPath(context.overrideNextStep || "/submitted");
    } catch (e) {
      setErrors({ formSubission: { status: "document-error" } });
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setPath(context.overrideBackStep);
  };

  const allLoading = userLoading || documentLoading || loading;

  return {
    states: {
      hideSteps: context.hideSteps,
      disabled: allLoading,
      participantTypeDisabled: allLoading || !!existingDocumentType,
      submitDisabled: !formSubmitted,
      loading: allLoading,
      formState: {
        //AL: hooks todo
        participantType,
        completedTaxForm: formSubmitted,
        taxFormExpired: false, // TODO: Unhardcode this
        errors,
      },
      docusignStatus,
      documentType: actualDocumentType,
      hideBackButton: !context.overrideBackStep,
    },
    data: {
      taxForm: actualDocumentType,
      documentUrl: document?.createImpactPartnerTaxDocument?.documentUrl,
    },
    callbacks: {
      onSubmit,
      setDocusignStatus,
      setParticipantType,
      toggleFormSubmitted: () => setFormSubmitted((x) => !x),
      onBack,
    },
    text: props.getTextProps(),
  };
}

export type UseDocusignFormResult = ReturnType<typeof useDocusignForm>;

function getDocumentType(p: ParticipantType) {
  if (p === "businessEntity") return "W8BENE";
  if (p === "individualParticipant") return "W8BEN";
  else return undefined;
}
