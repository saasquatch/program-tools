# SaaSquatch Program Test Suite

This package contains everything needed to facilitate blackbox unit testing of the
SaaSquatch programs. It includes a family of default Cucumber step definitions and tools
for simulated execution of the programs.

## Installation

```bash
npm install -D @saasquatch/program-test-suite
```

## Usage

The program test suite is based on Jest. Place the following inside your Jest config:

```typescript
import { jestConfig } from "@saasquatch/program-test-suite";
export default jestConfig;
```

Use the `runProgramTests` function to execute the tests. Here is an example of a typical
test program:

```typescript
// Import your program from the source code. This is a `types.rpc.Program` that you would
// pass to program-boilerplate
import { program } from "../src/program";
import { runProgramTests } from "@saasquatch/program-test-suite";

// Any additional custom steps you need for this particular program
import steps from "./steps";

runProgramTests(
  program,
  // Path to the .feature files containing the unit test steps
  "__tests__/features/unit",
  steps,
  // Path to the program schema
  "src/schema/birthday-program_schema.json",
  // Default program template and program rules to use while testing
  "__tests__/defaults/template.json",
  "__tests__/defaults/rules.json"
);
```
