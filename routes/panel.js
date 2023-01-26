var express = require('express');
const { db } = require('./bbdd');
var router = express.Router();
const perm = require('../permissions')
var turno= require('../app');

router.get('/', function(req, res, next) {
    if(req.session.usuario){  
        if(req.session.permission==perm.ADMIN){
            res.render('panel',{otro:"inline",numCarnicero:turno.turnoCarnicero})
        }
        else
        res.render('panel',{otro:"none",numCarnicero:turno.turnoCarnicero})
    
}else
    res.redirect('login')
    
});


module.exports = router;
