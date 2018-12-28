var express=require('express');

var app=express();

var swig=require('swig');

app.use('/public',express.static(__dirname+'/public'));

app.engine('html',swig.renderFile);
app.set('views','./views');
app.set('view engine','html');
swig.setDefaults({
    cache:false
});
app.get('/',function (req,res,next) {
    // res.send('<h1>hello world!!!!</h1>')
    res.render('index')
});

app.listen(8888);