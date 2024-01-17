@author:andy
@owner:andy

Feature: Iframe

	Used to provide users for accessing external pages.

	@motivating
	Scenario: Iframe displays page content from link
		When a user opens the Iframe
		The page content from the link displays in the Iframe
	
	@ui
  Scenario Outline: The height and width of the iFrame can be controlled via props
    Given the "iframe-src" is "https://example.com"
    And the iframe content is 1000x1000
    And the "iframe-height" is set to <heightValue>
    And the "iframe-width" is set to <widthValue>
    Then the content of the iframe will be displayed with scrollbars
    And the dimension of the iFrame displayed will be 500x500
    When the "iframe-height" is set to <heightValue>
    And the "iframe-width" is set to <widthValue>
    Then the full content of the iframe will be displayed on the page
    And the dimension of the iFrame displayed will be 1000x1000
    Examples:
      | heightValue | widthValue |
      | 500px       | 500px      |
      | 50%         | 50%        |

	@ui
  Scenario Outline: The title of iFrame can be controlled via props
    Given the "iframe-src" is "https://example.com"
    And the "iframe-title" is set to "example"
    Examples:
      | titleValue |
      | example    |

	@minutia
  Scenario Outline: The iFrame will fail fast if a iFrame source isn't provided
    Given "iframe-src" <mayBeAnAttribute>
    And it <mayHaveValue>
    When a user views the referral iFrame component
    Then an alert with an error message is displayed in place of the iFrame
    And it has a details section
    When "More details" is clicked
    Then the following information will be displayed
      | component being used |
      | missing attribute(s) |

    Examples:
      | mayBeAnAttribute    | mayHaveValue |
      | is not an attribute | N/A          |
      | is an attribute     | ""           |
      | is an attribute     |              |
