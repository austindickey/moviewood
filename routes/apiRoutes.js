const router = require("express").Router()
const axios = require('axios')
require("dotenv").config()
// const controller = require("../controllers/userController")

function movieSearch(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let searchQuery = req.params.search
    
    const url = `https://tastedive.com/api/similar?type=movies&q=${searchQuery}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results

            console.log("Recommendations: ", recommendations)

            let movieData = []

            for (let i = 0; i < recommendations.length; i++) {
                const singleUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`
                axios.get(singleUrl)
                    .then(singleResponse => {
                        let single = singleResponse.data.results
                        
                        for (let x = 0; x < single.length; x++) {

                            if (single[x].title.toLowerCase() === recommendations[i].Name.toLowerCase()) {
                                console.log("Single[i]: ", single[x])
                                movieData.push(single[x])
                                break
                            }

                        }
                        
                    })
                    .catch(err => {
                        console.log(err)
                    })

            }

            if (movieData.length === recommendations.length) {
                res.send(movieData) // I still have to find someway to tell it to wait to send the data
            }

        })
        .then()
        .catch(err => {
            console.log(err)
        })
    
}

function showSearch(req, res) {
    let searchQuery = req.params.search
    
    const url = `https://tastedive.com/api/similar?type=shows&q=${searchQuery}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results
            res.send(recommendations)
        })
        .catch(err => {
            console.log(err)
        })
    
}

router.get("/api/movie/:search", movieSearch)

router.get("/api/tv/:search", showSearch)

module.exports = router