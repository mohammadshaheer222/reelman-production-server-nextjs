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
app.use("/uploads", express.static("uploads"))
app.use(express.urlencoded({ extended: true }))
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
)

//admin routes
const InstaRoute = require("./routes/admin/instaRoute")
const heroRoute = require("./routes/admin/heroRoute")
const middleRoute = require("./routes/admin/middleRoute")
const faqRoute = require("./routes/admin/faqRoute")
const testimonialRoute = require("./routes/admin/testimonialRoute")
const categoryRoute = require("./routes/admin/categoryRoute")
const weddingRoute = require("./routes/admin/weddingRoute")
const userInstaRoute = require("./routes/user/userInstaRoute")
const userContactRoute = require("./routes/user/contactRoute")
const userWeddingRoute = require("./routes/user/weddingRoute")
const userCategoryRoute = require("./routes/user/categoryRoute")

app.use("/api/v2/admin", InstaRoute, heroRoute, middleRoute, faqRoute, testimonialRoute, categoryRoute, weddingRoute )
app.use("/api/v2/user", userInstaRoute, userContactRoute, userCategoryRoute, userWeddingRoute)

//Error handling
app.use(ErrorHandler)
app.use(notFound)

module.exports = app