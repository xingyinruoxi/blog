var express = require('express');
var router = express.Router();
router.get('/user', function (req, res, next) {
    res.send('<h1>main user</h1>')
})
module.exports=router;