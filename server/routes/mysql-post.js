var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

router.post('/', function (req, res, next) {
    con.connect(function (err) {
        if (err) throw err;
        var sql = "INSERT INTO post (post_title, post_body, user_id) VALUES ?";
            var values = [req.body.data];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
    });
    console.log("insret to post worked!");
    res.send('insret to post worked!');
});

module.exports = router;