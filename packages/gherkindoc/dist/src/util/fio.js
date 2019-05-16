"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const glob_1 = require("glob");
const moment_1 = require("moment");
exports.isDir = (path) => {
    return fs_1.statSync(path).isDirectory();
};
exports.gherkins = (dir) => {
    return glob_1.default.sync(`${dir}/**/*.feature`);
};
exports.getOutputFileName = (input) => {
    const defaultFileName = `gherkindoc--${moment_1.default().format('YYYY-MM-DD--HH-mm-ss')}.xlsx`;
    if (!input) {
        return defaultFileName;
    }
    if (exports.isDir(input)) {
        return `${input}/${defaultFileName}`;
    }
    else {
        return input;
    }
};
exports.getAllPaths = (file) => {
    return path_1.dirname(file).split('/');
};
