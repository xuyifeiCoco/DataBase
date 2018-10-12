var mysql = require('mysql'); // mysql模块 同样可以使用 npm install -g mysql 来全局下载  
const express = require('express')
const utils = require('utility')
const Router = express.Router()

//========数据库的连接
var connection = mysql.createConnection({
  host: 'localhost', // 主机名  
  port: 3306, // 数据库连接的端口号 默认是3306  
  database: 'users', // 需要查询的数据库  
  user: 'root', // 用户名  
  password: 'password' // 密码，我的密码是空。所以是空字符串  
});
connection.connect();

//==============处理路由=========
Router.get('/', (req, res) => {
  return res.write('hello world')
  res.end()
})

Router.get('/list', (req, res) => {
    let {
    name,
    startTime,
    endTime,
    page,
    pageSize
  } = req.query
  name=name||''
  page=page||1
  pageSize=pageSize||1
  let legin=new Date() 
  if(!startTime){  
    startTime = new Date(legin.setMonth((new Date().getMonth()-1))).format('yyyy-MM-dd');
    endTime=new Date().format('yyyy-MM-dd hh-mm-ss')
  }else{
    startTime =new Date(Number(startTime)).format('yyyy-MM-dd')
    endTime =new Date(Number(endTime)).format('yyyy-MM-dd hh-mm-ss')
  }
  let offet = (Number(page) - 1) * pageSize //查询的偏移量

  let userGetSql = 'SELECT * FROM user WHERE name like ? and creat_time BETWEEN ? and ? limit ?,?';
  let getTotal = 'SELECT count(*) FROM user WHERE name like ? and creat_time BETWEEN ? and ?';

  let params= [`%${name}%`,startTime,endTime,offet,Number(pageSize)]
  let totalParams =[`%${name}%`,startTime,endTime] 
  let total = 0
  connection.query(getTotal, totalParams,(err, result) => {
    total = result[0]['count(*)']
    connection.query(userGetSql,params,function (err, result,fields) {
      if (err) {
        console.log('[SELECT ERROR] - ', err.message);
        return;
      }
      return res.json({
        code: 0,
        data: result,
        total: total
      })
    });
  })
  // page=page||1
  // pageSize=pageSize||10
  // let timeRange = {}
  // if (startTime && endTime) {
  //   timeRange.creat_time = {
  //     "$gte": startTime, //这个表示大于等于
  //     "$lte": endTime // 这个表示小于等于
  //   }
  // }

  // let regName= new RegExp(name, 'i');//模糊查询参数
  // let query = Object.keys(req.query).length === 0 ? {} : {
  //   name: regName,
  //   ...timeRange
  // }
  // if (!name) {
  //   delete query.name
  // }
  // let total = 0;
  // User.count(query, (err, doc) => {
  //   if (err) {
  //     console.log(err)
  //   } else {
  //     total = doc
  //   }
  // }) //参数1忽略,或为空对象则返回所有集合文档
  // User.find(query, {}).skip((Number(page) - 1) * pageSize).limit(Number(pageSize)).exec(function (err, doc) { //第2个参数可以设置要查询输出的字段,或者省略的字段参数2: {‘name’:1, ‘age’:0} 
  //   //过滤查询,参数3: 游标操作 limit限制返回结果数量为20个,如不足20个则返回所有.
  //   return res.json({
  //     code: 0,
  //     data: doc,
  //     total: total
  //   })
  // })
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
  let userAddSql = 'INSERT INTO user(id,name,NickName,Gender,Age,Phone,Email,Address) VALUES(0,?,?,?,?,?,?,?)';

  let userAddSql_Params = [name,
    NickName,
    Gender,
    Age,
    Phone,
    Email,
    Address,
  ];
  // console.log(req.body)
  connection.query(userAddSql,userAddSql_Params,(err, doc) => {
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
  var userDelSql = 'DELETE FROM user WHERE id = ?';
  let param = [ArrayId]
  connection.query(userDelSql,param, (err, doc) => {
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
  const {
    name,
    NickName,
    Gender,
    Age,
    Phone,
    Email,
    Address,
    id
  } = req.body
  // id,name,NickName,Gender,Age,Phone,Email,Address
  let userModSql = 'UPDATE user SET name = ?,NickName = ? ,Gender = ?,Age = ?, Phone = ?,Email = ? ,Address = ? WHERE id = ?';
  let userModSql_Params = [name,
    NickName,
    Gender,
    Age,
    Phone,
    Email,
    Address,
    id
  ];
  const {
    userId
  } = req.body
  connection.query(userModSql,userModSql_Params,(err, doc) => {
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