const express = require('express')
const app = express()
const userRouter = require('./server/router/user');
const mongoose = require('mongoose');
const config = require('./server/db.config');
const bodyParser = require('body-parser');

mongoose.connect(config.url, {useNewUrlParser:true}, function(err){
　　if(err){
　　　　console.log('Connection Error:' + err)
　　}else{
　　　　console.log('Connection success!') }
})

app.all('*',function(req, res, next){
	res.header('Access-Control-Allow-Origin','*')
	res.header('Access-Control-Allow-Headers','*')
	next();
})

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use('/api',userRouter);

app.listen(9527)
