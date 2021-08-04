@owner:noah
@author:noah

Feature: Portal Entrypoint

    Loads a portal

    Scenario: The entrypoint loads a specified widget
        Given the "widget-type" props is set to a valid widget type
        Then the portal entrypoint will load the specified widget