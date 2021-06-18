Feature: Handlers

    #
    # Default Handlers
    #

    Scenario: Default webhook handler returns a 200 status
        Given a default integration service
        And there is a POST request to /webhook
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..oCWvfbcIRyD1Y0uaVoQw0o7Z_FkjirjWArHwg9zYBYDPniKzK8Yg1tMzbNApEVVx3YieVtgXqIHLhOWhtsOKgH8fnV9u1oDitviJD-J5-L_rqU3J7E-haacHfvz3wSEW_NGQdlJoE6b-_8_1JG0ZeDCYhJyg911YKBgTTvoaLDHeEMKa-8hWZkPLGISnGCB3ido8FPW25muoBNgTzqh6dwAhXxdMveoC-OtUr3-lH0Vy5SJlOO0A9lAPhtXw_OKS0p_MmHm4IBTUAn0FKgd3sukSRhSQVwxO74LkgECRYV3R8LyuFxftfFIeVggZCfWw4jDoIfYgoYPpk0TSEMXBJA
        """
        And the body is:
        """
        {"id":"1","type":"test","tenantAlias":"testing","live":false,"created":1}
        """
        When the request is sent
        Then the response status will be 200

    Scenario: Default form submit handler returns empty submission results
        Given a default integration service
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..F_SWFs0Bkw0gQmGfag5ltLGjMrRQGtQsyqEjHcfGhRi6mSNroNW5U6Bcl_CpFIE2drHN3oXl-hWgAgJz6EtWqRbGjo8IWgf_f32AWBg3XR8Rz8ENOSrZLEViXLtI0sLMIDzzhCQR08FYFHFlRg0EsNwlL14GjQ_DA34c9d9ANNqfC1ybCD-4bfYigYYDvFjYLa9MKECYrpsnQbOtr8QVAxwIWr0twhzMMhFUw_Zr7DFPf17-NuWMtHq4wgt_6-WWttPiR_iPKC6-GC3InKjoin1qbqmpLvKO4NzAkITWrmC-ccSn3SNse8qvQHcDiKrpmY6W840DTG_dHjKxO0yUtw
        """
        And the body is:
        """
        {"type":"SUBMIT","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
        """
        When the request is sent
        Then the response status will be 200
        And the response will be:
        """
        { "results": [] }
        """

    Scenario: Default form submit validation handler returns no errors
        Given a default integration service
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..kLiqclo3Tli2v4Px6nk0AuCnVWEL6GmrIC4e47cXg7DK2dzMUW7BP5vG32XpbT6CRIQ82Nm8QLfte9IyZaGlYeBOnqEdSmMqhoxk-t2rtf88i7nPmXjLlSySxSpooVnhxwV0zmkFZzzeNo3neuHTjtZ2gUpKZsx3hzTfkPcHLoG8jFwisRV6kPVuca1NJH7edNyyZleCVMPRPfLZ246hlEf2PWyirs6DUuiEPdSKKSg-Biv2vU_uhLZPox9MHRdv2t4deZKj-f8jx2gSFb_JH_XS29NX1-nxGzoe4yQb3mHok9cM9eNBV72pnlH9LWeXU-HUPSOFweiWG-kJE0fAAg
        """
        And the body is:
        """
        {"type":"VALIDATE","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
        """
        When the request is sent
        Then the response status will be 200
        And the response will be:
        """
        { "valid": true, "errors": [] }
        """

    Scenario: Default form submit introspection handler returns no actions
        Given a default integration service
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..FHd91YLTeTxKBQwsW7EHmxKSADx2sq5xIhpg4_vK-rKBV4747SQetiqPIlDkosHpk6-lLTbXk3zoZaZW7ROODwBpo6r2rMk_SoGUvYHJU0ywnAroxl-P7c4u-KBW-mm0CGHqdcv8UC4w1vc6szj_XrwTAA9NMa5BlGl0-ESwOj8Z3DgAblNrKk4BYIdROf6G7WRQGCtTCSPcsHuWUCOSvrNz6FuHN5RvxIm2MwjUCKQCNKdFImbGSTG85JR1QJta6uGGL1ncWyNCHiKYGCbMD8J892M4wEj-RafoECvqSU4yt9tOzfNYjWJ8gwzhR_0mmWLMTPP2CV0c9nak1ncPew
        """
        And the body is:
        """
        {"type":"INTROSPECTION","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
        """
        When the request is sent
        Then the response status will be 200
        And the response will be:
        """
        { "actions": [], "inputData": [], "inputDataSchema": {} }
        """

    Scenario: Default form submit initial data handler returns no input data
        Given a default integration service
        And there is a POST request to /form
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..fA6nOsdJEpSYINl8bvVw8t2iQXEbf85Tc-UOMnSS3Vf34Y3s_j6zMZZVgvD4lei1dI7BZR4IM7Ac9mVXlYDDemESgrHsR4N9JCvuABjchsGe5uPDnz2RAGkDeRezremMimwaacmKekqiAOBRXZYHwwhuh6hO2J8KRRLK8dPA0K6Lqs_7i_tpNdfI13JhN4NdTABVEGc8-_6xOKfYq0878HvBoXiPnEU1oaklUSSAdfkYkvyQqG0KwByXLlxFGls4PLkQf3-xtqfZ4Moz8_KWeNRQRxyIzHDvF63qr8cHhk57FBvdecZvc29xmeAzpTe26Lrzzqfs-F0_ivLytxpb6A
        """
        And the body is:
        """
        {"type":"INITIAL_DATA","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
        """
        When the request is sent
        Then the response status will be 200
        And the response will be:
        """
        { "inputData": {} }
        """

    #
    # Custom handlers
    #

    Scenario: Custom webhook handlers are called
        Given an integration service with custom handlers
        And there is a POST request to /webhook
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImhMWC95ZFd3NEMwbXdkcnZ5UGhVWW1kQ2tEOD0ifQ..oCWvfbcIRyD1Y0uaVoQw0o7Z_FkjirjWArHwg9zYBYDPniKzK8Yg1tMzbNApEVVx3YieVtgXqIHLhOWhtsOKgH8fnV9u1oDitviJD-J5-L_rqU3J7E-haacHfvz3wSEW_NGQdlJoE6b-_8_1JG0ZeDCYhJyg911YKBgTTvoaLDHeEMKa-8hWZkPLGISnGCB3ido8FPW25muoBNgTzqh6dwAhXxdMveoC-OtUr3-lH0Vy5SJlOO0A9lAPhtXw_OKS0p_MmHm4IBTUAn0FKgd3sukSRhSQVwxO74LkgECRYV3R8LyuFxftfFIeVggZCfWw4jDoIfYgoYPpk0TSEMXBJA
        """
        And the body is:
        """
        {"id":"1","type":"test","tenantAlias":"testing","live":false,"created":1}
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
        {"type":"SUBMIT","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
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
        {"type":"VALIDATE","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
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
        {"type":"INTROSPECTION","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
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
        {"type":"INITIAL_DATA","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
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
        {"type":"SUBMIT","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
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
        {"id":"1","type":"test","tenantAlias":"testing","live":false,"created":1}
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
        {"type":"SUBMIT","tenantAlias":"testing","form":{"key":"test-form"},"formData":{},"formSubmissionRecordId":"1","dateSubmitted":1}
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
        Given a default integration service
        And there is a POST request to <route>
        And the X-HOOK-JWS-RFC-7797 header is:
        """
        <header>
        """
        When the request is sent
        Then the response status will be 403
        And the response will be:
        """
        { "errorCode": "PERMISSION_DENIED", "error": "<error>" }
        """

        Examples:
            | route    | header         | error                                                           |
            | /form    |                | Permission denied - JWT validation failed: jwt must be provided |
            | /form    | notAJWT        | Permission denied - JWT validation failed: jwt malformed        |
            | /webhook |                | Permission denied - JWT validation failed: jwt must be provided |
            | /webhook | notAJWT        | Permission denied - JWT validation failed: jwt malformed        |
