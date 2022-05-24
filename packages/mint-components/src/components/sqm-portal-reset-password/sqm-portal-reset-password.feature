@author:
@owner:ian
Feature: Reset Password


    Background: A user in on the password reset page
        Given a user who has been redirected to the password reset page

    @motivating
    Scenario: Users can reset their password
        Given a user has a valid oob code as a url query parameter
        When they enter their password twice
        And they click "Update"
        Then their password is updated
        And a banner with a success message will be displayed
        And they can log in with their new password

    @motivating
    Scenario Outline: Users cannot reset their password with an invalid or missing oob code
        Given a user has a <oobCode> as a url query parameter
        Then they will see an error message saying that their password reset code is invalid or expired
        When they click "Continue"
        Then they will be redirected to "/"
        Examples:
            | oobCode               |
            | invalid oob code      |
            | non existant oob code |

    @motivating
    Scenario: Users must enter the same password twice to successfully reset their password
        Given a user has been redirected to the password reset page
        And they have a valid oob code as a url query parameter
        When they enter two different passwords into the password reset form
        And they click "Update"
        Then their password is not be reset
        And an error banner stating the input passwords must match appears
        And their password will not be reset
        When they enter the same password twice
        And they click "Update"
        Then a banner appears with a success message
        And they can log in with their new password

    @motivating
    Scenario: Users are redirected to "/" by default
        Given the component does not have prop "nextPage"
        And the users url does not contain a "nextPage" query parameter
        And a user has entered their password twice
        When they click "Update"
        Then their password is updated
        And they are redirected to "/"

    @motivating
    Scenario: Custom redirection can be configured
        Given the component has prop "nextPage" with value "/activity"
        And the users url does not contain a "nextPage" query parameter
        And a user has entered their password twice
        When they click "Update"
        Then their password is updated
        And they are redirected to "/activity"