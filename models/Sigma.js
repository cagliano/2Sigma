const { DateTime } = require("luxon");


var mongoose = require('mongoose');
var SigmaSchema = new mongoose.Schema(
  {
    Orario: {type: Date},
    Sigma: {type: Number},
  });

SigmaSchema
.virtual('OrarioFormattato')
.get(function () {
  return DateTime.fromJSDate(this.Orario).setLocale('fr').toLocaleString(DateTime.DATETIME_MED);
});

module.exports = mongoose.model('SigmaModello', SigmaSchema);
