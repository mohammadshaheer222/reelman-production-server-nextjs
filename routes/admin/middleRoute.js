const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createMiddleController, getMiddleController, getSingleMiddleDetails, deleteMiddleDetails } = require("../../controllers/admin/middleSliderController")

router.route("/get-middle").get(getMiddleController)
router.route("/create-middle").post(upload.single("avatar"), createMiddleController)
router.route("/get-middle/:id").get(getSingleMiddleDetails)
router.route("/delete-middle/:id").delete(deleteMiddleDetails)

module.exports = router