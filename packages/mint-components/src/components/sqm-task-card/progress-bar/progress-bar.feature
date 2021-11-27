@author:
@owner:
Feature: Task Card Progress Bar

	Scenario Outline: Progress Bar

		Given <progress> and <goal>
		Then I have <progressBar>
		And <progressBar> shows <progress> with <unit> above
		And gift icon has <color>
		And gift icon shows <goal> with <unit> below

		Examples:
			| progress | goal | progressBar           | unit | color |
			| -100     | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 0        | 500  | ●――――――――――――――――――🎁 | $    | no    |
			| 250      | 500  | ―――――――――●―――――――――🎁 | $    | no    |
			| 500      | 500  | ―――――――――――――――――――🎁 | $    | yes   |
			| 1000     | 500  | ―――――――――――――――――――🎁 | $    | yes   |

	Scenario Outline: Progress Bar Steps

		Given <progress> and <goal>
		And steps is enabled
		Then I have <progressBar>
		And <progressBar> has incrementing steps from 1 to <goal>
		And gift icon has <color>
		And gift icon shows <goal> below

		Examples:
			| progress | goal | progressBar           | color |
			| -1       | 5    | ―――○―――○―――○―――○―――🎁 | no    |
			| 0        | 5    | ―――○―――○―――○―――○―――🎁 | no    |
			| 1        | 5    | ―――●―――○―――○―――○―――🎁 | no    |
			| 5        | 5    | ―――○―――○―――○―――●―――🎁 | yes   |
			| 7        | 5    | ―――○―――○―――○―――●―――🎁 | yes   |


	Scenario Outline: Progress Bar Repeatable

		Given <progress> and <goal>
		Then I have <progressBar>
		And <progressBar> shows <progress> with <unit> above
		And <icon1> has <color1>
		And <icon2> has <color2>
		And <icon3> has <color3>
		And <icon1> shows <text1> below
		And <icon2> shows <text2> below
		And <icon3> shows <text3> below

		Examples:
			| progress | goal | progressBar          | unit | icon1 | icon2 | icon3 | color1 | color2 | color3 | text 1 | text 2 | text 3 |
			| 250      | 500  | ――――●――――🎁―――――――🎁 | $    | NA    | gift  | gift  | NA     | no     | no     | NA     | 500    | 1000   |
			| 500      | 500  | ―――――――――🎁―――――――🎁 | $    | NA    | gift  | gift  | NA     | yes    | no     | NA     | 500    | 1000   |
			| 750      | 500  | ―――――――――🎁―――●―――🎁 | $    | NA    | gift  | gift  | NA     | yes    | no     | NA     | 500    | 1000   |
			| 1000     | 500  | 🎁―――――――🎁―――――――🎁 | $    | gift  | gift  | gift  | yes    | yes    | no     | 500    | 1000   | 1500   |
			| 1250     | 500  | 🎁―――――――🎁―――●―――🎁 | $    | gift  | gift  | gift  | yes    | yes    | no     | 500    | 1000   | 1500   |

# | 1250     | 500  | 🎁―――――――🎁―――●―――🎁 | gift  | gift  | gift  | yes    | yes    | no     | goal * (⌊ progress / goal ⌋ - 1) | goal * ⌊ progress / goal ⌋ | goal * (⌊ progress / goal ⌋ +1) |

