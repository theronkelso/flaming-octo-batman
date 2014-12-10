var express = require('express');
var router = express.Router();

function getProjects (req,res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('index', { title: 'Projects'});
}

/* GET home page. */
router.get('/', getProjects);

module.exports = router;
