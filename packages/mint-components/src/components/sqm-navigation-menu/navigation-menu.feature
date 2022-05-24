@owner:noah
@author:noah

Feature: Menu Navigation

    @review
    @motivating
    Scenario: The menu in the header allows the user to navigate the portal
        Given the menu in the header is displayed
        And the current user has verified their email address
        When the user clicks the menu
        And the user clicks <menu entry> in the expanded menu
        Then the user will be redirected to the appropriate page
        Examples:
            | menu entry   |
            | Dashboard    |
            | Edit Profile |
            | Logout       |

    @review
    @motivating
    Scenario: The user can log out using the header menu
        Given the header menu is displayed
        And given the user has clicked the "Logout" menu item
        Then the user will be logged out of the portal

    @review
    @minutae
    Scenario: The dashboard entry is hidden to unverified users
        Given the current user has not verified their email address
        And they are logged in
        Then the "Dashboard" menu item will be hidden
        And the "Edit profile" and "Logout" menu entries will still exist and work

