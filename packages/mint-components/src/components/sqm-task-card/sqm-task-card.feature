@author:derek
@owner:
Feature: Task Card

	Scenario: A header, body title, description and a CTA button are always displayed
		Given the Task Card is configured with the following props
			| prop         | value                                        |
			| rewardAmount | "40"                                         |
			| rewardUnit   | "Points"                                     |
			| cardTitle    | Complete a survey                            |
			| description  | Fill out our survey form and receive points! |
			| buttonText   | Take Survey                                  |
			| buttonLink   | https://example.com/                         |
		When a user views the Task Card
		Then they see "40 Points" as the heading
		And the "40" is bolded
		And they see "Complete a survey" bolded in the body
		And a details icon in the top right hand corner
		And a button with text "Take Survey" in the bottom right hand corner
		When they click the button
		Then they are redirected to "example.com" in a new window
		When they click the details icon
		Then "Fill out our survey form and receive points!" is shown as the card description

	Scenario: A loading state is displayed while the Task Card is loading
		Given a Task Card component
		When a user views the Task Card
		Then a loading state is displayed
		When the Task Card has loaded
		Then the loading state disapears

	Scenario Outline: The Progress Bar can be shown or hidden but is hidden by default
		Given a Task Card component
		And it <mayHave> "showProgressBar" <value>
		When a user views the Task Card
		Then the progress bar <mayBe> displayed
		Examples:
			| mayHave      | value | mayBe |
			| has          | true  | is    |
			| has          | false | isn't |
			| doesn't have |       | isn't |

	Scenario Outline: Tasks can be repeatable or one-time only but are one-time only be default
		Given a Task Card component
		And it <mayHave> "repeatable" <value>
		And a user who has already completed the task
		When they views the Task Card
		Then they see a green checkmark icon beside the card heading
		And the card <mayBe> green
		And the card's border <mayBe> green
		And the CTA button <mayBe> disabled
		And the CTA button <mayBe> grey
		Examples:
			| mayHave      | value | mayBe |
			| has          | true  | isn't |
			| has          | false | is    |
			| doesn't have |       | is    |

	Scenario: Task Expiries can be configured and disable the CTA after the expiry
		Given a Task Card component
		And it is configured for <expiry>
		When a user views the Card on <day>
		Then they the expiry on <cardLocation>
		And the text <mayBe> orange
		And the card <mayBe> disabled
		And the card <mayBe> grey
		And the user <mayBe> unable to complete the loyalty task
		Examples:
			| expiry               | day                    | cardLocation | mayBe |
			| Dec 31 2021 11:59:59 | Dec 1st 2021 12:00:00  | bottom left  | isn't |
			| Dec 31 2021 11:59:59 | Dec 31 2021 11:00:00   | top right    | isn't |
			| Dec 31 2021 11:59:59 | Jan 15th 2022 10:00:00 | top right    | is    |

	Scenario Outline: Task expiry can be hidden or shown but is hidden by default
		Given a Task Card
		And it is configured with an expiry
		And it <mayHave> "showExpiry" <value>
		When a user views the Task card
		Then the expiry <mayBe> shown in the bottom left hand corner
		Examples:
			| mayHave      | value | mayBe |
			| has          | true  | is    |
			| has          | false | isn't |
			| doesn't have |       | isn't |

	#DS: Currently this text is non configurable and isnt set up for proper pluralization
	Scenario Outline: A task completion count is displayed for repeatable tasks
		Given a Task Card is configured for a repeatable task
		And has "goalCompletionNumber" <goalCompletionNumberValue>
		And a user with <userGoalProgress>
		When the user views the task card
		Then they see a repeat icon
		And the <text> in the bottom left hand corner
		And the <text> is green
		Examples:
			| goalCompletionNumber | userGoalProgress | text              |
			| 1                    | 0                | Completed 0 times |
			| 1                    | 1                | Completed 1 times |
			| 1                    | 2                | Completed 2 times |
			| 10                   | 5                | Completed 0 times |
			| 10                   | 12               | Completed 1 times |
			| 10                   | 29               | Completed 2 times |

	Scenario Outline: The source of a user's progress can be a custom field or a program goal
		Given a Task Card is configured to have <progressSourcePath> progress source
		And a user
		When they view the Task card
		Then the value at <progressSourcePath> is used to benchmark their progress against the Goal Completion Count
		Examples:
			| value                                            |
			| /customFields/activityCount                      |
			| /customFields/purchaseTotal                      |
			| /programGoals/count%2FComment-on-Article         |
			| /programGoals/count/Referral-Started%2Freferrals |

	Scenario Outline: The users completion of a goal is calculated by the Goal Completion Number
		Given a Task Card is configured to have <goalValue>
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

	Scenario: The Goal Completion Number defaults to 1
		Given a Task Card without a configured "goalCompletionNumber"
		And a user who has <progressValue>
		When they view the Task Card
		Then it <mayBe> marked as completed
		Examples:
			| progressValue | mayBe |
			| 0             | isn't |
			| 1             | is    |
			| 2             | is    |