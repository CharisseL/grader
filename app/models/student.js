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
  this.tests = [];
  this.isSuspended = false;
  this.isHonor = false;
  this.color = s1.color;
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


/******************
 * IS SUSPENDED   *
 ******************/
  var failedTests = [];
  for(var j = 0; j < this.tests.length; j++){
    if(this.tests[j] < 60){
      failedTests.push(this.tests[j]);
    }
  }
  if(failedTests.length >= 3){
    this.isSuspended = true;
  }

/******************
 * IS HONOR ROLL  *
 ******************/
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

/******************
 * FIND BY ID     *
 ******************/
Student.findById = function(id, cb){
  var _id = Mongo.ObjectID(id);

  Student.collection.findOne({_id:_id}, function(err, obj){
    var student = changePrototype(obj);
    cb(student);
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
