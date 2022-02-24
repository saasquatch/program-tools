@author:derek
@owner:kutay
Feature: Timeline Entry

    @motivating
    @ui
    Scenario: Timeline entries have an icon, a reward and an entry desciption
        Given an timeline entry with the following props
            | prop   | value                                               |
            | unit   | Visa Giftcard                                       |
            | reward | 50$                                                 |
            | desc   | Earn a 50$ Visa Giftcard for each referral you make |
        When a user views the entry
        Then they see a gift icon
        And see "$50 VISA GIFTCARRD" to the right
        And "$50" is bolded with x-large font size
        And below they see "Earn a 50$ Visa Giftcard for each referral you make"

    @motivating
    @ui
    Scenario Outline: Icon can either be a gift or a brand colour cirle
        Given a timeline entry with "icon" <iconPropValue>
        When a user views the entry
        Then they see an <icon>
        Examples:
            | iconPropValue 1 | icon                |
            | gift            | gift                |
            | circle          | brand colour circle |
            |                 | gift                |

    @motivating
    @ui
    Scenario: A timeline entry can display a line to connect it to another entry
        Given a timeline entry with "line" "true"
        When a user views the entry
        Then they see the entry
        But it has a brand colour line connecting it to the next timeline entry
