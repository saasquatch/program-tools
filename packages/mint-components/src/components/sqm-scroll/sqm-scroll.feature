@author:derek
@owner:sam
Feature: Scroll button

    @motivating
    @ui
    Scenario: Button text can be configured
        Given a scroll button component
        And it has prop "button-text" with value "My Scroll Button"
        When a user views the button
        Then they see a brand colour button
        And it has text "My Scroll Button"

    @motivating
    Scenario: Users can scroll by Tag
        Given a scroll button component
        And a "sqm-text" component
        And the scroll button has "sqm-text" for the "scroll-tag-name"
        When a user views the button
        And clicks on it
        Then they are scrolled to the "sqm-text"

    @motivating
    Scenario: Users can scroll by Id
        Given a scroll button component
        And a "sqm-text" component with id "test123"
        And the scroll button has "test123" for the "scroll-id"
        When a user views the button
        And clicks on it
        Then they are scrolled to the "sqm-text" with id "test123"

    @motivating
    Scenario: Users can scroll to a specific sqm-tab and open it
        Given a scroll button component
        And a 'sqm-tabs' with 4 tabs
        And the scroll button has "tab-3" for the "scroll-id"
        When a user views the button
        And clicks on it
        Then they are scrolled to the 4th tab of the 'sqm-tabs' section
        And the tab is opened

    @landmine
    Scenario: Scroll target must not have the style "display:contents;"
        Given a scroll button component
        And a 'sqm-tabs' with 4 tabs
        And the scroll button has "sqm-reward-exchange" for the "scroll-tag-name"
        And the "sqm-reward-exchange" component has the style "display:contents;"
        When a user clicks the button
        Then they are scrolled to the 4th tab of the 'sqm-tabs' section
        And the tab is opened
        And they are not be scrolled to the component

    @motivating
    Scenario: Buttons can grow to width of container in mobile
        Given a scroll button component
        And it has prop "mobile"
        When a user views the button
        And their screen size is smaller than 500px
        Then the button spans the width of its container

    @motivating
    Scenario: Buttons can be shown with an outline button
        Given a scroll button component
        And it has prop "outline"
        When a user views the button
        Then it has a border outline according to its button type
        And the text colour matches the outline
        When a user hovers over the button
        Then the infill goes from white to button type colour