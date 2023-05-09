@author:noah
@owner:noah

Feature: Link Button

	@ui
	Scenario: Links can be opened in the same tab
		When a user clicks the button
		Then a link opens in the same tab
		And if the component is in an iFrame then the link is opened in the parent window not the iFrame

	@ui
	Scenario: Links can be opened in a new tab
		When a user clicks the button
		Then a link opens in a new tab
		And if the component is in an iFrame then the link is still opened in a new tab


	@ui
	Scenario: Props control the link and button text
		Given the "link" prop is set to "https://www.example.com"
		And the "buttonText" prop is set to "Click me!"
		Then a button is shown with the text "Click me!"
		And when clicked the button opens https://www.example.com

	@ui
	Scenario Outline: The button type can be set
		Given the button type is set to <value>
		Then a <buttonType> is shown
		Examples:
			| value   | buttonType |
			| <null>  | primary    |
			| default | default    |
			| primary | primary    |
			| success | success    |
			| neutral | neutral    |
			| warning | warning    |
			| danger  | danger     |