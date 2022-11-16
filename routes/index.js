/* Autor: Cortez Ramirez Jose Kevyn
    Fecha: Noviembre 2020*/
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index',{page: 'index',menuId:'index' });
});

router.get('/acercade', function(req,res,next) {
  res.render('pages/acercade',{ page:'acercade', menuId:'acercade'});
});
router.get('/streaming', function(req,res,next) {
  res.render('pages/streaming',{ page:'streaming', menuId:
'streaming'});
});
router.get('/redessociales', function(req,res,next) {
  res.render('pages/redessociales',{ page:'redessociales', menuId:'redessociales'});
});
router.get('/login', function(req,res,next) {
  res.render('pages/login',{ page:'login', menuId:'login'});
});
router.get('/singup', function(req,res,next) {
  res.render('pages/singup',{ page:'singup', menuId:'singup'});
});

router.get('/geolocalizacion', function(req,res,next) {
  res.render('pages/geolocalizacion',{ page:'geolocalizacion', menuId:'geolocalizacion'});
});
router.get('/otra', function(req, res, next) {
  res.render('pages/otra',{page: 'otra',menuId:'otra' });
});
router.get('/ecommerce', function(req,res,next) {
  res.render('pages/ecommerce',{ page:'ecommerce', menuId:'ecommerce'});
});

module.exports = router;
