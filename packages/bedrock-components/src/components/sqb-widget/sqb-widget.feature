@owner:sam
@author:sam

Feature: Widget

    Loads and renders a global or program widget 

    Scenario: The entrypoint loads a specified widget
        Given the "widget-type" props is set to a valid widget type
        Then the portal entrypoint will load the specified widget

    Scenario: Widget load events occur when the widget is loaded
        Given there is an sqb-widget set to the widget key for "program-a"
        When the widget renders
        Then the contents for "program-a" will be displayed
        And a widget load event will occur
