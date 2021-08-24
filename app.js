var express = require('express');
const puppeteer = require("puppeteer");
var app = express();
var server = require('http').createServer(app);
var faker = require('faker');
var port = process.env.PORT || 3000;
var minify = require('express-minify');


// user model
const SigmaRillion = require('./models/Sigma');
require('./libs/db-connection');
// view engine
app.set('view engine', 'ejs');
app.use(express.static('public'));
// routes

app.get('/', function (req, res) {
  SigmaRillion.find({})
    .select('Sigma Orario OrarioFormattato -_id')
    .sort('Orario')
    .limit()
    .exec(function (err, dati) {
      if (err) { return next(err); }
      var ValoriSigma = [];
      ValoriSigma = dati.map(function (obj) {
        return obj.Sigma;
      });
      //l'orario non è assoluto ma in minuti dalla partenza
      var ValoriOrario = [];
      // azzero l'array e poi metto come valore 0 il primo rilevamento
      // tutti gli altri valori sono inseriti nell'array come delta dal primo
      ValoriOrario[0] = 0
      for (var i = 1; i < dati.length; i++) {
        ValoriOrario[i] = (Math.abs(dati[i].Orario - dati[0].Orario) / 60000).toFixed(2);
      }
      var sum = 0;
      for (var i = 0; i < dati.length; i++) {
        sum += dati[i].Sigma
      }
      var SigmaMedio = Math.abs(sum / i).toFixed(2);




      res.render('ProvaBootstrap', { Sigma: ValoriSigma, Orario: ValoriOrario, Inizio: dati[0].OrarioFormattato, Fine: dati[dati.length - 1].OrarioFormattato, Medio: SigmaMedio, EstremoInferiore: 23, EstremoSuperiore: 89 });
    });
});

//la pagina generate genera valori a caso per popolare il grafico, ma non dovrebbe servire in futuro


const url = "http://localhost:3000/";
app.get("/pdf", async (req, res) => {
  const browser = await puppeteer.launch({
    headless: true
  });
  const webPage = await browser.newPage();
  await webPage.goto(url, {
    waitUntil: "networkidle0"
  });
  await webPage.addStyleTag({ content: 'canvas#Grafico2Sigma { display: block; height: 366px !important; width: 892px !important;}'  })  
  const pdf = await webPage.pdf({
  printBackground: false,
  landscape: true,
  format: "A4",
  path: '/home/ubuntu/2Sigma/landscappa.pdf'
  });
  await browser.close();
  res.contentType("application/pdf");
  res.send(pdf);
})


server.listen(port, () => console.log(`L'applicazione sta girando sulla porta ${port}`));