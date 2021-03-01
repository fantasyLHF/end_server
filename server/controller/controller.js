// 封装所有操作
const sendValidCode = require(path.resolve(__basename, 'controller/sendValidCode'));
const register = require(path.resolve(__basename, 'controller/register'));
const login = require(path.resolve(__basename, 'controller/login'));
const typeList = require(path.resolve(__basename, 'controller/typeList'));
const create = require(path.resolve(__basename, 'controller/create'));
const deleteType = require(path.resolve(__basename, 'controller/deleteType'));
const change = require(path.resolve(__basename, 'controller/change'));
module.exports = {
    // 发送验证码
    sendValidCode,
    // 注册
    register,
    // 登录
    login,
    // 类型列表
    typeList,
    // 创建类型
    create,
    // 删除类型
    deleteType,
    // 改变类型状态
    change
}