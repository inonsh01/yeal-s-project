var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

/* GET users listing. */
// router.get('/', function (req, res, next) {
//     con.connect(function (err) {
//         if (err) throw err;
//         con.query("SELECT * FROM user", function (err, result, fields) {
//             if (err) throw err;
//             res.send(result);
//         });
//     });
// });

router.post('/', function (req, res, next) {
    con.connect(function (err) {
        if (err) throw err;
        var sql = "INSERT INTO user (first_name, last_name, email, phone) VALUES ?";
            var values = [req.body.data];
            con.query(sql, values, function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
    });
    console.log("insret to user worked!");
    res.send('insret to user worked!');
});

module.exports = router;