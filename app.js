const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

//admin routes
const createInstaRoute =require("./routes/admin/instaRoute")
app.use("/api/v2/admin", createInstaRoute)

module.exports = app