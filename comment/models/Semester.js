var mongoose = require('mongoose');
var SemesterSchema = new mongoose.Schema({
  title: String,
});


mongoose.model('Semester', SemesterSchema);