var express = require('express');

var app = express();

var swig = require('swig');
var User = require('./models/User');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var Cookies = require('cookies');
app.use('/public', express.static(__dirname + '/public')); //静态文件托管

app.engine('html', swig.renderFile);
app.set('views', './views');
app.set('view engine', 'html');
swig.setDefaults({
    cache: false
});
//bodyParser设置
app.use(bodyParser.urlencoded({
    extended: true
}))
//设置cookie

app.use(function (req, res, next) {
    req.cookies = new Cookies(req, res);

    //解析登录用户的cookie信息
    req.userInfo = {};
    if (req.cookies.get('userInfo')) {
        try {
            req.userInfo = JSON.parse(req.cookies.get('userInfo'));
            // 获取当前登录用户的类型， 是否是管理员
            User.findById(req.userInfo._id).then(function (userInfo) {
                req.userInfo.isAdmin = Boolean(userInfo.isAdmin);
                next();
            })
        } catch (e) {
            next();
        }

    } else {
        next();
    }
});
app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

app.get('/', function (req, res, next) {
    // res.send('<h1>hello world!!!!</h1>')
    res.render('main/index')
});
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true
}, function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8888, () => console.log('服务启动成功，端口为：8888'));
    }
});