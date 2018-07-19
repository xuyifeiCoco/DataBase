const express = require('express')
const utils = require('utility')

const Router = express.Router()

const model = require('./model')
const User = model.getModel('user')

Router.get('/', (req, res) => {
  return res.write('hello world')
})

Router.get('/list', (req, res) => {
  let {
    name,
    startTime,
    endTime,
    page,
    pageSize
  } = req.query
  page=page||1
  pageSize=pageSize||10
  let timeRange = {}
  if (startTime && endTime) {
    timeRange.creat_time = {
      "$gte": startTime, //这个表示大于等于
      "$lte": endTime // 这个表示小于等于
    }
  }
  let query = Object.keys(req.query).length === 0 ? {} : {
    name,
    ...timeRange
  }
  if (!name) {
    delete query.name
  }
  let total = 0;
  User.count(query, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      total = doc
    }
  }) //参数1忽略,或为空对象则返回所有集合文档
  User.find(query, {}).skip((Number(page) - 1) * pageSize).limit(Number(pageSize)).exec(function (err, doc) { //第2个参数可以设置要查询输出的字段,或者省略的字段参数2: {‘name’:1, ‘age’:0} 
    //过滤查询,参数3: 游标操作 limit限制返回结果数量为20个,如不足20个则返回所有.
    return res.json({
      code: 0,
      data: doc,
      total: total
    })
  })
})

Router.post('/insert', (req, res) => {
  // const {name}=req.body
  const {
    name,
    NickName,
    Gender,
    Age,
    Phone,
    Email,
    Address,
  } = req.body
  User.create([{
    name,
    NickName,
    Gender,
    Age,
    Phone,
    Email,
    Address,
    creat_time: new Date().getTime()
  }], (err, doc) => {
    if (err) {
      return res.json({
        code: 500,
        msg: err
      })
    } else {
      return res.json({
        code: 0,
        msg: 'ok'
      })
    }
  })
})

Router.post('/delete', (req, res) => {
  const {
    ArrayId
  } = req.body
  User.remove({
    _id: {
      $in: ArrayId
    }
  }, (err, doc) => {
    if (err) {
      return res.json({
        code: 500,
        msg: err
      })
    } else {
      return res.json({
        code: 0,
        msg: 'ok'
      })
    }
  })
})

Router.post('/update', (req, res) => {
  // const {name}=req.body
  const {
    userId
  } = req.body
  User.update({
    _id: userId
  }, {
    '$set': req.body
  }, {
    'multi': true
  }, (err, doc) => { //mongodb 默认是false,只更新找到的第一条记录，
    //如果这个参数为true,就把按条件查出来多条记录全部更新。
    if (err) {
      return res.json({
        code: 500,
        msg: err
      })
    } else {
      return res.json({
        code: 0,
        msg: 'ok'
      })
    }
  })
})

module.exports = Router