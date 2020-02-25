/**
 * @Author: John Isaacs <john>
 * @Date:   07-Feb-192019
 * @Filename: index.js
 * @Last modified by:   john
 * @Last modified time: 07-Feb-192019
 */



var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Repository List' });
});

module.exports = router;
