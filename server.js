const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var router = express.Router();
var jwt    = require('jsonwebtoken');
var user = require('./src/user');
'use strict'
var dbUrl = 'mongodb://127.0.0.1:27017/dataLoginTodo';
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl,{useNewUrlParser:true}).then(()=>{
    console.log('Sucessful connection MongoDB');
}).catch(err => console.log(err + 'MongoBd'));

const port = 8080;
app.listen(port);
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:'cualquiercosa',
    resave:false,
    saveUninitialized:false
}));

app.engine('.ejs', require('ejs')._express);
app.set('views',(__dirname + '/public'));
app.set('view engine','ejs');

// app.use(passport,inializate);
//app.use(passport,session());

// app.use(express.static(__dirname + '/public'));

require('./route/route')(app,router,path);
