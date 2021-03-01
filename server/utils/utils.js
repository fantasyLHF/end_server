// 导入nodemailer模块
const nodemailer = require('nodemailer')
//导入jsonwebtoken模块签名token
const jsonwebtoken = require('jsonwebtoken');
// 创建邮箱传输对象
let transporter = nodemailer.createTransport({
    // 发件地址
    host: 'smtp.qq.com',
    // 端口
    port: 465,
    // 安全，设置port为465，需要将secure设置为true
    secure: true,
    // 授权
    auth: {
        // 用户名，邮箱账号
        user: '1421836400@qq.com',
        // 授权码(不是邮箱密码)
        pass: 'oyfkwiylkbcbidej'
    }
})


class Utils {
    //随机生成数字验证码
    createValidCode(n) {
        //n: 验证码字符数量, number
        let chars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

        let codes = [];
        for (let i = 0; i < n; i++) {
            let randomIndex = Math.floor(Math.random() * chars.length);
            codes.push(chars[randomIndex]);
        }

        return codes.join('');
    }
    // 发邮件
    sendMail(email, code) {
        return new Promise((resolve, reject) => {
            transporter.sendMail({
                // 发件者邮箱地址
                from: '1421836400@qq.com',
                // 接收邮箱地址，如果存在多个接收邮件地址，每个邮箱地址用,隔开
                to: email,
                // 邮箱主题
                subject: '你的验证码',
                // 邮件内容
                text: '验证码为：' + code,
                //邮件html内容
                // html: '<a href="https://www.jd.com">点击连接验证</a>'
            }, (err, info) => {
                // 邮件发送失败
                if (err) {
                    reject(err);
                } else {
                    //发邮件成功
                    resolve(info);
                }
            })
        })
    }
    //签名token
    signToken(value) {
        //value: 签名的字符串, string
        return jsonwebtoken.sign({
            data: value,
        }, '_tks', {
            expiresIn: '1d'
        });
    }
    //解析token
    verifyToken(token) {
        return new Promise((resolve, reject) => {
            jsonwebtoken.verify(token, '_tks', (err, decoded) => {
                if (err) {
                    //token解析失败
                    reject(err);
                } else {
                    //token解析成功
                    resolve(decoded);
                }
            });
        })
    }
}
module.exports = new Utils()