const express = require("express")
const router = express.Router()
const { createFaq, getFaq, getSingleFaq } = require("../../controllers/admin/faqController")

router.route("/get-faq").get(getFaq)
router.route("/create-faq").post(createFaq)
router.route("/get-faq/:id").get(getSingleFaq)

module.exports = router