@author:kutay
@owner:kutay
Feature: Task Card Progress Bar

	@motivating
	@ui
	Scenario Outline: The progress bar displays a continuous bar with the goal represented by a present
		Given a Task Card component
		And the users progress is <progress>
		And the task goal is "500"
		And the task is not repeatable
		Then I have <progressBar>
		And the <progressBar> shows <progress> with <unit> on the right
		And the circle on the progress bar is brand colour
		And the line behind the circle is brand colour
		And the line infront of the circle is grey
		And the gift icon has <color>
		And the gift icon shows "500" with <unit> below
		Examples:
			| progress | progressBar           | unit | color |
			| 0        | ●――――――――――――――――――🎁 | $    | no    |
			| 100      | ―――――――――●―――――――――🎁 | $    | no    |
			| 500      | ―――――――――――――――――――🎁 | $    | yes   |
			| 650      | ―――――――――――――――――――🎁 | $    | yes   |
			| 1200     | ―――――――――――――――――――🎁 | $    | yes   |

	@motivating
	@ui
	Scenario Outline: The progress bar can be displayed with steps instead of a continuous line
		Given a Task Card component
		And the user progress is <progress>
		And the goal is "5"
		And steps are enabled
		Then I have <progressBar>
		And the <progressBar> has incrementing steps up to "5" in increments of 1
		And the steps behind the users progress are brand colour
		And the steps infront of the users progress are grey
		And the gift icon has <color>
		And the gift icon shows "5" below
		Examples:
			| progress | progressBar           | color |
			| 0        | ―――○―――○―――○―――○―――🎁 | no    |
			| 1        | ―――●―――○―――○―――○―――🎁 | no    |
			| 5        | ―――●―――●―――●―――●―――🎁 | yes   |
			| 7        | ―――●―――●―――●―――●―――🎁 | yes   |
			| 12       | ―――●―――●―――●―――●―――🎁 | yes   |

	@motivating
	@ui
	Scenario Outline: The continuous progress bar will continue to progress for repeatable rewards
		Given a Task Card component
		And the user progress is <progress>
		And the goal is "500"
		And it is repeatable
		Then I have <progressBar>
		And the <progressBar> shows <progress> with <unit> to the right
		And the first <icon1> is <color1> with <text1> displayed below
		And the second <icon2> is <color2> with <text2> displayed below
		And the third <icon3> is <color3> with <text3> displayed below
		And the circle on the progress bar is brand colour
		And the line behind the circle is brand colour
		And the line infront of the circle is grey
		Examples:
			| progress | progressBar          | unit | icon1 | color1   | text1 | icon2 | color2    | text 2 | icon3 | color3    | text 3 |
			| 250      | ――――●――――🎁―――――――🎁 | $    | NA    | NA       | NA    | gift  | greyscale | 500    | gift  | greyscale | 1000   |
			| 500      | ―――――――――🎁―――――――🎁 | $    | NA    | NA       | NA    | gift  | colorful  | 500    | gift  | greyscale | 1000   |
			| 750      | ―――――――――🎁―――●―――🎁 | $    | NA    | NA       | NA    | gift  | colorful  | 500    | gift  | greyscale | 1000   |
			| 1000     | 🎁―――――――🎁―――――――🎁 | $    | gift  | colorful | 500   | gift  | colorful  | 1000   | gift  | greyscale | 1500   |
			| 1250     | 🎁―――――――🎁―――●―――🎁 | $    | gift  | colorful | 500   | gift  | colorful  | 1000   | gift  | greyscale | 1500   |

	@motivating
	@ui
	Scenario Outline: The stepped progress bar will continue to progress for repeatable rewards
		Given a Task Card component
		And the user progress is <progress>
		And the goal is "5"
		And steps are enabled
		And it is repeatable
		Then I have <progressBar>
		And the <progressBar> has incrementing steps up to "5" in increments of 1
		And the first <icon1> is <color1>
		And the second <icon2> is <color2>
		And the third <icon3> is <color3>
		And the steps behind the users progress are brand colour
		And the steps infront of the users progress are grey
		Examples:
			| progress | progressBar              | icon1 | color1   | icon2 | color2    | icon3 | color3    |
			| 0        | ―――○―○―○―○―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | greyscale | gift  | greyscale |
			| 1        | ―――●―○―○―○―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | greyscale | gift  | greyscale |
			| 5        | ―――●―●―●―●―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | colorful  | gift  | greyscale |
			| 7        | ―――●―●―●―●―🎁―●―●―○―○―🎁 | NA    | NA       | gift  | colorful  | gift  | greyscale |
			| 12       | 🎁―●―●―●―●―🎁―●―●―○―○―🎁 | gift  | colorful | gift  | colorful  | gift  | greyscale |