var express = require('express');
const {route, use}=require('.');
var router = express.Router();
const User = require('../model/user');

/* GET home page. */


router.post("/singup",  async (req, res, next) => {
  console.log(req.body);
  let user=new User({
    email: req.body.email,
      password: req.body.password
  });
  //Guarda un registro en Mongo
  user.save((err, response) => {
      if (err){
        res.status(400).send(err);
        res.status(200).send(response);
      }
    else{
      res.redirect('/otra');
    }
  });
  
   
    });

module.exports = router;