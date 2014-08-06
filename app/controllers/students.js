'use strict';

var Student = require('../models/student');

exports.init = function(req, res){
  res.render('students/init');
};

exports.create = function(req, res){
  var student = new Student(req.body);
  student.save(function(){
    res.redirect('/');
  });
  console.log(req.body);
};

exports.index = function(req, res){
  Student.all(function(students){
    res.render('students/index', {students:students});
  });
};

exports.show = function(req, res){
  var id = req.params.id;
  Student.findById(id.toString(), function(student){
    res.render('students/show', {student:student});
  });
};

exports.newTest = function(req, res){
  var id = req.params.id;
  Student.findById(id.toString(), function(student){
    res.render('students/newTest', {student:student});
  });
};

exports.addTest = function(req, res){
  var id = req.params.id;
  Student.findById(id.toString(), function(student){
    student.addTest(req.body.score);
    student.calcAvg();
    student.save(function(){
      res.redirect('/students');
      console.log(student.isSuspended);
      console.log(student.isHonor);
    });
  });
};

