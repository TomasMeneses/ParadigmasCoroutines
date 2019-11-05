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
        console.log('CSV file successfully processed');
    });


function* newFunction(row) {
    countLines++;
    rowArray.push(row);
    if (countLines % 1000 == 0) {
        yield rowArray;
        rowArray = [];
    }
}

function escreveCsv(row) {
    for (const value of newFunction(row)) {
        csvWriter
            .writeRecords(value)
            .then(() => console.log('The CSV file was written successfully'));
    }

}

// function* delays() {
//     let a = yield delay(800, "Hello, I'm an");
//     console.log(a);

//     let b = yield delay(400, "async coroutine!");
//     console.log(b);
// }

// const coroutine = nextValue => iterator => {
//     const { done, value } = iterator.next(nextValue);

//     if (done) {
//         return;
//     }

//     if (value.constructor === Promise) {
//         value.then(promiseValue => {
//             coroutine(promiseValue)(iterator);
//         });
//     } else {
//         coroutine(value)(iterator);
//     }
// };

// const delay = (ms, result) =>
//     new Promise(resolve => setTimeout(() => resolve(result), ms));

// coroutine()(delays());