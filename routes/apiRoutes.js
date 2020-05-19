const router = require("express").Router()
const axios = require('axios')
require("dotenv").config()
// const controller = require("../controllers/userController")

function movieSearch(req, res) {
    const tasteDiveApiKey = process.env.tasteDiveApiKey
    const tmdbApiKey = process.env.tmdbApiKey
    let searchQuery = req.params.search
    let namesOnly = []
    
    const url = `https://tastedive.com/api/similar?type=movies&q=${searchQuery}&k=${tasteDiveApiKey}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results

            console.log("Recommendations: ", recommendations)

            let movieData = []
            const promiseArr = []

            for (let i = 0; i < recommendations.length; i++) {

                namesOnly.push(recommendations[i].Name.toLowerCase())

                const singleUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`

                promiseArr.push(axios.get(singleUrl))

            }

            Promise.all(promiseArr).then(singleResponse => {
                        
                for (let x = 0; x < singleResponse.length; x++) {
                    let single = singleResponse[x].data.results

                    for (let z = 0; z < single.length; z++) {
                        if (namesOnly.includes(single[z].title.toLowerCase())) {
                            movieData.push(single[z])
                            break
                        }
                    }

                }

                res.send(movieData)

            })

        })
        .catch(err => {
            console.log(err)
        })
    
}

function showSearch(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let searchQuery = req.params.search
    let namesOnly = []
    
    const url = `https://tastedive.com/api/similar?type=shows&q=${searchQuery}&k=${tasteDiveApiKey}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results

            console.log("Recommendations: ", recommendations)

            let showData = []
            const promiseArr = []

            for (let i = 0; i < recommendations.length; i++) {

                namesOnly.push(recommendations[i].Name.toLowerCase())

                const singleUrl = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`

                promiseArr.push(axios.get(singleUrl))

            }

            Promise.all(promiseArr).then(singleResponse => {
                        
                for (let x = 0; x < singleResponse.length; x++) {
                    let single = singleResponse[x].data.results

                    for (let z = 0; z < single.length; z++) {
                        if (namesOnly.includes(single[z].name.toLowerCase())) {
                            showData.push(single[z])
                            break
                        }
                    }

                }

                res.send(showData)

            })

        })
        .catch(err => {
            console.log(err)
        })
    
}

router.get("/api/movie/:search", movieSearch)

router.get("/api/tv/:search", showSearch)

module.exports = router