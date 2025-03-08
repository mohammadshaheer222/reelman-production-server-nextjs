const express = require("express")
const router = express.Router()
const { getMiddleController } = require("../../controllers/user/usermiddleController")

router.route("/get-middle").get(getMiddleController)

module.exports = router