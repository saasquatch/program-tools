Feature: Handlers

    Scenario: Default webhook handler returns a 200 status
        Given a default integration service
        And there is an incoming webhook
        Then the response status will be 200

    # Scenario: Webhook handlers trigger SaaSquatch request verification
    #     Given a default integration service
    #     And there is a POST request to "/webhook"
    #     And the request is sent
    #     Then the request verification middleware will be called
    #     And the response status will be 200

