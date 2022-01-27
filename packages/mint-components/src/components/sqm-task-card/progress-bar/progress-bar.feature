@author:kutay
@owner:kutay
Feature: Task Card Progress Bar

	Scenario Outline: Progress Bar
		Given a Task Card component
		And progress is <progress>
		And goal is <goal>
		Then I have <progressBar>
		And <progressBar> shows <progress> with <unit> above
		And gift icon has <color>
		And gift icon shows <goal> with <unit> below
		Examples:
			| progress | goal | progressBar           | unit | color |
			| 0        | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 100      | 500  | ―――――――――●―――――――――🎁 | $    | no    |
			| 500      | 500  | ―――――――――――――――――――🎁 | $    | yes   |
			| 650      | 500  | ―――――――――――――――――――🎁 | $    | yes   |
			| 1200     | 500  | ―――――――――――――――――――🎁 | $    | yes   |

	Scenario Outline: Progress Bar Steps
		Given a Task Card component
		And progress is <progress>
		And goal is <goal>
		And steps is enabled
		Then I have <progressBar>
		And <progressBar> has incrementing steps up to <goal>
		And gift icon has <color>
		And gift icon shows <goal> below
		Examples:
			| progress | goal | progressBar           | color |
			| 0        | 5    | ―――○―――○―――○―――○―――🎁 | no    |
			| 1        | 5    | ―――●―――○―――○―――○―――🎁 | no    |
			| 5        | 5    | ―――○―――○―――○―――●―――🎁 | yes   |
			| 7        | 5    | ―――○―――○―――○―――●―――🎁 | yes   |
			| 12       | 5    | ―――○―――○―――○―――●―――🎁 | yes   |


	Scenario Outline: Progress Bar Repeatable
		Given a Task Card component
		And progress is <progress>
		And goal is <goal>
		And it is repeatable
		Then I have <progressBar>
		And <progressBar> shows <progress> with <unit> above
		And first <icon1> is <color1> with <text1> displayed below
		And second <icon2> is <color2> with <text2> displayed below
		And third <icon3> is <color3> with <text3> displayed below
		Examples:
			| progress | goal | progressBar          | unit | icon1 | color1   | text1 | icon2 | color2    | text 2 | icon3 | color3    | text 3 |
			| 250      | 500  | ――――●――――🎁―――――――🎁 | $    | NA    | NA       | NA    | gift  | greyscale | 500    | gift  | greyscale | 1000   |
			| 500      | 500  | ―――――――――🎁―――――――🎁 | $    | NA    | NA       | NA    | gift  | colorful  | 500    | gift  | greyscale | 1000   |
			| 750      | 500  | ―――――――――🎁―――●―――🎁 | $    | NA    | NA       | NA    | gift  | colorful  | 500    | gift  | greyscale | 1000   |
			| 1000     | 500  | 🎁―――――――🎁―――――――🎁 | $    | gift  | colorful | 500   | gift  | colorful  | 1000   | gift  | greyscale | 1500   |
			| 1250     | 500  | 🎁―――――――🎁―――●―――🎁 | $    | gift  | colorful | 500   | gift  | colorful  | 1000   | gift  | greyscale | 1500   |

	Scenario Outline: Progress Bar Steps Repeatable
		Given a Task Card component
		And progress is <progress>
		And goal is <goal>
		And steps is enabled
		And it is repeatable
		Then I have <progressBar>
		And <progressBar> has incrementing steps up to <goal>
		And first <icon1> is <color1>
		And second <icon2> is <color2>
		And third <icon3> is <color3>
		Examples:
			| progress | goal | progressBar              | icon1 | color1   | icon2 | color2    | icon3 | color3    |
			| 0        | 5    | ―――○―○―○―○―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | greyscale | gift  | greyscale |
			| 1        | 5    | ―――●―○―○―○―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | greyscale | gift  | greyscale |
			| 5        | 5    | ―――●―●―●―●―🎁―○―○―○―○―🎁 | NA    | NA       | gift  | colorful  | gift  | greyscale |
			| 7        | 5    | ―――●―●―●―●―🎁―●―●―○―○―🎁 | NA    | NA       | gift  | colorful  | gift  | greyscale |
			| 12       | 5    | 🎁―●―●―●―●―🎁―●―●―○―○―🎁 | gift  | colorful | gift  | colorful  | gift  | greyscale |