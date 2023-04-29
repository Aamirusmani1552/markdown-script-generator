import { log } from 'console';
import * as fs from 'fs';

const csvFilePath = './opcodes.csv';
const outputFilePath = './table.md';

async function generateMDFile() {
    //reading the file
    const csvData = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    // spliiting the data row by row
    const rows = csvData.split('\n').filter(Boolean);
    
    // Extracting the column headers from the first row
    const headers = rows.shift()?.split(',');

    // Building the table header row
    const headerRow = `| ${headers?.join(' | ')} |`;

    // Building the table divider row
    const dividerRow = `|${Array(headers?.length).fill(' --- ').join('|')}|`;

    // Building the table body rows
    const bodyRows = rows.map(row => `| ${row.split(',').join(' | ')} |`);

    // Combining the table parts into a single Markdown table
    const table = `${headerRow}\n${dividerRow}\n${bodyRows.join('\n')}\n`;

    // Writing the Markdown table to output file
    fs.writeFileSync(outputFilePath, table);
}

async function main() {
    try {
        log("generating table...");
        await generateMDFile()
        log("done");
    } catch (error) {
        const err = error as Error;
        log("Error: " + err.message);
    }
}

main();