var db = require('../db');
 
var Question = {
 
  getAllQuestions:function(callback) {
    return db.query("select * from questions", callback);
  },

  getQuestionById:function(id, callback) {
    return db.query("select * from questions where id=?", [id], callback);
  },

  addQuestion:function(question, callback) {
    return db.query("insert into questions(name, year, rating) values(?, ?, ?)", [question.name, question.year, question.rating], callback);
  },

  deleteQuestion:function(id, callback) {
    return db.query("delete from questions where id=?",[id], callback);
  },

  updateQuestion:function(id, question, callback) {
    return db.query("update questions set name=?, year=?, rating=? where Id=?", [question.name, question.year, question.rating, id], callback);
  }

};

module.exports = Question;
