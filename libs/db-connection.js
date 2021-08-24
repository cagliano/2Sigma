const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/chart', {
  // useMongoClient: true // parametro di connessione vecchio
  useNewUrlParser: true, // nuovo parametro di connessione
  useUnifiedTopology: true
});

mongoose.connection
  .once('open', () => console.info('Connesso al Database'))
  .on('error', err => console.error(err));
