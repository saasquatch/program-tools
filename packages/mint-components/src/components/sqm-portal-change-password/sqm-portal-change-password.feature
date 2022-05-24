Feature: Change Password

    @motivating
    Scenario: Users can change their password
        Given a user has registered for the portal
        And they have a password
        When they navigate to the edit profile page
        And click "Change your password..."
        Then a popup will appear
        When they enter their new password
        And confirm it
        And click "Change Password"
        Then they will see a success banner stating that the change was successful
        When they logout
        And try to login
        Then they will not be able to login with their old password
        But they will be able to login with their new password

    @motivating
    Scenario: Users must confirm their password change
        Given a user has registered for the portal
        When they navigate to the edit profile page
        And click "Change your password..."
        Then a popup will appear
        When they enter their new password
        But they enter a different password to confirm
        And click "Change Password"
        Then they will see an error banner stating that the passwords didnt match
        When they logout
        And try to login
        Then they will be able to login with their existing password

    @motivating
    Scenario: Users must enter a new password and confirm it to change their password
        Given a user has registered for the portal
        When they navigate to the edit profile page
        And click "Change your password..."
        Then a popup will appear
        When they click "Change password"
        Then a validation error will appear for the new password field
        And their password will not be changed
        When they enter a new password
        And they click "Change password"
        Then a validation error will appear for the confirm new password field
        And their password will not be changed

    @motivating
    Scenario: An error banner will be displayed if the password change fails
        Given a user has registered for the portal
        When they navigate to the edit profile page
        And click "Change your password..."
        When they enter their new password
        And confirm it
        And click "Change Password"
        But the change fails
        Then they will see an error banner stating that the change failed
        When they logout
        And try to login
        Then they will be able to login with their existing password