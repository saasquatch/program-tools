@author:derek
@owner:derek
Feature: Program Explainer Step

    @motivating
    @ui
    Scenario: The program explainer step displays a icon, header and description
        Given a program explainer step with props
            | prop        | value                            |
            | header      | My Header                        |
            | description | My program explainer description |
            | icon        | person-plus-fill                 |
        When a user views the explainer step
        Then they see an person icon with a + in the top left hand corner
        And the icon is weight 300 brand colour
        And below they see "My Header" in large bold font
        And below they see "My program explainer description" in medium font
        And the step background colour is weight 50 brand colour

    @motivating
    @ui
    Scenario: The program explainer can display an image in place of an icon
        Given a program explainer
        And it has an "image-url" prop with a value of a valid url to an image
        When a user views the explainer step
        Then the image is displayed in place of an incon in the top left hand corner

    @motivating
    @ui
    Scenario: Colours are customizable
        Given a program explainer step with props
            | prop             | value            |
            | text-color       | purple           |
            | background-color | grey             |
        When a user views the explainer step
        Then they see the step background is grey
        And the header text is purple
        And the description text is purple
