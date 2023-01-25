// import './tables-constructor'
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRouter = require('./routes/user');
var todoRouter = require('./routes/todo');
var postRouter = require('./routes/post');
var passwordRouter = require('./routes/password');
var commentRouter = require('./routes/comment');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/user', userRouter);
app.use('/todo', todoRouter);
app.use('/post', postRouter);
app.use('/password', passwordRouter);
app.use('/comment', commentRouter);

module.exports = app;
