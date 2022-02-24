@author:derek
@owner:derek
Feature: Empty State

    The sqm-empty component acts as a universal template for the empty states that are used accross our mint components.

    @motivating
    @ui
    Scenario: The empty state displays an image, a header and description text
        Given a empty component with the following props
            | prop               | value                                                                                           |
            | empty-state-image  | https://res.cloudinary.com/saasquatch/image/upload/v1644360953/squatch-assets/empty_reward2.png |
            | empty-state-header | My Custom Empty State                                                                           |
            | empty-state-text   | Description about why this empty state is being shown!                                          |
        And it is wrapped by a component with an "empty" slot
        When a user views a component using the empty state
        Then it is displayed in the "empty" slot
        And they see an image
        And below they see "My Custom Empty State"
        And below they see "Description about why this empty state is being shown!"
        And the images/text are centered aligned