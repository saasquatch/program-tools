"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const json_1 = require("../util/json");
const fio_1 = require("../util/fio");
exports.command = 'json';
exports.desc = 'Parse the provided file or directory into JSON';
exports.handler = (argv) => __awaiter(this, void 0, void 0, function* () {
    argv._.shift();
    const args = argv._;
    if (args.length !== 1) {
        console.log('Wrong number of arguments.');
        console.log('Pass a .feature file or directory.');
        return;
    }
    const files = fio_1.isDir(args[0])
        ? fio_1.gherkins(args[0])
        : [args[0]];
    const json = yield json_1.generate(files);
    console.log(JSON.stringify(json, undefined, 2));
});
