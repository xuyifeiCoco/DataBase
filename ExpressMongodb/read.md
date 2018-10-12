一、windows配置
    1、MongoDB将数据目录存储在 db 目录下。但是这个数据目录不会主动创建，我们在安装完成后需要创建它。请注意，数据目录应该放在根目录下（(如： C:\ 或者 D:\ 等 )
    2、然后执行 必须是在安装mongodb的bin目录下执行 mongod --dbpath c:\data  这个只是打开了monngodb数据库的服务

二、mac配置
    1、安装完成之后 ~ /etc/path/配置全局变量
    2、mongod --dbpath /Users/xuyifei/Documents/mongodb/mongodata/db  连接mongodb数据库
    3、另外打开一个终端执行mongo  进去mongodb数据库
    4、还可以通过配置文件启动  mongod -f ./mongo.conf     如果需要结束 通过 kill 13025杀死进程的方式停止   
        logpath=/Users/xuyifei/Documents/mongodb/mongodata/log/mongo.log
        dbpath=/Users/xuyifei/Documents/mongodb/mongodata/db
        fork=true
        port=27017   这个是mongo.conf的配置文件

        常见报错
          1、 about to fork child process, waiting until server is ready for connections.
              forked process: 1854
              ERROR: child process failed, exited with error number 100  
              这个需要进入自己建的数据库  /Users/xuyifei/Documents/mongodb/mongodata/db 删除mongo.lock文件

3、还是在bin目录下执行mongo连接到mongodb数据库，然后可以执行一些操作
    mongodb的数据库是先有集合（表）后有文档（相当于表里面的每一条数据）
    show dbs查看所有的数据库
    use DATABASE_NAME  如果数据库不存在，则创建数据库，否则切换到指定数据库。
    db 查看当前的数据库
    db.dropDatabase() 删除当前的数据库
    db.createCollection(name, options)  创建集合
    show collections   查看集合列表
    db.collection.find(query, projection)  查询集合文档
    db.collection.remove({})   这个表示删除全部
    db.users.find()  查询users这个文档的所有数据
4、然后执行surpervisor server.js   http://localhost:8081/user如果看到helloWorld就表明成功了

测试一下
