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
      | EXPIRED      | danger       | Expired on                                                                | Jan 17, 2024  |

  @minutia @ui
  Scenario: Status badge and text does not appear if participant is not required to submit tax form
    When a tax document is not required
    Then tax document header does not include a document type
    And the description text under the header displays "Tax documents are only required if you are based in the US. If your country of residence has changed, please contact Support"
    And the "Submit new document" is not available

  @minutia @ui
  Scenario Outline: A Danger Alert is displayed if the users tax form is invalid
    Given the document has status <status>
    Then a danger alert indicating the <documentType> with a <taxAlertHeader> and <taxAlertMessage> appears

    Examples:
      | status     | documentType | taxAlertHeader                                                                 | taxAlertMessage                      |
      | NOT_ACTIVE | W9           | Your W9 tax form has personal information that doesn't match your profile.     | Please resubmit a new W9 form.       |
      | NOT_ACTIVE | W8-BEN       | Your W8-BEN tax form has personal information that doesn't match your profile. | Please resubmit a new W8-BEN form.   |
      | EXPIRED    | W8-BEN-E     | Your W8-BEN-E tax form has expired.                                            | Please resubmit a new W8-BEN-E form. |

  @minutia @ui
  Scenario Outline: A Warning Alert is displayed if the users tax form is expiring soon
    Given the <status> is ACTIVE
    And the document type is <documentType>
    And the <dateExpired> of the document is within 30 days of the current date
    Then a warning alert <may> be displayed
    And it indicates the <documentType> with a <taxAlertHeader>, <taxAlertMessage>, and <dateExpired> appears
    And

    Examples:
      | status | documentType | may    | taxAlertHeader                    | dateExpired    | taxAlertMessage                      |
      | ACTIVE | W9           | is not | N/A                               | N/A            | N/A                                  |
      | ACTIVE | W8-BEN       | may    | Your W8-BEN tax form expires on   | Dec 30th, 2024 | Please resubmit a new W8-BEN form.   |
      | ACTIVE | W8-BEN-E     | may    | Your W8-BEN-E tax form expires on | Dec 30th, 2024 | Please resubmit a new W8-BEN-E form. |

  @unknown
  Scenario: Submit New Tax Document Form
    Given the user is viewing the Tax Document Submission
    When they click the "Submit New Form" button
    Then the system should trigger the callback
    Then they are redirected to the first step to submit a new form
