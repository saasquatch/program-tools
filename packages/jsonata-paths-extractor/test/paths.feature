Feature: JSONata paths extractor

  Scenario Outline: Paths are extracted as JSON pointers
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr                             | result                                    |
      | path.to.deeply.nested.field      | ["/path/to/deeply/nested/field"]          |
      | path.one ? path.two : path.three | ["/path/one", "/path/two", "/path/three"] |

  Scenario Outline: Filters, sorts and groups are added as additional paths
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr                                              | result                                                                     |
      | path[filter="test"].to.deeply^(sort).nested.field | ["/path/to/deeply/nested/field", "/path/filter", "/path/to/deeply/sort"]   |
      | path.group{ one: two * three}                     | ["/path/group", "/path/group/one", "/path/group/two", "/path/group/three"] |

  Scenario Outline: wildcard, descendants and parents cause paths to end
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr                                  | result                 |
      | before.wildcard.*.after.wildcard      | ["/before/wildcard"]   |
      | before.parent.%.after.parent          | ["/before/parent"]     |
      | before.descendant.**.after.descendant | ["/before/descendant"] |

  Scenario Outline: No paths or ambiguous paths return []
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr         | result |
      | 3 < 4 ? true | []     |
      | (* ? ** : %) | []     |

  Scenario: Invalid expressions return []
    Given the JSONata expression "!@^*%@@!"
    When the paths are extracted
    Then the result is []

  Scenario Outline: filters, sorts and groups after wildcard, descendants and parents return []
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr                                            | result               |
      | before.wildcard.*.after[filter="test"].wildcard | ["/before/wildcard"] |
      | before.wildcard.*.after^(sort).wildcard         | ["/before/wildcard"] |
      | before.wildcard.*.after.wildcard{ group: ing}   | ["/before/wildcard"] |

  Scenario Outline: Variables assigned to paths are tracked
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr                         | result                       |
      | ($foo := bar; $foo.buzz)     | ["/bar","/bar/buzz"]         |
      | ($foo := bar.bat; $foo.buzz) | ["/bar/bat","/bar/bat/buzz"] |

  Scenario Outline: $$ resets the path to start from the root context
    Given the JSONata expression "<expr>"
    When the paths are extracted
    Then the result is <result>

    Examples:
      | expr                                                      | result                                                             |
      | (before.wildcard.*.after[$$$.filter.nested=\""].wildcard) | ["/before/wildcard", "/filter/nested"]                             |
      | path.to.deeply.nested.field[$$$.filter = true]            | ["/path/to/deeply/nested/field","/filter"]                         |
      | path.to.deeply.nested{$$$.group : field}                  | ["/path/to/deeply/nested","/group","/path/to/deeply/nested/field"] |
      | ($foo := $$$.bar.bat;bar.buzz[$foo="test"].boom)          | ["/bar/bat","/bar/buzz/boom"]                                      |


