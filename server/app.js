let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "z10mz10m",
    database: "projectDB"
});

//mysql:
let userRouter = require('./routes/mysql-user');
let todoRouter = require('./routes/mysql-todo');
let postRouter = require('./routes/mysql-post');
let passwordRouter = require('./routes/mysql-password');
let commentRouter = require('./routes/mysql-comment');

let indexRouter = require('./routes/index');
let postsRouter = require('./routes/posts');
let todosRouter = require('./routes/todos');
let commentsRouter = require('./routes/comments');
let loginRouter = require('./routes/login');
let infoRouter = require('./routes/info');
// const { default: App } = require('../client/src/App');


let app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users/:id/info', infoRouter);
app.use('/users', todosRouter);
app.use('/users', postsRouter);
// app.use('/user', userRouter);


//mysql:
app.use('/todo', todoRouter);
app.use('/password', passwordRouter);
app.use('/comment', commentRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);
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
    let sql = `SELECT * from ${tableName}`;

    // con.connect(function (err) {
    con.query(sql, function (err, result) {
        if (err) res.send(err.sqlMessage);
        res.send(result);
    });
    // });
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
    let sql = `INSERT INTO ${tableName} (${arrColumnsName.toString()}) VALUES ?`;

    // con.connect(function (err) {
    con.query(sql, [[arrDataInColumn]], function (err, result) {
        if (err) { res.send(err.sqlMessage); throw err; };
        sendData(req, res)
    });
    // });
}

//req body example
//{"id":"222", "name":"fucking assholeeee"}
function updateInTable(req, res) {
    let tableName = req.path.split("/")[1].slice(0, -1);
    console.log(req.params);
    let sql = `UPDATE ${tableName} SET ? WHERE id = ${req.params.userId}`;
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

    let sql = `UPDATE ${tableName} SET ${req.body.field} = NULL WHERE id = ${req.params.userId}`;
    con.query(sql, req.body, function (err, result) {
        if (err) throw err;
        sendData(req, res);
    });
}