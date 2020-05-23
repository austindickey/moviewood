const mongoose = require("mongoose")

const Schema = mongoose.Schema

const usersSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  favorites: {
    type: Array,
    ref: "Film"
  }
})

const Users = mongoose.model("Users", usersSchema)

module.exports = Users