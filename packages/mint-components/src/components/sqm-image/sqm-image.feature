@author:
@owner:

Feature: Image

	Scenario: Image from link is displayed

		Given an Image component
		And an image url as a prop
		Then the image is displayed
		And its aspect ratio is maintained

	Scenario Outline: Image can be aligned left, center or right

		Given an Image component
		And an image url as a prop
		And <alignment> as a prop
		Then the image is displayed
		And its aspect ratio is maintained
		And it is <alingment> aligned

		Examples:
			| alignment |
			| left      |
			| center    |
			| right     |


	Scenario Outline: Image can be offset with margins

		Given an Image component
		And an image url as a prop
		And <marginPos> with <marginAmount>
		Then the image is displayed
		And its aspect ratio is maintained
		And image has <marginAmount> on its <marginPos> side

		Examples:
			| marginPos | marginAmount |
			| left      | 100px        |
			| right     | 100px        |


	Scenario: Image background

		Given an Image component
		And an image url
		And a background color
		Then the image is displayed
		And background is the provided color