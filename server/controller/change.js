// 发送验证码操作
module.exports = (req, res) => {
    console.log("接收到改变状态请求")
    console.log(req.body)
    model.TypeList.update({ status: req.body.status }, {
        where: {
            typeId: req.body.typeId
        }
    }).then(data => {
        res.send({ msg: "改变商品类型状态成功", code: 11111 })
    }).catch(e => {
        console.log(e)
        res.send({ msg: "改变商品类型状态失败", code: 11112 })
    })
}