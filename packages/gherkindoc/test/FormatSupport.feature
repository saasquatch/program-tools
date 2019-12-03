Feature: Formatting support


    Scenario: Doc strings show up in the XLSX

        Doc strings are often used for JSON blocks and other long-form content.
        The XLSX should be able to show that content.

        Given a feature file
            """
            Feature: Lorem ipsum

                Scenario: With dostring
                    Given: A docstring
                        \"\"\"
                        Look at me! I am a doc string!
                        \"\"\"
            """
        When it's formatted into an XLSX document
        Then the docstring should be rendered into a multi-line cell with all the content visible

    Scenario: Descriptions on scenarios

        It's not well know, but it is possible document a scenario with a block of text before the
        steps like Given, When and Then.
        The XLSX should be able to show that content.

        Given a feature file
            """
            Feature: Lorem ipsum

                Scenario: Description

                    Look I am a descrpition about the scenario

                    Given: An ignored step
                        """
        When it's formatted into an XLSX document
        Then the docstring should be rendered into a multi-line cell with all the content visible