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


  @minutae
	Scenario Outline: Tabs are setup to use the brand color
    Given the brand color is set to darkblue
    Then the text inside the active tab is darkblue 
    And the underline of the active tab is darkblue

  @ui
	Scenario: Tabs are responsive


  

  





