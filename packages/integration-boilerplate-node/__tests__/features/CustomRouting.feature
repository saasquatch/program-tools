Feature: Custom Routing

    Scenario: Custom routers are called
        Given an integration service with a custom router
        And there is a GET request to /test
        When the request is sent
        Then the response status will be 200
        And the response will be:
            """
            {
                "custom": "result"
            }
            """

    Scenario: Custom routes can make use of the tenant-scoped token validation middleware
        Given an integration service with a custom router that requires a tenant-scoped token
        And there is a GET request to /test
        And the Authorization header is:
            """
            Bearer eyJraWQiOiJoTFgveWRXdzRDMG13ZHJ2eVBoVVltZENrRDg9IiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0aW5nQHRlbmFudHMiLCJhdWQiOiJTQUFTUVVBVENIX0FVVEgwX0NMSUVOVF9JREBjbGllbnRzLm1hY2hpbmVzLnNhYXNxdWF0LmNoIiwiaXNzIjoiaHR0cHM6Ly9tb2NrZWRfc2Fhc3F1YXRjaC8iLCJpbnRlZ3JhdGlvbiI6IlRlc3QgSW50ZWdyYXRpb24iLCJpYXQiOjE2MjQwMzc0OTV9.etIoxOhQlfaVZSnkKPd6bv3PXCtiZDCoqPsxq7NR9tHNzR60KG054_GJABT5yAkbB8o41P5zDL5zQWQJI7Y6fwu4ab6_V_wLITrDzOY-GzNOI2gW5GPGBwHx_gs6Tha3Pf3ADjjO6KqxoecJV983OuUDPr8aWjW_mTeKWr98G-Ou7hVhUSXugIarOyz3hDKEC1ByL_DVFCChg-GTHPvGXAPkmWUeu3W51Pv0WeGldbInqIHKUFtPNIrNSeUkg-p0ShnVB0MS0UCNFyYIc-9eqrnCH8sxIXZH_NgLrta-iQG9Xnwcr7AfwUKI-KrAj_L--NmY2PjbYCisNRvvE7evKQ
            """
        When the request is sent
        Then the response status will be 200
        And the response will be:
            """
            {
                "tenantAlias": "testing"
            }
            """

    Scenario: Custom routes can make GraphQL queries against the tenant
        Given an integration service with a custom router that makes a GraphQL query
        And there is a GET request to /test
        And the Authorization header is:
            """
            Bearer eyJraWQiOiJoTFgveWRXdzRDMG13ZHJ2eVBoVVltZENrRDg9IiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJ0ZXN0aW5nQHRlbmFudHMiLCJhdWQiOiJTQUFTUVVBVENIX0FVVEgwX0NMSUVOVF9JREBjbGllbnRzLm1hY2hpbmVzLnNhYXNxdWF0LmNoIiwiaXNzIjoiaHR0cHM6Ly9tb2NrZWRfc2Fhc3F1YXRjaC8iLCJpbnRlZ3JhdGlvbiI6IlRlc3QgSW50ZWdyYXRpb24iLCJpYXQiOjE2MjQwMzc0OTV9.etIoxOhQlfaVZSnkKPd6bv3PXCtiZDCoqPsxq7NR9tHNzR60KG054_GJABT5yAkbB8o41P5zDL5zQWQJI7Y6fwu4ab6_V_wLITrDzOY-GzNOI2gW5GPGBwHx_gs6Tha3Pf3ADjjO6KqxoecJV983OuUDPr8aWjW_mTeKWr98G-Ou7hVhUSXugIarOyz3hDKEC1ByL_DVFCChg-GTHPvGXAPkmWUeu3W51Pv0WeGldbInqIHKUFtPNIrNSeUkg-p0ShnVB0MS0UCNFyYIc-9eqrnCH8sxIXZH_NgLrta-iQG9Xnwcr7AfwUKI-KrAj_L--NmY2PjbYCisNRvvE7evKQ
            """
        When the request is sent
        Then the response status will be 200
        And the response will be:
            """
            {
                "data": {
                    "tenantAlias": "testing"
                }
            }
            """

    Scenario Outline: Tenant-scoped token validation middleware fails if JWT is invalid
        Given an integration service with a custom router that requires a tenant-scoped token
        And there is a GET request to /test
        And the Authorization header is:
            """
            <header>
            """
        When the request is sent
        Then the response status will be 403
        And the response will be:
            """
            {
                "errorCode": "PERMISSION_DENIED",
                "error": "Permission denied"
            }
            """

        Examples:
            | header         |
            |                |
            | Bearer         |
            | Bearer notAJWT |

