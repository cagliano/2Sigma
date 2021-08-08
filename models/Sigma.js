var mongoose = require('mongoose');
var SigmaSchema = new mongoose.Schema(
  {
    Orario: {type: Date},
    Sigma: {type: Number},
  });
module.exports = mongoose.model('SigmaModello', SigmaSchema);
