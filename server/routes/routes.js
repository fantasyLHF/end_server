//导入控制器所有路由操作
const controller = require(path.resolve(__basename, 'controller/controller.js'))
module.exports = app => {
    // 发送验证码
    app.post('/sendValidCode', controller.sendValidCode)
    // 注册请求
    app.post('/register', controller.register)
    // 登录请求
    app.post('/login', controller.login)
    // 获取类型数据
    app.get('/typeList', controller.typeList)
    // 创建类型请求
    app.post('/create', controller.create)
    // 删除选择
    app.post('/deleteType', controller.deleteType)
    // 改变商品类型状态
    app.post('/change', controller.change)
}