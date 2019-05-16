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
const moment = require("moment");
const parser_1 = require("./parser");
const package_json_1 = require("../../package.json");
function generate(files) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const stream = parser_1.parse(files);
            let json = {
                features: [],
                summary: {
                    tags: [],
                    folders: [],
                    notTestedFolders: [],
                    scenarios: {
                        total: 0,
                        passing: 0,
                        failing: 0,
                        inconclusive: 0
                    },
                    features: {
                        total: 0,
                        passing: 0,
                        failing: 0,
                        inconclusive: 0
                    }
                },
                configuration: {
                    version: package_json_1.version,
                    program: 'gherkindoc',
                    generatedOn: moment().format(),
                    generatedOnTimestamp: moment().valueOf()
                }
            };
            stream.on('data', (chunk) => {
                const feature = chunk.gherkinDocument.feature;
                let tmp = {
                    relativeFolder: chunk.gherkinDocument.uri,
                    feature: {
                        name: feature.name,
                        description: feature.description,
                        featureElements: [],
                        tags: feature.tags.map((tag) => tag.name),
                        result: {
                            wasExecuted: false,
                            wasSuccessful: false,
                            wasProvided: false
                        }
                    },
                    result: {
                        wasExecuted: false,
                        wasSuccessful: false,
                        wasProvided: false
                    }
                };
                const comments = chunk.gherkinDocument.comments;
                feature.children.forEach(child => {
                    json.summary.scenarios.total += 1;
                    json.summary.scenarios.inconclusive += 1;
                    const examples = child.scenario.examples
                        ? child.scenario.examples.map(example => {
                            const commentsFound = commentCrawler(comments, example.location.line);
                            const exampleObj = {
                                header: example.tableHeader.cells.map(cell => cell.value),
                                data: example.tableBody.map(e => e.cells.map(cell => cell.value)),
                                beforeComments: commentsFound.before,
                                afterComments: commentsFound.after
                            };
                            return exampleObj;
                        })
                        : [];
                    const steps = child.scenario.steps.map(step => {
                        const commentsFound = commentCrawler(comments, step.location.line);
                        const stepObj = {
                            keyword: step.keyword.trim(),
                            rawKeyword: step.keyword,
                            text: step.text,
                            beforeComments: commentsFound.before,
                            afterComments: commentsFound.after
                        };
                        if (step.dataTable) {
                            stepObj.dataTable = step.dataTable.rows.map(row => {
                                return row.cells.map(cell => cell.value);
                            });
                        }
                        return stepObj;
                    });
                    const commentsFound = commentCrawler(comments, child.scenario.location.line);
                    tmp.feature.featureElements.push({
                        steps,
                        examples,
                        name: child.scenario.name,
                        description: child.scenario.description || '',
                        tags: child.scenario.tags.map(tag => tag.name),
                        result: {
                            wasExecuted: false,
                            wasSuccessful: false,
                            wasProvided: false
                        },
                        beforeComments: commentsFound.before,
                        afterComments: commentsFound.after
                    });
                });
                json.features.push(tmp);
                json.summary.features.total += 1;
                json.summary.features.inconclusive += 1;
            });
            stream.on('error', err => {
                reject(err);
            });
            stream.on('finish', () => {
                resolve(json);
            });
        });
    });
}
exports.generate = generate;
;
const commentCrawler = (comments, startingIndex) => {
    let currentIndex = startingIndex;
    let element;
    const ret = {
        before: [],
        after: []
    };
    // eslint-disable-next-line no-cond-assign
    while (element = comments.find(c => c.location.line === currentIndex - 1)) {
        ret.before.push(element.text.trim());
        currentIndex--;
    }
    currentIndex = startingIndex;
    // eslint-disable-next-line no-cond-assign
    while (element = comments.find(c => c.location.line === currentIndex + 1)) {
        ret.after.push(element.text.trim());
        currentIndex++;
    }
    return ret;
};
