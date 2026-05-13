@author:derek @owner:derek
Feature: Referral Table Rewards Cell
  Renders the rewards earned for each referral as an `<sl-details>` block.
  Each reward shows:
    - the reward value (e.g. "$50.00") in the summary
    - a coloured badge "pill" with status text
    - optionally a second "info" pill (only for AVAILABLE rewards with an expiry)
    - a description body that is a STACK of zero or more conditional lines:
        1. a state-specific status line  (only for some states)
        2. a "reward received" line      (only when reward.dateGiven is set)
        3. a fuel-tank code line         (only when reward.fuelTankCode is set)
  The state shown is computed by `getState()` from:
    1. the referral's fraud moderation status,
    2. the user's Impact tax/payout connection (taxConnection prop),
    3. the reward's PartnerFundsTransfer (PFT),
    4. the reward's `pendingReasons` (US_TAX, MISSING_PAYOUT_CONFIGURATION),
    5. the reward's `statuses` array (fallback).

  Background:
    Given the user is viewing the referral table
    And each row may show one or more rewards via sqm-referral-table-rewards-cell
    And the reward value is always shown in the summary as the bold prettyValue (e.g. "$50.00")
  # ============================================================
  # 1. CELL CONFIGURATION (every prop in isolation)
  # ============================================================

  @motivating @ui
  Scenario: hideDetails=true hides the disclosure caret and disables expansion
    Given the "hide-details" prop is true
    When the cell is rendered
    Then the sl-details summary-icon is set to display:none
    And the sl-details element is rendered with the disabled attribute
    And the summary cursor style is "default"

  @motivating @ui
  Scenario: hideDetails=false (default) shows the disclosure caret and allows expansion
    Given the "hide-details" prop is false
    When the cell is rendered
    Then the sl-details summary-icon is set to display:flex
    And the summary cursor style is "pointer"

  @minutia @ui
  Scenario Outline: rewardReceivedText prop drives the reward-received line
    Given a reward with dateGiven Jan 1, 2026
    And the "reward-received-text" prop is "<value>"
    When the cell is rendered
    Then the description body contains "<value> Jan 1, 2026" with "Jan 1, 2026" rendered in bold

    Examples:
      | value          |
      | Reward given   |
      | You earned on  |
      | (empty string) |

  @minutia @ui
  Scenario Outline: expiringText prop drives the AVAILABLE info pill
    Given an AVAILABLE reward with dateExpires Aug 31, 2026
    And the current date is May 7, 2026
    And the "expiring-text" prop is "<value>"
    When the cell is rendered
    Then the second info pill text is exactly "<rendered>"

    Examples:
      | value    | rendered           |
      | Expiring | Expiring 3 months  |
      | Expires  | Expires 3 months   |
      | (unset)  | undefined 3 months |

  @minutia @ui
  Scenario Outline: pendingForText prop drives the badge text for PENDING+dateScheduledFor
    Given a PENDING reward with dateScheduledFor Aug 31, 2026
    And the current date is May 7, 2026
    And the "pending-for-text" prop is "<value>"
    When the cell is rendered
    Then the primary badge text is exactly "<rendered>"

    Examples:
      | value               | rendered             |
      | {status} for {date} | Pending for 3 months |
      | Available {date}    | Available 3 months   |

  @motivating @ui
  Scenario: deniedHelpText prop is appended to the DENIED description with a leading space
    Given a DENIED reward with referral.dateModerated Jan 1, 2026
    And the "denied-help-text" prop is "Contact support if you believe this is an error."
    When the cell is rendered
    Then the description body contains "Denied on Jan 1, 2026. Contact support if you believe this is an error."

  @motivating @ui
  Scenario: deniedHelpText prop omitted leaves the DENIED description with only the trailing period
    Given a DENIED reward with referral.dateModerated Jan 1, 2026
    And the "denied-help-text" prop is unset
    When the cell is rendered
    Then the description body contains "Denied on Jan 1, 2026."
    And the description body does NOT contain any text after that period

  @motivating @ui
  Scenario: fuelTankText prop drives the fuel-tank line
    Given a reward with fuelTankCode "ABC-123"
    And the "fuel-tank-text" prop is "Your code:"
    When the cell is rendered
    Then the description body contains "Your code: ABC-123" with "ABC-123" rendered in bold

  @minutia @ui
  Scenario: locale prop changes the date formatter and relative time formatter
    Given the "locale" prop is set to a supported locale
    Then every Luxon date is formatted using `luxonLocale(locale)` with `DateTime.DATE_MED`
    And every relative time uses `DateTime.toRelative()` with the same locale, with the leading "in " stripped
    And every prop-driven message string is run through `intl.formatMessage`
  # ============================================================
  # 2. STATE PRECEDENCE LADDER
  # `getState()` walks the rules below from top to bottom and returns
  # at the FIRST matching rule. Note: rules 3a and 3b (cash-reward payout-
  # setup gate) fire BEFORE any PFT branch, so they suppress PFT-derived
  # PROCESSING / PAYOUT_APPROVED states whenever the user has a cash
  # reward but has not finished tax/payout setup (either not connected at
  # all, or connected without withdrawalSettings). For cash rewards,
  # PAYOUT_CANCELLED (REVERSED) and PAYOUT_FAILED (OVERDUE) are
  # unreachable past rules 3a/3b when those gates fire.
  # ============================================================

  @motivating
  Scenario: State precedence ladder
    Given a reward, its referral's fraud state, and the user's tax connection
    Then <rule> is produced
    And the <resultingStatus>, <resultingBadgeText>, and <resultingDescription> is determined in the following order:
      | order | rule                                                                                                                                                                               | resulting state          | resulting badge text                                                       | resulting description body                                                     |
      |     1 | referral.fraudData.moderationStatus is "DENIED"                                                                                                                                    | DENIED                   | Denied                                                                     | Denied on Jan 1, 2026. Contact support.                                        |
      |     2 | referral.fraudData.moderationStatus is "PENDING"                                                                                                                                   | PENDING_REVIEW           | Pending                                                                    | Pending since Jan 1, 2026                                                      |
      |     3 | reward.rewardedCash is true AND impactConnection is NOT connected                                                                                                                  | PENDING_PARTNER_CREATION | Pending                                                                    | Complete your tax and cash payout setup to receive your rewards                |
      |     4 | reward.rewardedCash is true AND impactConnection is connected AND publisher.withdrawalSettings is missing                                                                          | PENDING_PARTNER_CREATION | Pending                                                                    | Complete your tax and cash payout setup to receive your rewards                |
      |     5 | partnerFundsTransfer.status is "REVERSED"                                                                                                                                          | PAYOUT_CANCELLED         | Payout Cancelled                                                           | If you think this is a mistake, contact our Support team.                      |
      |     6 | partnerFundsTransfer.status is "OVERDUE"                                                                                                                                           | PAYOUT_FAILED            | Payout Failed                                                              | Payout failed due to a fulfillment issue and is currently being retried.       |
      |     7 | partnerFundsTransfer.dateScheduled is in the future                                                                                                                                | PROCESSING               | Payment Processing                                                         | Processing until Jan 1, 2026. Payout is then scheduled based on your settings. |
      |     8 | partnerFundsTransfer.status is "TRANSFERRED" / "NOT_YET_DUE", or dateScheduled has passed without REVERSED/OVERDUE                                                                 | PAYOUT_APPROVED          | Payout Approved                                                            | Processing until Jan 1, 2026. Payout is then scheduled based on your settings. |
      |     9 | reward.pendingReasons includes "US_TAX" AND impactConnection.taxHandlingEnabled is false                                                                                           | PENDING                  | Pending                                                                    | Available on Jan 1, 2026 (if dateScheduledFor set; else no body line)          |
      |    10 | reward.pendingReasons includes "US_TAX" AND impactConnection.connected is false                                                                                                    | PENDING_PARTNER_CREATION | Pending                                                                    | Complete your tax and cash payout setup to receive your rewards                |
      |    11 | reward.pendingReasons includes "US_TAX" AND publisher.requiredTaxDocumentType is set AND publisher.currentTaxDocument is missing                                                   | PENDING_TAX_SUBMISSION   | Pending                                                                    | Submit your tax documents to receive your rewards                              |
      |    12 | reward.pendingReasons includes "US_TAX" AND publisher.currentTaxDocument.status is "INACTIVE" / "INVALID_W9_ELECTRONIC_DOCUMENT" / "INVALID_W9_ELECTRONIC_DOCUMENT_CHECK_INTERNAL" | PENDING_NEW_TAX_FORM     | Pending                                                                    | Invalid tax form. Submit a new form to receive your rewards.                   |
      |    13 | reward.pendingReasons includes "US_TAX" AND publisher.currentTaxDocument.status is "NOT_VERIFIED"                                                                                  | PENDING_TAX_REVIEW       | Pending                                                                    | Awaiting tax form review                                                       |
      |    14 | reward.pendingReasons includes "US_TAX" AND publisher.currentTaxDocument.status is "ACTIVE" AND publisher.withdrawalSettings missing                                               | PENDING_PARTNER_CREATION | Pending                                                                    | Complete your tax and cash payout setup to receive your rewards                |
      |    15 | reward.pendingReasons includes "MISSING_PAYOUT_CONFIGURATION"                                                                                                                      | PENDING_PARTNER_CREATION | Pending                                                                    | Complete your tax and cash payout setup to receive your rewards                |
      |    16 | statuses includes "REDEEMED"                                                                                                                                                       | REDEEMED                 | Redeemed                                                                   | (no state-specific body line)                                                  |
      |    17 | statuses includes "CANCELLED"                                                                                                                                                      | CANCELLED                | Cancelled                                                                  | Reward cancelled on Jan 1, 2026                                                |
      |    18 | statuses includes "EXPIRED"                                                                                                                                                        | EXPIRED                  | Expired                                                                    | Reward expired on Jan 1, 2026                                                  |
      |    19 | statuses includes "PENDING"                                                                                                                                                        | PENDING                  | Pending  (or "Pending for {date}" overlay if dateScheduledFor set)         | Available on Jan 1, 2026 (if dateScheduledFor set; else no body line)          |
      |    20 | statuses includes "AVAILABLE"                                                                                                                                                      | AVAILABLE                | Available  (plus info pill "{expiringText} {relative}" if dateExpires set) | Reward expiring on Jan 1, 2026                                                 |

  @motivating
  Scenario: Cash reward with connected partner but no withdrawal settings overrides any PFT-derived state
    Given a cash reward (reward.rewardedCash is true) with partnerFundsTransfer status "TRANSFERRED" and dateScheduled in the past
    And taxConnection.connected is true
    And taxConnection.publisher.withdrawalSettings is missing
    When the cell is rendered
    Then the resulting state is PENDING_PARTNER_CREATION

  @motivating
  Scenario: Cash reward with no impact connection overrides any PFT-derived state
    Given a cash reward (reward.rewardedCash is true) with partnerFundsTransfer status "TRANSFERRED" and dateScheduled in the past
    And taxConnection.connected is false
    When the cell is rendered
    Then the resulting state is PENDING_PARTNER_CREATION

  @motivating
  Scenario: Non-cash reward skips the payout-setup gate
    Given a non-cash reward (reward.rewardedCash is false) with reward.statuses ["AVAILABLE"]
    And taxConnection.connected is false
    When the cell is rendered
    Then the resulting state is AVAILABLE

  @minutia
  Scenario: Connected partner with no withdrawal settings does NOT override fraud states
    Given a reward whose referral.fraudData.moderationStatus is "DENIED"
    And taxConnection.connected is true
    And taxConnection.publisher.withdrawalSettings is missing
    When the cell is rendered
    Then the resulting state is DENIED
  # ============================================================
  # 3. STATE → BADGE COLOUR (`getSLBadgeType`)
  # ============================================================

  @motivating @ui
  Scenario Outline: Each state maps to a Shoelace badge type
    Given a reward whose computed state is "<state>"
    When the cell is rendered
    Then the primary pill is rendered with type "<slBadgeType>"
    And the primary pill is rendered with the "<cssClass>" CSS class
    # CSS class applied: primary→RedeemBadge, danger→DangerBadge,
    # warning→WarningBadge, success→SuccessBadge, info→WarningBadge.
    # Note: getSLBadgeType returns undefined for any state outside the cases
    # below; the resulting CSS class then defaults to WarningBadge.

    Examples:
      | state                    | slBadgeType | cssClass     |
      | REDEEMED                 | primary     | RedeemBadge  |
      | PAYOUT_APPROVED          | primary     | RedeemBadge  |
      | DENIED                   | danger      | DangerBadge  |
      | EXPIRED                  | danger      | DangerBadge  |
      | CANCELLED                | danger      | DangerBadge  |
      | PAYOUT_FAILED            | danger      | DangerBadge  |
      | PAYOUT_CANCELLED         | danger      | DangerBadge  |
      | PENDING                  | warning     | WarningBadge |
      | PENDING_REVIEW           | warning     | WarningBadge |
      | PENDING_TAX_REVIEW       | warning     | WarningBadge |
      | PENDING_NEW_TAX_FORM     | warning     | WarningBadge |
      | PENDING_TAX_SUBMISSION   | warning     | WarningBadge |
      | PENDING_PARTNER_CREATION | warning     | WarningBadge |
      | PROCESSING               | warning     | WarningBadge |
      | AVAILABLE                | success     | SuccessBadge |
      | (empty string "")        | undefined   | WarningBadge |
      | (any unknown string)     | undefined   | WarningBadge |
  # ============================================================
  # 4. PRIMARY BADGE TEXT
  # The primary badge ALWAYS renders. Its text comes from one of two paths:
  #   - "pendingFor" overlay: state==="PENDING" AND reward.dateScheduledFor truthy
  #   - default: intl.formatMessage(statusText, {status: state})
  # The default `statusText` ICU message maps every state below.
  # ============================================================

  @motivating @ui
  Scenario Outline: Default primary badge text per state (no PENDING+dateScheduledFor overlay)
    Given a reward whose computed state is "<state>"
    And NOT (state is PENDING and reward.dateScheduledFor is set)
    And the "status-text" prop is the default
    When the cell is rendered
    Then the primary badge text is exactly "<text>"

    Examples:
      | state                    | text               |
      | AVAILABLE                | Available          |
      | CANCELLED                | Cancelled          |
      | PENDING                  | Pending            |
      | PENDING_REVIEW           | Pending            |
      | PAYOUT_APPROVED          | Payout Approved    |
      | PROCESSING               | Payment Processing |
      | PAYOUT_FAILED            | Payout Failed      |
      | PAYOUT_CANCELLED         | Payout Cancelled   |
      | PENDING_TAX_REVIEW       | Pending            |
      | PENDING_NEW_TAX_FORM     | Pending            |
      | PENDING_TAX_SUBMISSION   | Pending            |
      | PENDING_PARTNER_CREATION | Pending            |
      | DENIED                   | Denied             |
      | EXPIRED                  | Expired            |
      | REDEEMED                 | Redeemed           |
      | (empty string "")        | Not available      |
      | (any unknown string)     | Not available      |

  @motivating @ui
  Scenario: PENDING + dateScheduledFor uses the pendingForText overlay (default ICU)
    Given a PENDING reward with dateScheduledFor Aug 31, 2026
    And the current date is May 7, 2026
    And the "status-text" prop is the default
    And the "pending-for-text" prop is the default "{status} for {date}"
    When the cell is rendered
    Then the primary badge text is exactly "Pending for 3 months"

  @motivating @ui
  Scenario: PENDING WITHOUT dateScheduledFor falls back to the default badge text
    Given a PENDING reward whose dateScheduledFor is unset
    When the cell is rendered
    Then the primary badge text is exactly "Pending"

  @minutia @ui
  Scenario: pendingForText overlay is suppressed for non-PENDING states even with dateScheduledFor
    Given an AVAILABLE reward whose dateScheduledFor is set Aug 31, 2026
    When the cell is rendered
    Then the primary badge text is exactly "Available"
    And the pendingForText template is NOT applied
  # ============================================================
  # 5. SECONDARY ("INFO") PILL
  # The second pill renders ONLY when state==="AVAILABLE" AND reward.dateExpires is truthy.
  # Its text is `${expiringText} ${getTimeDiff(dateExpires)}` — note the leading space
  # always present and the prop value is rendered as-is (undefined → literal "undefined ...").
  # ============================================================

  @motivating @ui
  Scenario Outline: Secondary info pill renders only for AVAILABLE+dateExpires
    Given a reward whose computed state is "<state>"
    And reward.dateExpires is <dateExpires>
    When the cell is rendered
    Then the secondary info pill is rendered: <rendered>

    Examples:
      | state           | dateExpires        | rendered |
      | AVAILABLE       | Aug 31, 2026 (set) | yes      |
      | AVAILABLE       | unset              | no       |
      | EXPIRED         | Aug 31, 2026 (set) | no       |
      | REDEEMED        | Aug 31, 2026 (set) | no       |
      | PENDING         | Aug 31, 2026 (set) | no       |
      | CANCELLED       | Aug 31, 2026 (set) | no       |
      | PENDING_REVIEW  | Aug 31, 2026 (set) | no       |
      | DENIED          | Aug 31, 2026 (set) | no       |
      | PAYOUT_APPROVED | Aug 31, 2026 (set) | no       |
      | PROCESSING      | Aug 31, 2026 (set) | no       |

  @motivating @ui
  Scenario Outline: Secondary info pill text composition
    Given an AVAILABLE reward with dateExpires Aug 31, 2026
    And the current date is May 7, 2026
    And the "expiring-text" prop is <expiringText>
    When the cell is rendered
    Then the secondary info pill is rendered with type "info"
    And the secondary info pill is rendered with the WarningBadge CSS class
    And the secondary info pill text is exactly "<text>"

    Examples:
      | expiringText | text               |
      | "Expiring"   | Expiring 3 months  |
      | ""           |           3 months |
      | unset        | undefined 3 months |
  # ============================================================
  # 6. DESCRIPTION BODY — PER-STATE STATUS LINE
  # The body is a stack of conditional render blocks, evaluated in source order:
  #   PENDING_REVIEW → "" → PROCESSING → PAYOUT_FAILED → PAYOUT_CANCELLED →
  #   PENDING_TAX_REVIEW → PENDING_NEW_TAX_FORM → PENDING_TAX_SUBMISSION →
  #   PENDING_PARTNER_CREATION → DENIED → dateGiven → EXPIRED → CANCELLED →
  #   PENDING → AVAILABLE → fuelTankCode.
  # All other states (REDEEMED, etc.) render NO state-specific
  # status line — only the dateGiven/fuelTankCode lines below if applicable.
  # ============================================================

  @motivating @ui
  Scenario: PENDING_REVIEW with dateModerated renders the "Pending since" line
    Given a reward whose computed state is PENDING_REVIEW
    And reward.referral.dateModerated is Jan 1, 2026
    When the cell is rendered
    Then the description body contains "Pending since Jan 1, 2026" with "Jan 1, 2026" in bold

  @motivating @ui
  Scenario: PENDING_REVIEW WITHOUT dateModerated renders no "Pending since" line
    Given a reward whose computed state is PENDING_REVIEW
    And reward.referral.dateModerated is unset
    When the cell is rendered
    Then the description body does NOT contain a "Pending since" line

  @motivating @ui
  Scenario: state === "" renders the bare "Not available" statusText line
    Given a reward whose computed state is the empty string ""
    When the cell is rendered
    Then the description body contains exactly the text "Not available"

  @minutia @ui
  Scenario: state === undefined does NOT render the "Not available" line in the body
    Given a reward whose computed state is undefined
    When the cell is rendered
    Then the description body does NOT contain "Not available"
    And only the dateGiven and fuelTankCode lines (if any) are rendered

  @motivating @ui
  Scenario: PROCESSING renders the "Processing until {date}." line
    Given a reward whose computed state is PROCESSING
    And reward.partnerFundsTransfer.dateScheduled is Jan 1, 2026
    When the cell is rendered
    Then the description body contains "Processing until Jan 1, 2026. Payout is then scheduled based on your settings."

  @motivating @ui
  Scenario: PAYOUT_APPROVED renders the "Processing until {date}." line
    Given a reward whose computed state is PAYOUT_APPROVED
    And reward.partnerFundsTransfer.dateScheduled is Jan 1, 2026
    When the cell is rendered
    Then the description body contains "Processing until Jan 1, 2026. Payout is then scheduled based on your settings."

  @motivating @ui
  Scenario: PAYOUT_FAILED renders the failed-fulfillment line
    Given a reward whose computed state is PAYOUT_FAILED
    When the cell is rendered
    Then the description body contains "Payout failed due to a fulfillment issue and is currently being retried."

  @motivating @ui
  Scenario: PAYOUT_CANCELLED renders the contact-support line
    Given a reward whose computed state is PAYOUT_CANCELLED
    When the cell is rendered
    Then the description body contains "If you think this is a mistake, contact our Support team."

  @motivating @ui
  Scenario: PENDING_TAX_REVIEW renders the tax-review line
    Given a reward whose computed state is PENDING_TAX_REVIEW
    When the cell is rendered
    Then the description body contains "Awaiting tax form review"

  @motivating @ui
  Scenario: PENDING_NEW_TAX_FORM renders the invalid-tax-form line
    Given a reward whose computed state is PENDING_NEW_TAX_FORM
    When the cell is rendered
    Then the description body contains "Invalid tax form. Submit a new form to receive your rewards."

  @motivating @ui
  Scenario: PENDING_TAX_SUBMISSION renders the submit-tax-documents line
    Given a reward whose computed state is PENDING_TAX_SUBMISSION
    When the cell is rendered
    Then the description body contains "Submit your tax documents to receive your rewards"

  @motivating @ui
  Scenario: PENDING_PARTNER_CREATION renders the complete-payout-setup line
    Given a reward whose computed state is PENDING_PARTNER_CREATION
    When the cell is rendered
    Then the description body contains "Complete your tax and cash payout setup to receive your rewards"

  @motivating @ui
  Scenario: DENIED with dateModerated renders "Denied on {date}." with trailing period
    Given a reward whose computed state is DENIED
    And reward.referral.dateModerated is Jan 1, 2026
    And the "denied-help-text" prop is unset
    When the cell is rendered
    Then the description body contains "Denied on Jan 1, 2026." with "Jan 1, 2026" in bold

  @motivating @ui
  Scenario: DENIED with dateModerated AND deniedHelpText appends help text after the period
    Given a reward whose computed state is DENIED
    And reward.referral.dateModerated is Jan 1, 2026
    And the "denied-help-text" prop is "Contact our support team."
    When the cell is rendered
    Then the description body contains "Denied on Jan 1, 2026. Contact our support team."

  @motivating @ui
  Scenario: DENIED WITHOUT dateModerated renders no "Denied on" line
    Given a reward whose computed state is DENIED
    And reward.referral.dateModerated is unset
    When the cell is rendered
    Then the description body does NOT contain a "Denied on" line
    And the deniedHelpText is NOT rendered (it lives inside the dateModerated block)

  @motivating @ui
  Scenario: EXPIRED with dateExpires renders the "Reward expired on {date}" line
    Given a reward whose computed state is EXPIRED
    And reward.dateExpires is Jan 1, 2026
    When the cell is rendered
    Then the description body contains "Reward expired on Jan 1, 2026" with "Jan 1, 2026" in bold

  @motivating @ui
  Scenario: EXPIRED WITHOUT dateExpires renders no expired line
    Given a reward whose computed state is EXPIRED
    And reward.dateExpires is unset
    When the cell is rendered
    Then the description body does NOT contain "Reward expired on"

  @motivating @ui
  Scenario: CANCELLED with dateCancelled renders the "Reward cancelled on {date}" line
    Given a reward whose computed state is CANCELLED
    And reward.dateCancelled is Jan 1, 2026
    When the cell is rendered
    Then the description body contains "Reward cancelled on Jan 1, 2026" with "Jan 1, 2026" in bold

  @motivating @ui
  Scenario: CANCELLED WITHOUT dateCancelled renders no cancelled line
    Given a reward whose computed state is CANCELLED
    And reward.dateCancelled is unset
    When the cell is rendered
    Then the description body does NOT contain "Reward cancelled on"

  @motivating @ui
  Scenario: PENDING with dateScheduledFor renders the "Available on {date}" line
    Given a reward whose computed state is PENDING
    And reward.dateScheduledFor is Jan 1, 2026
    When the cell is rendered
    Then the description body contains "Available on Jan 1, 2026" with "Jan 1, 2026" in bold

  @motivating @ui
  Scenario: PENDING WITHOUT dateScheduledFor renders no "Available on" line
    Given a reward whose computed state is PENDING
    And reward.dateScheduledFor is unset
    When the cell is rendered
    Then the description body does NOT contain "Available on"
    And the badge falls back to plain "Pending"

  @motivating @ui
  Scenario: AVAILABLE with dateExpires renders the "Reward expiring on {date}" body line
    Given a reward whose computed state is AVAILABLE
    And reward.dateExpires is Aug 31, 2026
    When the cell is rendered
    Then the description body contains "Reward expiring on Aug 31, 2026" with "Aug 31, 2026" in bold

  @motivating @ui
  Scenario: AVAILABLE WITHOUT dateExpires renders no body line and no info pill
    Given a reward whose computed state is AVAILABLE
    And reward.dateExpires is unset
    When the cell is rendered
    Then the description body does NOT contain "Reward expiring on"
    And the secondary info pill is NOT rendered

  @motivating @ui
  Scenario: REDEEMED renders no state-specific body line
    Given a reward whose computed state is REDEEMED
    When the cell is rendered
    Then the description body has NO state-specific status line
    And only the dateGiven and fuelTankCode lines (if any) are rendered
  # ============================================================
  # 7. ALWAYS-ON BODY LINES (dateGiven + fuelTankCode)
  # These render REGARDLESS of state, layered on top of (or instead of)
  # the per-state status line.
  # ============================================================

  @motivating @ui
  Scenario Outline: dateGiven line renders for every state when reward.dateGiven is truthy
    Given a reward with dateGiven Jan 1, 2026
    And the "reward-received-text" prop is "Reward given"
    And the reward's computed state is "<state>"
    When the cell is rendered
    Then the description body contains "Reward given Jan 1, 2026" with "Jan 1, 2026" in bold

    Examples:
      | state                    |
      | AVAILABLE                |
      | REDEEMED                 |
      | PENDING                  |
      | PENDING_REVIEW           |
      | EXPIRED                  |
      | CANCELLED                |
      | DENIED                   |
      | PAYOUT_APPROVED          |
      | PAYOUT_CANCELLED         |
      | PAYOUT_FAILED            |
      | PROCESSING               |
      | PENDING_TAX_REVIEW       |
      | PENDING_NEW_TAX_FORM     |
      | PENDING_TAX_SUBMISSION   |
      | PENDING_PARTNER_CREATION |

  @motivating @ui
  Scenario: dateGiven line is suppressed when reward.dateGiven is unset
    Given a reward whose dateGiven is unset
    When the cell is rendered
    Then the description body does NOT contain a reward-received line

  @motivating @ui
  Scenario Outline: fuelTankCode line renders for every state when reward.fuelTankCode is truthy
    Given a reward with fuelTankCode "ABC-123"
    And the "fuel-tank-text" prop is "Code:"
    And the reward's computed state is "<state>"
    When the cell is rendered
    Then the description body contains "Code: ABC-123" with "ABC-123" in bold

    Examples:
      | state                    |
      | AVAILABLE                |
      | REDEEMED                 |
      | PENDING                  |
      | PENDING_REVIEW           |
      | EXPIRED                  |
      | CANCELLED                |
      | DENIED                   |
      | PAYOUT_APPROVED          |
      | PAYOUT_CANCELLED         |
      | PAYOUT_FAILED            |
      | PROCESSING               |
      | PENDING_TAX_REVIEW       |
      | PENDING_NEW_TAX_FORM     |
      | PENDING_TAX_SUBMISSION   |
      | PENDING_PARTNER_CREATION |

  @motivating @ui
  Scenario: fuelTankCode line is suppressed when reward.fuelTankCode is unset
    Given a reward whose fuelTankCode is unset
    When the cell is rendered
    Then the description body does NOT contain a fuel-tank line

  @minutia @ui
  Scenario: Stacking order in the description body
    Given an AVAILABLE reward with dateExpires Aug 31, 2026, dateGiven Jan 1, 2026, fuelTankCode "ABC-123"
    When the cell is rendered
    Then the description body lines appear in this order:
      | order | line                                                   |
      |     1 | Reward given Jan 1, 2026          (dateGiven block)    |
      |     2 | Reward expiring on Aug 31, 2026   (AVAILABLE block)    |
      |     3 | <fuelTankText> ABC-123            (fuelTankCode block) |
  # ============================================================
  # 8. PARTNER FUNDS TRANSFER (PFT) MATRIX
  # Every PFT permutation, with the cash-reward "needsPayoutSetup" gate
  # (rules 3a/3b above) toggled on/off. The gate fires BEFORE PFT branches
  # for cash rewards, but rules 4–5 (REVERSED, OVERDUE) are unreachable
  # when the gate fires because the gate already returned
  # PENDING_PARTNER_CREATION.
  # ============================================================

  @motivating
  Scenario Outline: PFT permutations when withdrawalSettings ARE present (gate does not fire)
    Given taxConnection.connected is true
    And taxConnection.publisher.withdrawalSettings is present
    And the reward has a partnerFundsTransfer with status <pftStatus> and dateScheduled <pftDateScheduled>
    When the cell is rendered
    Then the resulting state is "<state>"

    Examples:
      | pftStatus   | pftDateScheduled | state            |
      | REVERSED    | (any)            | PAYOUT_CANCELLED |
      | OVERDUE     | (any)            | PAYOUT_FAILED    |
      | TRANSFERRED | future           | PROCESSING       |
      | TRANSFERRED | past             | PAYOUT_APPROVED  |
      | TRANSFERRED | unset            | PAYOUT_APPROVED  |
      | NOT_YET_DUE | future           | PROCESSING       |
      | NOT_YET_DUE | past             | PAYOUT_APPROVED  |
      | NOT_YET_DUE | unset            | PAYOUT_APPROVED  |
      | (null)      | future           | PROCESSING       |
      | (null)      | past             | PAYOUT_APPROVED  |

  @motivating
  Scenario Outline: PFT permutations when withdrawalSettings are MISSING (gate fires first)
    Given taxConnection.connected is true
    And taxConnection.publisher.withdrawalSettings is missing
    And the reward has a partnerFundsTransfer with status <pftStatus> and dateScheduled <pftDateScheduled>
    When the cell is rendered
    Then the resulting state is "<state>"

    Examples:
      | pftStatus   | pftDateScheduled | state                    |
      | REVERSED    | (any)            | PENDING_PARTNER_CREATION |
      | OVERDUE     | (any)            | PENDING_PARTNER_CREATION |
      | TRANSFERRED | future           | PENDING_PARTNER_CREATION |
      | TRANSFERRED | past             | PENDING_PARTNER_CREATION |
      | NOT_YET_DUE | future           | PENDING_PARTNER_CREATION |
      | NOT_YET_DUE | past             | PENDING_PARTNER_CREATION |
      | (null)      | future           | PENDING_PARTNER_CREATION |
      | (null)      | past             | PENDING_PARTNER_CREATION |

  @motivating
  Scenario: PFT branch is skipped entirely when reward.partnerFundsTransfer is missing
    Given the reward has no partnerFundsTransfer
    And the reward has no fraud / pendingReasons / statuses overrides
    When the cell is rendered
    Then PFT rules 4–9 are skipped
    And the resulting state is determined by the next applicable rule
  # ============================================================
  # 9. US_TAX PENDING-REASON MATRIX
  # Every permutation of taxConnection state when reward.pendingReasons
  # includes "US_TAX". Once US_TAX matches a sub-rule, no later rule fires.
  # ============================================================

  @motivating @ui
  Scenario Outline: US_TAX pending matrix
    Given a reward whose pendingReasons include "US_TAX"
    And taxConnection.taxHandlingEnabled is <taxHandlingEnabled>
    And taxConnection.connected is <connected>
    And taxConnection.publisher.requiredTaxDocumentType is <requiredTaxDocumentType>
    And taxConnection.publisher.currentTaxDocument is <currentTaxDocument>
    And taxConnection.publisher.currentTaxDocument.status is <currentTaxDocumentStatus>
    And taxConnection.publisher.withdrawalSettings is <withdrawalSettings>
    When the cell is rendered
    Then the resulting state is "<state>"

    Examples:
      | taxHandlingEnabled | connected | requiredTaxDocumentType | currentTaxDocument | currentTaxDocumentStatus                      | withdrawalSettings | state                    |
      | false              | (any)     | (any)                   | (any)              | (any)                                         | (any)              | PENDING                  |
      | true               | false     | (any)                   | (any)              | (any)                                         | (any)              | PENDING_PARTNER_CREATION |
      | true               | true      | unset                   | (any)              | (any)                                         | present            | (falls through)          |
      | true               | true      | unset                   | (any)              | (any)                                         | missing            | (falls through)          |
      | true               | true      | W9                      | missing            | -                                             | (any)              | PENDING_TAX_SUBMISSION   |
      | true               | true      | W9                      | present            | INACTIVE                                      | (any)              | PENDING_NEW_TAX_FORM     |
      | true               | true      | W9                      | present            | INVALID_W9_ELECTRONIC_DOCUMENT                | (any)              | PENDING_NEW_TAX_FORM     |
      | true               | true      | W9                      | present            | INVALID_W9_ELECTRONIC_DOCUMENT_CHECK_INTERNAL | (any)              | PENDING_NEW_TAX_FORM     |
      | true               | true      | W9                      | present            | NOT_VERIFIED                                  | (any)              | PENDING_TAX_REVIEW       |
      | true               | true      | W9                      | present            | ACTIVE                                        | missing            | PENDING_PARTNER_CREATION |
      | true               | true      | W9                      | present            | ACTIVE                                        | present            | (falls through)          |

  @motivating @ui
  Scenario: MISSING_PAYOUT_CONFIGURATION pendingReason resolves to PENDING_PARTNER_CREATION
    Given a reward whose pendingReasons include "MISSING_PAYOUT_CONFIGURATION"
    And no earlier rule matches
    When the cell is rendered
    Then the resulting state is PENDING_PARTNER_CREATION
  # ============================================================
  # 10. STATUSES-ARRAY FALLBACK (rules 19–34)
  # ============================================================

  @motivating
  Scenario Outline: Single-entry statuses array returns that single value (rule 19)
    Given a reward whose pendingReasons array is empty
    And reward.partnerFundsTransfer is missing
    And reward.statuses is <statuses>
    When the cell is rendered
    Then the resulting state is "<state>"

    Examples:
      | statuses           | state          |
      | ["AVAILABLE"]      | AVAILABLE      |
      | ["REDEEMED"]       | REDEEMED       |
      | ["EXPIRED"]        | EXPIRED        |
      | ["CANCELLED"]      | CANCELLED      |
      | ["PENDING"]        | PENDING        |
      | ["DENIED"]         | DENIED         |
      | ["UNKNOWN_STATUS"] | UNKNOWN_STATUS |

  @motivating
  Scenario Outline: Multi-entry statuses array returns the first matching possibleState (rules 20–34)
    Given a reward whose pendingReasons array is empty
    And reward.partnerFundsTransfer is missing
    And reward.statuses is <statuses>
    When the cell is rendered
    Then the resulting state is "<state>"
    # possibleStates priority order:
    # REDEEMED > CANCELLED > EXPIRED > PENDING > AVAILABLE > PENDING_REVIEW
    # > DENIED > PAYOUT_APPROVED > PAYOUT_CANCELLED > PAYOUT_FAILED
    # > PENDING_TAX_REVIEW > PENDING_NEW_TAX_FORM > PENDING_TAX_SUBMISSION
    # > PENDING_PARTNER_CREATION > PROCESSING

    Examples:
      | statuses                                   | state                    |
      | ["AVAILABLE", "PENDING"]                   | PENDING                  |
      | ["AVAILABLE", "REDEEMED"]                  | REDEEMED                 |
      | ["EXPIRED", "PENDING"]                     | EXPIRED                  |
      | ["PENDING", "AVAILABLE"]                   | PENDING                  |
      | ["AVAILABLE", "DENIED"]                    | AVAILABLE                |
      | ["CANCELLED", "AVAILABLE"]                 | CANCELLED                |
      | ["EXPIRED", "CANCELLED", "REDEEMED"]       | REDEEMED                 |
      | ["PENDING_REVIEW", "DENIED", "AVAILABLE"]  | AVAILABLE                |
      | ["PROCESSING", "PENDING_PARTNER_CREATION"] | PENDING_PARTNER_CREATION |

  @minutia
  Scenario: Multi-entry statuses with no matching possibleState returns undefined
    Given a reward whose pendingReasons array is empty
    And reward.partnerFundsTransfer is missing
    And reward.statuses is ["UNKNOWN_A", "UNKNOWN_B"]
    When the cell is rendered
    Then the resulting state is undefined
    And the primary badge text is "Not available"
    And the description body has no state-specific status line

  @minutia
  Scenario: Empty statuses array with no other matches returns undefined
    Given a reward whose pendingReasons array is empty
    And reward.partnerFundsTransfer is missing
    And reward.statuses is []
    When the cell is rendered
    Then the resulting state is undefined
    And the primary badge text is "Not available"
  # ============================================================
  # 11. ICU CUSTOMIZATION (statusText, statusLongText)
  # ============================================================

  @motivating
  Scenario Outline: statusText prop overrides the primary badge text per state
    Given the "status-text" prop overrides "<state>" to "<customLabel>"
    And a reward whose computed state is "<state>"
    And NOT (state is PENDING and reward.dateScheduledFor is set)
    When the cell is rendered
    Then the primary badge text is exactly "<customLabel>"

    Examples:
      | state                    | customLabel            |
      | AVAILABLE                | Redeem me!             |
      | PENDING                  | Coming soon!           |
      | PAYOUT_APPROVED          | Payout Sent!           |
      | DENIED                   | Unlucky!               |
      | PENDING_TAX_REVIEW       | Tax review in progress |
      | PENDING_PARTNER_CREATION | Finish setup           |

  @motivating
  Scenario Outline: statusLongText prop overrides the description body per state
    Given the "status-long-text" prop overrides "<state>" to "<customLabel>"
    And a reward whose computed state is "<state>"
    And the conditional render block for "<state>" fires
    When the cell is rendered
    Then the description body contains "<customLabel>"

    Examples:
      | state                    | customLabel                       |
      | DENIED                   | Sorry, this referral was denied   |
      | PAYOUT_FAILED            | We were unable to send your money |
      | PENDING_TAX_SUBMISSION   | Please upload your W-9 form       |
      | PENDING_PARTNER_CREATION | Finish onboarding                 |

  @minutia
  Scenario: statusLongText for a state without a render block has no effect on the body
    Given the "status-long-text" prop overrides "REDEEMED" to "You redeemed!"
    And a reward whose computed state is REDEEMED
    When the cell is rendered
    Then the description body does NOT contain "You redeemed!"
    And only the dateGiven and fuelTankCode lines (if any) are rendered
  # ============================================================
  # 12. LOCALIZATION
  # ============================================================

  @minutia
  Scenario: All dates and ICU strings flow through the configured locale
    Given the "locale" prop is set to a supported locale
    Then dateGiven, dateExpires, dateCancelled, dateModerated, dateScheduledFor,
    And relative time expressions use `DateTime.toRelative()` with the same locale, with the leading "in " stripped
    And every prop-driven message string is run through `intl.formatMessage`
