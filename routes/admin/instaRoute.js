const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createInstaController, getInsta, getSingleInstaDetails, deleteInstaDetails } = require("../../controllers/admin/instaController")

router.route("/get-insta").get(getInsta)
router.route("/create-insta").post(upload.single("avatar"),createInstaController)
router.route("/get-insta/:id").get(getSingleInstaDetails)
router.route("/delete-insta/:id").delete(deleteInstaDetails)

module.exports = router