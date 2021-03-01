// 发送验证码操作
module.exports = (req, res) => {
    console.log('收到了login请求')
    console.log(req.body)
    // 数据库
    // 查看是否注册
    model.User.findAll({
        where: {
            email: req.body.email
        }
    }).then(data => {
        if (data.length == 0) {
            console.log('未注册')
            // 未注册
            res.send({ msg: "邮箱未注册", code: 1000 })
            return
        }
        model.User.findAll({

            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(data => {
            console.log(data)
            if (data.length == 0) {
                // 密码错误
                res.send({ msg: "密码错误", code: 1100 })
                return
            }
            // 登录成功
            let token = utils.signToken(data[0].dataValues.userId);
            res.send({ msg: "登录成功", code: 1111, data: token })
        }).catch(e => {
            console.log(e)
        })
    }).catch(e => {
        console.log(e)
    })

}