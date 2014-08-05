'use strict';
var _ = require('lodash');
var Mongo = require('mongodb');

Object.defineProperty(Student, 'collection',{
  get: function(){
    return global.mongodb.collection('students');
  }
});

/******************
 * CONSTRUCTOR    *
 ******************/
function Student(s1){
  this.name = s1.name;
  this.avg = parseFloat(s1.avg);
  this.letterGrade = s1.letterGrade;
  this.tests = s1.tests;
  this.isSuspended = this.isSuspended();
}

/******************
 * ADD TEST SCORE *
 ******************/
Student.prototype.addTest = function(score){
  this.tests.push(parseFloat(score));
};

/******************
 * CALC AVERAGE   *
 ******************/
Student.prototype.calcAvg = function(){
  var sum = 0;
  for(var i = 0; i < this.tests.length; i++){
    sum = sum + this.tests[i];
  }
  this.avg = sum/this.tests.length;
  if(this.avg >= 90){
    this.letterGrade ='A';
  }else if(this.avg >= 80){
    this.letterGrade ='B';
  }else if(this.avg >= 70){
    this.letterGrade ='C';
  }else if(this.avg >=60){
    this.letterGrade ='D';
  }else{
    this.letterGrade ='F';
  }

};

/******************
 * IS SUSPENDED   *
 ******************/
Student.prototype.isSuspended = function(){
  var failedTests = [];
  for(var i = 0; i < this.tests.length; i++){
    if(this.tests[i] < 60){
      failedTests.push(this.tests[i]);
    }
  }
  if(failedTests.length >= 3){
    this.isSuspended = true;
  }
};

/******************
 * IS HONOR ROLL  *
 ******************/
Student.prototype.isHonor = function(){
  if(this.avg >= 90){
    this.isHonor = true;
  }else{
    this.isHonor = false;  
  }
};

/******************
 * SAVE           *
 ******************/
Student.prototype.save = function(cb){
  Student.collection.save(this, cb);
};

/******************
 * FIND ALL       *
 ******************/
Student.all = function(cb){
  Student.collection.find().toArray(function (err, objects){
    var students = objects.map(function(s1){
      return changePrototype(s1);
    });
    cb(students);
  });
};

module.exports = Student;

/*********************
 * CHANGE PROTOTYPES *
 *********************/
function changePrototype(obj){
  var student = _.create(Student.prototype, obj);
  return student;
}
