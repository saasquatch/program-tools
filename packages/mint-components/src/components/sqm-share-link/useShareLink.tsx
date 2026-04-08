import {
  useEngagementMedium,
  useMutation,
  useParentValue,
  useProgramId,
  useQuery,
  useUserIdentity,
} from "@saasquatch/component-boilerplate";
import { useRef, useState } from "@saasquatch/universal-hooks";
import { gql } from "graphql-request";
import {
  REFERRAL_CODES_NAMESPACE,
  ReferralCodeContext,
  SET_CODE_COPIED,
} from "../sqm-referral-codes/useReferralCodes";
import {
  ShareLinkViewProps,
  ValidationErrorCode,
  ValidationErrorInfo,
} from "./sqm-share-link-view";

export interface ShareLinkProps {
  programId?: string;
  tooltiptext: string;
  tooltiplifespan: number;
  linkOverride?: string;
  customizeUrl?: boolean;
  customizeUrlText?: string;
  customizeLinkLabel?: string;
  saveLabelText?: string;
  cancelLabelText?: string;
  successMessage?: string;
  textAlign?: "left" | "center" | "right";
  buttonStyle?: "icon" | "button-outside" | "button-below";
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  buttonType?: "primary" | "secondary";
  copyButtonLabel?: string;
  borderColor?: string;
  linkTakenErrorTitle?: string;
  linkTakenErrorDescription?: string;
  invalidSymbolsErrorTitle?: string;
  invalidSymbolsErrorDescription?: string;
  restrictedWordErrorTitle?: string;
  restrictedWordErrorDescription?: string;
  editLimitText?: string;
}

const MAX_EDITS = 5;
const CHARACTER_LIMIT = 15;

const MessageLinkQuery = gql`
  query ($programId: ID, $engagementMedium: UserEngagementMedium!) {
    user: viewer {
      ... on User {
        shareLink(
          programId: $programId
          engagementMedium: $engagementMedium
          shareMedium: DIRECT
        )
      }
    }
  }
`;

const WIDGET_ENGAGEMENT_EVENT = gql`
  mutation loadEvent($eventMeta: UserAnalyticsEvent!) {
    createUserAnalyticsEvent(eventMeta: $eventMeta)
  }
`;

const ADD_SHARE_LINK_CODE = gql`
  mutation ($addShareLinkCodeInput: AddShareLinkCodeInput!) {
    addShareLinkCode(addShareLinkCodeInput: $addShareLinkCodeInput) {
      linkCode {
        linkCode
        shortUrl
        referralCode {
          code
        }
      }
    }
  }
`;

// TODO: Replace with actual validation query when backend is ready
const VALIDATE_LINK_CODE = gql`
  query validateLinkCode($linkCode: String!, $programId: ID) {
    validateShareLinkCode(linkCode: $linkCode, programId: $programId) {
      valid
      message
    }
  }
`;

// TODO: Replace with actual edit count query when backend is ready
const SHARE_LINK_EDIT_COUNT = gql`
  query shareLinkEditCount($programId: ID) {
    viewer {
      ... on User {
        shareLinkCodeCount(programId: $programId)
      }
    }
  }
`;

function parseDomainPrefix(url: string): string {
  try {
    const parsed = new URL(url);
    return parsed.origin + "/";
  } catch {
    return url;
  }
}

function parsePathSuffix(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove leading slash
    return parsed.pathname.slice(1) + parsed.search + parsed.hash;
  } catch {
    return "";
  }
}

export function useShareLink(props: ShareLinkProps): ShareLinkViewProps {
  const { programId = useProgramId() } = props;
  const user = useUserIdentity();
  const engagementMedium = useEngagementMedium();

  const contextData = useParentValue<ReferralCodeContext>(
    REFERRAL_CODES_NAMESPACE,
  );

  const { data, refetch } = useQuery(
    MessageLinkQuery,
    { programId, engagementMedium },
    !user?.jwt || !!props.linkOverride || contextData?.shareLink !== undefined,
  );
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);
  const [setCopied] = useMutation(SET_CODE_COPIED);
  const [addShareLinkCode, { loading: isSaving }] =
    useMutation(ADD_SHARE_LINK_CODE);

  // TODO: Wire up when backend query is ready
  const { data: editCountData } = useQuery(
    SHARE_LINK_EDIT_COUNT,
    { programId },
    !user?.jwt || !props.customizeUrl,
  );

  const copyString =
    (contextData?.shareLink || data?.user?.shareLink) ??
    // Shown during loading
    "...";

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [validationError, setValidationError] =
    useState<ValidationErrorInfo | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const domainPrefix = parseDomainPrefix(copyString);

  // TODO: Replace with actual data from editCountData when backend is ready
  const editCount = editCountData?.viewer?.shareLinkCodeCount ?? 0;
  const editsRemaining = Math.max(0, MAX_EDITS - editCount);
  const limitReached = editsRemaining <= 0;

  function mapErrorCodeToInfo(
    errorCode: ValidationErrorCode,
  ): ValidationErrorInfo | null {
    if (!errorCode) return null;
    const errorMap: Record<
      NonNullable<ValidationErrorCode>,
      ValidationErrorInfo
    > = {
      LINK_TAKEN: {
        code: "LINK_TAKEN",
        title: props.linkTakenErrorTitle,
        description: props.linkTakenErrorDescription,
      },
      INVALID_SYMBOLS: {
        code: "INVALID_SYMBOLS",
        title: props.invalidSymbolsErrorTitle,
        description: props.invalidSymbolsErrorDescription,
      },
      RESTRICTED_WORD: {
        code: "RESTRICTED_WORD",
        title: props.restrictedWordErrorTitle,
        description: props.restrictedWordErrorDescription,
      },
    };
    return errorMap[errorCode];
  }

  async function onClick() {
    if (contextData) {
      await setCopied({ referralCode: contextData.referralCode });
      contextData.refresh();
    }

    // Should well supported: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard#browser_compatibility
    // Only if called from a user-initiated event
    navigator.clipboard.writeText(copyString);
    setOpen(true);
    setTimeout(() => setOpen(false), props.tooltiplifespan);
    sendLoadEvent({
      eventMeta: {
        programId,
        id: user?.id,
        accountId: user?.accountId,
        type: "USER_REFERRAL_PROGRAM_ENGAGEMENT_EVENT",
        meta: {
          engagementMedium,
          shareMedium: "DIRECT",
        },
      },
    });
  }

  function onCustomizeClick() {
    if (limitReached) return;
    setIsEditing(true);
    setEditValue(parsePathSuffix(copyString));
    setValidationError(null);
  }

  function onEditValueChange(value: string) {
    const trimmed = value.slice(0, CHARACTER_LIMIT);
    setEditValue(trimmed);
    setValidationError(null);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!trimmed) {
      setIsValidating(false);
      return;
    }

    setIsValidating(true);
    debounceTimerRef.current = setTimeout(async () => {
      // TODO: Call actual validation query when backend is ready
      // Example: const result = await validateLinkCode({ linkCode: trimmed, programId });
      // if (!result?.validateShareLinkCode?.valid) {
      //   setValidationError(mapErrorCodeToInfo(result.validateShareLinkCode.errorCode));
      // }
      setIsValidating(false);
    }, 2000);
  }

  async function onSave() {
    if (!editValue || validationError || isValidating) return;

    try {
      await addShareLinkCode({
        addShareLinkCodeInput: {
          userId: user?.id,
          accountId: user?.accountId,
          programId,
          linkCode: editValue,
        },
      });

      setIsEditing(false);
      setShowSuccess(true);
      await refetch();
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      const errorCode = e?.extensions?.code as ValidationErrorCode;
      setValidationError(
        mapErrorCodeToInfo(errorCode) ?? {
          code: null,
          title: "Error",
          description:
            e?.message || "Failed to save custom link. Please try again.",
        },
      );
    }
  }

  function onCancel() {
    setIsEditing(false);
    setEditValue("");
    setValidationError(null);
    setIsValidating(false);
  }

  return {
    copyTextViewProps: {
      ...props,
      onClick,
      open,
      copyString,
    },
    customizeUrl: props.customizeUrl,
    customizeLinkLabel: props.customizeLinkLabel,
    saveLabelText: props.saveLabelText,
    cancelLabelText: props.cancelLabelText,
    successMessage: props.successMessage,
    isEditing,
    editValue,
    domainPrefix,
    editsRemaining,
    maxEdits: MAX_EDITS,
    limitReached,
    validationError,
    isValidating,
    isSaving,
    showSuccess,
    characterLimit: CHARACTER_LIMIT,
    charactersRemaining: CHARACTER_LIMIT - editValue.length,
    editLimitText: props.editLimitText,
    onCustomizeClick,
    onEditValueChange,
    onSave,
    onCancel,
  };
}
