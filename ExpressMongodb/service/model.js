const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/user-react'
mongoose.Promise = global.Promise;
mongoose.connect(DB_URL,{useMongoClient:true})

const models = {  //这个里面会定义集合的字段
	user:{
		'name':{type:String, 'require':true},  //名字
		'NickName':{type:String, 'require':true},  //昵称
		'Gender':{'type':String, 'require':true},  //性别
		// 个人简介或者职位简介
		'Age':{'type':Number ,require:true},
		// 职位名
		'Phone':{'type':String,'require':true},
		// 如果你是boss 还有两个字段
		'Email':{'type':String,'require':true},
    'Address':{'type':String,'require':true},
    'creat_time':{'type':Number,'default':new Date().getTime()}
	},
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel:function(name){
		return mongoose.model(name)
	}
}