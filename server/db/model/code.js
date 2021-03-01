//通过定义模型创建数据表
//定义User模型(创建user表)
//导入sequelize, 并且解构 DataTypes, Model
const { DataTypes, Model } = require('sequelize');
class Code extends Model { }

//调用User类继承Model的init进行初始化模型结构
Code.init({
    //定义id字段 - 表id
    id: {
        //数据类型
        type: DataTypes.INTEGER.UNSIGNED,

        //是否允许为null
        allowNull: false,

        //主键
        primaryKey: true,

        //自动递增
        autoIncrement: true,

        //注释
        comment: '表id'
    },

    codeId: {
        type: DataTypes.STRING(20),
        allowNull: false,
        //是否具有唯一约束, 用户id不能有重复
        unique: true,
        //默认值
        defaultValue: '',
        comment: '验证码唯一id'
    },



    email: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: '',
        comment: '邮箱'
    },
    code: {
        type: DataTypes.STRING(40),
        allowNull: false,
        defaultValue: '',
        comment: '验证码'
    }

}, {
    //指定创建模型的数据库连接实例
    sequelize,

    //模型名称, 创建表名则为modelName的复数化 User -> users
    // modelName: 'User',

    //强制使用模型名称作为表名 User -> user
    // freezeTableName: true,

    //指定表名
    tableName: 'code'
})

//同步数据库
//force: false ==> 如果表存在, 则不会创建表, 如果表不存在, 则新建一个表
//force: true ==> 无论表是否存在, 始终创建一个新表 (即: 如果表存在, 则先删除旧表, 再创建新表)
Code.sync({ force: false });
module.exports = Code