var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

router.get('/:id/posts', function (req, res) {
    console.log(req.params);
    var sql = `SELECT * FROM post WHERE user_id = ${req.params.id}`
    con.query(sql, function (err, result) {
        console.log(result);
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})

router.get('/:userId/posts/:postId', function (req, res) {
    console.log(req.params);
    var sql = `SELECT comment_title, comment_body, first_name, last_name FROM comment LEFT JOIN user ON comment.user_id = user.user_id WHERE post_id = ${req.params.postId}`
    console.log(sql);
    con.query(sql, function (err, result) {
        console.log(result);
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})
module.exports = router;
