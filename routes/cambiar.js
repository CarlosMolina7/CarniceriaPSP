var express = require('express');
var DBFactory=require('./bbdd').DBFactory
const db= DBFactory("sqlite3")
var router = express.Router();



router.post('/',(req,res)=>{
    console.log("hola")
    let passNueva=req.body["pass1"]
    let pass=req.body["password"]
    if(passNueva==pass){
        db.actualizarUsu(req.session.usuario,req.body["password"],(err)=>{
            if(err){
                console.log("Error:",err)
                process.exit(1);
            }
            res.redirect('/panel')
        
        })
    }else{
        res.redirect('/panel')
    }
        
})

module.exports = router;