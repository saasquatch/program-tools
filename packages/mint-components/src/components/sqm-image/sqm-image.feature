@author:kutay
@owner:kutay
Feature: Image

	Background: A user on the portal is viewing the widget
		Given a user viewing the image component

	@motivating
	Scenario: Image is displayed from URL
		Given an Image component
		And prop "image-url" is provided with a valid image url
		Then the image is displayed
		And it is centered

	@motivating
	Scenario Outline: Images can be aligned left, center or right
		Given an Image component
		And prop "image-url" is provided with a valid image url
		And prop "align" has <value>
		Then the image is displayed
		And it is aligned to the <value>
		Examples:
			| value  |
			| left   |
			| center |
			| right  |

	@motivating
	Scenario: Image background
		Given an Image component
		And prop "image-url" is provided with a valid image url
		And prop "background-color" is provided a color
		Then the image is displayed
		And the background is the provided color

	@motivating
	Scenario: Image minimum height can be constrained
		Given an Image component
		And prop "image-url" is provided
		And prop "min-height" is given a minimum value
		Then the image is displayed
		And the container size changes
		Then the image does not shrink below its minimum height