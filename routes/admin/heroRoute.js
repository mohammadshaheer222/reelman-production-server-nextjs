const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createHeroController, getHeroController, getSingleHeroDetails } = require("../../controllers/admin/heroController")

router.route("/get-hero").get(getHeroController)
router.route("/create-hero").post(upload.single("avatar"), createHeroController)
router.route("/get-hero/:id").get(getSingleHeroDetails)

module.exports = router