@author:truman
Feature: Passwordless registration

    @motivating
    Scenario: User's must provide an email to register

    @motivating
    Scenario: Users are notified if registration fails

    @motivating
    Scenario Outline: A user cannot register with an email linked to an existing account

    @ui
    Scenario: Slotted content can be included

    @motivating
    Scenario: The component is customizable to have first name and last name enable
        Given the customer wants to ask for name details in the form
        Then they enable First name field
        And it is not mandatory
        And they enable Last name field
        And it is not mandatory
