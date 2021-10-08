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

// Connect to the Mongo DB
mongoose.connect("mongodb+srv://austind10:Hotatl2323@moviewood.8xgcy.mongodb.net/UserData", {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})