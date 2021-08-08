var express = require('express');
var app = express();
var server = require('http').createServer(app);
var faker = require('faker');
var port = process.env.PORT || 3000;

// user model
const SigmaRillion = require('./models/Sigma');
require('./libs/db-connection');
// view engine
app.set('view engine', 'ejs');

// routes

app.get('/', function(req,res){
 SigmaRillion.find({})
	.select('Sigma Orario -_id')
	.sort('Orario')
	.limit()
	.exec(function(err,dati){
   if (err) { return next(err); }
   var ValoriSigma = [];
	ValoriSigma= dati.map(function (obj) {
  return obj.Sigma;
});	

//l'orario non è assoluto ma in minuti dalla partenza
		var ValoriOrario = [];
// azzero l'array e poi metto come valore 0 il primo rilevamento
// tutti gli altri valori sono inseriti nell'array come delta dal primo
		ValoriOrario[0]=0
for(var i=1; i<dati.length; i++){
ValoriOrario[i] = (Math.abs(dati[i].Orario-dati[0].Orario)/60000).toFixed(2);
}
		res.render('index',{Sigma:ValoriSigma, Orario:ValoriOrario});
});
});


//la pagina generate genera valori a caso per popolare il grafico, ma non dovrebbe servire in futuro

app.get('/generate', (req, res) => {
  for (let i = 0; i < 100; i++) {
    let Orario=faker.date.recent(),
        Sigma=faker.random.number({'min': 10,'max': 50})
    SigmaRillion.create({Orario:Orario, Sigma:Sigma})
      .then(() => {})
      .catch(err => console.error(err));
  } // end for loop
  res.redirect('/');
});

server.listen(port, () => console.log(`App running on port ${port}`));


