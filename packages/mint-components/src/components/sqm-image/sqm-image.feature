@author:
@owner:

Feature: Image

	Background: A user on the portal is viewing the widget

	Scenario: Image is displayed from URL

		Given an Image component
		And prop "image-url" is provided
		Then the image is displayed

	Scenario Outline: Images can be aligned left, center or right

		Given an Image component
		And prop "image-url" is provided
		And prop "align" has <value>
		Then the image is displayed
		And it is aligned to the <value>

		Examples:
			| value  |
			| left   |
			| center |
			| right  |


	Scenario Outline: Images can be offset with margins from the left and right

		Given an Image component
		And prop "image-url" is provided
		And <prop> has <value>
		Then the image is displayed
		And image has <value> margin on its <prop> side

		Examples:
			| prop  | value |
			| left  | 100px |
			| right | 100px |


	Scenario: Image background

		Given an Image component
		And prop "image-url" is provided
		And prop "background-color" is provided a color
		Then the image is displayed
		And background is the provided color