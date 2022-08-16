# JSONata Paths Extractor

### Installation

Using npm or yarn the package can be installed

`npm i @saasquatch/jsonata-paths-extractor`

## Usage

A single function is exported as the default export. The function accepts JSONata ASTs as input and returns the paths found in the AST.

For more detail on behaviour, see `test/paths.feature`

_Example usage:_

```ts
import extractJSONataPaths from '@saasquatch/jsonata-paths-extractor';
import jsonata from 'jsonata';

const exampleJsonataExpression =
  'example.jsonata.path = "a string" ? example.two : example[two="test"].name^(<three)';

const ast = jsonata(exampleJsonataExpression).ast();

const paths = extractJSONataPaths(ast);
// paths: ["/example/jsonata/path","/example/two","/example/name","/example/two","/example/name/three"]
```
