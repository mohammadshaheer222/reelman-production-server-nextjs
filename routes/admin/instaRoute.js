const express = require("express")
const router = express.Router()
const { createInstaController } = require("../../controllers/admin/instaController")

router.route("admin/insta").post(createInstaController)

module.exports = router