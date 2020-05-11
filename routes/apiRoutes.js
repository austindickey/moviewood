const router = require("express").Router()
const request = require('request')
// const controller = require("../controllers/userController")

function apiCall(req, res) {
    // let searchQuery = req.params.search
    // const apiKey = process.env.apiKey
    
    const url = `https://tastedive.com/api/similar?q=pulp+fiction`
    request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            let recommendations = JSON.parse(data).Similar.Results
            console.log(recommendations)
            res.send(recommendations)
        } else if (error) throw error
      })
    
}

router.get("/api", apiCall)

module.exports = router