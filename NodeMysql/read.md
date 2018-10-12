1、mysql -u root -p 204534abc  连接数据库
2、show databases; 查看当前所有的数据库
show tables;查看数据库下面的数据表
3\SELECT DATABASE(); 查看当前的数据库
4、select  * from websites;  查询数据表websites中的所有数据
5、SHOW CREATE TABLE user; 查看users数据表的详细信息


#修改字段类型
ALTER TABLE tbl_name
MODIFY 字段名称 字段类型 [字段属性] [FIRST | AFTER 字段名称]
ALTER TABLE user MODIFY Age TINYINT NOT NULL
#新建一个表
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(20) NOT NULL DEFAULT '' COMMENT '用户名称',
  `NickName` char(20) NOT NULL DEFAULT '' COMMENT '用户昵称',
  `Gender` boolean COMMENT '性别',
  `Age` TINYINT NOT NULL COMMENT '年龄',
  `Phone` CHAR(11) NOT NULL DEFAULT '' COMMENT '手机号',
  `Email` VARCHAR(50) NOT NULL DEFAULT '' COMMENT '邮箱',
  `Address` VARCHAR(100) NOT NULL DEFAULT '' COMMENT '地址',
  `creat_time` timestamp DEFAULT NOW() COMMENT '时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;


    'name':{type:String, 'require':true},  //名字
		'NickName':{type:String, 'require':true},  //昵称
		'Gender':{'type':Boolean, 'require':true},  //true  男   false女
		// 个人简介或者职位简介
		'Age':{'type':Number ,require:true},
		// 职位名
		'Phone':{'type':String,'require':true},
		// 如果你是boss 还有两个字段
		'Email':{'type':String,'require':true},
    'Address':{'type':String,'require':true},
    'creat_time':{'type':Number,'default':new Date().getTime()}




#修改较高的mysql版本不支持
ALTER USER 'root'@'localhost' IDENTIFIED BY 'password' PASSWORD EXPIRE NEVER; (修改加密规则 （必写）)
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'; (更新用户密码为password)
FLUSH PRIVILEGES; #刷新权限（不输入也可以）
#处理警告
---处理警告---
-- utf8' is currently an alias for the character set UTF8MB3, but will be an alias
--  for UTF8MB4 in a future release. Please consider using UTF8MB4 in order to be unambiguous.
示例: 下面三条sql 分别将库 dbsdq , 表 tt2 , 表 tt2 中的 c2 列修改为utf8mb4 字符集, 代码如下:
alter database dbsdq character set utf8mb4 collate utf8mb4_unicode_ci;
use dbsdq;
alter table tt2 character set utf8mb4 collate utf8mb4_unicode_ci;
alter table tt2 modify c2  varchar(10) character set utf8mb4;


SELECT * FROM user WHERE name like '' and where creat_time BETWEEN date_format(from_unixtime(1539054703),"%Y-%m-%d") and date_format(from_unixtime(1543029103),"%Y-%m-%d")
SELECT * FROM user WHERE name like '' or creat_time BETWEEN '2018-10-08' and '2018-10-15';