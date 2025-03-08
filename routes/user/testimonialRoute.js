const express = require("express")
const router = express.Router()
const { getTestimonial } = require("../../controllers/user/userTestimonialController")

router.route("/get-testimonial").get(getTestimonial)

module.exports = router