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
    Given the Tax Document is currently <status>
    When they view the Tax Document Submitted
    Then they see a badge with <status> text and a respective <badgeVariant>
    Then they see the message "<taxStatusMessage> on <dateSubmitted>"

    Examples:
      | status       | badgeVariant | taxStatusMessage                                           | dateSubmitted |
      | ACTIVE       | success      | Submitted                                                  | Jan 17, 2024  |
      | NOT_VERIFIED | neutral      | Awaiting Review. Submitted                                 | Jan 17, 2024  |
      | NOT_ACTIVE   | danger       | Make sure your information is correct and submit new form. | Jan 17, 2024  |

  @minutia @ui
  Scenario: Status badge and text does not appear if participant is not required to submit tax form
    When a tax document is not required
    Then tax document header does not include a document type
    And the description text under the header displays "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support"
    And the "Submit new document" is not available

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
      | status     | documentType | taxAlertHeader                                                              | taxAlertMessage                                                                                                                 |
      | NOT_ACTIVE | W9           | Your W-9 tax form has personal information that doesn't match your profile. | Please resubmit a new W-9 form.                                                                                                 |
      | NOT_ACTIVE | W8-BEN       | W-8 tax form is invalid.                                                    | Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W-8 BEN form.   |
      | NOT_ACTIVE | W8-BEN-E     | W-8 tax form is invalid.                                                    | Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W-8 BEN-E form. |

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
    And two buttons Submit new form and Cancel appear
    And if they press Submit new form
    Then their current tax form is deleted
    And they are redirected to the Docusign page to sign a new form
