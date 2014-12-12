var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res) {
//   res.send('respond with a resource');
// });

//Get User List
router.get('/userlist', function(req,res) {
  var db = req.db;
  db.collection('usercollection').find().toArray(function(err,items){
    res.json(items);
  });
});

router.post('/adduser', function(req,res){

  var db = req.db;

  db.collection('usercollection').insert(req.body, function(err,resutls){
    res.send(
      (err === null) ? {msg: ''} : {msg: err}
    );
  });
});

module.exports = router;
