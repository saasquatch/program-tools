Feature: Handlers

    #
    # Default Handlers
    #

    Scenario: Webhook route is not configured if no webhook handler exists
        Given a default integration service with no custom handlers
        Then there is no "/webhook" route configured

    Scenario: Form route is not configured if no form handler exists
        Given a default integration service with no custom handlers
        Then there is no "/form" route configured

    #
    # Custom handlers
    #
    #
    Scenario: Custom introspection handlers are called
        Given an integration service with custom handlers
        And the introspection path is /introspection
        And there is a POST request to /introspection
        # TODO: Don't know how to generate valid headers for testing
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..WO3xC475rz8tQ89zxPM05hIdewEY-vyK5ck-1OKJpsLvj3qhEUdvOmHhwPYKZT-uMkKI5odhmrg3ZLbPpvbZ-vT-84zcpWgcx9zxmPQeS6PslP3VIaJ9L8U1CNv_j7dOCr2oExbeI3WxqQzDQXZ0GXal0kpy_E2HAiui-l02Z-mvtsq5PnU4BEOZsQTdAUSNjY-uz4xl4W3eHC3ZYpVAtC5Uo2XMwQVDURnF1tGfysT1FoYdTPA_6fp30V0ynrYHR0J1IBHFEmK1QubW8-XPJN2BpsSJeDmPX9LfKatRL3otzGfcY25lkZbcVjZp32yvhXaCOZBa7aXGIf_Kq89Www
            """
        And the body is:
            """
            {
                "tenantAlias": "testing",
                "config": {
                    "someKey": "someVal"
                },
                "templateIntegrationConfig": {
                    "webhooks": [],
                    "linkInterceptors": [],
                    "formHandler": {
                        "endpointUrl": "http://dzDWaUdUrMEsPysuNZEkUVWR.jftNXu04KHtr.92bA",
                        "name": "voluptate anim dolore dolor"
                    },
                    "customFields": []
                }
            }
            """
        When the request is sent
        Then the custom introspection handler will be called

    Scenario: Custom introspection handler request body is validated against schema
        Given an integration service with custom handlers
        And the introspection path is /introspection
        And there is a POST request to /introspection
        # TODO: Don't know how to generate valid headers for testing
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..DVaPiWHl-7-uj8LorNN5xEQmk9qXAvkmrxw4spcrrA6p1fLIkbKys9thF48x6IyJ1FnzNA9bZ8KP2THQKVZdmoY_89o9SN0-dNcdf7a51vnnzt9mdPCIXETT13xbw5-jXn1EIM8EX-iEG-nJgRluRTohTLN8Rn_xEtV3UnXWLFWRdwN2fyD4a07LAw3fAfsJC-yMC81lIBaYxKrmJCKU53spgnNdQzJdkkzyUZBS5mGssGY4hEsCTjgvPhaWwcBK6KHKm9dzQrFZOiimith9EIIXkArT9xpaGcNopnSn1sRaYi8DZ-CNSf_stamVpqKRleQS6ck1ChwoHd9EjQSEsw
            """
        And the body is:
            """
            {
                "tenantAlias": "testing",
                "config": {
                    "someKey": "someVal"
                }
            }
            """
        When the request is sent
        Then the custom introspection handler will not be called

    Scenario: Custom webhook handlers are called
        Given an integration service with custom handlers
        And there is a POST request to /webhook
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..oCWvfbcIRyD1Y0uaVoQw0o7Z_FkjirjWArHwg9zYBYDPniKzK8Yg1tMzbNApEVVx3YieVtgXqIHLhOWhtsOKgH8fnV9u1oDitviJD-J5-L_rqU3J7E-haacHfvz3wSEW_NGQdlJoE6b-_8_1JG0ZeDCYhJyg911YKBgTTvoaLDHeEMKa-8hWZkPLGISnGCB3ido8FPW25muoBNgTzqh6dwAhXxdMveoC-OtUr3-lH0Vy5SJlOO0A9lAPhtXw_OKS0p_MmHm4IBTUAn0FKgd3sukSRhSQVwxO74LkgECRYV3R8LyuFxftfFIeVggZCfWw4jDoIfYgoYPpk0TSEMXBJA
            """
        And the body is:
            """
            {
                "id": "1",
                "type": "test",
                "tenantAlias": "testing",
                "live": false,
                "created": 1
            }
            """
        When the request is sent
        Then the custom webhook handler will be called

    Scenario: Custom form submit handlers are called
        Given an integration service with custom handlers
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..F_SWFs0Bkw0gQmGfag5ltLGjMrRQGtQsyqEjHcfGhRi6mSNroNW5U6Bcl_CpFIE2drHN3oXl-hWgAgJz6EtWqRbGjo8IWgf_f32AWBg3XR8Rz8ENOSrZLEViXLtI0sLMIDzzhCQR08FYFHFlRg0EsNwlL14GjQ_DA34c9d9ANNqfC1ybCD-4bfYigYYDvFjYLa9MKECYrpsnQbOtr8QVAxwIWr0twhzMMhFUw_Zr7DFPf17-NuWMtHq4wgt_6-WWttPiR_iPKC6-GC3InKjoin1qbqmpLvKO4NzAkITWrmC-ccSn3SNse8qvQHcDiKrpmY6W840DTG_dHjKxO0yUtw
            """
        And the body is:
            """
            {
                "type": "SUBMIT",
                "tenantAlias": "testing",
                "form": {
                    "key": "test-form"
                },
                "formData": {},
                "formSubmissionRecordId": "1",
                "dateSubmitted": 1
            }
            """
        When the request is sent
        Then the response status will be 200
        And the custom form submit handler will be called

    Scenario: Custom form validation handlers are called
        Given an integration service with custom handlers
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..kLiqclo3Tli2v4Px6nk0AuCnVWEL6GmrIC4e47cXg7DK2dzMUW7BP5vG32XpbT6CRIQ82Nm8QLfte9IyZaGlYeBOnqEdSmMqhoxk-t2rtf88i7nPmXjLlSySxSpooVnhxwV0zmkFZzzeNo3neuHTjtZ2gUpKZsx3hzTfkPcHLoG8jFwisRV6kPVuca1NJH7edNyyZleCVMPRPfLZ246hlEf2PWyirs6DUuiEPdSKKSg-Biv2vU_uhLZPox9MHRdv2t4deZKj-f8jx2gSFb_JH_XS29NX1-nxGzoe4yQb3mHok9cM9eNBV72pnlH9LWeXU-HUPSOFweiWG-kJE0fAAg
            """
        And the body is:
            """
            {
                "type": "VALIDATE",
                "tenantAlias": "testing",
                "form": {
                    "key": "test-form"
                },
                "formData": {},
                "formSubmissionRecordId": "1",
                "dateSubmitted": 1
            }
            """
        When the request is sent
        Then the response status will be 200
        And the custom form validation handler will be called

    Scenario: Custom form introspection handlers are called
        Given an integration service with custom handlers
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..FHd91YLTeTxKBQwsW7EHmxKSADx2sq5xIhpg4_vK-rKBV4747SQetiqPIlDkosHpk6-lLTbXk3zoZaZW7ROODwBpo6r2rMk_SoGUvYHJU0ywnAroxl-P7c4u-KBW-mm0CGHqdcv8UC4w1vc6szj_XrwTAA9NMa5BlGl0-ESwOj8Z3DgAblNrKk4BYIdROf6G7WRQGCtTCSPcsHuWUCOSvrNz6FuHN5RvxIm2MwjUCKQCNKdFImbGSTG85JR1QJta6uGGL1ncWyNCHiKYGCbMD8J892M4wEj-RafoECvqSU4yt9tOzfNYjWJ8gwzhR_0mmWLMTPP2CV0c9nak1ncPew
            """
        And the body is:
            """
            {
                "type": "INTROSPECTION",
                "tenantAlias": "testing",
                "form": {
                    "key": "test-form"
                },
                "formData": {},
                "formSubmissionRecordId": "1",
                "dateSubmitted": 1
            }
            """
        When the request is sent
        Then the response status will be 200
        And the custom form introspection handler will be called

    Scenario: Custom form initial data handlers are called
        Given an integration service with custom handlers
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..fA6nOsdJEpSYINl8bvVw8t2iQXEbf85Tc-UOMnSS3Vf34Y3s_j6zMZZVgvD4lei1dI7BZR4IM7Ac9mVXlYDDemESgrHsR4N9JCvuABjchsGe5uPDnz2RAGkDeRezremMimwaacmKekqiAOBRXZYHwwhuh6hO2J8KRRLK8dPA0K6Lqs_7i_tpNdfI13JhN4NdTABVEGc8-_6xOKfYq0878HvBoXiPnEU1oaklUSSAdfkYkvyQqG0KwByXLlxFGls4PLkQf3-xtqfZ4Moz8_KWeNRQRxyIzHDvF63qr8cHhk57FBvdecZvc29xmeAzpTe26Lrzzqfs-F0_ivLytxpb6A
            """
        And the body is:
            """
            {
                "type": "INITIAL_DATA",
                "tenantAlias": "testing",
                "form": {
                    "key": "test-form"
                },
                "formData": {},
                "formSubmissionRecordId": "1",
                "dateSubmitted": 1
            }
            """
        When the request is sent
        Then the response status will be 200
        And the custom form initial data handler will be called

    Scenario: Form handlers can return form error responses
        Given an integration service with a form handler that returns a form error
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..F_SWFs0Bkw0gQmGfag5ltLGjMrRQGtQsyqEjHcfGhRi6mSNroNW5U6Bcl_CpFIE2drHN3oXl-hWgAgJz6EtWqRbGjo8IWgf_f32AWBg3XR8Rz8ENOSrZLEViXLtI0sLMIDzzhCQR08FYFHFlRg0EsNwlL14GjQ_DA34c9d9ANNqfC1ybCD-4bfYigYYDvFjYLa9MKECYrpsnQbOtr8QVAxwIWr0twhzMMhFUw_Zr7DFPf17-NuWMtHq4wgt_6-WWttPiR_iPKC6-GC3InKjoin1qbqmpLvKO4NzAkITWrmC-ccSn3SNse8qvQHcDiKrpmY6W840DTG_dHjKxO0yUtw
            """
        And the body is:
            """
            {
                "type": "SUBMIT",
                "tenantAlias": "testing",
                "form": {
                    "key": "test-form"
                },
                "formData": {},
                "formSubmissionRecordId": "1",
                "dateSubmitted": 1
            }
            """
        When the request is sent
        Then the response status will be 400
        And the response will be:
            """
            {
                "error": "form handler failed",
                "errorCode": "NOT_HAPPY"
            }
            """

    #
    # Unhandled exceptions from handlers
    #

    Scenario: Webhook handlers that throw exceptions will result in an unhandled webhook error
        Given an integration service with a webhook handler that throws an exception
        And there is a POST request to /webhook
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..oCWvfbcIRyD1Y0uaVoQw0o7Z_FkjirjWArHwg9zYBYDPniKzK8Yg1tMzbNApEVVx3YieVtgXqIHLhOWhtsOKgH8fnV9u1oDitviJD-J5-L_rqU3J7E-haacHfvz3wSEW_NGQdlJoE6b-_8_1JG0ZeDCYhJyg911YKBgTTvoaLDHeEMKa-8hWZkPLGISnGCB3ido8FPW25muoBNgTzqh6dwAhXxdMveoC-OtUr3-lH0Vy5SJlOO0A9lAPhtXw_OKS0p_MmHm4IBTUAn0FKgd3sukSRhSQVwxO74LkgECRYV3R8LyuFxftfFIeVggZCfWw4jDoIfYgoYPpk0TSEMXBJA
            """
        And the body is:
            """
            {
                "id": "1",
                "type": "test",
                "tenantAlias": "testing",
                "live": false,
                "created": 1
            }
            """
        When the request is sent
        Then the response status will be 500
        And the response will be:
            """
            {
                "error": "broken webhook handler",
                "errorCode": "UNHANDLED_WEBHOOK_ERROR"
            }
            """

    Scenario: Form handlers that throw exceptions will result in an unhandled form error response
        Given an integration service with a form handler that throws an exception
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..F_SWFs0Bkw0gQmGfag5ltLGjMrRQGtQsyqEjHcfGhRi6mSNroNW5U6Bcl_CpFIE2drHN3oXl-hWgAgJz6EtWqRbGjo8IWgf_f32AWBg3XR8Rz8ENOSrZLEViXLtI0sLMIDzzhCQR08FYFHFlRg0EsNwlL14GjQ_DA34c9d9ANNqfC1ybCD-4bfYigYYDvFjYLa9MKECYrpsnQbOtr8QVAxwIWr0twhzMMhFUw_Zr7DFPf17-NuWMtHq4wgt_6-WWttPiR_iPKC6-GC3InKjoin1qbqmpLvKO4NzAkITWrmC-ccSn3SNse8qvQHcDiKrpmY6W840DTG_dHjKxO0yUtw
            """
        And the body is:
            """
            {
                "type": "SUBMIT",
                "tenantAlias": "testing",
                "form": {
                    "key": "test-form"
                },
                "formData": {},
                "formSubmissionRecordId": "1",
                "dateSubmitted": 1
            }
            """
        When the request is sent
        Then the response status will be 500
        And the response will be:
            """
            {
                "error": "broken form handler",
                "errorCode": "UNHANDLED_FORM_ERROR"
            }
            """

    #
    # Bad JWTs
    #

    Scenario Outline: Request verification middleware fails if JWT is invalid
        Given an integration service with custom handlers
        And there is a POST request to <route>
        And the X-HOOK-JWS-RFC-7797 header is:
            """
            <header>
            """
        When the request is sent
        Then the response status will be 403
        And the response will be:
            """
            {
                "errorCode": "PERMISSION_DENIED",
                "error": "<error>"
            }
            """

        Examples:
            | route          | header  | error                                                           |
            | /form          |         | Permission denied - JWT validation failed: jwt must be provided |
            | /form          | notAJWT | Permission denied - JWT validation failed: jwt malformed        |
            | /webhook       |         | Permission denied - JWT validation failed: jwt must be provided |
            | /webhook       | notAJWT | Permission denied - JWT validation failed: jwt malformed        |
            | /introspection |         | Permission denied - JWT validation failed: jwt must be provided |
            | /introspection | notAJWT | Permission denied - JWT validation failed: jwt malformed        |
