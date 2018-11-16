var mongoose = require('mongoose');
var SemesterSchema = new mongoose.Schema({
  semester: String,
});


mongoose.model('Semester', SemesterSchema);