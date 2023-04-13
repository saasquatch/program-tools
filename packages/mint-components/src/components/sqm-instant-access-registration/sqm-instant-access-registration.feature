@author:truman
Feature: Instant access referrer registration

    @motivating
    Scenario: User's must provide an email to register
        Given a user is trying to register as a referrer
        When they do not provide an email
        And they submit the form
        Then an error appears telling the user to provide their email
        When they provide an email
        And they submit the form
        Then they are brought to the

    @motivating
    Scenario: Users are notified if registration fails
        Given a user is trying to register
        And they have included their email
        When an error occurs with the registration
        Then an alert banner appears letting the user know about the error

    @ui
    Scenario: Slotted content can be included


    @ui
    Scenario: First name and last name input fields can be hidden
        Given a user is editing the instant access registration component
        Then they see an option labeled "Include name fields"
        When they toggle the option
        Then the first name and last name input field visibility is toggled

    @ui
    Scenario: Input labels can be customized
        Given a user is editing the instant access registration component
        Then they see an option labeled "Include name fields"