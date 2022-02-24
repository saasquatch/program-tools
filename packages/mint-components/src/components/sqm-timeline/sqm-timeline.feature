@author:derek
@owner:kutay
Feature: Timeline

    @motivating
    @ui
    Scenario: The timeline adds lines between timeline entries
        Given a timeline
        And it has many timeline entries as children
        When a user views the timeline
        Then they see all timeline entries are connected by brand colour lines
        And see that the last entry does not have a line

    @motivating
    @ui
    Scenario Outline: The timeline can set the icons used by its timeline entries
        Given a timeline with "icon" <iconPropValue>
        And it has many timeline entries as children
        When a user views the timeline
        Then they see the timeline entries have a <icon>
        Examples:
            | iconPropValue | icon                |
            | gift          | gift icon           |
            | gift          | gift icon           |
            | circle        | brand colour circle |
