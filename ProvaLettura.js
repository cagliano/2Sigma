var wget = require('node-wget');
 
wget({
  url:  'https://docs.google.com/spreadsheets/d/e/2PACX-1vR2MgBgmyF56zNU1-Li6LtixM9lpitxFvubsTDh3zjA_9PtOWb1jDuryQjJrg9dSrYZHduG2KdRu1eB/pub?output=csv',
  dest: '/home/ubuntu/2Sigma/Prodotto.csv',      // destination path or path with filenname, default is ./
  timeout: 2000       // duration to wait for request fulfillment in milliseconds, default is 2 seconds
},
function (error, response, body) {
  if (error) {
      console.log('--- error:');
      console.log(error);            // error encountered
  } else {
      console.log('--- headers:');
      console.log(response.headers); // response headers
      console.log('--- body:');
      console.log(body);             // content of package
  }
}
);