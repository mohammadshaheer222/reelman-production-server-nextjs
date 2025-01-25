const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createTestimonial, getTestimonial, getSingleTestimonial } = require("../../controllers/admin/testimonialController")

router.route("/get-testimonial").get(getTestimonial)
router.route("/create-testimonial").post(upload.single("avatar"),createTestimonial)
router.route("/get-testimonial/:id").get(getSingleTestimonial)

module.exports = router