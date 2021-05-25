Feature: Route

  Route is a replacement for template tags. For use with Router.

  Scenario: Path
    Given the path prop is "/"
    And this Route component is a child of a Router component
    When the Router component is rendered
    Then this Route component will be rendered