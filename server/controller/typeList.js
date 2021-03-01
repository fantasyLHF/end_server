// 发送验证码操作
module.exports = (req, res) => {
    console.log("将接收到类型请求")
    model.TypeList.findAll({
        where: {
            remove: 0
        }
    }).then(result => {
        let arr = []
        result.forEach(v => {
            arr.push(v)
        })
        res.send({ msg: '请求数据成功', data: arr, code: 11111 })
    }).catch(e => {
        console.log(e)
    })

}