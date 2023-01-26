let express = require('express');
let router = express.Router();

let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "projectDB"
});

// router.get('/', function (req, res, next) {
//     res.render('index', { title: 'Express' });
// });

router.post('/', function (req, res, next) {
    con.connect(function (err) {
        let sql = `SELECT first_name, last_name, email, phone FROM user WHERE user_id = '${req.body.id}'`;
        con.query(sql, function (err, result) {           
            if (err) { res.send(err.sqlMessage); return; };
            if (!result[0]) {
                res.send(false);
                return;
            }
            res.send(JSON.stringify(result[0]));
        });
    });    
});

module.exports = router;