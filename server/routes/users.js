var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});
// //get all posts
// router.get('/:id/posts', function (req, res) {
//     console.log(req.params);
//     var sql = `SELECT * FROM post WHERE user_id = ${req.params.id}`
//     con.query(sql, function (err, result) {
//         console.log(result);
//         if (err) { res.send(err.sqlMessage); return; };
//         res.send(JSON.stringify(result));
//     });
// })


//get all comments
router.get('/:userId/posts/:postId', function (req, res) {
    console.log("ddddddddddddddddd");
    console.log(req.params);
    var sql = `SELECT * FROM comment WHERE post_id = ${req.params.postId} LEFT JOIN user ON comment.user_id = user.user_id`
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) { res.send(err.sqlMessage); return; };
        res.send(JSON.stringify(result));
    });
})
module.exports = router;
