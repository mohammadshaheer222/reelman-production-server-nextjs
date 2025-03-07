const express = require('express');
const cors = require('cors');
const app = express();

// CORS configuration
const corsOptions = {
    origin: ['https://reelman-production-nextjs-zgaf.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
    credentials: true,
    optionsSuccessStatus: 200
};

// Apply CORS before any route handlers
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Add security headers
app.use((req, res, next) => {
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('X-Frame-Options', 'DENY');
    res.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    next();
});

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
