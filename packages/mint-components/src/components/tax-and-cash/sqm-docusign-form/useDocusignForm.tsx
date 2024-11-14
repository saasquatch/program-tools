import {
  useMutation,
  useParent,
  useParentQueryValue,
  useParentValue,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useCallback, useEffect, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import {
  TAX_CONTEXT_NAMESPACE,
  TAX_FORM_CONTEXT_NAMESPACE,
  TaxContext,
  USER_QUERY_NAMESPACE,
  UserQuery,
} from "../sqm-tax-and-cash/data";
import { taxTypeToName, validTaxDocument } from "../utils";
import { DocusignStatus } from "./docusign-iframe/DocusignIframe";
import { DocusignForm } from "./sqm-docusign-form";

type CreateTaxDocumentQuery = {
  createImpactPublisherTaxDocument: {
    documentUrl: string;
  };
};
type CreateImpactPublisherTaxDocumentInput = {
  provider?: "DOCUSIGN" | "COMPLY_EXCHANGE";
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

type CompleteTaxDocumentMutation = {
  completeImpactPublisherTaxDocument: {
    success: boolean;
  };
};
const COMPLETE_TAX_DOCUMENT = gql`
  mutation completeImpactPublisherTaxDocument($vars: UserIdInput!) {
    completeImpactPublisherTaxDocument(user: $vars) {
      success
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

  const [
    completeTaxDocument,
    {
      loading: completeDocumentLoading,
      data: completeData,
      errors: completeErrors,
    },
  ] = useMutation<CompleteTaxDocumentMutation>(COMPLETE_TAX_DOCUMENT);

  const [docusignStatus, setDocusignStatus] =
    useState<DocusignStatus>(undefined);
  const [participantType, setParticipantType] =
    useState<ParticipantType>(undefined);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Only look at current document if it's valid (same as required type)
  const existingDocumentType =
    validTaxDocument(publisher?.requiredTaxDocumentType) &&
    publisher?.currentTaxDocument
      ? publisher?.requiredTaxDocumentType
      : undefined;

  const actualDocumentType =
    existingDocumentType ||
    getDocumentType(participantType) ||
    publisher?.requiredTaxDocumentType;

  useEffect(() => {
    if (!existingDocumentType) return;

    if (existingDocumentType === "W8BEN") {
      setParticipantType("individualParticipant");
    } else if (existingDocumentType === "W8BENE") {
      setParticipantType("businessEntity");
    }
  }, [existingDocumentType]);

  useEffect(() => {
    // Skip if no publisher info
    if (!user || !publisher) return;

    const fetchDocument = async () => {
      try {
        const result = await createTaxDocument({
          vars: {
            provider: "COMPLY_EXCHANGE",
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
        setErrors({ docusign: true });
      }
    };

    fetchDocument();
  }, [user, publisher, participantType]);

  const completeDocument = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const result = await completeTaxDocument({
        vars: {
          id: user.id,
          accountId: user.accountId,
        },
      });

      if (!result || (result as Error).message) throw new Error();
      // @ts-expect-error: no data type for result
      if (!result.completeImpactPublisherTaxDocument.success) throw new Error();
    } catch (e) {
      setErrors({ general: true });
    } finally {
      setLoading(false);
    }
  };

  const progressStep = () => {
    setStep(
      context.overrideNextStep ||
        !!publisher?.withdrawalSettings ||
        !publisher?.brandedSignup
        ? "/dashboard"
        : "/4"
    );
  };

  const allLoading = userLoading || documentLoading || loading;

  return {
    states: {
      step: step?.replace("/", ""),
      hideSteps: context.hideSteps,
      disabled: allLoading,
      participantTypeDisabled: allLoading || !!existingDocumentType,
      loading: userLoading || loading || completeDocumentLoading,
      urlLoading: documentLoading,
      loadingError: !!documentErrors?.message,
      formState: {
        participantType,
        taxFormExpired: DOCUSIGN_EXPIRED_STATES.includes(docusignStatus),
        errors,
      },
      docusignStatus,
      documentType: actualDocumentType,
      documentTypeString: taxTypeToName(actualDocumentType),
    },
    data: {
      taxForm: actualDocumentType,
      documentUrl: document?.createImpactPublisherTaxDocument?.documentUrl,
    },
    callbacks: {
      setDocusignStatus,
      completeDocument,
      progressStep,
      setParticipantType,
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
