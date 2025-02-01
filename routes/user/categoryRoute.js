const express = require("express")
const router = express.Router()
const { getCategory, getSingleCategory } = require("../../controllers/user/categoryController")

router.route("/user-category").get(getCategory)
router.route("/user-category/:category").get(getSingleCategory)

module.exports = router