var express = require('express');
const { getChallenge, markAsSolved } = require("../services/code.solving.services");
var router = express.Router();

const mostraAlert = () => {
  console.log("Deu certo")
}

/* GET home page. */
router.get('/', async function(req, res) {
  const { codeurl, codeid, id } = await getChallenge()
  res.render('index', { title: 'Code Solving Tracker', codeurl, codeid, id });
});

router.get('/markAsSolved/:codedbid', async function(req, res) {
 
  const { codedbid }  = req.params
  await markAsSolved(codedbid)

  res.redirect("/")

});

module.exports = router;
