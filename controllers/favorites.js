const db = require("../models")

module.exports = {
  findAll: function(req, res) {
    db.Film
      .find(req.query)
      .sort({ addedDate: -1 })
      .then(dbModel => res.send(dbModel))
      .catch(err => res.status(422).json(err))
  },
  create: function(req, res) {
    db.Film
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  },
  remove: function(req, res) {
    db.Film
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err))
  }
}