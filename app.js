const express = require("express")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")

const ErrorHandler = require("./middlewares/Error")
const notFound = require("./middlewares/not-found")

const app = express()

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "https://reelmanproduction.com",
            "https://www.reelmanproduction.com",
            "https://api.reelmanproduction.com",
        ],
        credentials: true,
    })
)
// Increase JSON payload size limit
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

// Increase URL-encoded payload size limit
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }))
app.use("/uploads", express.static("uploads"))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

//admin routes
const InstaRoute = require("./routes/admin/instaRoute")
const heroRoute = require("./routes/admin/heroRoute")
const middleRoute = require("./routes/admin/middleRoute")
const faqRoute = require("./routes/admin/faqRoute")
const testimonialRoute = require("./routes/admin/testimonialRoute")
const categoryRoute = require("./routes/admin/categoryRoute")
const weddingRoute = require("./routes/admin/weddingRoute")
const userMiddleRoute = require("./routes/user/middleRoute")
const userHeroRouter = require("./routes/user/heroRoute")
const userContactRoute = require("./routes/user/contactRoute")
const userWeddingRoute = require("./routes/user/weddingRoute")
const userCategoryRoute = require("./routes/user/categoryRoute")
const userInstaRoute = require("./routes/user/instaRoute")
const userTestimonialRoute = require("./routes/user/testimonialRoute")

app.use("/api/v2/admin", InstaRoute, heroRoute, middleRoute, faqRoute, testimonialRoute, categoryRoute, weddingRoute)
app.use("/api/v2/user", userInstaRoute, userContactRoute, userCategoryRoute, userWeddingRoute, userHeroRouter, userMiddleRoute, userTestimonialRoute)

//Error handling
app.use(ErrorHandler)
app.use(notFound)

module.exports = app

