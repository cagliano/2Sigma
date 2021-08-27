const csvFilePath = '/var/www/html/ProvaJs/Prodotto.csv';
const csv = require('csvtojson');
const wget = require('node-wget-promise');
const UrlDaScaricare = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2MgBgmyF56zNU1-Li6LtixM9lpitxFvubsTDh3zjA_9PtOWb1jDuryQjJrg9dSrYZHduG2KdRu1eB/pub?output=csv'
const fs = require('fs');
const FileScritto= 'Cliente.json'

wget(UrlDaScaricare, {
  onStart: console.log('parto'),
  onProgress: console.log('procedo'),
  output: csvFilePath
}).then(DaCsvAFileJson);



function DaCsvAFileJson() {
  csv()
    .fromFile(csvFilePath)
    .then((giuseppe) => {
      console.log('Scritto '+ csvFilePath);
      scrivi(giuseppe);
    })
};

function scrivi(cosascrivo) {
  fs.writeFileSync(FileScritto, JSON.stringify(cosascrivo), function (err) {
    if (err) return console.log(err);
    console.log('Scritto Cliente.Json');
  })
  fs.unlinkSync(csvFilePath);
  console.log('Cancellato ' + csvFilePath );
  let rawdata = fs.readFileSync(FileScritto);
   let student = JSON.parse(rawdata);
  console.log(student[0].Cliente);
};
