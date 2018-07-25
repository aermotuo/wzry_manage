const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.post('/register', function(req, res, next) {
  User.create(req.body, function(err, user) {
    if (err){
			res.send({message: '服务器异常，请稍后尝试'});   
    }else{
			res.send({
				message: '注册成功',
				time:3000
			});   
    }
  });
})
//注册用户的时候查找用户名是否重复
router.get('/findUserName', function(req, res, next){
	User.find(req.query, function(err, docs){
		if(err){
			res.send({message: '服务器异常，请稍后尝试'});    	
		}else{
			if(docs.length){
				res.send({message:'用户名重复，请重新填写', type: true});
			}else{
				res.send({message:'用户名未重复', type: false});
			}
			
		}
	});
});

module.exports = router
