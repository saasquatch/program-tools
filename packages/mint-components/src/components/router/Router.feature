Feature: Router

  The router allows routing between different components through a virtual history

  Scenario: Default route
    Given there is a route for "/"
    And there is a route for "/stuff"
    When the router renders
    Then the route for "/" will be displayed

  Scenario: Changing pages
    Given there is a route for "/"
    And there is a route for "/stuff"
    When the router renders
    Then the route for "/" will be displayed
    When "/stuff" is pushed to squatchHistory
    Then the route for "/stuff" will be displayed
    When "/" is pushed to squatchHistory
    Then the route for "/" will be displayed

  Scenario: Template has precedence over route
    Given there is a route for "/"
    And there is a template for "/"
    And there is a route for "/stuff"
    When the router renders
    Then the template for "/" will be rendered
    When "/stuff" is pushed to squatchHistory
    Then the route for "/stuff" will be displayed
    When "/" is pushed to squatchHistory
    Then the template for "/" will be displayed

  Scenario: Going back
    Given there is a route for "/"
    And there is a route for "/stuff"
    When the router renders
    Then the route for "/" will be displayed
    When "/stuff" is pushed to squatchHistory
    Then the route for "/stuff" will be displayed
    When squatchHistory pops an element
    Then the route for "/" will be displayed

  Scenario: First matching element is chosen, with precedence
    Given the following elements are declared in order on the DOM:
      | type     | path   | name   |
      | route    | /      | RootA  |
      | route    | /      | RootB  |
      | template | /      | RootC  |
      | template | /      | RootD  |
      | route    | /stuff | StuffA |
      | route    | /stuff | StuffB |
    When the router renders
    Then RootC will be rendered
    When "/stuff" is pushed to squatchHistory
    Then StuffA will be rendered
    When "/" is pushed to squatchHistory
    Then RootC will be rendered