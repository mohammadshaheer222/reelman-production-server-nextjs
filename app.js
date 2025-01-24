const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")

const ErrorHandler = require("./middlewares/Error")
const notFound = require("./middlewares/not-found")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

//admin routes
const createInstaRoute = require("./routes/admin/instaRoute")
const heroRoute = require("./routes/admin/heroRoute")
const middleRoute = require("./routes/admin/middleRoute")
const userInstaRoute = require("./routes/user/userInstaRoute")

app.use("/api/v2/admin", createInstaRoute, heroRoute, middleRoute )
app.use("/api/v2/user", userInstaRoute)

//Error handling
app.use(ErrorHandler)
app.use(notFound)

module.exports = app