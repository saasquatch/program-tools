@author: sam
@owner: sam

Feature: Referral Codes Component

    A paginated display of available and used promo codes for the user to share with others

    @motivating
    Scenario: Promo code can be shared using various share mediums
        Given an authenticated user
        And the program has promo codes configured
        When the promo code section is loaded
        Then the promo code can be copied directly
        And the promo code can be shared using <shareMedium>

        Examples:
            | shareMedium |
            | DIRECT      |
            | EMAIL       |
            | FBMESSENGER |
            | WHATSAPP    |

    @minutia
    Scenario: User is notified if the currently viewed promo code has been used already
        Given an authenticated user
        And the program has promo codes configured
        When the promo code section is loaded
        And the code has not been used already
        Then no notification text is displayed
        When the code is changed to one that has been used
        Then the notification text is displayed

    @minutia
    Scenario Outline: Share buttons slots use the link from referral codes instead of the default query
        Given an authenticated user
        And the program has promo codes configured
        And a <shareMedium> button is a child of `<sqm-referral-codes>`
        Then the <shareMedium> button is shown
        And the link is <promoCode>
        Examples:
            | propName        | shareMedium | promoCode  |
            | hideSharelink   | DIRECT      | PROMOCODE1 |
            | hideEmail       | EMAIL       | PROMOCODE1 |
            | hideFbMessenger | FBMESSENGER | PROMOCODE1 |
            | hideWhatsApp    | WHATSAPP    | PROMOCODE1 |

    @minutia
    Scenario Outline: Number of codes is displayed in the pagination component
        Given an authenticated user
        And the program has promo codes configured
        When the promo code section is loaded
        And the user has <numCodes> available
        And the user is on <currentPage>
        Then the pagination text is <paginationText>
        Examples:
            | numCodes | currentPage | paginationText |
            | 5        | 1           | 1 of 5         |
            | 5        | 2           | 2 of 5         |
            | 5        | 3           | 3 of 5         |
            | 5        | 4           | 4 of 5         |
            | 5        | 5           | 5 of 5         |
            | 1        | 1           | 1 of 1         |
            | 0        | 0           | 0 of 0         |

