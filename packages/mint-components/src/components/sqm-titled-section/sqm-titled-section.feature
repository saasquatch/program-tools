@author:derek
@owner:noah
Feature: Titled Section

    Background: The titled section has a label and content
        Given a titled section
        And it has a label
        And it has content in the content slot

    @motivating
    Scenario: Text alignment defaults to left align but can be configured
        Given the titled section has "text-align" <textAlignPropValue>
        When a user views the titled section
        Then the text in the label is <aligned>
        And the text in the content is <aligned>
        Examples:
            | textAlignPropValue | aligned |
            | center             | center  |
            | left               | left    |
            | right              | right   |
            |                    | left    |

    @minutae
    Scenario: Label margin is configurable
        Given the titled section has "label-margin" <marginPropValue>
        When a user views the titled section
        Then <marginPropValue> margin is between the label and content
        Examples:
            | marginPropValue | margin     |
            | none            | no         |
            | xxx-small       | xxx-small  |
            | xx-small        | xx-small   |
            | x-small         | x-small    |
            | small           | small      |
            | medium          | medium     |
            | large           | large      |
            | x-large         | x-large    |
            | xx-large        | xx-large   |
            | xxx-large       | xxx-large  |
            | xxxx-large      | xxxx-large |
            |                 | no         |

    @minutae
    Scenario Outline: Titled section padding is configurable
        Given the titled section has "padding" <paddingPropValue>
        When a user views the titled section
        Then <paddingPropValue> padding is applied around the titled section
        Examples:
            | paddingPropValue | padding    |
            | none             | no         |
            | xxx-small        | xxx-small  |
            | xx-small         | xx-small   |
            | x-small          | x-small    |
            | small            | small      |
            | medium           | medium     |
            | large            | large      |
            | x-large          | x-large    |
            | xx-large         | xx-large   |
            | xxx-large        | xxx-large  |
            | xxxx-large       | xxxx-large |
            |                  | no         |