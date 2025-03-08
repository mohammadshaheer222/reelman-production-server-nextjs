const express = require("express")
const router = express.Router()
const { userInsta } = require("../../controllers/user/userInstaController")

router.route("/get-insta").get(userInsta)

module.exports = router
