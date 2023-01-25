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
        var sql = `SELECT user_id FROM password WHERE username = '${user.username}' AND password = '${user.password}'`;
        con.query(sql, function (err, result) {
            console.log(result);
            if (!result[0]) {
                res.send(false);
                return;
            }
            if (err) { res.send(err.sqlMessage); return; };
            res.send(JSON.stringify(result[0].user_id));
        });
    });
};

router.post('/', function (req, res, next) {
    ifExist(req, res);
});
module.exports = router;