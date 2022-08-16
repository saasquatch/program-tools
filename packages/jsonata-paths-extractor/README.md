# JSONata Paths Extractor

### Installation

Using npm or yarn the package can be installed

`npm i @saasquatch/jsonata-paths-extractor`

## Usage

A single function is exported as the default export. The function accepts a JSONata expression as input and returns the paths found in the expression.

For more detail on behaviour, see `test/paths.feature`

_Example usage:_

```ts
import extractJSONataPaths from "@saasquatch/jsonata-paths-extractor";
import jsonata from "jsonata";

const exampleJsonataExpression =
  'example.jsonata.path = "a string" ? example.two : example[two="test"].name^(<three)';

const paths = extractJSONataPaths(exampleJsonataExpression);
// paths: ["/example/jsonata/path","/example/two","/example/name","/example/two","/example/name/three"]
```
