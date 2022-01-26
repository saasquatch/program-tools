@author:
@owner:

Feature: Hero Image

	Scenario: Overlay image displays header, description, and button

	Background: A user on the portal is viewing the widget

	Scenario Outline: Overlay image crop can be aligned left, center or right

		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		And prop "image-pos" has <value>
		Then the image with overlay is displayed
		When image is shrunk to mobile view
		Then image is cropped with <value> align to fit content

		Examples:
			| imagePos |
			| left     |
			| center   |
			| right    |