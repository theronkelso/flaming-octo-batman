var myProductName = "flaming-octo-batman"
var myVersion = "0.0.1"

var express = require('express');
var router = express.Router();

function getVersion (req,res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('index', { title: myVersion + ' of ' + myProductName});
}

/* GET home page. */
router.get('/', getVersion);
  //res.render('index', { title: 'Version' });
  //res.send(myVersion + ' of ' + myProductName);

module.exports = router;
