import {
  useEngagementMedium,
  useLazyQuery,
  useMutation,
  useParentValue,
  useProgramId,
  useQuery,
  useRefreshDispatcher,
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
  textAlign?: "left" | "center" | "right";
  buttonStyle?: "icon" | "button-outside" | "button-below";
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string;
  buttonType?: "primary" | "secondary";
  copyButtonLabel?: string;
  borderColor?: string;
  existingCodeConflictErrorTitle?: string;
  existingCodeConflictErrorDescription?: string;
  invalidCharactersErrorTitle?: string;
  invalidCharactersErrorDescription?: string;
  profanityErrorTitle?: string;
  profanityErrorDescription?: string;
  editLimitText?: string;
  editLimitReachedText?: string;
  supportLinkText?: string;
  customizeDisabledTooltip?: string;
}

const MAX_EDITS = 5;
const CHARACTER_LIMIT = 15;
const MIN_CHARACTERS = 3;

const MessageLinkQuery = gql`
  query ($programId: ID) {
    user: viewer {
      ... on User {
        shareLink(programId: $programId)
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

const VALIDATE_LINK_CODE = gql`
  query validateLinkCode($linkCode: String!) {
    validateLinkCode(linkCode: $linkCode) {
      valid
      invalidReason
    }
  }
`;

const GET_LINK_DOMAIN = gql`
  query getLinkDomain {
    tenantSettings {
      primaryLinkDomain {
        host
      }
    }
  }
`;

const SHARE_LINK_EDIT_COUNT = gql`
  query shareLinkEditCount {
    viewer {
      ... on User {
        shareLinkCodes {
          totalCount
          data {
            isVanity
          }
        }
      }
    }
  }
`;

function parseShareUrl(url: string) {
  try {
    const parsed = new URL(url);
    return {
      url: parsed.origin + parsed.pathname,
      domain: parsed.origin + "/",
      path: parsed.pathname.slice(1),
    };
  } catch {
    return { url, domain: url, path: "" };
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
    { programId },
    !user?.jwt || !!props.linkOverride || contextData?.shareLink !== undefined,
  );
  const [sendLoadEvent] = useMutation(WIDGET_ENGAGEMENT_EVENT);
  const [setCopied] = useMutation(SET_CODE_COPIED);
  const [addShareLinkCode, { loading: isSaving }] =
    useMutation(ADD_SHARE_LINK_CODE);

  const [validateLinkCode] = useLazyQuery(VALIDATE_LINK_CODE);

  const { refresh } = useRefreshDispatcher();

  const { data: linkDomainData } = useQuery(
    GET_LINK_DOMAIN,
    {},
    !user?.jwt || !props.customizeUrl,
  );

  const { data: editCountData, refetch: refetchEditCount } = useQuery(
    SHARE_LINK_EDIT_COUNT,
    {},
    !user?.jwt || !props.customizeUrl,
  );

  const {
    url: copyString,
    domain: domainPrefix,
    path: pathSuffix,
  } = parseShareUrl(
    (contextData?.shareLink || data?.user?.shareLink) ??
      // Shown during loading
      "...",
  );

  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [validationError, setValidationError] =
    useState<ValidationErrorInfo | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );

  const hasPrimaryLinkDomain =
    linkDomainData?.tenantSettings?.primaryLinkDomain != null;

  const customizeDisabled = !hasPrimaryLinkDomain;

  const vanityCount =
    editCountData?.viewer?.shareLinkCodes?.data?.filter(
      (code: { isVanity: boolean }) => code.isVanity,
    ).length ?? 0;
  const editCount = vanityCount;
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
      EXISTING_CODE_CONFLICT: {
        code: "EXISTING_CODE_CONFLICT",
        title: props.existingCodeConflictErrorTitle,
        description: props.existingCodeConflictErrorDescription,
      },
      INVALID_CHARACTERS: {
        code: "INVALID_CHARACTERS",
        title: props.invalidCharactersErrorTitle,
        description: props.invalidCharactersErrorDescription,
      },
      PROFANITY: {
        code: "PROFANITY",
        title: props.profanityErrorTitle,
        description: props.profanityErrorDescription,
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
    if (limitReached || customizeDisabled) return;
    setIsEditing(true);
    setEditValue(editCount === 0 ? "" : pathSuffix);
    setValidationError(null);
  }

  function onEditValueChange(value: string) {
    const trimmed = value.slice(0, CHARACTER_LIMIT);
    setEditValue(trimmed);
    setValidationError(null);

    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);

    if (!trimmed || trimmed.length < MIN_CHARACTERS) {
      setIsValidating(false);
      return;
    }

    setIsValidating(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const result = await validateLinkCode({ linkCode: trimmed });
        if (!result?.validateLinkCode?.valid) {
          const reason = result?.validateLinkCode
            ?.invalidReason as ValidationErrorCode;
          setValidationError(mapErrorCodeToInfo(reason));
        }
      } catch {
        // Validation query failed — don't block the user
      }
      setIsValidating(false);
    }, 2000);
  }

  async function onSave() {
    if (
      !editValue ||
      editValue.length < MIN_CHARACTERS ||
      validationError ||
      isValidating
    )
      return;

    try {
      await addShareLinkCode({
        addShareLinkCodeInput: {
          userId: user?.id,
          accountId: user?.accountId,
          programId,
          linkCode: editValue,
          makeShareLinkCodePrimaryForReferralCode: true,
        },
      });

      setIsEditing(false);
      await Promise.all([refetch(), refetchEditCount()]);
      refresh();
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
    isEditing,
    editValue,
    domainPrefix,
    editsRemaining,
    maxEdits: MAX_EDITS,
    limitReached,
    validationError,
    isValidating,
    isSaving,
    characterLimit: CHARACTER_LIMIT,
    minCharacters: MIN_CHARACTERS,
    charactersRemaining: CHARACTER_LIMIT - editValue.length,
    editLimitText: props.editLimitText,
    editLimitReachedText: props.editLimitReachedText,
    supportLinkText: props.supportLinkText,
    customizeDisabled,
    customizeDisabledTooltip: props.customizeDisabledTooltip,
    onCustomizeClick,
    onEditValueChange,
    onSave,
    onCancel,
  };
}
