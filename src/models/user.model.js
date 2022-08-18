'use strict';
var dbConn = require('./../../config/db.config');
//Employee object create
var User = function(user){
  this.UserFirstName     = user.FirstName;
  this.UserLastName      = user.LastName;
  this.UserEmail          = user.Email;
  this.UserPhone          = user.Phone;
  this.UserStatus         = user.Status ? user.Status : "false";
  this.UserCreatedDate     = new Date();
  this.UserUpdatedDate     = new Date();
};

User.create = function (newUser, result) {
    dbConn.query("INSERT INTO tblUsers set ?", newUser, function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};

User.findById = function (id, result) {
    dbConn.query("SELECT * FROM tblUsers WHERE UserID = ? ", id, function (err, res) {
        if(err) {
        console.log("error: ", err);
        result(err, null);
        }
        else{
        result(null, res);
        }
    });
};
User.findAll = function (result) {
    dbConn.query("SELECT * FROM tblUsers", function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            console.log('user : ', res);
            result(null, res,"SUCESS");
        }
    });
};
User.update = function(id, user, result){
    dbConn.query("UPDATE tblUsers SET UserFirstName=?,UserLastName=?,UserEmail=?,UserPhone=? WHERE UserID = ?", [user.FirstName,user.LastName,user.Email,user.Phone, id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }else{
            result(null, res);
        }
    });
};
User.delete = function(id, result){
    dbConn.query("DELETE FROM tblUsers WHERE UserID = ?", [id], function (err, res) {
        if(err) {
            console.log("error: ", err);
            result(null, err);
        }
        else{
            result(null, res);
        }
    });
};
module.exports= User;