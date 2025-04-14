const express = require("express")
const router = express.Router()
// const upload = require("../../multer")
const { heroUpload } = require("../../utils/cloudinary")
const { createHeroController, getHeroController, getSingleHeroDetails, deleteHeroDetails } = require("../../controllers/admin/heroController")

router.route("/get-hero").get(getHeroController)
router.route("/create-hero").post(heroUpload.single("avatar"), createHeroController)
router.route("/get-hero/:id").get(getSingleHeroDetails)
router.route("/delete-hero/:id").delete(deleteHeroDetails)

module.exports = router