// 导入express
const express = require('express');
//导入body-parser处理请求体模块
const bodyParser = require('body-parser');
// 路径模块
global.path = require('path')
global.__basename = __dirname
// 导入数据库连接
global.sequelize = require(path.resolve(__basename, 'db/connect.js'))

// 导入所有模块
global.model = require(path.resolve(__basename, 'db/model/model.js'))

// 导入工具库
global.utils = require(path.resolve(__basename, 'utils/utils.js'))
// 实例化
let app = express();
//extended:false 方法内部使用querysyring模块处理请求参数的格式
app.use(bodyParser.urlencoded({ extended: false }))
//解析 application/json
app.use(bodyParser.json())

// 中间件
let middleWare = require(path.resolve(__basename, 'middleWare/intercept'))
middleWare(app)

// 路由  // 找到匹配路由后面的其他路由不会执行
let routes = require(path.resolve(__basename, 'routes/routes.js'))
routes(app)

//监听端口
app.listen(9090, () => {
    console.log('端口9090，服务器启动成功')
})