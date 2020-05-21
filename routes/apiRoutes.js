const router = require("express").Router()
const axios = require('axios')
require("dotenv").config()
const favorites = require("../controllers/favorites")
const users = require("../controllers/users")

function movieSearch(req, res) {
    const tasteDiveApiKey = process.env.tasteDiveApiKey
    const tmdbApiKey = process.env.tmdbApiKey
    let searchQuery = req.params.search
    let namesOnly = []
    
    const url = `https://tastedive.com/api/similar?type=movies&q=${searchQuery}&k=${tasteDiveApiKey}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results
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
    const tasteDiveApiKey = process.env.tasteDiveApiKey
    const tmdbApiKey = process.env.tmdbApiKey
    let searchQuery = req.params.search
    let namesOnly = []
    
    const url = `https://tastedive.com/api/similar?type=shows&q=${searchQuery}&k=${tasteDiveApiKey}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results
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

function occasionSearch(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let type = req.params.type
    let adults = req.params.adults
    let genres= req.params.genres
    let year = req.params.year
    
    let url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adults}&include_video=false&page=1&with_genres=${genres}&year=${year}`

    if (type === "movie" && year === "noYear") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adults}&include_video=false&page=1&with_genres=${genres}`
    } else if (type === "tv" && year === "noYear") {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genres}&include_null_first_air_dates=false`
    } else if (type === "tv") {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genres}&include_null_first_air_dates=false&first_air_date_year=${year}`
    }

    axios.get(url)
        .then(response => {
            let results = response.data.results
            res.send(results)
        })
        .catch(err => {
            console.log(err)
        })
    
}

router.get("/api/movie/:search", movieSearch)

router.get("/api/tv/:search", showSearch)

router.get("/search/:type/:adults/:genres/:year", occasionSearch)

router.post("/add", favorites.create)

router.post("/remove/:id", favorites.remove)

router.get("/favorites", favorites.findAll)

router.post("/create", users.create)

router.get("/login/:username", users.login)

router.get("/check/:email/:username", users.checkIfExists)

module.exports = router