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

      let sql = `SELECT tood_id, title, complited FROM todo WHERE user_id = '${req.body.id}'`;
      con.query(sql, function (err, result) {           
          if (err) { res.send(err.sqlMessage); return; };
          if (!result) {
              res.send(false);
              return;
          }
          res.send(JSON.stringify(result));
      });
  });    
});

module.exports = router;