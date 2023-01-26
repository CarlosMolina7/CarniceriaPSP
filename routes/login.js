// Se solicita usuario y contraseña y se inicia la sesión
// asignando permisos al usuario.

var express = require('express');
var router = express.Router();
const perm = require('../permissions')
var DBFactory=require('./bbdd').DBFactory
const db= DBFactory("sqlite3")
var turno= require('../app');


router.get('/', function(req, res, next) {
    if(req.session.usuario) {
        console.log('Sesión iniciada')
        res.redirect('/login')
    }
    res.render('login', {login_error: "none"});
});

router.post('/', function(req, res, next) {
    const usuario = req.body['usuario']
    const password = req.body['password']
    if(req.session.usuario) {
        res.redirect('/inicio')
    }  
     db.loginUsu(usuario,password,(err,perm)=>{
        if(err){
            console.log("Error: " + err)
            res.render('login', {login_error: "inline"})
        }
        req.session.permission=perm
        req.session.usuario = usuario
        if(perm==3){
            res.render('panel',{otro:"inline",numCarnicero:turno.turnoCarnicero})
        }
        else
        res.render('panel',{otro:"none"})
            
        })
        
});

module.exports = router;
