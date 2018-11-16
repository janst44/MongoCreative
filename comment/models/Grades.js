var mongoose = require('mongoose');
var GradeSchema = new mongoose.Schema({
  title: String,
  letter: String,
  semester: String,
});

GradeSchema.methods.changeletter = function(cb, newletter) {
  this.letter = newletter;
  this.save(cb);
};

mongoose.model('Grade', GradeSchema);
