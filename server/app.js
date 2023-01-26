let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let cors = require('cors');

let mysql = require('mysql');
let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "inonsh01",
    database: "projectDB"
});

//mysql:
let userRouter = require('./routes/mysql-user');
let todoRouter = require('./routes/mysql-todo');
let postRouter = require('./routes/mysql-post');
let passwordRouter = require('./routes/mysql-password');
let commentRouter = require('./routes/mysql-comment');


let todosRouter = require('./routes/todos');
let commentsRouter = require('./routes/comments');
let loginRouter = require('./routes/login');
let infoRouter = require('./routes/info');
let postsRouter = require('./routes/posts');


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
app.use('/login', loginRouter);
app.use('/users/:id/info', infoRouter);
app.use('/users', todosRouter);
app.use('/users', postsRouter);


//mysql:
// app.use('/todo', todoRouter);
// app.use('/password', passwordRouter);
// app.use('/comment', commentRouter);
// app.use('/user', userRouter);
// app.use('/post', postRouter);
// app.use('/comments', commentsRouter);

//get all posts 
app.get('/users/:id/posts', function (req, res) {
    let where = `WHERE user_id = ${req.params.id}`;
    let tableNameOp = 'post';
    sendData(req, res, where, tableNameOp)
})

//add post to posts table
app.post('/users/:id/posts', function (req, res) {
    let tableNameOp = 'post';
    let where = `WHERE user_id = ${req.params.id}`;
    addToTable(req, res, where, tableNameOp)
})

//update specified post
app.put('/users/:userId/posts/:postId', function (req, res) {
    let tableNameOp = 'post';
    let where = `WHERE user_id = ${req.params.userId}`;
    updateInTable(req, res, where, tableNameOp)
})


//delete specified post
app.delete('/users/:userId/posts/:postId', function (req, res) {
    let tableNameOp = 'post';
    let where = `WHERE user_id = ${req.params.userId}`;
    deleteInTable(req, res, where, tableNameOp)
})

//add comment to specified post
app.post('/users/:userId/posts/:postId', function (req, res) {
    let tableNameOp = 'comment';
    let where = `WHERE user_id = ${req.params.userId}`;
    addToTable(req, res, where, tableNameOp)
})

//get all from table
app.get(
    ['/users', '/todos', '/posts', '/comments'],
    (req, res) => sendData(req, res)
);

//add to table
app.post(
    ['/users', '/todos', '/posts', '/comments'],
    (req, res) => addToTable(req, res)
);

//update in table
app.put(
    ['/users/:userId', '/todos/:userId', '/posts/:userId', '/comments/:userId'],
    (req, res) => updateInTable(req, res)
);

//delete in table
app.delete(
    ['/users/:userId', '/todos/:userId', '/posts/:userId', '/comments/:userId'],
    (req, res) => deleteInTable(req, res)
);

module.exports = app;


function sendData(req, res, were, tableNameOp) {
    let tableName = tableNameOp ? tableNameOp : req.path.split("/")[1].slice(0, -1);
    let sql = `SELECT * from ${tableName} ${were}`;
    con.query(sql, function (err, result) {
        if (err) res.send(err.sqlMessage);
        res.send(result);
    });
}

//req body example
//{columnName: valueInColumn, ....}
function addToTable(req, res, where, tableNameOp) {
    let tableName = tableNameOp ? tableNameOp : req.path.split("/")[1].slice(0, -1);
    let arrColumnsName = [];
    let arrDataInColumn = [];

    for (let detail in req.body) {
        arrColumnsName.push(detail);
        arrDataInColumn.push(req.body[detail]);
    }

    let sql = `INSERT INTO ${tableName} (${arrColumnsName.toString()}) VALUES ?`;
    con.query(sql, [[arrDataInColumn]], function (err, result) {
        if (err) {
            res.send(err.sqlMessage);
            throw err;
        }
        sendData(req, res, where, tableNameOp);
    });
}

//req body example
//{"id":"222", "name":"fucking assholeeee"}
function updateInTable(req, res, where, tableNameOp) {
    let tableName = tableNameOp ? tableNameOp : req.path.split("/")[1].slice(0, -1);
    let sql = `UPDATE ${tableName} SET ? WHERE ${tableName}_id = ${req.params.postId}`;
    con.query(sql, req.body, function (err, result) {
        if (err) throw err;
        sendData(req, res, where, tableNameOp);
    });
}

//req body example
//{"field":"id"}
function deleteInTable(req, res, where, tableNameOp) {
    let tableName = tableNameOp ? tableNameOp : req.path.split("/")[1].slice(0, -1);

    let sql = `DELETE FROM ${tableName} WHERE post_id = ${req.params.postId}`;
    con.query(sql, req.body, function (err, result) {
        if (err) throw err;
        sendData(req, res, where, tableNameOp);
    });
}