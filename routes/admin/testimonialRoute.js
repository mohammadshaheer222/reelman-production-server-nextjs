const express = require("express")
const router = express.Router()
const { storage } = require("../../utils/cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { createTestimonial, getTestimonial, getSingleTestimonial, deletestTestimonial } = require("../../controllers/admin/testimonialController")

router.route("/get-testimonial").get(getTestimonial)
router.route("/create-testimonial").post(upload.single("avatar"), createTestimonial)
router.route("/get-testimonial/:id").get(getSingleTestimonial)
router.route("/delete-testimonial/:id").delete(deletestTestimonial)

module.exports = router