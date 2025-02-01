const express = require("express")
const router = express.Router()
const { getWedding, getSingleCard, getSingleWedding } = require("../../controllers/user/weddingController")

router.route("/user-wedding").get(getWedding)
router.route("/user-wedding/:category").get(getSingleCard)
router.route("/user-wedding-id/:id").get(getSingleWedding)

module.exports = router