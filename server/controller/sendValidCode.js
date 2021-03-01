const utils = require("../utils/utils")

// 发送验证码操作
module.exports = (req, res) => {
    console.log('验证码请求')
    console.log(req.body)
    // 接收到请求
    // 查找邮箱看是否已经注册
    model.User.findAll({
        attributes: ['userId'],
        where: {
            email: req.body.email
        }
    }).then(data => {

        if (data.length != 0) {
            res.send({ msg: '邮箱已经被注册', code: 1221 })
            return
        }
        //进行提交数据库
        // 将code写入数据库
        const code = utils.createValidCode(6)
        console.log(code)
        model.Code.create({
            email: req.body.email,
            codeId: 'c_' + code,
            code: code
        }).then(result => {
            // 发送验证码到邮箱
            utils.sendMail(req.body.email, code).then(data => {
                res.send({ msg: '发送邮件成功', code: 10022 })
            }).catch(e => {
                res.send({ msg: '发送邮件失败', code: 10021 })
            })
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })

}
