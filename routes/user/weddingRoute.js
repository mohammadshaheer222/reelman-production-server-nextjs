const express = require("express")
const router = express.Router()
const { getWedding, getSingleCard, getSingleWedding } = require("../../controllers/user/weddingController")

router.route("/user-wedding").get(getWedding)
router.route("/wedding/:id").get(getSingleCard)
router.route("/user-wedding/:category").get(getSingleWedding)

module.exports = router