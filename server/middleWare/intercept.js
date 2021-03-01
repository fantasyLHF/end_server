// 中间件
module.exports = app => {
    //app.all(*)表示所有请求路径必须经过
    app.all('*', (req, res, next) => {
        console.log(req.headers.origin)
        //允许跨域地址
        res.header("Access-Control-Allow-Origin", req.headers.origin);

        //*表示允许所有域请求，在实际开发中，一般指定允许某个域请求，如上面设置
        //res.header("Access-Control-Allow-Origin", "*");

        //如果浏览器请求包括Access-Control-Request-Headers字段，则Access-Control-Allow-Headers字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段，不限于浏览器在"预检"中请求的字段。
        //允许请求头携带的信息
        res.header("Access-Control-Allow-Headers", "X-Requested-With,content-type");

        //该字段必需，它的值是逗号分隔的一个字符串，表明服务器支持的所有跨域请求的方法。注意，返回的是所有支持的方法，而不单是浏览器请求的那个方法。这是为了避免多次"预检"请求。
        res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

        //该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。设为true，即表示服务器明确许可，Cookie可以包含在请求中，一起发给服务器。这个值也只能设为true，如果服务器不要浏览器发送Cookie，删除该字段即可
        //res.header('Access-Control-Allow-Credentials', true);
        next();

    });
    //检测OPTIONS嗅探, 如果不检测OPTIONS请求，则下面的中间件会被执行两次
    app.use((req, res, next) => {
        console.log('req.method ==> ', req.method);
        if (req.method == 'OPTIONS') {
            console.log('在此拦截了options请求')
            res.send(true);
        } else {
            next();
        }
    })
}