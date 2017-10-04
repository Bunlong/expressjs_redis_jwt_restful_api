var express = require('express');
var router = express.Router();
var redis = require('redis');

var Question = require('../models/Question');
var client = redis.createClient();

router.get('/:id?', function(req, res, next) {
  if(req.params.id) {
    client.get("question", function(error, result) {
      if(result) {
        res.json(JSON.parse(result));
      }
      else {
        Question.getQuestionById(req.params.id, function(err, rows) {
          if(err) {
            res.json(err);
          }
          else {
            client.set("question", JSON.stringify(rows));
            res.json(rows);
          }
        });
      }
    });
  }
  else {
    client.get("questions", function(error, result) {
      if(result) {
        res.json(JSON.parse(result));
      }
      else {
        Question.getAllQuestions(function(err, rows) {
          if(err) {
            res.json(err);
          }
          else {
            client.set("questions", JSON.stringify(rows));
            res.json(rows);
          }
        });
      }
    });
  }
});

router.post('/', function(req, res, next) {
  Question.addQuestion(req.body, function(err, count){
    if(err) {
      res.json(err);
    }
    else {
      res.json(req.body);
    }
  });
});

router.delete('/:id', function(req, res, next) {
  Question.deleteQuestion(req.params.id, function(err, count) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(count);
    }
  });
});

router.put('/:id', function(req, res, next){
  Question.updateQuestion(req.params.id, req.body, function(err, rows) {
    if(err) {
      res.json(err);
    }
    else {
      res.json(rows);
    }
  });
});

module.exports = router;
