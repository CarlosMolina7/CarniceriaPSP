var express = require('express');
const  db  = require('./bbdd');
var router = express.Router();
const md5=require('md5')

router.post('/', function(req, res, next) {

    db.borrarUsu(req.body["usuario"],(err)=>{
        if(err){
            console.log("Error:",err)
            process.exit(1); 
        }
        res.render('admin',{usu_hecho:"inline"})
    })  
});
  
  module.exports = router;
