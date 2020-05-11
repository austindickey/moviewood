const router = require("express").Router()
const request = require('request')
// const controller = require("../controllers/userController")

function apiCall(req, res) {
    // const apiKey = process.env.apiKey
    let searchQuery = req.params.search
    
    const url = `https://tastedive.com/api/similar?q=${searchQuery}`
    request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            let recommendations = JSON.parse(data).Similar.Results
            res.send(recommendations)
        } else if (error) throw error
      })
    
}

router.get("/api/:search", apiCall)

module.exports = router