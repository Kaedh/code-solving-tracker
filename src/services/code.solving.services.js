const db = require("../data/db");

function randomNumber(min, max) { 
  return parseInt(Math.abs(Math.random() * (max - min) + min));
} 

const _markAsActive = async (id) => {
  try {
    await db('tbcode').where({id: id}).update({activechallenge: true})
  
  } catch (err) {
    console.log({ error: true, message: err })
  }
}

const _unmarkAsActive = async (id) => {
  try {
    await db('tbcode').where({id: id}).update({activechallenge: false})
    
  } catch (err) {
    console.log({ error: true, message: err })
  }
}

const _checkIfHasChallengeActive = async () => {
  try {
    const [ result ] = await db('tbcode').where({activechallenge: true})

    return result
    
  } catch (err) {
    console.log({ error: true, message: err })
  }
}

const markAsSolved = async (id) => {
  try {

    await db('tbcode').where({id: id}).update({solved: true})
    await _unmarkAsActive(id)
    
  } catch (err) {
    console.log({ error: true, message: err })
  }
}


const getChallenge = async () => {
  try {
    const challengeActive = await _checkIfHasChallengeActive()
    if(challengeActive) return challengeActive


    let validCode = false;
    const [maxIdResult] = await db('tbcode').count('*')

    const maxInterval = maxIdResult.count
    const minInterval = 1

    while(!validCode) {
      const randomCode = randomNumber(minInterval, maxInterval)
      const [result] = await db('tbcode').where({id: randomCode})

      if (result.solved == false) {
        _markAsActive(result.id)
        validCode = true
        return result
      }  
    }

     

  } catch (err) {
    console.log({ error: true, message: err })
  }
}




module.exports = {
  markAsSolved,
  getChallenge
};