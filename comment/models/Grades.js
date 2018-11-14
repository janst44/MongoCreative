var mongoose = require('mongoose');
var GradeSchema = new mongoose.Schema({
  title: String,
  letter: String,
});
// GradeSchema.methods.upvote = function(cb) {
//   this.upvotes += 1;
//   this.save(cb);
// };

mongoose.model('Grade', GradeSchema);
