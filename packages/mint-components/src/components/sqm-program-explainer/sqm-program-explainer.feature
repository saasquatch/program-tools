@author:derek
@owner:derek
Feature: Program Explainer

    @motivating
    @ui
    Scenario Outline: The program explainer wraps program explainer steps and aligns them
        Given a program explainer component
        And it has <number> program explainer steps as components
        When a user views the program explainer
        Then they see <number> steps aligned horizontally
        And they have equal height/width
        And equal padding in between
        When they are viewed on a screen smaller than 500px
        Then the steps stack vertically with equal padding in between
        And they have equal width
        But height may vary
        Examples:
            | number |
            | 2      |
            | 3      |
            | 4      |

    @motivating
    @ui
    Scenario: The program explainer displays a section header
        Given a program explainer step with props
            | prop   | value     |
            | header | My Header |
        And it has program explainer steps as children
        When a user views the program explainer
        Then they see "My Header" centered above the explainer steps

    @motivating
    @ui
    Scenario: Colours are customizable
        Given a program explainer with props
            | prop             | value  |
            | text-color       | purple |
            | background-color | grey   |
        When a user views the program explainer
        Then the header is purple
        And the background between steos is grey
