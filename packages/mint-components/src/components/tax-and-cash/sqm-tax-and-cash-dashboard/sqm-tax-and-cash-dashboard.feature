@owner:andy @author:andy
Feature: Tax And Cash Dashboard
  View that informs the user of their Indirect Tax, Payout Details, and Tax Document submission status.

  Background: A user has submitted their Payout Details
    Given a user is on the Tax And Cash Dashboard view

  @motivating
  Scenario: View Tax And Cash Dashboard
    Given the user has submitted a tax document
    When they view Document Submitted
    Then they see the status of their Tax Document and Banking Information

  @motivating
  Scenario: View Tax And Cash Dashboard is loading
    Given the user has completed the tax form flow
    When they view the Tax And Cash Dashboard
    Then they see a skeleton loaders until the end users Tax Document/Banking information data is available

  @minutia @ui
  Scenario Outline: The Tax Form header is displayed to the participant
    Given they submitted a tax form
    And their required tax document type is <requiredDocumentType>
    Then the Tax Form header displays "<documentType> tax form"
    Examples:
      | requiredDocumentType | documentType |
      | W9                   | W-9          |
      | W8BEN                | W-8          |
      | W8BENE               | W-8          |

  @minutia @ui
  Scenario Outline: The date submitted and status of a Tax Form is displayed to the user
    Given the participant <mayHave> submitted a tax form
    And it is currently <status>
    When they view the tax document section
    Then they see a <badgeVariant> with <statusText> text
    Then they see the message <taxStatusMessage>

    Examples:
      | mayHave | status       | badgeVariant | statusText       | taxStatusMessage                                             |
      | have    | ACTIVE       | success      | Active           | Submitted on {dateSubmitted}                                 |
      | have    | NOT_VERIFIED | neutral      | Not Verified     | Awaiting review. Submitted on {dateSubmitted}                |
      | have    | INACTIVE     | danger       | Invalid Tax Form | Make sure your information is correct and submit new form.   |
      | haven't | N/A          | danger       | Required         | Your payouts are on hold until you submit a {type} tax form. |

  @minutia @ui
  Scenario: Status badge and text does not appear if participant is not required to submit tax form
    When a tax document is not required
    Then the tax document section is hidden

  @minutia
  Scenario Outline: Indirect Tax section shows details if participant is registered for indirect tax
    When the participant <isRegistered> for indirect tax in their <country> and region <region>
    Then the Indirect Tax section will display <registeredDetails>, <indirectTaxType>, and <indirectTaxNumber>
    Examples:
      | isRegistered | country          | region           | registeredDetails                                                                                                                                             | indirectTaxType        | indirectTaxNumber |
      | true         | Australia        | n/a              | Registered in Australia.                                                                                                                                      | GST                    | 123456            |
      | true         | Canada           | Ontario          | Registered in Ontario, Canada.                                                                                                                                | GST                    | 345213            |
      | true         | Canada           | British Columbia | Registered in British Columbia, Canada.                                                                                                                       | HST                    | 345213            |
      | true         | Canada           | Quebec           | Registered in Quebec, Canada.                                                                                                                                 | GST, QST               | 345213, 12312     |
      | true         | United Kingdom   | n/a              | Registered in United Kingdom.                                                                                                                                 | VAT                    | 321413            |
      | true         | Spain            | Spain Proper     | Registered in Spain, Spain Proper.                                                                                                                            | VAT, Income tax number | 345213, 12345     |
      | true         | Spain            | Canary Islands   | Registered in Spain, Canary Islands.                                                                                                                          | VAT, Income tax number | 345213, 12345     |
      | false        | United States    | n/a              | Not registered. Only participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information. |                        | N/A               |
      | false        | United States    | n/a              | Not registered. Only participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information. |                        | N/A               |
      | false        | Papua New Guinea | n/a              | Not registered. Only participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information. |                        | N/A               |

  @minutia
  Scenario Outline: Participant is registered for indirect tax in Spain
    When the participant is registered for indirect tax in Spain
    Then the <registeredDetails> display with <subRegion>
    And they <doHaveIncomeTaxNumber> from step 2
    Then the indirect tax section displays <indirectTaxNumbers>
    Examples:
      | registeredDetails    | subRegion      | doHaveIncomeTaxNumber | indirectTaxNumbers            |
      | Registered in Spain, | Spain Proper   | true                  | VAT number, Income tax number |
      | Registered in Spain, | Canary Islands | false                 | VAT number, N/A               |

  @minutia @ui
  Scenario Outline: A Danger Alert is displayed if the users tax form is invalid
    Given the document has status <status>
    Then a danger alert indicating the <documentType> with a <taxAlertHeader> and <taxAlertMessage> appears
    Examples:
      | status     | documentType | taxAlertHeader                                                              | taxAlertMessage                                                                                                           |
      | NOT_ACTIVE | W9           | Your W-9 tax form has personal information that doesn't match your profile. | Please resubmit a new W-9 form.                                                                                           |
      | NOT_ACTIVE | W8-BEN       | W-8 tax form is invalid.                                                    | Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W-8 form. |
      | NOT_ACTIVE | W8-BEN-E     | W-8 tax form is invalid.                                                    | Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W-8 form. |

  @minutia @ui
  Scenario: A Warning Alert is displayed if the user has a payout on hold
    Given the user has a hold reason
    Then a warning alert indicating appears with description text:
      """
      Please contact Support or check your inbox for an email from our referral program provider, impact.com.
      """

  @minutia @ui
  Scenario: A Warning Alert is displayed if the user must verify their identity
    Given the user has "IDV_CHECK_REQUIRED" included in their hold reasons
    Then a warning alert indicating appears with description text:
      """
      Complete your verification to start receiving your cash rewards. It should only take a few minutes verify.
      """
    And a Start Verification button is present
    When they press the button
    Then a modal will appear with steps to verify their identity

  @minutia
  Scenario Outline: Alert displays the current state of the verification process
    Given a user has <holdReason> included in their holdReasons
    And they complete the payout and tax form flow
    Then a <color> banner appears
    And the alert has <buttons>
    And the alert has heading <heading>
    And the alert has description <description>
    Examples:
      | holdReason                  | color  | buttons                                      | heading                                               | description                                                                                                                                                                                                                                                                                                |
      | IDV_CHECK_REQUIRED_INTERNAL | yellow | N/A                                          | Identity verification in progress                     | Identity verification submission has been received. Our system is currently performing additional checks and analyzing the results. You will be updated shortly.                                                                                                                                           |
      | IDV_CHECK_REVIEW_INTERNAL   | yellow | N/A                                          | Verification Under Review                             | Verification requires further review due to a potential error. Our team is reviewing the information and will update you shortly.                                                                                                                                                                          |
      | IDV_CHECK_FAILED_INTERNAL   | red    | N/A                                          | Identity verification unsuccessful                    | Identity verification has failed. Our team is reviewing the report and will contact you with further information. If you don't hear from us contact our support team.                                                                                                                                      |
      | PAYMENT_HOLD_ON_CHANGE      | yellow | N/A                                          | We are reviewing your new payout settings             | Your payout is temporarily on hold while we review your new payment information, this process is usually resolved within 48 hours.                                                                                                                                                                         |
      | BENEFICIARY_NAME_INVALID    | yellow | Edit payout information, Submit new tax form | Your payment information does not match your tax form | The account holder (beneficiary) name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved. |
      | BENEFICIARY_NAME_MISMATCH   | yellow | Edit payout information, Submit new tax form | Your payment information does not match your tax form | The account holder (beneficiary) name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved. |
      | BANK_TAX_NAME_MISMATCH      | yellow | Edit payout information, Submit new tax form | Your payment information does not match your tax form | The bank account (beneficiary) name in your payment information does not match what was submitted in your tax form. Please review and update your payment information or tax form so that they match exactly and do not include any invalid characters. Your payouts are on hold until this is resolved.   |
      | WITHDRAWAL_SETTINGS_INVALID | yellow | Edit payout information                      | Your payment information includes invalid characters  | There are invalid characters in your payment information. Please review your information and make sure it is correct with no invalid characters. Your payouts are on hold until this is resolved.                                                                                                          |
      | PAYMENT_RETURNED            | red    | Edit payout information                      | Payout unsuccessful                                   | Our recent payment attempt for your earnings was unsuccessful. Please review your payment information and make sure it is correct.                                                                                                                                                                         |


  @motivating
  Scenario: User has general hold reasons
    Given they have impactConnection as one of the following
      | impactConnection                                                   |
      | { connected: true, publisher: { payoutsAccount: { hold: true } } } |
    And hold reasons don't include any of the following
      | holdReason                  |
      | IDV_CHECK_REQUIRED          |
      | IDV_CHECK_REQUIRED_INTERNAL |
      | IDV_CHECK_REVIEW_INTERNAL   |
      | IDV_CHECK_FAILED_INTERNAL   |
      | NO_W9_DOCUMENT              |
      | NEW_PAYEE_REVIEW            |
      | PAYMENT_HOLD_ON_CHANGE      |
      | BENEFICIARY_NAME_INVALID    |
      | BENEFICIARY_NAME_MISMATCH   |
      | BANK_TAX_NAME_MISMATCH      |
      | WITHDRAWAL_SETTINGS_INVALID |
      | PAYMENT_RETURNED            |
    And they have completed the payout and tax form flow
    Then a yellow warning banner appears with a header:
      """
      Your payouts and account are on hold
      """
    And description
      """
      Please check your inbox for an email from our referral provider, impact.com. It contains details on how to resolve this issue. If you need further assistance, feel free to reach out to {support email}.
      """

  @motivating
  Scenario Outline: Alert displays when a user has gone over the tax limit and we require one to pay them out on the "" tax setting
    Given a brand on the tax setting <type>
    And a participant that selected US as their payout country
    And USD as their payout currency
    When they pass the $600 reward limit within a tax year
    And the "NO_W9_DOCUMENT" QTP status gets added to their account
    And they receive "W9" as their required tax form
    Then they <maySee> a yellow alert
    And it has heading "Your next payout is on hold"
    And it has description  "You have surpassed the $600 threshold for a W9 tax form. To remove the hold, you need to submit a W9 tax form as outlined in our {termsAndConditions}. Please click 'Submit W9' to start the process."
    When they click the "Submit W9" button
    Then comply exchange opens on their page
    When they submit the tax form
    Then the banner disappears
    Examples:
      | type | maySee    |
      | 5    | see       |
      | 4    | don't see |

  @minutia @ui
  Scenario: Invoices table is available for participants regsistered for Indirect Tax
    Given a participant is registered for Indirect Tax
    Then the Invoices section appears with a table
    But if they are not registered
    Then the Invoice section does not appear.

  @minutia
  Scenario Outline: Non-existing brand partners can edit their payout information
    Given a participant has filled out their payout information
    And they are <brandPartnerType>
    And they are viewing the Payout section
    Then they <maySee> the "Edit Payout Information" button
    Examples:
      | brandPartnerType          | maySee     |
      | an existing brand partner | do not see |
      | a new brand partner       | do see     |

  @minutia
  Scenario: "Edit Payout Information" button redirects to Banking Info form step
    Given the user can click the "Edit Payout Information" button
    When they click the "Edit Payout Information" button
    Then they are redirected to the Banking Info form step
    And the user has <paymentMethod> saved
    And the following fields are auto-filled if they exist
      | paymentMethod          | field            |
      | BANK_TRANSFER          | bankCountry      |
      | BANK_TRANSFER / PAYPAL | paymentDay       |
      | BANK_TRANSFER / PAYPAL | paymentThreshold |
      | PAYPAL                 | paypalEmail      |

  @minutia
  Scenario: Submit New Tax Document Form
    Given the user is viewing the Tax Document Submission section
    When they click the "Submit New Form" button
    Then a modal opens
    And they are prompted with the message:
      | Submitting a new tax form will remove your existing form. Make sure to sign and complete your new tax form to prevent any issues with your next payout. |
    And two buttons Submit new tax form and Cancel appear
    And if they press Submit new tax form
    Then their current tax form is deleted
    And they are redirected to the Docusign page to sign a new form
