@author:derek
@owner:kutay
Feature: Task Card

	@motivating
	Scenario: A header, body title and a CTA button are always displayed
		Given the Task Card is configured with the following props
			| prop         | value             |
			| rewardAmount | "40"              |
			| rewardUnit   | "Points"          |
			| cardTitle    | Complete a survey |
			| buttonText   | Take Survey       |
		When a user views the Task Card
		Then they see "40 Points" as the heading
		And the "40" is bolded
		And they see "Complete a survey" bolded in the body
		And a details icon in the top right hand corner
		And a button with text "Take Survey" in the bottom right hand corner
		When they click the button
		Then they are redirected to "example.com" in a new window

	@motivating
	Scenario Outline: A Task Card description can be included but is not required
		Given a Task Card
		And it has <descriptionPropValue>
		When a user views the Task card
		Then they <maySee> a chevron icon in the top right
		When they attempt to click the chevron
		Then they <maySee> the card description
		Examples:
			| descriptionPropValue             | maySee    |
			| This is my task card description | see       |
			|                                  | don't see |

	@motivating
	Scenario Outline: CTA links can open in a new tab or the same tab
		Given a Task Card
		And it has <openNewTabPropValue>
		When a user views the Task card
		And they click on the CTA
		Then they are redirected to the CTA link in <tab>
		Examples:
			| openNewTabPropValue | tab          |
			| true                | a new tab    |
			| false               | the same tab |
			| N/A                 | the same tab |

	@minutae
	Scenario: A loading state is displayed while the Task Card is loading
		Given a Task Card component
		When a user views the Task Card
		Then a loading state is displayed
		When the Task Card has loaded
		Then the loading state disapears

	@motivating
	Scenario Outline: The Progress Bar can be shown or hidden but is hidden by default
		Given a Task Card
		And it has <showProgressBarPropValue>
		When a user views the Task Card
		Then the progress bar <mayBe> displayed
		Examples:
			| showProgressBarPropValue | mayBe |
			| true                     | is    |
			| false                    | isn't |
			| N/A                      | isn't |

	@motivating
	Scenario: Clicking the CTA Button can trigger an event to be sent and refresh the widget
		Given a Task card
		And it is configured to send an "test" event
		When a user views the Task card
		And clicks on the CTA
		Then a "test" event is sent to SSQT on the users behalf
		And the contents of the widget the card is dislayed within are refreshed

	@motivating
	Scenario Outline: Tasks can be repeatable or one-time only but are one-time only by default
		Given a Task Card
		And it has <repeatablePropValue>
		And a user who has already completed the task
		When they view the Task Card
		Then they see a brand colour checkmark icon beside the card heading
		And the card <mayBe> brand colour
		And the CTA button <mayBe> disabled
		And the CTA button <mayBe> grey
		Examples:
			| repeatablePropValue | mayBe |
			| true                | isn't |
			| false               | is    |
			| N/A                 | is    |

	@motivating
	Scenario Outline: Display duration hides or shows a task
		Given a Task Card
		And it has a "display-duration" interval
		When a user views the Card on <day>
		Then card <mayBeHidden>
		Examples:
			| day                       | mayBeHidden   |
			| a day before the interval | is hidden     |
			| a day during the interval | is not hidden |
			| a day after the interval  | is hidden     |

	@motivating
	Scenario: Task Expiries can be configured and disable the CTA after the expiry
		Given a Task Card
		And it has an "reward-duration" interval
		When a user views the card on <day>
		Then the card <mayBeDisabled>
		And it <mayHaveAlert>
		And it <mayHaveExpiryText> on the bottom left hand side of the card
		Examples:
			| day                              | mayBeDisabled  | mayHaveAlert                                                      | mayHaveExpiryText                                   |
			| a day before the expiry interval | is disabled    | has alert stating the month, date, year and time the task starts  | doesn't have expiry text                            |
			| a day during the expiry interval | isn't disabled | doesn't have an alert                                             | has the month, date, year and time the task expires |
			| a day after the expiry interval  | is disabled    | has alert stating the month, date, year and time the task expired | doesn't have expiry text                            |

	@minutae
	Scenario Outline: Task expiry can be hidden or shown but is hidden by default
		Given a Task Card
		And it is configured with an expiry duration interval
		And it has <showExpiryPropValue>
		When a user views the Task card during the interval
		Then the expiry <mayBe> shown in the bottom left hand corner
		And it is in form "Month-Date-Year-Time"
		Examples:
			| showExpiryPropValue | mayBe |
			| true                | is    |
			| false               | isn't |
			| N/A                 | isn't |

	@motivating
	Scenario Outline: Task Card dates support localization
		Given a Task Card
		And it's configured with a expiry duration interval
		When a user with <locale> views the task card <atTime>
		Then they <seeDate> translated for <locale>
		Examples:
			| atTime              | locale | seeDate         |
			| before the interval | en     | Task Start Date |
			| during the interval | en     | Task End Date   |
			| after the interval  | en     | Task Ended Date |
			| before the interval | fr     | Task Start Date |
			| during the interval | fr     | Task End Date   |
			| after the interval  | fr     | Task Ended Date |

	@motivating
	Scenario Outline: A task completion count is displayed for repeatable tasks
		Given a Task Card
		And it is configured for a repeatable task
		And has it has <goalValue>
		And a user with <userGoalProgress>
		When the user views the task card
		Then they see a repeat icon
		And the <text> in the bottom left hand corner
		And the <text> is brand colour
		Examples:
			| goalValue | userGoalProgress | text              |
			| 2         | 0                | Completed 0 times |
			| 2         | 1                | Completed 0 times |
			| 2         | 2                | Completed 1 times |
			| 2         | 4                | Completed 2 times |

	@motivating
	Scenario Outline: The source of a user's progress can be a custom field or a program goal
		Given a Task Card
		And it is configured <progressSourcePath>
		When a user views the Task card
		Then the value at <progressSourcePath> is used to benchmark their progress against the "Goal Completion Count"
		Examples:
			| progressSourcePath                               |
			| /customFields/activityCount                      |
			| /customFields/purchaseTotal                      |
			| /programGoals/count%2FComment-on-Article         |
			| /programGoals/count/Referral-Started%2Freferrals |

	@motivating
	Scenario Outline: The users completion of a goal is calculated by the Goal Completion Number
		Given a Task Card
		And it is configured for <goalValue>
		And a user who has <progressValue>
		When they view the Task Card
		Then they are shown to have <progressValue> towards <goalValue>
		When their progress grows larger than <goalValue>
		Then the task is marked as completed
		Examples:
			| goalValue | progressValue |
			| 1         | 0             |
			| 10        | 9             |
			| 5         | 2             |

	@motivating
	Scenario: The Goal Completion Number defaults to 1
		Given a Task Card without a configured "goal" value
		And a user who has <progressValue>
		When they view the Task Card
		Then it <mayBe> marked as completed
		Examples:
			| progressValue | mayBe |
			| 0             | isn't |
			| 1             | is    |
			| 2             | is    |