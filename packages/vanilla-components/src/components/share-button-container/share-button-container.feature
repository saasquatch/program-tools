@author:derek
@owner:derek
Feature: Share Button Container

    @motivating
    Scenario Outline: Share buttons can be configured for a variety of display rules
        Given a share button container
        And a user is editing the <shareMedium> button
        Then they are able to configure <options>
        Examples:
            | shareMedium    | options                                                    |
            | email          | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | facebook       | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | twitter        | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | sms            | "mobile-only","hidden"                                     |
            | whats app      | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | linkedin       | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | pinterest      | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | messenger      | "mobile-and-desktop","mobile-only","desktop-only","hidden" |
            | line messenger | "mobile-only","hidden"                                     |

    @motivating
    Scenario Outline: Share button display rules show or hide the button depending on device
        Given a share button container
        And a share button has <displayRule>
        When a user views the share button on <device>
        Then they <maySee> the share button
        Examples:
            | displayRule        | device  | maySee    |
            | mobile-and-desktop | mobile  | see       |
            | mobile-and-desktop | desktop | see       |
            | mobile-only        | mobile  | see       |
            | mobile-only        | desktop | don't see |
            | desktop-only       | mobile  | don't see |
            | desktop-only       | desktop | see       |
            | hidden             | mobile  | don't see |
            | hidden             | desktop | don't see |