const mongoose = require("mongoose")

const Schema = mongoose.Schema

const filmSchema = new Schema({
  adult: Boolean,
  genre_ids: Array,
  id: Number,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  title: String
})

const Film = mongoose.model("Film", filmSchema)

module.exports = Film