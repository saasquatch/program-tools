@feature:vanity-urls @category:widget-modal
Feature: Widget/Microsite Customize Link Editor

  Background:
    Given vanity URLs are enabled for the program
    And the user is on the widget or microsite sharing section
    And the customize link editor is available

  Scenario: Sharelink input shows current saved vanity URL
    Given the user previously saved vanity URL "my_link"
    When the sharelink input opens
    Then the input field shows "my_link"
    And edit count displays accurate usage (e.g., "1 of 5 edits used")

  Scenario: Sharelink input shows placeholder when no vanity URL exists
    Given the user has never created a vanity URL
    When the sharelink input opens
    Then the input field displays their default sharelink slug
    And edit count displays: "0 of 5 edits used"

  Scenario: Character counter updates as user types
    When the user types into the slug field
    Then the character counter updates in real-time
    And the counter shows: "X characters remaining"

  Scenario: Cancel closes editor without saving changes
    Given the user types "new_slug"
    When the user clicks "Cancel"
    Then the sharelink input closes
    And no changes are persisted
    And the previously saved URL remains unchanged

  Scenario: Valid available slug enables save and copy actions
    Given the user types a slug that is not flagged by validation
    Then the save button is enabled

  Scenario: Successful save updates share link and shows copy action
    Given the user types a valid slug: "my_link"
    And all validation passes
    When the user clicks "Save"
    Then the "Copy" icon becomes available
    And the primary share link uses the saved slug

  Scenario: Widget displays saved vanity URL as the default share link
    When share linking component loads
    Then the primary share link displays: "share.impact.com/user_link"
    And this is the default URL shown for sharing

  Scenario: Share link updates immediately after saving a new custom URL
    Given the sharelink input is open with the old URL
    When the user saves new URL: "user_link_pro"
    And the share linking component immediately updates to: "share.impact.com/user_link_pro"

  Scenario: Vanity sharelink replaces generic URL as the primary link
    Given the user had generic URL: "share.impact.com/mxqv12"
    When the user saves vanity sharelink: "user_link"
    Then the vanity sharelink becomes the primary link for the program
    And the generic URL is no longer shown in the share linking component by default

  Scenario: Share action includes the vanity URL
    When the user clicks "Share" (email, WhatsApp, etc.)
    Then the share message includes: "share.impact.com/user_link"
    And does not include the generic auto-generated URL

  Scenario Outline: Vanity URL customization is configured in the widget editor
    Given an admin is viewing their microsite/widget in the content editor
    When they click on the sharelink component
    #Comment for us to confirm
    And they have a custom domain configured for their program
    Then they see the "Customize URL" button in the sharelink component editor
    When they toggle it to <state>
    And they save the content in the editor
    Then the "Customize URL" button is <visibility> for advocates in the sharelink component

    Examples:
      | state | visibility |
      | ON    | visible    |
      | OFF   | hidden     |
  #How are we actually determining this count?

  Scenario: Edit count only increments on a successful save
    Given the user has 1 edit remaining (4 of 5 used)
    When the user clicks "Save" with a valid slug
    And their slug is saved
    Then the edit count increments to 5
    And the customize link button is disabled
    And they see a message indicating they've reached the edit limit
    And it includes a link to contact support for additional edits

  Scenario Outline: Slugs are validated against a list of restricted words and cannot be saved if they are on the list
    #The complete list can be found here https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
    Given the user types <slug>
    And a word in the slug <mayBe> on our restricted word list
    Then the save button is <stated>
    And they <maySee> the message "[MSG_RESTRICTED_WORD]"

    Examples:
      | slug        | mayBe  | stated   | maySee    |
      | free-stuff  | is     | disabled | see       |
      | discount    | is     | disabled | see       |
      | shit        | is     | disabled | see       |
      | normal-link | is not | enabled  | don't see |

  Scenario Outline: Taken slug shows unavailable message
    Given the user types <slug>
    And <slug> <mayBe> taken by another user
    Then the backend validation returns result <result>
    And the save button is <state>
    And they <maySee> the message "[MSG_LINK_TAKEN]"

    Examples:
      | slug        | mayBe | state    | maySee    |
      | taken-link  | is    | disabled | see       |
      | popular2026 | is    | disabled | see       |
      | popular2026 | isn't | enabled  | don't see |

  Scenario Outline: Invalid slug shows format or length error
    Given the user types <slug>
    #FIX ME
    And <slug> <mayContain> one of the following invalid characters ""
    Then the backend validation returns result <result>
    And the save button is <state>
    And they <maySee> the message "[MSG_RESTRICTED_WORD]"

    Examples:
      | slug          | mayContain      | result       | state    | maySee |
      | ab            | doesn't contain | AVAILABLE    | enabled  | see    |
      | invalid slug! | contains        | INVALID_CHAR | disabled | see    |
      | my@link       | contains        | INVALID_CHAR | disabled | see    |
  # Character limit (3-15)

  Scenario Outline: Input shows simple limits and remaining count
    Given the user types <slug>
    And the character limit is between 3 and 15 characters
    Then helper text displays: "[MSG_WORD_LIMIT_3_15]"
    And helper text displays: "[MSG_CHARACTERS_REMAINING]"
    And the save button is <state>

    Examples:
      | slug             | state    |
      | ab               | disabled |
      | abc              | enabled  |
      | abcabcabcabc12   | enabled  |
      | abcabcabcabc123  | enabled  |
      | abcabcabcabc1234 | disabled |

  Scenario: Slug becomes valid after fixing an invalid entry
    When the user types: "user@" (invalid)
    And real-time feedback shows error
    When the user deletes @ and continues: "user_link" (valid)
    Then save button becomes enabled

  Scenario: Characters remaining decreases while typing
    Given helper text shows "[MSG_CHARACTERS_REMAINING]"
    When the user types one additional character
    Then helper text updates remaining count accordingly
  #Make this as a scenario outline and talk to scott about the possible cases
  #Network failure, validation service unavailable, slug becomes taken between validation and save, etc.

  Scenario: Network failure shows error and preserves input
    When the user clicks "Save"
    But the request to set the vanity link fails
    Then they see the message "[MSG_NETWORK_ERROR]"
    And their link isn't saved
    And the editor remains open with input preserved
    And the save button is enabled for retry

  Scenario: Save succeeds after recovering from a network failure
    Given a network error was displayed
    When the network recovers
    And the user clicks "Save" again
    Then the request is resent with the same slug
    And the save succeeds
    And the error banner dissapears

  Scenario: Slug becomes taken between validation and save
    Given the user validates slug "popular-slug" as available
    And another user claims "popular-slug" before save
    When the user clicks "Save"
    Then they see the message "[MSG_LINK_TAKEN]"
    And the save button is enabled for the user to choose a new slug

  Scenario: Failed save does not consume an edit or persist partial data
    Given the user has used 4 of 5 edits
    When the user saves valid slug "user_link"
    But the save fails
    Then the edit count remains at 4
    And the slug remains available for retry
