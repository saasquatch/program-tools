@owner:noah
@author:noah

Feature: Menu Navigation

    @review
    @motivating
    Scenario: The menu in the header allows the user to navigate the portal
        Given the menu in the header is displayed
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

