# SaaSquatch Program Test Suite

This package contains everything needed to facilitate blackbox unit testing of the
SaaSquatch programs. It includes a family of default Cucumber step definitions and tools
for simulated execution of the programs.

## Installation

```bash
npm install -D @saasquatch/program-test-suite
```

## Usage

The program test suite is based on the Node.js test runner (`node:test`) and requires
Node.js 24 or later.

Use the `runProgramTests` function to register the tests. Here is an example of a typical
test file:

```typescript
// Import your program from the source code. This is a `types.rpc.Program` that you would
// pass to program-boilerplate
import { program } from "../src/program.ts";
import { runProgramTests } from "@saasquatch/program-test-suite";

// Any additional custom steps you need for this particular program. Steps are registered
// with `Given`, `When` and `Then` when the module is imported, so import them before
// calling `runProgramTests`
import "./steps.ts";

await runProgramTests({
  program,
  // Path to the .feature files containing the unit test steps
  featurePath: "__tests__/features/unit",
  // Path to the program schema
  schema: "src/schema/birthday-program_schema.json",
  // Default program template and program rules to use while testing
  templateFile: "__tests__/defaults/template.json",
  rulesFile: "__tests__/defaults/rules.json",
});
```

Custom steps are defined with Cucumber Expressions or regular expressions. A doc string
argument is passed as a string and a data table argument is passed as a `DataTable`:

```typescript
import { type DataTable, Given } from "@saasquatch/program-test-suite";

Given("the user has {int} referrals", (count: number) => {
  // ...
});

Given("the following users exist:", (table: DataTable) => {
  for (const row of table.hashes()) {
    // ...
  }
});
```

Run the tests with `node --test`.
