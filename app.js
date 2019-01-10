var express = require('express');

var app = express();

var swig = require('swig');

var mongoose = require('mongoose');
var bodyParser = require('body-parser');

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

app.use('/admin', require('./routers/admin'));
app.use('/api', require('./routers/api'));
app.use('/', require('./routers/main'));

app.get('/', function (req, res, next) {
    // res.send('<h1>hello world!!!!</h1>')
    res.render('main/index')
});
mongoose.connect('mongodb://localhost:27017/blog',{useNewUrlParser:true}, function (err) {
    if (err) {
        console.log('数据库连接失败');
    } else {
        console.log('数据库连接成功');
        app.listen(8888, () => console.log('服务启动成功，端口为：8888'));
    }
});