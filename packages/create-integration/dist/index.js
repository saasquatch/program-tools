"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var commander_1 = require("commander");
var chalk_1 = __importDefault(require("chalk"));
var validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
var package_json_1 = __importDefault(require("./package.json"));
// const devDependencies = ["typescript"];
// const dependencies = ["@saasquatch/integration-boilerplate-node"];
var packageName;
var program = new commander_1.Command(package_json_1.default.name);
program
    .version(package_json_1.default.version)
    .arguments("<project-directory>")
    .usage(chalk_1.default.green("<project-directory>") + " [options]")
    .action(function (name) { return (packageName = name); })
    .parse(process.argv);
if (!packageName) {
    process.exit(1);
}
// const root = path.resolve(packageName);
var validationResult = validate_npm_package_name_1.default(packageName);
if (!validationResult.validForNewPackages) {
    console.error(chalk_1.default.red("Cannot create a project named " + chalk_1.default.green(packageName) + " because of npm naming restrictions:\n"));
    __spreadArray(__spreadArray([], (validationResult.errors || [])), (validationResult.warnings || [])).forEach(function (error) {
        console.error(chalk_1.default.red("  * " + error));
    });
    console.error(chalk_1.default.red("\nPlease choose a different project name."));
    process.exit(1);
}
if (fs_1.default.existsSync(packageName)) {
    console.error(chalk_1.default.red("The project directory " + chalk_1.default.green(packageName) + " already exists, please choose a different project name."));
    process.exit(1);
}
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
