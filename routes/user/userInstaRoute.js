const express = require("express")
const router = express.Router()
const { userInsta } = require("../../controllers/user/userInstaController")

router.route("/user-insta").get(userInsta)

module.exports = router