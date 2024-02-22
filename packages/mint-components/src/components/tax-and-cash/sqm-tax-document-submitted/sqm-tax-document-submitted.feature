@owner:andy @author:andy
Feature: Tax Document Submitted View
  View that informs the user of their Tax Document submission status.

  Background: A user has submitted their Tax Document
    Given a user is on the Tax Document Submitted view

  @motivating
  Scenario: View Tax Document Submitted
    Given the user has submitted a tax document
    When they view Document Submitted
    Then they see the status of their Tax Document and Banking Information

  @motivating
  Scenario: View Tax Document Submitted is loading
    Given the user has submitted a tax document
    When they view Document Submitted
    Then they see a skeleton loaders until the end users Tax Document/Banking information data is available

  @minutia @ui
  Scenario Outline: The Tax Form header is displayed to the end users
    Given the user has submitted a W9/W8-BEN/W8-BEN-E Tax form
    Then the Tax Form header displays "<documentType> Tax Form"

    Examples: 
      | documentType |
      | W9           |
      | W8-BEN       |
      | W8-BEN-E     |

  @minutia @ui
  Scenario Outline: The date submitted and status of a Tax Form is displayed to the user
    Given the Tax Document is currently <status>
    When they view the Tax Document Submitted
    Then they see a badge with <status> text and a respective <badgeVariant>
    Then they see a message indicating "<taxStatusMessage> on <dateSubmitted>"

    Examples: 
      | status       | badgeVariant | taxStatusMessage                                                          | dateSubmitted |
      | ACTIVE       | success      | Submitted on                                                              | Jan 17, 2024  |
      | NOT_VERIFIED | neutral      | Awaiting Review. Submitted on                                             | Jan 17, 2024  |
      | NOT_ACTIVE   | danger       | Ensure your information matches your profile and resubmit a new document. | Jan 17, 2024  |

  @minutia @ui
  Scenario: Status badge and text does not appear if participant is not required to submit tax form
    When a tax document is not required
    Then tax document header does not include a document type
    And the description text under the header displays "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support"
    And the "Submit new document" is not available

  @minutia
  Scenario Outline: Indirect Tax section shows details if participant is registered for indirect tax
    When the participant <isRegistered> for indirect tax in their <country>
    Then the Indirect Tax section will display <registeredDetails>, <indirectTaxType>, and <indirectTaxNumber>

    Examples: 
      | isRegistered | country          | registeredDetails                                                                                                                                             | indirectTaxType        | indirectTaxNumber |
      | true         | Australia        | Registered in Australia.                                                                                                                                      | GST                    |            123456 |
      | true         | Canada           | Registered in Ontario, Canada.                                                                                                                                | GST                    |            345213 |
      | true         | Canada           | Registered in British Columbia, Canada.                                                                                                                       | HST                    |            345213 |
      | true         | Canada           | Registered in Quebec, Canada.                                                                                                                                 | GST, QST               |     345213, 12312 |
      | true         | United Kingdom   | Registered in United Kingdom.                                                                                                                                 | VAT                    |            321413 |
      | true         | Spain            | Registered in Spain, Madred.                                                                                                                                  | VAT, Income Tax Number |     345213, 12345 |
      | false        | United States    | Not registered. Only participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information. |                        | N/A               |
      | false        | United States    | Not registered. Only participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information. |                        | N/A               |
      | false        | Papua New Guinea | Not registered. Only participants representing a company in countries that enforce indirect tax (e.g. GST, HST, VAT) must add their indirect tax information. |                        | N/A               |

  @minutia @ui
  Scenario Outline: A Danger Alert is displayed if the users tax form is invalid
    Given the document has status <status>
    Then a danger alert indicating the <documentType> with a <taxAlertHeader> and <taxAlertMessage> appears

    Examples: 
      | status     | documentType | taxAlertHeader                                                             | taxAlertMessage                                                                                                              |
      | NOT_ACTIVE | W9           | Your W9 tax form has personal information that doesn't match your profile. | Please resubmit a new W9 form.                                                                                               |
      | NOT_ACTIVE | W8-BEN       | W8-BEN tax form is invalid.                                                | Your tax form may have expired or has personal information that doesn’t match your profile. Please submit a new W8-BEN form. |

  @unknown
  Scenario: Submit New Tax Document Form
    Given the user is viewing the Tax Document Submission
    When they click the "Submit New Form" button
    Then the system should trigger the callback
    Then they are redirected to the Docusign page to submit a new tax form
