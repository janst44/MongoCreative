var mongoose = require('mongoose');
var GradeSchema = new mongoose.Schema({
  title: String,
  upvotes: {type: Number, default: 0},
});
GradeSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

mongoose.model('Grade', GradeSchema);
