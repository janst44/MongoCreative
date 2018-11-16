var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Grade = mongoose.model('Grade');
var Semester = mongoose.model('Semester');

router.get('/grades', function(req, res, next) {
  var myObj = {};
if(req.query.currentSemester){
  myObj = {Semester: req.query.currentSemester};
}
  Grade.find(myObj, function(err, grades){
    if(err){ return next(err); }
    res.json(grades);
  });
});

router.post('/grades', function(req, res, next) {
  var grade = new Grade(req.body);
  grade.save(function(err, grade){
    if(err){ return next(err); }
    res.json(grade);
  });
});

router.param('grade', function(req, res, next, id) {
  Grade.findById(id, function (err, grade){
    if (err) { return next(err); }
    if (!grade) { return next(new Error("can't find grade")); }
    req.grade = grade;
    return next();
  });
});

router.get('/grades/:grade', function(req, res) {
  res.json(req.grade);
});

router.put('/grades/:grade/edit', function(req, res, next) {
  var newletter = req.body.letter;
  req.grade.changeletter(function(err, grade) {
    if (err) { return next(err); }
    res.json(grade)
  }, newletter);
});

router.delete('/grades/:grade', function(req, res) {
  console.log("in Delete");
  req.grade.remove();
  res.sendStatus(200);
});







router.get('/semesters', function(req, res, next) {
  Semester.find(function(err, semesters){
    if(err){ return next(err); }
    res.json(semesters);
  });
});

router.post('/semesters', function(req, res, next) {
  var semester = new Semester(req.body);
  semester.save(function(err, semester){
    if(err){ return next(err); }
    res.json(semester);
  });
});




module.exports = router;
