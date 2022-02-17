const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB  = require("./db")

const indexRouter = require('./routes/index');
const authRouter = require('./Auth/auth');


const app = express();
connectDB();

app.use(cookieParser());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'models')));


app.use('/api/auth', require('./Auth/route'));
app.use('/', indexRouter);






module.exports = app;
