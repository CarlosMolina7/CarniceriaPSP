var express = require('express');
var DBFactory=require('./bbdd').DBFactory
const db= DBFactory("sqlite3")
var router = express.Router();


router.post('/', function(req, res, next) {
    

    db.actualizarUsu(req.body["usuario"],req.body["password"],(err)=>{
        if(err){
            console.log("Error:",err)
            process.exit(1);
        }
        res.render('admin',{usu_hecho:"display"})
    
    })
        
    })    

  
  module.exports = router;
