var mongoose = require('mongoose');

//用户使用表结构
module.exports = new mongoose.Schema({
    //用户名
    username: String,
    //密码
    password: String
})