var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});

function ifExist(req, res) {
    let user = req.body;
    con.connect(function (err) {
        var sql = `SELECT id FROM user WHERE username = ${user.name} AND password = ${user.password}`;
        con.query(sql, function (err, result) {
            if (err) {res.send(err.sqlMessage); return;};
            res.send(true);
        });
    });
};

router.post('/', function (req, res, next) {
    ifExist(req, res);
});
module.exports = router;