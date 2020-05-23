const db = require("../models")

module.exports = {
  create: function(req, res) {
    db.Users
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  login: function(req, res) {
    db.Users
      .findOne({username: req.params.username})
      .then(dbModel => {
        if (dbModel === null){
          dbModel = {username: "wrong"}
          res.send(dbModel)
        } else {
          res.send(dbModel)
        }
      })
      .catch(err => res.status(422).json(err))
  },
  checkIfExists: function(req, res) {
    db.Users
      .findOne({ $or: [{ email: req.params.email }, { username: req.params.username }] })
      .then(dbModel => {
        if (dbModel === null){
          dbModel = {fields: "validated"}
          res.send(dbModel)
        } else {
          res.send(dbModel)
        }
      })
      .catch(err => res.status(422).json(err))
  },
  findFavorites: function(req, res) {
    db.Users
      .findOne({username: req.params.username})
      .populate("film")
      .sort({ addedDate: -1 })
      .then(dbModel => res.send(dbModel))
      .catch(err => res.status(422).json(err))
  },
  addFavorites: function(req, res) {
    db.Users
      .findOneAndUpdate({username: req.params.username}, { $push: { favorites: req.body } })
      .populate("film")
      .then(dbModel => res.send(dbModel))
      .catch(err => res.status(422).json(err))
  },
  removeSingleFavorite: function(req, res) {
    console.log(req.params.id)
    db.Users
      .findOneAndUpdate({username: req.params.username}, { $pull: { "favorites" : {id: req.params.id} } })
      .then(dbModel => res.send(dbModel))
      .catch(err => res.status(422).json(err))
  }
}