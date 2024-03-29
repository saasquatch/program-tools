@author:kutay
@owner:kutay
Feature: Hero Image

	The Hero Image component displays media images with a header, description and button using an overlay or a double column layout to offer an attrative widget page.

	Background: A user on the portal is viewing the widget
		Given a user viewing the Hero Image component

	@motivating
	@ui
	Scenario: Overlay image displays header, description, and button with brand color
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://res.cloudinary.com/saasquatch/image/upload/v1644000278/squatch-assets/bTwu1Um.png"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
		Then they see their image
		And the image has no padding
		And it has a brand colour overlay
		And "Klip Rewards" is displayed over top of the image in xxx-large font
		And below "Refer friends or complete tasks while using Klip to earn rewards" is displayed over top of the image in x-large font
		And below they see a brand coloured button with text "Start earning"
		And the text section has xxx-large padding
		When the component is scaled down to 599px
		Then the image is scaled to fit content

	@motivating
	@ui
	Scenario Outline: Overlay image crop can be aligned left, center or right
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://res.cloudinary.com/saasquatch/image/upload/v1644000278/squatch-assets/bTwu1Um.png"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "overlay"                                                          |
			| image-pos   | <value>                                                            |
		Then the image with overlay is displayed
		When the component is scaled down to 599px
		Then the image is <alignment> to fit content
		Examples:
			| value  | alignment     |
			| left   | left aligned  |
			| center | centered      |
			| right  | right aligned |
			| N/A    | centered      |

	@motivating
	@ui
	Scenario Outline: Overlay padding is configurable
		Given a Hero Image component configured with the following props
			| prop         | value                                                              |
			| image-url    | "https://res.cloudinary.com/saasquatch/image/upload/v1644000278/squatch-assets/bTwu1Um.png"                                 |
			| header       | "Klip Rewards"                                                     |
			| description  | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text  | "Start earning"                                                    |
			| layout       | "overlay"                                                          |
			| padding-text | <value>                                                            |
		Then the image with overlay is displayed
		And <padding> is applied around header, description and button
		Examples:
			| value      | padding    |
			| none       | no padding |
			| xxx-small  | xxx-small  |
			| xx-small   | xx-small   |
			| x-small    | x-small    |
			| small      | small      |
			| medium     | medium     |
			| large      | large      |
			| x-large    | x-large    |
			| xx-large   | xx-large   |
			| xxx-large  | xxx-large  |
			| xxxx-large | xxxx-large |
			| N/A        | no padding |

	@motivating
	@ui
	Scenario Outline: Overlay color and background is configurable
		Given a Hero Image component configured with the following props
			| prop            | value                                                              |
			| image-url       | "https://res.cloudinary.com/saasquatch/image/upload/v1644000278/squatch-assets/bTwu1Um.png"                                 |
			| header          | "Klip Rewards"                                                     |
			| description     | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text     | "Start earning"                                                    |
			| layout          | "overlay"                                                          |
			| text-color      | <textColor>                                                        |
			| overlay-color   | <overlayColor>                                                     |
			| overlay-opacity | <overlayOpacity>                                                   |
		Then the image with overlay is displayed
		And the overlay is <overlayColor>
		And the overlay has <overlayOpacity>
		And the text is <textColor>
		Examples:
			| textColor | overlayColor | overlayOpacity |
			| #fffc4b   | #ff7f7f      | 0.9            |
			| #1d0314   | #4baa1a      | 0              |
			| #211a27   | #aa481a      | 1              |

	@motivating
	@ui
	Scenario: Two-column layout displays an image on one side and on the other side a header, description, and button
		Given a Hero Image component configured with the following props
			| prop        | value                                                              |
			| image-url   | "https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png"                                 |
			| header      | "Klip Rewards"                                                     |
			| description | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text | "Start earning"                                                    |
			| layout      | "columns"                                                          |
		Then the image is displayed on the left
		And the following elements are displayed on the right
			| elements    |
			| header      |
			| description |
			| button      |
		When the component is scaled down to 599px
		Then the two-column layout switches to a row layout
		And the image is displayed on top
		And the content is displayed below

	@motivating
	@ui
	Scenario Outline: Image position is configurable for desktop and mobile
		Given a Hero Image component configured with the following props
			| prop             | value                                                              |
			| image-url        | "https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png"                                 |
			| header           | "Klip Rewards"                                                     |
			| description      | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text      | "Start earning"                                                    |
			| layout           | "columns"                                                          |
			| image-pos        | <imagePos>                                                         |
			| image-mobile-pos | <imageMobilePos>                                                   |
		Then the image is displayed on the <imagePos>
		When the component is scaled down to 599px
		Then two-column layout switches to a row layout
		And image is displayed on the <imageMobilePos>
		Examples:
			| imagePos | imageMobilePos |
			| left     | top            |
			| right    | bottom         |

	@motivating
	@ui
	Scenario Outline: Padding is configurable for the image and text of two column layouts
		Given a Hero Image component configured with the following props
			| prop          | value                                                              |
			| image-url     | "https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png"                                 |
			| header        | "Klip Rewards"                                                     |
			| description   | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text   | "Start earning"                                                    |
			| layout        | "columns"                                                          |
			| padding-text  | <paddingText>                                                      |
			| padding-image | <paddingImage>                                                     |
		Then the two column layout is displayed
		And the image has padding <paddingImage>
		And the text has padding <paddingText>
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
			| none        | none         |

	@motivating
	@ui
	Scenario Outline: Two-column layout image division percentage is configurable
		Given a Hero Image component configured with the following props
			| prop             | value                                                              |
			| image-url        | "https://res.cloudinary.com/saasquatch/image/upload/v1644000248/squatch-assets/MVgOJn7.png"                                 |
			| header           | "Klip Rewards"                                                     |
			| description      | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text      | "Start earning"                                                    |
			| layout           | "columns"                                                          |
			| image-percentage | <percent>                                                          |
		Then the two column layout is displayed
		And the image takes up <percent> of the two-column layout
		And the text elements take up the remainder of the space
		Examples:
			| percent |
			| 25%     |
			| 42%     |
			| 66%     |

	@motivating
	@ui
	Scenario: Two-column layout text and background color is configurable
		Given a Hero Image component configured with the following props
			| prop             | value                                                              |
			| image-url        | "https://res.cloudinary.com/saasquatch/image/upload/v1644000275/squatch-assets/yr6ER3R.png"                                 |
			| header           | "Klip Rewards"                                                     |
			| description      | "Refer friends or complete tasks while using Klip to earn rewards" |
			| button-text      | "Start earning"                                                    |
			| layout           | "columns"                                                          |
			| text-color       | <textColor>                                                        |
			| background-color | <backgroundColor>                                                  |
		Then the two column layout is displayed
		And the text has color <textColor>
		And the background has color <backgroundColor>
		Examples:
			| textColor | backgroundColor |
			| #fffc4b   | #ff7f7f         |
			| #1d0314   | #4baa1a         |
			| #211a27   | #aa481a         |