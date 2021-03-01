const utils = require("../utils/utils")

// 发送验证码操作
module.exports = (req, res) => {
    console.log("接收到创建类型请求")
    console.log(req.body)
    // 判断是否已经存在类型
    model.TypeList.findAll({
        where: {
            name: req.body.name
        }
    }).then(data => {
        if (data.length > 0) {
            //已存在改类型
            res.send({ msg: '已存在改类型', code: 1121 })
            return
        }
        typeId = 't_' + utils.createValidCode(6)
        model.TypeList.create({
            name: req.body.name,
            status: req.body.status,
            typeId: typeId
        }).then(result => {
            res.send({ msg: '创建成功', code: 11011 })
        }).catch(e => {
            res.send({ msg: '创建失败', code: 11012 })
        })
    }).catch(e => {
        console.log(e)
    })

}