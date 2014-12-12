var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Welcome' });
});

// GET hello world page
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!' });
});

router.get('/userlist', function(req,res){
  console.log('userlist called');
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

router.get('/newuser', function(req,res){
  res.render('newuser', {title: 'Add New User'});
});




module.exports = router;
