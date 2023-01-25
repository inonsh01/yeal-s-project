var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todosRouter = require('./routes/todos');
var postsRouter = require('./routes/posts');
var commentsRouter = require('./routes/comments');


var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use('/todos', todosRouter);
// app.use('/posts', postsRouter);
// app.use('/comments', commentsRouter);

app.get(
    ['/users', '/todos', '/posts', '/comments'],
    (req, res) => sendData(req, res)
);

app.post(
    ['/users', '/todos', '/posts', '/comments'],
    (req, res) => addToTable(req, res)
);

app.put(
    ['/users/:userId', '/todos/:userId', '/posts/:userId', '/comments/:userId'],
    (req, res) => updateInTable(req, res)
);

app.delete(
    ['/users/:userId', '/todos/:userId', '/posts/:userId', '/comments/:userId'],
    (req, res) => deleteInTable(req, res)
);

module.exports = app;

function sendData(req, res) {
    let tableName = req.path.split("/")[1].slice(0, -1);
    var sql = `SELECT * from ${tableName}`;

    con.connect(function (err) {
        con.query(sql, function (err, result) {
            if (err) res.send(err.sqlMessage);
            res.send(result);
        });
    });
}

//req body example
//{columnName: valueInColumn, ....}
function addToTable(req, res) {
    let tableName = req.path.split("/")[1].slice(0, -1);
    let arrColumnsName = [];
    let arrDataInColumn = [];
    for (let detail in req.body) {
        arrColumnsName.push(detail);
        arrDataInColumn.push(req.body[detail]);
    }
    var sql = `INSERT INTO ${tableName} (${arrColumnsName.toString()}) VALUES ?`;

    con.connect(function (err) {
        con.query(sql, [[arrDataInColumn]], function (err, result) {
            if (err) { res.send(err.sqlMessage); throw err; };
            sendData(req, res)
        });
    });
}

//req body example
//{"id":"222", "name":"fucking assholeeee"}
function updateInTable(req, res) {
    let tableName = req.path.split("/")[1].slice(0, -1);
    console.log(req.params);
    var sql = `UPDATE ${tableName} SET ? WHERE id = ${req.params.userId}`;
    console.log(sql);
    con.query(sql, req.body, function (err, result) {
        if (err) throw err;
        sendData(req, res);
    });
}

//req body example
//{"field":"id"}
function deleteInTable(req, res) {
    let tableName = req.path.split("/")[1].slice(0, -1);

    var sql = `UPDATE ${tableName} SET ${req.body.field} = NULL WHERE id = ${req.params.userId}`;
    con.query(sql, req.body, function (err, result) {
      if (err) throw err;
      sendData(req, res);
    });
}