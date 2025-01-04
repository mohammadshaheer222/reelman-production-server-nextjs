const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createInstaController, getInsta } = require("../../controllers/admin/instaController")

router.route("/get-insta").get(getInsta)
router.route("/create-insta").post(upload.single("avatar"),createInstaController)

module.exports = router