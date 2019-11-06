const csv = require('csv-parser');
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
var rowArray = [];
var countLines = 1;
const csvWriter = createCsvWriter({
    path: 'out.csv',
    header: [
        { id: 'Year', title: 'Year' },
        { id: 'Industry_aggregation_NZSIOC', title: 'Industry_aggregation_NZSIOC' },
        { id: 'Industry_name_NZSIOC', title: 'Industry_name_NZSIOC' },
        { id: 'Units', title: 'Units' },
        { id: 'Variable_code', title: 'Variable_code' },
        { id: 'Variable_name', title: 'Variable_name' },
        { id: 'Variable_category', title: 'Variable_category' },
        { id: 'Value', title: 'Value' },
        { id: 'Industry_code_ANZSIC06', title: 'Industry_code_ANZSIC06' }
    ]
});


fs.createReadStream('data.csv')
    .pipe(csv())
    .on('data', escreveCsv)
    .on('end', () => {
        console.log('CSV Original foi totalmente lido');
    });


function* coroutineFunction(row) {
    countLines++;
    rowArray.push(row);
    if ((rowArray.length % 1000 == 0)) {
        yield rowArray;
        console.log('CSV Quebrado em parcela de 1000 linhas.');
        rowArray = [];
    }
}

function escreveCsv(row) {
    for (const arrayMilLinhas of coroutineFunction(row)) {
        csvWriter
            .writeRecords(arrayMilLinhas)
            .then(() => console.log('Parte do CSV foi escrita'));
    }

}
// tenha o node instalado
// no cmd ou terminal digite: npm i
//para executar o codigo digite no terminal: node index.js