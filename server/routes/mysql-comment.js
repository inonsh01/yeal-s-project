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
        var sql = "INSERT INTO comment (post_id, comment_title, comment_body, user_id) VALUES ?";
            var values = [req.body.data];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
    });
    console.log("insret to comment worked!");
    res.send('insret to comment worked!');
});

module.exports = router;