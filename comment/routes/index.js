var express = require('express');
var router = express.Router();



var mongoose = require('mongoose');
var Grade = mongoose.model('Grade');

router.get('/grades', function(req, res, next) {
  Grade.find(function(err, grades){
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
  var letter = req.body;
  console.log("Letter = ", letter);
  req.grade.changeletter(function(err, grade){
    if (err) { return next(err); }
    res.json(grade);
  }, letter);
});

router.delete('/grades/:grade', function(req, res) {
  console.log("in Delete");
  req.grade.remove();
  res.sendStatus(200);
});

module.exports = router;
