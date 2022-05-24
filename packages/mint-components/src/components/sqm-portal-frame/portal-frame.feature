@owner:noah
@author:noah

Feature: Portal Frame

    @review
    @motivating
    Scenario: Header of the portal frame contains a drop down menu if logged in
        Given the portal frame has a <user status>
        Then the menu <dropdown state> be shown
        Examples:
            | user status    | dropdown state |
            | empty user     | will not       |
            | logged in user | will           |
