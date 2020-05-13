const router = require("express").Router()
const request = require('request')
// const controller = require("../controllers/userController")

function movieSearch(req, res) {
    // const apiKey = process.env.apiKey
    let searchQuery = req.params.search
    
    const url = `https://tastedive.com/api/similar?type=movies&q=${searchQuery}`
    request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            let recommendations = JSON.parse(data).Similar.Results
            res.send(recommendations)
        } else if (error) throw error
    })
    
}

function showSearch(req, res) {
    // const apiKey = process.env.apiKey
    let searchQuery = req.params.search
    
    const url = `https://tastedive.com/api/similar?type=shows&q=${searchQuery}`
    request(url, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            let recommendations = JSON.parse(data).Similar.Results
            res.send(recommendations)
        } else if (error) throw error
    })
    
}

router.get("/api/movie/:search", movieSearch)

router.get("/api/tv/:search", showSearch)

module.exports = router