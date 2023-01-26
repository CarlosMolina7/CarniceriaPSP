var express = require('express');
var router = express.Router();
var DBFactory=require('./bbdd').DBFactory
const db= DBFactory("sqlite3")

router.get('/', function(req, res, next) {
  db.crearBBDD();
  res.redirect('/')
});

module.exports = router;
