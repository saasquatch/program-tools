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
const xlsx_populate_1 = require("xlsx-populate");
const chalk_1 = require("chalk");
const json_1 = require("../util/json");
const xlsx_1 = require("../util/xlsx");
const styles_1 = require("../util/styles");
const fio_1 = require("../util/fio");
exports.command = 'xlsx';
exports.desc = 'Parse the provided file or directory into XLSX';
const NUM_CONTENT_ROWS = 30;
const COLUMN_WIDTH_PADDING = 1.5;
exports.handler = (argv) => __awaiter(this, void 0, void 0, function* () {
    argv._.shift();
    const args = argv._;
    if (args.length !== 1) {
        console.log('Wrong number of arguments.');
        console.log('Pass a .feature file or directory.');
        return;
    }
    const outFile = fio_1.getOutputFileName(argv.out);
    const files = fio_1.isDir(args[0]) ? fio_1.gherkins(args[0]) : [args[0]];
    const json = yield json_1.generate(files);
    const wb = yield xlsx_populate_1.default.blankFromAsync();
    const testers = argv.testers || 0;
    const toc = {};
    wb.creator = `${json.configuration.program} v${json.configuration.version}`;
    wb.created = new Date(json.configuration.generatedOnTimestamp);
    wb.modified = new Date(json.configuration.generatedOnTimestamp);
    wb.addSheet('TOC');
    json.features.forEach(feature => {
        const name = feature.feature.name.replace(/\s/g, '').toUpperCase();
        const ws = wb.addSheet(name);
        const maxWidths = {};
        const allRelativePaths = fio_1.getAllPaths(feature.relativeFolder);
        let curr = toc;
        allRelativePaths.forEach((path, index) => {
            if (!curr[path]) {
                curr[path] = {
                    title: path,
                    sheets: [],
                    subdirs: {}
                };
            }
            if (index < allRelativePaths.length - 1) {
                curr = curr[path].subdirs;
            }
            else {
                curr = curr[path];
            }
        });
        curr.sheets.push({ name, id: ws.id });
        // ws.state = 'visible';
        // ws.views = [{
        //   state: 'frozen',
        //   ySplit: 1
        // }];
        xlsx_1.setupTable(ws, name, testers, NUM_CONTENT_ROWS, maxWidths);
        if (feature.feature.tags.length > 0) {
            ws.addRow({ content0: 'Tags:', content1: feature.feature.tags.join(', ') });
            ws.lastRow.font = styles_1.styles.light;
        }
        ws.addRow();
        if (feature.feature.description) {
            ws.addRow({ content0: feature.feature.description.replace(/\n +/g, '\n').trim() });
            ws.lastRow.height = (feature.feature.description.split(/\r\n|\r|\n/).length - 1) * 11 + 15;
            ws.addRow();
        }
        feature.feature.featureElements.forEach(scenario => {
            genScenarioContent(ws, scenario, testers, maxWidths);
        });
        for (let key in maxWidths) {
            ws.getColumn(key).width = maxWidths[key] + COLUMN_WIDTH_PADDING;
        }
    });
    genTocTable(wb, toc, testers);
    wb.xlsx.writeFile(outFile)
        .then(() => {
        console.log(`${chalk_1.default.green('Success')}: Sheets generated & written to ${outFile}`);
    })
        .catch(err => {
        console.log(`${chalk_1.default.red('ERROR')}: ${err.message}`);
    });
});
const genTocTable = (wb, toc, testers) => {
    const ws = wb.getWorksheet('TOC');
    xlsx_1.setupTable(ws, 'Sections', testers, NUM_CONTENT_ROWS);
    generateSheetStructure(ws, toc, 0);
};
/* _recursive_ */
const generateSheetStructure = (ws, dir, indentLevel) => {
    for (let key in dir) {
        ws.addRow({ name: dir[key].title });
        dir[key].sheets.forEach(sheet => {
            ws.addRow({
                [`content${indentLevel}`]: {
                    text: sheet.name,
                    hyperlink: `#'${sheet.name}'.A1`
                }
            });
            console.log(ws.lastRow.getCell(4).value);
        });
        for (let subkey in dir.subdirs) {
            generateSheetStructure(ws, dir.subdirs[subkey], indentLevel + 1);
        }
    }
};
const genScenarioContent = (ws, scenario, testers, maxWidths) => {
    scenario.beforeComments.forEach(comment => {
        ws.addRow({ content0: comment });
        ws.lastRow.font = styles_1.styles.light;
    });
    ws.addRow({ content0: scenario.name });
    ws.lastRow.font = styles_1.styles.bold;
    if (scenario.tags) {
        ws.addRow({ content0: 'Tags:', content1: scenario.tags.join(', ') });
        ws.lastRow.font = styles_1.styles.light;
    }
    ws.addRow();
    scenario.steps.forEach(step => {
        genStepContent(ws, step, testers, maxWidths);
    });
    if (scenario.examples.length > 0) {
        ws.addRow();
    }
    scenario.examples.forEach(example => {
        genExampleTable(ws, example, testers || 0, maxWidths);
    });
    scenario.afterComments.forEach(comment => {
        ws.addRow({ content0: comment });
        ws.lastRow.font = styles_1.styles.light;
    });
    ws.addRow();
};
const genStepContent = (ws, step, testers, maxWidths) => {
    step.beforeComments.forEach(comment => {
        ws.addRow({ content1: comment });
        ws.lastRow.font = styles_1.styles.light;
    });
    ws.addRow({ content1: step.rawKeyword, content2: step.text });
    ws.lastRow.getCell(3 + testers).font = styles_1.styles.bold;
    ws.lastRow.getCell(3 + testers).alignment = styles_1.styles.keywordAlignment;
    step.afterComments.forEach(comment => {
        ws.addRow({ content1: comment });
        ws.lastRow.font = styles_1.styles.light;
    });
    if (step.dataTable) {
        genDataTable(ws, step.dataTable, testers || 0, maxWidths);
    }
};
const genExampleTable = (ws, example, testers, maxWidths) => {
    example.beforeComments.forEach(comment => {
        ws.addRow({ content0: comment });
        ws.lastRow.font = styles_1.styles.light;
    });
    ws.addRow({ content0: 'Examples:' });
    const headerRow = {};
    const cellsToStyle = [];
    example.header.forEach((header, index) => {
        const key = `content${index + 2}`;
        headerRow[key] = header;
        if (maxWidths[key] < header.toString().length) {
            maxWidths[key] = header.toString().length;
        }
        cellsToStyle.push(index + 4 + testers);
    });
    ws.addRow(headerRow);
    ws.lastRow.font = styles_1.styles.boldItalic;
    cellsToStyle.forEach(cellNum => {
        ws.lastRow.getCell(cellNum).fill = styles_1.styles.blueFill;
        ws.lastRow.getCell(cellNum).border = styles_1.styles.fullBorder;
    });
    example.data.forEach(row => {
        const cellsToStyle = [];
        const contentRow = {};
        row.forEach((entry, index) => {
            const key = `content${index + 2}`;
            contentRow[key] = entry;
            if (maxWidths[key] < entry.toString().length) {
                maxWidths[key] = entry.toString().length;
            }
            cellsToStyle.push(index + 4 + testers);
        });
        ws.addRow(contentRow);
        cellsToStyle.forEach(cellNum => {
            ws.lastRow.getCell(cellNum).border = styles_1.styles.fullBorder;
        });
    });
    example.afterComments.forEach(comment => {
        ws.addRow({ content0: comment });
        ws.lastRow.font = styles_1.styles.light;
    });
};
const genDataTable = (ws, table, testers, maxWidths) => {
    if (table.length === 0) {
        return;
    }
    const headerRow = {};
    const cellsToStyle = [];
    table[0].forEach((header, index) => {
        const key = `content${index + 2}`;
        headerRow[key] = header;
        if (maxWidths[key] < header.toString().length) {
            maxWidths[key] = header.toString().length;
        }
        cellsToStyle.push(index + 4 + testers);
    });
    ws.addRow(headerRow);
    ws.lastRow.font = styles_1.styles.boldItalic;
    cellsToStyle.forEach(cellNum => {
        ws.lastRow.getCell(cellNum).fill = styles_1.styles.blueFill;
        ws.lastRow.getCell(cellNum).border = styles_1.styles.fullBorder;
    });
    table.shift();
    table.forEach(row => {
        const cellsToStyle = [];
        const contentRow = {};
        row.forEach((entry, index) => {
            const key = `content${index + 2}`;
            contentRow[key] = entry;
            if (maxWidths[key] < entry.toString().length) {
                maxWidths[key] = entry.toString().length;
            }
            cellsToStyle.push(index + 4 + testers);
        });
        ws.addRow(contentRow);
        cellsToStyle.forEach(cellNum => {
            ws.lastRow.getCell(cellNum).border = styles_1.styles.fullBorder;
        });
    });
};
