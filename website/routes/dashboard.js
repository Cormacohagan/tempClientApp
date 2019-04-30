var express = require('express');
var router = express.Router();
var path = require('path');

/* GET dashboard page. */
router.get('/', function(req, res, next) {

    //res.render('/pages/home/home');
    res.sendFile(path.join(__dirname + '/../public/pages/dashboard/dashboard.html'));

});

module.exports = router;
