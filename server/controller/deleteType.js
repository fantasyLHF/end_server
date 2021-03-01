module.exports = (req, res) => {
    console.log('收到请求删除商品类型')
    console.log(req.body)
    model.TypeList.destroy({
        where: {
            typeId: req.body.typeId
        }
    }).then(data => {
        if (data) {
            res.send({ msg: '删除成功', code: 1122111 })
        } else {
            res.send({ msg: '删除失败', code: 11222222 })
        }
    }).catch(e => {
        res.send({ msg: '删除失败', code: 11222 })
    })
}