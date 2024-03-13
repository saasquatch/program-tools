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
import { taxTypeToName } from "../utils";
import { DocusignStatus } from "./docusign-iframe/DocusignIframe";
import { DocusignForm } from "./sqm-docusign-form";

type CreateTaxDocumentQuery = {
  createImpactPublisherTaxDocument: {
    documentUrl: string;
  };
};
type CreateImpactPublisherTaxDocumentInput = {
  isBusinessEntity?: boolean;
  user: {
    id: string;
    accountId: string;
  };
};

export type ParticipantType =
  | "individualParticipant"
  | "businessEntity"
  | undefined;
const GET_TAX_DOCUMENT = gql`
  mutation createImpactPublisherTaxDocument(
    $vars: CreateImpactPublisherTaxDocumentInput!
  ) {
    createImpactPublisherTaxDocument(
      createImpactPublisherTaxDocumentInput: $vars
    ) {
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

  const context = useParentValue<TaxContext>(TAX_FORM_CONTEXT_NAMESPACE);
  const [step, setStep] = useParent<string>(TAX_CONTEXT_NAMESPACE);

  const {
    data,
    loading: userLoading,
    refetch,
  } = useParentQueryValue<UserQuery>(USER_QUERY_NAMESPACE);
  const publisher = data?.user?.impactConnection?.publisher;
  const [
    createTaxDocument,
    { loading: documentLoading, data: document, errors: documentErrors },
  ] = useMutation<CreateTaxDocumentQuery>(GET_TAX_DOCUMENT);

  const [docusignStatus, setDocusignStatus] =
    useState<DocusignStatus>(undefined);
  const [participantType, setParticipantType] =
    useState<ParticipantType>(undefined);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const existingDocumentType = publisher?.currentTaxDocument?.type;

  const actualDocumentType =
    existingDocumentType ||
    getDocumentType(participantType) ||
    publisher?.requiredTaxDocumentType;

  useEffect(() => {
    if (!publisher?.currentTaxDocument?.type) return;

    const type = publisher.currentTaxDocument.type;
    if (type === "W8BEN") {
      setParticipantType("individualParticipant");
    } else if (type === "W8BENE") {
      setParticipantType("businessEntity");
    }
  }, [publisher]);

  useEffect(() => {
    if (!user || !publisher) return;

    const fetchDocument = async () => {
      try {
        const result = await createTaxDocument({
          vars: {
            user: {
              id: user.id,
              accountId: user.accountId,
            },
            ...(participantType
              ? { isBusinessEntity: participantType === "businessEntity" }
              : {}),
          } as CreateImpactPublisherTaxDocumentInput,
        });

        if (!result || (result as Error).message) throw new Error();
      } catch (e) {
        setErrors({ general: true });
      }
    };

    fetchDocument();
  }, [user, publisher, participantType]);

  useEffect(() => {
    // Handled in view
    if (DOCUSIGN_ERROR_STATES.includes(docusignStatus)) return;

    if (DOCUSIGN_SUCCESS_STATES.includes(docusignStatus)) {
      setStep("/4");
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

    try {
      setLoading(true);

      const result = await refetch();
      if ((result as Error).message) throw new Error();

      const publisher = (result as UserQuery).user?.impactConnection?.publisher;
      const status = publisher?.currentTaxDocument?.status;

      if (status === "NOT_VERIFIED" || status === "ACTIVE") {
        console.debug("Document has been registered as submitted");
      }

      // Skip banking info form if it already is saved
      if (publisher?.withdrawalSettings) {
        setStep(context.overrideNextStep || "/dashboard");
      } else {
        setStep(context.overrideNextStep || "/4");
      }
    } catch (e) {
      setErrors({ formSubission: { status: "document-error" } });
    } finally {
      setLoading(false);
    }
  };

  const onBack = () => {
    setStep(context.overrideBackStep);
  };

  const allLoading = userLoading || documentLoading || loading;

  return {
    states: {
      step: step?.replace("/", ""),
      hideSteps: context.hideSteps,
      disabled: allLoading,
      participantTypeDisabled: allLoading || !!existingDocumentType,
      submitDisabled: !formSubmitted,
      loading: userLoading || loading,
      urlLoading: documentLoading,
      formState: {
        participantType,
        completedTaxForm: formSubmitted,
        taxFormExpired: DOCUSIGN_EXPIRED_STATES.includes(docusignStatus),
        errors,
      },
      docusignStatus,
      documentType: actualDocumentType,
      documentTypeString: taxTypeToName(actualDocumentType),
      hideBackButton: !context.overrideBackStep,
    },
    data: {
      taxForm: actualDocumentType,
      documentUrl: document?.createImpactPublisherTaxDocument?.documentUrl,
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
