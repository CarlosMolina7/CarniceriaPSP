const perm = require('../permissions')
const sqlite3 = require('sqlite3');
const hash = require('pbkdf2-password')()


function DBFactory(cual) {
    let db
    if (cual === "sqlite3") {
        db = new sqlite3.Database('./MolinaBBDD.db', sqlite3.OPEN_READWRITE |
            sqlite3.OPEN_CREATE, (err) => {
                if (err) {
                    console.log("Error: " + err);
                    process.exit(1);
                }
            });
    }

    db.crearBBDD = () => {
        var password_salt = ''
        var password_hash = ''
        hash({ password: "admin" }, function (err, pass, salt, hash) {
            if (err) throw err;
            console.log("entra")
            password_hash = hash;
            password_salt = salt;




            db.all(`
        create table if not exists usuarios(
            usuario TEXT primary key,
            password TEXT,
            salt TEXT,
            perm int);
            `, (err) => {
                if (err) {
                    console.log("Error:", err)
                    process.exit(1);
                }
                else {
                    db.all("insert or replace into usuarios(usuario,password,salt,perm) values(?,?,?,?) ", "admin", password_hash, password_salt, perm.ADMIN, (err) => {
                        if (err) {
                            console.log("Error:", err)
                            process.exit(1);
                        }
                    })


                }
            });
        });
    }
    db.borrarUsu = (usuario, fun) => {
        db.all("delete from usuarios where usuario =?", usuario, (err) => {
            if (err) {
                console.log("Error:", err)
                process.exit(1);

            }
            fun()
        })
    }
    db.insertarUsu = (usuario, password, perm, fun) => {
        let password_salt = ''
        let password_hash = ''
        hash({ password: password }, function (err, pass, salt, hash) {
            if (err) throw err;
            password_salt = salt;
            password_hash = hash;


            db.all("insert or replace into usuarios(usuario,password,salt,perm) values(?,?,?,?) ", usuario, password_hash, password_salt, perm, (err) => {
                if (err)
                    fun(err)
                else
                    fun()
            })
        });
    }
    db.actualizarUsu = (usuario, password, fun) => {
        let password_salt = ''
        let password_hash = ''
        hash({ password: password }, function (err, pass, salt, hash) {
            if (err) throw err;
            password_salt = salt;
            password_hash = hash;


            db.all("update usuarios set password=?, salt=? where usuario=?", password_hash, password_salt, usuario, (err) => {
                if (err)
                    fun(err)
                else
                    fun()
            })
        });
    }
    db.loginUsu=(usuario,pwd,fun)=>{
        db.all("select * from usuarios where usuario=?", usuario, (err, rows) => {
            console.log("entra")
            if (err) {
                console.log("Error:", err)
                process.exit(1);
            }
            const row = rows[0]
            
            if (rows.length > 0) {
                hash({ password: pwd, salt: row.salt }, (err, pass, salt, hash) => {
                    
                   
                    console.log(hash)
                    if (row.password == hash) {
                        fun(false, row.perm)
                    }
                    else
                        fun(true, row.perm)
                });
    
            }else{
                fun(true,null)
            }
    
        })
    }
    return db
}






exports.DBFactory=DBFactory