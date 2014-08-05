/* global describe, it, before, beforeEach */
/* jshint expr:true */

'use strict';

var expect = require('chai').expect;
var dbConnect = require('../../app/lib/mongodb');
var Mongo = require('mongodb');
var Student = require('../../app/models/student');

var jack, jill;
describe('Item', function(){
/*
  before(function(done){
    dbConnect('student-test', function(){
      done();
    });
  });
  beforeEach(function(done){
    Item.collection.remove(function(){
      var s1 = {name:'Jack', '4.0', [100, 100, 100]};
      jack = new Student(s1);
      var s2 = {name:'Jill', '3.0', [85, 86, 87]};
      jill = new Student(s2);
      
      jack.save(function(){
        jill.save(function(){
          done();
        });
      });
    });
  });
*/

  describe('constructor', function(){
    it('should create a new constructor', function(){
      var s1 = {name:'Jack', avg:'100', letterGrade:'A', tests:[100, 100, 100]};
      jack = new Student(s1);
      expect(jack).to.be.instanceOf(Student);
      expect(jack.name).to.equal('Jack');
      expect(jack.avg).to.equal(100);
      expect(jack.letterGrade).to.equal('A');
      expect(jack.tests.length).to.equal(3);
    });
  });

  describe('#addTest', function(){
    it('should add new test score', function(){
      var s1 = {name:'Jack', avg:'100', letterGrade:'A', tests:[]};
      jack = new Student(s1);
      jack.addTest('71');
      expect(jack.tests.length).to.equal(1);
      expect(jack.tests[0]).to.equal(71);  
    });
  });
  
  describe('#calcAvg', function(){
    it('should calculate the average of all test scores', function(){
      var s1 = {name:'Jack', avg:'100', letterGrade:'A', tests:[100, 90]};
      jack = new Student(s1);
      jack.calcAvg();
      expect(jack.avg).to.equal(95);
      expect(jack.letterGrade).to.equal('A');
    });
  });
  
  describe('#isSuspended', function(){
    it('should tell if student was suspended based on 3 failing tests', function(){
      var s1 = {name:'Jack', avg:'50', letterGrade:'F', tests:[50, 50, 50]};
      jack = new Student(s1);
      expect(jack.isSuspended).to.equal.true;
      var s2 = {name:'Jill', avg:'0', letterGrade:'F', tests:[]};
      jill = new Student(s2);
      jill.addTest('98');
      jill.addTest('88');
      jill.addTest('97');
      jill.calcAvg();
      expect(jill.avg).to.be.within(90, 100);
      expect(jill.isSuspended).to.equal.false;
      expect(jill.letterGrade).to.equal('A');
    });
  });
});
