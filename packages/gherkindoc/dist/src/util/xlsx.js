"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const styles_1 = require("./styles");
exports.setupTable = (ws, tableName, testers, contentRows, maxWidths) => {
    const wscolumns = [
        { header: tableName, key: 'name', width: 9 },
    ];
    for (let i = 0; i < testers; i++) {
        const text = `Tester ${i + 1}`;
        wscolumns.unshift({ header: text, key: `tester${i}`, width: text.length });
    }
    for (let i = 0; i < contentRows; i++) {
        const key = `content${i}`;
        wscolumns.push({ header: '', key, width: 9 });
        if (i > 1 && maxWidths) {
            maxWidths[key] = 9;
        }
    }
    ws.columns = wscolumns;
    ws.getRow(1).font = styles_1.styles.bold; // Set the top row to bold (rows are 1-indexed...)
};
