const router = require("express").Router()
const axios = require("axios")
require("dotenv").config()
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

            // Creating the promises urls for the recommendations
            for (let i = 0; i < recommendations.length; i++) {

                namesOnly.push(recommendations[i].Name.toLowerCase())
                const singleUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`
                promiseArr.push(axios.get(singleUrl))

            }

            // Logic for the main search title
            const masterSearch = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&page=1&query=${searchQuery}`
            promiseArr.push(axios.get(masterSearch))

            // Runs All Promises
            Promise.all(promiseArr).then(output => {
                        
                for (let x = 0; x < output.length; x++) {
                    let single = output[x].data.results

                    for (let z = 0; z < single.length; z++) {
                        if (namesOnly.includes(single[z].title.toLowerCase())) {
                            movieData.push(single[z])
                            break
                        } else if (searchQuery.toLowerCase() === single[z].title.toLowerCase()) {
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

            // Creating the promises urls for the recommendations
            for (let i = 0; i < recommendations.length; i++) {

                namesOnly.push(recommendations[i].Name.toLowerCase())
                const singleUrl = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`
                promiseArr.push(axios.get(singleUrl))

            }

            // Logic for the main search title
            const masterSearch = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&language=en-US&page=1&query=${searchQuery}`
            promiseArr.push(axios.get(masterSearch))

            // Runs All Promises
            Promise.all(promiseArr).then(output => {
                        
                for (let x = 0; x < output.length; x++) {
                    let single = output[x].data.results

                    for (let z = 0; z < single.length; z++) {
                        if (namesOnly.includes(single[z].name.toLowerCase())) {
                            showData.push(single[z])
                            break
                        } else if (searchQuery.toLowerCase() === single[z].name.toLowerCase()) {
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

function getActorsMovie(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let filmId = req.params.filmId
    
    const url = `https://api.themoviedb.org/3/movie/${filmId}/credits?api_key=${tmdbApiKey}`

    axios.get(url)
        .then(response => {
            let actors = response.data
            res.send(actors)
        })
        .catch(err => {
            console.log(err)
        })
    
}

function getActorsShow(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let filmId = req.params.filmId
    
    const url = `https://api.themoviedb.org/3/tv/${filmId}/credits?api_key=${tmdbApiKey}`

    axios.get(url)
        .then(response => {
            let actors = response.data
            res.send(actors)
        })
        .catch(err => {
            console.log(err)
        })
    
}

function getRatingMovie(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let filmId = req.params.filmId

    const url = `https://api.themoviedb.org/3/movie/${filmId}/release_dates?api_key=${tmdbApiKey}`

    axios.get(url)
        .then(response => {
            let ratingsArray = response.data.results

            // Sorts through the ratings looking for the US rating
            for (let i = 0; i < ratingsArray.length; i++) {
                if (ratingsArray[i].iso_3166_1 === "US") {
                    let rating = {value: ratingsArray[i].release_dates[0].certification}
                    res.send(rating)
                    break
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    
}

function getRatingTV(req, res) {
    const tmdbApiKey = process.env.tmdbApiKey
    let filmId = req.params.filmId
    
    const url = `https://api.themoviedb.org/3/tv/${filmId}/content_ratings?api_key=${tmdbApiKey}`

    axios.get(url)
        .then(response => {
            let ratingsArray = response.data.results

            // Sorts through the ratings looking for the US rating
            for (let i = 0; i < ratingsArray.length; i++) {
                if (ratingsArray[i].iso_3166_1 === "US") {
                    let rating = {value: ratingsArray[i].rating}
                    res.send(rating)
                    break
                }
            }
        })
        .catch(err => {
            console.log(err)
        })
    
}

function featuresSearch(req, res) {

    const tmdbApiKey = process.env.tmdbApiKey
    let type = req.params.type
    let adults = req.params.adults
    let genres= req.params.genres
    let year = req.params.year
    
    let url

    // Handles the logic for deciding which api call to make
    if (type === "movie" && year === "noYear") {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adults}&include_video=false&page=1&with_genres=${genres}`
    } else if (type === "tv" && year === "noYear") {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genres}&include_null_first_air_dates=false`
    } else if (type === "tv") {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&page=1&with_genres=${genres}&include_null_first_air_dates=false&first_air_date_year=${year}`
    } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${tmdbApiKey}&language=en-US&sort_by=popularity.desc&include_adult=${adults}&include_video=false&page=1&with_genres=${genres}&primary_release_year=${year}`
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

function favoriteMovieRecommendations(req, res) {
    const tasteDiveApiKey = process.env.tasteDiveApiKey
    const tmdbApiKey = process.env.tmdbApiKey
    let data = req.params.movieNames
    let searchQuery = data.split(",").join("%2C+")
    let movieNames = data.split(",")
    
    const url = `https://tastedive.com/api/similar?type=movies&q=${searchQuery}&k=${tasteDiveApiKey}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results
            let movieData = []
            const promiseArr = []

            // Creating the promises urls for the recommendations
            for (let i = 0; i < recommendations.length; i++) {

                movieNames.push(recommendations[i].Name.toLowerCase())
                const singleUrl = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`
                promiseArr.push(axios.get(singleUrl))

            }

            // Runs All Promises
            Promise.all(promiseArr).then(output => {
                        
                for (let x = 0; x < output.length; x++) {
                    let single = output[x].data.results

                    for (let z = 0; z < single.length; z++) {
                        if (movieNames.includes(single[z].title.toLowerCase())) {
                            single[z].type = "movie"
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

function favoriteShowRecommendations(req, res) {
    const tasteDiveApiKey = process.env.tasteDiveApiKey
    const tmdbApiKey = process.env.tmdbApiKey
    let data = req.params.showNames
    let searchQuery = data.split(",").join("%2C+")
    let showNames = data.split(",")
    
    const url = `https://tastedive.com/api/similar?type=shows&q=${searchQuery}&k=${tasteDiveApiKey}`

    axios.get(url)
        .then(response => {
            let recommendations = response.data.Similar.Results
            let showData = []
            const promiseArr = []

            // Creating the promises urls for the recommendations
            for (let i = 0; i < recommendations.length; i++) {

                showNames.push(recommendations[i].Name.toLowerCase())
                const singleUrl = `https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&language=en-US&page=1&query=${recommendations[i].Name}`
                promiseArr.push(axios.get(singleUrl))

            }

            // Runs All Promises
            Promise.all(promiseArr).then(output => {
                        
                for (let x = 0; x < output.length; x++) {
                    let single = output[x].data.results

                    for (let z = 0; z < single.length; z++) {
                        if (showNames.includes(single[z].name.toLowerCase())) {
                            single[z].type = "show"
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

router.get("/api/actors/movie/:filmId", getActorsMovie)

router.get("/api/actors/tv/:filmId", getActorsShow)

router.get("/api/rating/movie/:filmId", getRatingMovie)

router.get("/api/rating/tv/:filmId", getRatingTV)

router.get("/search/:type/:adults/:genres/:year", featuresSearch)

router.get("/api/favorites/movies/recommendations/:movieNames", favoriteMovieRecommendations)

router.get("/api/favorites/shows/recommendations/:showNames", favoriteShowRecommendations)

router.post("/add/:username", users.addFavorites)

router.post("/remove/:username/:id", users.removeSingleFavorite)

router.get("/favorites/:username", users.findFavorites)

router.post("/add/watchlist/:username", users.addToWatchList)

router.post("/remove/watchlist/:username/:id", users.removeSingleWatchListItem)

router.get("/watchlist/:username", users.showWatchList)

router.post("/create", users.create)

router.get("/login/:username", users.login)

router.get("/check/:email/:username", users.checkIfExists)

module.exports = router