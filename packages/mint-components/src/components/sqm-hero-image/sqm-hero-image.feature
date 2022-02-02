@author:derek
@owner:kutay
Feature: Hero Image

	The Hero Image component displays media images with a header, description and button using an overlay or a double column layout to offer an attrative widget page.

	Background: A user on the portal is viewing the widget

	Scenario: Overlay image displays header, description, and button with brand color
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		Then image with overlay using brand color is displayed
		When screen is shrunk to smaller size
		Then image is scaled to fit content

	Scenario Outline: Overlay image crop can be aligned left, center or right
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		And prop "image-pos" has <value>
		Then image with overlay is displayed
		When image is shrunk to mobile view
		Then image is cropped with <value> align to fit content
		Examples:
			| value  |
			| left   |
			| center |
			| right  |

	Scenario Outline: Overlay padding can be configured
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		And prop "paddingText" has <value>
		Then image with overlay is displayed
		And padding with <value> is applied around header, description and button

		Examples:
			| value      |
			| xxx-small  |
			| xx-small   |
			| x-small    |
			| small      |
			| medium     |
			| large      |
			| x-large    |
			| xx-large   |
			| xxx-large  |
			| xxxx-large |

	Scenario Outline: Overlay color and background can be customized
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		And prop "text-color" has <textColor>
		And prop "overlay-color" has <overlayColor>
		And prop "overlay-opacity" has <overlayOpacity>
		Then image with overlay is displayed
		And overlay has color <overlayColor>
		And overlay has opacity <overlayOpacity>
		And text has color <textColor>

		Examples:
			| textColor | overlayColor | overlayOpacity |
			| #fffc4b   | #ff7f7f      | 0.9            |
			| #1d0314   | #4baa1a      | 0              |
			| #211a27   | #aa481a      | 1              |


	Scenario: Two-column layout displays an image on one side and on the other side a header, description, and button
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "columns"                                                          |
		Then image and content is displayed in a two-column layout
		When screen is shrunk to smaller size
		Then two-column layout switches to a row layout


	Scenario Outline: Two-column layout image positions can be chosen for desktop and mobile views
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "columns"                                                          |
		And prop "image-pos" has <imagePos>
		And prop "image-mobile-pos" has <imageMobilePos>
		Then image and content is displayed in a two-column layout
		And image is displayed on the <imagePos>
		When screen is shrunk to smaller size
		Then two-column layout switches to a row layout
		And image is displayed on the <imageMobilePos>

		Examples:
			| imagePos | imageMobilePos |
			| left     | top            |
			| right    | bottom         |


	Scenario Outline: Two-column layout image and text paddings can be configured
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "columns"                                                          |
		And prop "padding-text" has <paddingText>
		And prop "padding-image" has <paddingImage>
		Then image and content is displayed in a two-column layout
		And image has padding <paddingImage>
		And text has padding <paddingText>

		Examples:
			| paddingText | paddingImage |
			| xxx-small   | xxx-small    |
			| xx-small    | xx-small     |
			| x-small     | x-small      |
			| small       | small        |
			| medium      | medium       |
			| large       | large        |
			| x-large     | x-large      |
			| xx-large    | xx-large     |
			| xxx-large   | xxx-large    |
			| xxxx-large  | xxxx-large   |


	Scenario Outline: Two-column layout image division percentage can be configured
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "columns"                                                          |
		And prop "percentage" has <percentage>
		Then image and content is displayed in a two-column layout
		And image takes up <percentage> of the two-column layout
		And text takes up the remainder of the space

		Examples:
			| percentage |
			| 25%        |
			| 42%        |
			| 66%        |


	Scenario: Two-column layout text and background color can be customized
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://i.imgur.com/bTwu1Um.png/"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "columns"                                                          |
		And prop "text-color" has <textColor>
		And prop "background-color" has <backgroundColor>
		Then image and content is displayed in a two-column layout
		And text has color <textColor>
		And background has color <backgroundColor>

		Examples:
			| textColor | backgroundColor |
			| #fffc4b   | #ff7f7f         |
			| #1d0314   | #4baa1a         |
			| #211a27   | #aa481a         |