// 发送验证码操作
module.exports = (req, res) => {
    console.log('接收到注册请求了')
    console.log(req.body)
    // 判断邮箱是否被注册
    model.User.findAll({
        where: {
            email: req.body.email
        }
    }).then(data => {
        // 判断是否已经存在用户
        if (data.length > 0) {
            res.send({ msg: '邮箱已被注册', code: 1221 })
            return
        }
        // 判断验证码是否对应邮箱
        model.Code.findAll({
            where: {
                email: req.body.email,
                code: req.body.code
            }
        }).then(data => {
            // 验证码是否存在
            if (data.length == 0) {
                res.send({ msg: '验证码无效', code: 1222 })
                return
            }
            let sendTime = new Date(data[0].dataValues.updatedAt).getTime()
            let nowTime = new Date().getTime()
            if (nowTime - sendTime > 1000 * 60 * 5) {
                // 验证码是否超时
                res.send({ msg: '验证码超时', code: 1223 })
                return
            }
            // 开始注册
            // 向数据库添加用户
            const code = utils.createValidCode(6)
            model.User.create({
                email: req.body.email,
                password: req.body.password,
                userId: 'u_' + code,
            }).then(data => {
                res.send({ msg: '注册成功', code: 1220 })
            }).catch(e => {
                res.send({ msg: '注册失败', code: 1224 })
            })


        }).catch(e => {
            console.log(e)
        })
        console.log(2222)
    }).catch(e => {
        console.log(e)
    })
}