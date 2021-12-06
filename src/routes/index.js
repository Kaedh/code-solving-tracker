var express = require('express');
const { getChallenge, markAsSolved } = require("../services/code.solving.services");
var router = express.Router();

const mostraAlert = () => {
  console.log("Deu certo")
}

/* GET home page. */
router.get('/', async function(req, res) {
  const { codeurl, codeid } = await getChallenge()

  res.render('index', { title: 'Express', codeurl, codeid  });
});

module.exports = router;
