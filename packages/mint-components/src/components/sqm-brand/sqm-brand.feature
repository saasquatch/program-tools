@author:derek
@owner:logan
Feature: Brand Configuration

    @motivating
    Scenario: The brand components creates a colour pallet from a brand colour and applies it to children
        Given a brand component with "brandColor" "#4225c4"
        And it is wrapping several mint components
        When a user views the children components
        Then the following css variables are set
            | variable                      | value                       |
            | --sl-color-primary-50         | hsla(251, 68%, 95%, 1)      |
            | --sl-color-primary-100        | hsla(251, 68%, 86%, 1)      |
            | --sl-color-primary-200        | hsla(251, 68%, 76%, 1)      |
            | --sl-color-primary-300        | hsla(251, 68%, 66%, 1)      |
            | --sl-color-primary-400        | hsla(251, 68%, 56%, 1)      |
            | --sl-color-primary-500        | hsla(251, 68%, 46%, 1)      |
            | --sl-color-primary-600        | hsla(251, 68%, 39%, 1)      |
            | --sl-color-primary-700        | hsla(251, 68%, 32%, 1)      |
            | --sl-color-primary-800        | hsla(251, 68%, 25%, 1)      |
            | --sl-color-primary-900        | hsla(251, 68%, 18%, 1)      |
            | --sl-color-primary-950        | hsla(251, 68%, 15%, 1)      |
            | --sl-focus-ring-color-primary | var(--sl-color-primary-100) |
            | --sl-input-border-color-focus | var(--sl-color-primary-500) |
            | --sl-color-primary-hue        | var(--sl-color-primary-500) |
        And they are applied to the children components
        But they are not applied to any components outside of the brand component
        And they are not applied to any vanilla components

    @minutae
    Scenario Outline: The brand colour can be hex, HSL or rgb

    @motivating
    Scenario: The brand component applies a background colour to child

    @motivating
    Scenario: The brand component can apply a brand font to children components
        Given a brand component with "brand-font" "Nunito Sans"
        And it is wrapping several mint components
        When a user views the children components
        Then the following css variables are set
            | variable                 | value                |
            | --sl-font-sans           | "Nunito Sans", arial |
            | --sl-input-font-family   | "Nunito Sans", arial |
            | --sl-tooltip-font-family | "Nunito Sans", arial |
            | font-family              | "Nunito Sans", arial |
        And they are applied to the children components
        And the children component's text is "Nunito Sans"