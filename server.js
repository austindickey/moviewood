const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes/apiRoutes")
const app = express()
const PORT = process.env.PORT || 3001
const uri = process.env.JAWSDB_URI;

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
}
// Api Routes
app.use(routes)

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/moviewood',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
)

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})