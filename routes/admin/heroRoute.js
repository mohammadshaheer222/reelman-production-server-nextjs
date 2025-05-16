const express = require("express")
const router = express.Router()
const { storage } = require("../../utils/cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { createHeroController, getHeroController, getSingleHeroDetails, deleteHeroDetails } = require("../../controllers/admin/heroController")

router.route("/get-hero").get(getHeroController)
router.route("/create-hero").post(upload.single("avatar"), createHeroController)
router.route("/get-hero/:id").get(getSingleHeroDetails)
router.route("/delete-hero/:id").delete(deleteHeroDetails)

module.exports = router