var request = require('superagent')
var jwtDecode = require('jwt-decode')
require('dotenv').config()

const MainFrame = {
  getUserId: (jwtToken) => {
    return jwtDecode(jwtToken).user_id || 0
  },

  completePuzzle: (jwtToken, puzzleNumber) => {
    request
      .post(`${process.env.API_ENPOINT}/v1/users/me/puzzles?puzzle_id=${puzzleNumber}&puzzle_secret=${process.env.PUZZLE_SECRET}&token=${jwtToken}`).then(
        success => {},
        fail => {console.log(fail)}
      )
  },

  getCompletedPuzzles: (jwtToken) => {
   return request
      .get(`${process.env.API_ENPOINT}/v1/users/me/puzzles?token=${jwtToken}`)
      .then( res => {
        return res.body.puzzles
      }, reason => {
        console.log(reason)
        return undefined
      })
  }
}

module.exports = MainFrame
