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
  }
}