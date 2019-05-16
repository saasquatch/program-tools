"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gherkin_1 = require("gherkin");
/**
 * Parses the feature file and returns the stream
 * @param {String} path The path to the feature file
 * @return {Stream} The stream of data from the Gherkin parser
 */
exports.parse = (paths) => {
    const options = {
        includeSource: false,
        includeGherkinDocument: true,
        includePickles: false,
    };
    return gherkin_1.default.fromPaths(paths, options);
};
