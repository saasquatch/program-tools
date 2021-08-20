import fs from "fs";
import path from "path";
import { Command } from "commander";
import chalk from "chalk";
import validateProjectName from "validate-npm-package-name";

import packageJson from "./package.json";

// const devDependencies = ["typescript"];
// const dependencies = ["@saasquatch/integration-boilerplate-node"];

let packageName: string | undefined;

const program = new Command(packageJson.name);
program
  .version(packageJson.version)
  .arguments("<project-directory>")
  .usage(`${chalk.green("<project-directory>")} [options]`)
  .action((name) => (packageName = name))
  .parse(process.argv);

if (!packageName) {
  process.exit(1);
}

// const root = path.resolve(packageName);

const validationResult = validateProjectName(packageName);
if (!validationResult.validForNewPackages) {
  console.error(
    chalk.red(
      `Cannot create a project named ${chalk.green(
        packageName
      )} because of npm naming restrictions:\n`
    )
  );
  [
    ...(validationResult.errors || []),
    ...(validationResult.warnings || []),
  ].forEach((error) => {
    console.error(chalk.red(`  * ${error}`));
  });
  console.error(chalk.red("\nPlease choose a different project name."));
  process.exit(1);
}

if (fs.existsSync(packageName)) {
  console.error(
    chalk.red(
      `The project directory ${chalk.green(
        packageName
      )} already exists, please choose a different project name.`
    )
  );
  process.exit(1);
}

fs.mkdirSync(packageName);

// if (dependencies.includes(appName)) {
//   console.error(
//     chalk.red(
//       `Cannot create a project named ${chalk.green(
//         `"${appName}"`
//       )} because a dependency with the same name exists.\n` +
//         `Due to the way npm works, the following names are not allowed:\n\n`
//     ) +
//       chalk.cyan(dependencies.map(depName => `  ${depName}`).join('\n')) +
//       chalk.red('\n\nPlease choose a different project name.')
//   );
//   process.exit(1);
// }
