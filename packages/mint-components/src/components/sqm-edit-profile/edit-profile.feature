@owner:noah
@author:noah

Feature: Edit Profile

    @review
    @motivating
    Scenario: Profile information is initially read only and must be unlocked to edit
        Given the user has navigated to the edit profile page
        Then their profile information will be displayed but not editable
        And the user can enabled editing of their information by clicking the "Change" button

    @review
    @motivating
    Scenario: If valid information is input users can update their profile information
        Given the user has enabled editing of their profile information
        And they have input valid profile information
        When they click "Update"
        Then their profile information will be updated
        And the edit profile page will return to the read only state

    @review
    @minutae
    Scenario: Users can abandon updating their profile information
        Given the user has enabled editing of their profile information
        And they have input valid profile information
        When they click "Cancel"
        Then their profile information will not be updated
        And the edit profile page will return to the read only state

    @review
    @minutae
    Scenario: Users cannot update their profile with invalid information
        Given the user has enabled editing of their profile information
        And they have input invalid profile information or have missing information
        When they click "Update" a form validation error will occur
        And an error will appear or the form field where the validation error occurred
        And an error message will appear at the bottom of the form
        And their profile information will not be updated
        And the "Cancel" button will still work