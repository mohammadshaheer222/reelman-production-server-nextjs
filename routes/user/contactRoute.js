const express = require("express")
const router = express.Router()
const { contactForm } = require("../../controllers/user/contactController")

router.route("/contact-form").post(contactForm)

module.exports = router