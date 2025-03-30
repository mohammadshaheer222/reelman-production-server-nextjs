const express = require("express")
const router = express.Router()
// const upload = require("../../multer")
const { testimonialUpload } = require("../../utils/cloudinary")
const { createTestimonial, getTestimonial, getSingleTestimonial, deletestTestimonial } = require("../../controllers/admin/testimonialController")

router.route("/get-testimonial").get(getTestimonial)
router.route("/create-testimonial").post(testimonialUpload.single("avatar"), createTestimonial)
router.route("/get-testimonial/:id").get(getSingleTestimonial)
router.route("/delete-testimonial/:id").delete(deletestTestimonial)

module.exports = router