@author:derek
@owner:derek
Feature: Navigation Sidebar

    Background: Navigation sidebar is populated with items
        Given the following navigation sidebar
            """
            <sqm-navigation-sidebar>
            <sqm-navigation-sidebar-item
            path="/"
            icon="house"
            label="Dashboard"
            ></sqm-navigation-sidebar-item>
            <sqm-navigation-sidebar-item
            path="/activity"
            icon="bar-chart"
            label="Activity"
            ></sqm-navigation-sidebar-item>
            <sqm-navigation-sidebar-item
            path="/editProfile"
            icon="person"
            label="Edit Profile"
            ></sqm-navigation-sidebar-item>
            <sqm-navigation-sidebar-item
            path="/logout"
            icon="box-arrow-right"
            label="Logout"
            ></sqm-navigation-sidebar-item>
            </sqm-navigation-sidebar>
            """

    @motivating
    Scenario: The desktop sidebar displays all of the navigation links
        Given a user viewing on a screen larger than 799px
        Then they see the full width sidebar
        And they see all the sidebar items
        And it is not expandable
        And it is not collapsable

    @motivating
    Scenario: The mobile sidebar can be expanded and collapsed
        Given a user viewing the sidebar on a screen smaller than 800px
        Then they see the mobile sidebar with a hamburger menu icon at the top
        When they click the hamburger icon
        Then the sidebar expands to fill the screen
        And they see all the sidebar items
        And they see a "X" icon in the top left hand corner
        When they click the "X" icon
        Then the sidebar collapses

    @landmine
    Scenario: Clicking an item the mobile sidebar redirects but does not close the sidebar
        Given a user viewing the sidebar on a screen smaller than 800px
        And it is expanded
        When they click on a sidebar item
        Then they are redirect 
        But the sidebar is not closed automatically
        When they click "X"
        Then they see the new page

    @minutia
    Scenario: The mobile sidebar is sticky
        Given a user viewing the sidebar on a screen smaller than 800px
        When they scroll down the page
        Then the hamburger icon remains at the top of the sidebar as they scroll