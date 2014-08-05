'use strict';
var _ = require('lodash');
var Mongo = require('mongodb');

function Student(s1){
  this.name = s1.name;
  this.avg = parseFloat(s1.avg);
  this.letterGrade = s1.letterGrade;
  this.tests = s1.tests;
  this.isSuspended = false;
}

Student.prototype.addTest = function(score){
  this.tests.push(parseFloat(score));
};

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

Student.prototype.isSuspended = function(){
  var failedTests = [];
  for(var i = 0; i < this.tests.length; i++){
    if(this.tests[i] < 60){
      failedTests.push(this.tests[i]);
    }
  }
  if(failedTests.length === 0){
    this.isSuspended = true;
  }
};

module.exports = Student;
