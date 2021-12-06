var express = require('express');
const { getChallenge } = require("../services/code.solving.services");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  getChallenge()
  res.render('index', { title: 'Express' });
});

module.exports = router;
