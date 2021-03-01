//导入sequelize模块(用于操作数据库 - mysql)
//Sequelize: 用于创建连接实例
//DataTypes: 数据类型
//Model: 定义模型
const { Sequelize } = require('sequelize');
// 创建数据库连接
// new Sequelize(数据库名称,数据库登录用户,数据库密码,配置选项)
module.exports = new Sequelize('server', 'root', 'root', {
    // 主机
    host: 'localhost',
    // 数据库类型
    dialect: 'mysql',
    //定义字段命名规则
    define: {
        //字段名以 _ 分隔命名
        underscored: true
    },
    timezone: '+08:00'
});