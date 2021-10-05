const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/apiRoutes")
const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
// Api Routes
app.use(routes)

// Connect to the JawsDB
var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL || "mysql://lpmvc14uv3ceukz9:l14v37tytqnzywfk@z3iruaadbwo0iyfp.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/dxswhu8ayqvz8ewh")

connection.connect()

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err

  console.log('The solution is: ', rows[0].solution)
});

connection.end()

// Connect to the Mongo DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/moviewood", {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})