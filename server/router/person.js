const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const express = require('express');
const Person = require('../model/person');
const router = express.Router();


router.post('/addperson', function(req, res, next) {
  console.log(req.body);
  Person.create(req.body, function(err, docs) {
    if (err){
      res.send({message: '服务器异常，请稍后尝试'});
    }else{
      res.send({
        message: '添加成功',
        time:1000
      });
    }
  });
})

//查找所有用户
router.get('/findPersonAll', function(req, res, next){
  Person.find({}, function(err, docs){
    if(err){
      res.send({message: '服务器异常，请稍后尝试'});
    }else{
      res.send(docs)
    }
  });
});

//根据ID获取信息
router.get('/findInfoById', function(req, res, next){
  Person.findOne(req.query, function(err, docs){
    if(err){
      res.send({message: '服务器异常，请稍后尝试'});
    }else{
      res.send(docs);
    }
  })
})

router.post('/editInfoById', function(req, res, next){
  var condition = req.body._id;
  var updates = {$set: {
    name: req.body.name,
    sex: req.body.sex,
    post: req.body.post
  }};
  Person.findByIdAndUpdate(condition, updates, function(err, docs){
    if (err){
      res.send({message: '服务器异常，请稍后尝试'});
    }else{
      res.send({
        message: '修改成功',
        time:1000
      });
    }
  })
})


//删除成员信息
router.post('/removeUserById', function(req,res,next){
  Person.findByIdAndRemove(req.body._id, function(err, docs){
    if (err){
      res.send({message: '服务器异常，请稍后尝试'});
    }else{
      res.send({
        message: '删除成功',
        time:1000
      });
    }
  })
})

module.exports = router
