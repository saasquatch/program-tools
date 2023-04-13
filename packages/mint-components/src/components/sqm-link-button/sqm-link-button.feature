@author:noah
@owner:noah

Feature: Link Button

	Scenario: When a user clicks the button a link open
		When a user clicks the button
		Then a link opens
		And if `openInNewTab` is set to true then the link opens in a new tab