@author:
@owner:

Feature: Hero Image

Scenario: Overlay image displays header, description, and button

	Scenario Outline: Overlay image crop can be aligned left, center or right

		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://example.com/"                                             |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		And image-pos is <imagePos>
		Then the image with overlay is displayed
		When image is shrunk to mobile view
		Then image is cropped with <imagePos> align to fit content

		Examples:
			| imagePos |
			| left     |
			| center   |
			| right    |