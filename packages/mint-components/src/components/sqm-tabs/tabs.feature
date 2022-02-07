@author:Zach
@owner:Zach
Feature: Tabs

  The Tabs takes in the Tab component as children and maps through to display their header and content.

  Background: A user on the portal is viewing the widget
    Given a user viewing the Tabs component

  @motivating
  Scenario: Content inside the active tab is shown
    Given the header is set to <tabHeader>
    And the content inside is <tabContent>
    And the user has clicked <tabHeader>
    Then the <tabContent> is shown
    Examples:
      | tabHeader | tabContent               |
      | Settings  | This is the settings tab |
      | General   | This is the general tab  |
      | History   | This is the history tab  |

  @motivating
  @ui
  Scenario: The placement of the tabs is configurable
    Given The placement prop has been passed a valid <placement>
    Then tabs are placed on the <placementResult>
    Examples:
      | placement | placementResult                |
      |           | top of the content             |
      | left      | left hand side of the content  |
      | right     | right hand side of the content |
      | bottom    | bottom of the content          |


  @minutae
  @ui
  Scenario Outline: Tabs are setup to use the brand color
    Given the brand color is set to darkblue
    Then the text inside the active tab is darkblue
    And the underline of the active tab is darkblue

  @ui
  Scenario: Tabs are responsive
    Given the user is on a mobile device
    When there are more tabs than the horizontal space allows for
    Then clickable arrows appear on the left and right of the tabs
    And the tabs are scrollable