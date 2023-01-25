var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "projectDB"
});

router.post('/', function (req, res, next) {
    con.connect(function (err) {
        if (err) throw err;
        con.query(`SELECT user_id FROM password WHERE username='${req.body.username}' AND password='${req.body.password}'`, function (err, result, fields) {
            if (err) throw err;
            console.table(result)
            res.json(result);
        });
    });
});

module.exports = router;
