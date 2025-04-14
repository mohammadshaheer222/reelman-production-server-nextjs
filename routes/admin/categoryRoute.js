const express = require("express")
const router = express.Router()
// const upload = require("../../multer")
const { categoryUpload } = require("../../utils/cloudinary")
const { createCategory, getCategory, getSingleCategory } = require("../../controllers/admin/categoryController")

router.route("/get-category").get(getCategory)
router.route("/create-category").post(categoryUpload.single("avatar"), createCategory)
router.route("/get-category/:id").get(getSingleCategory)

module.exports = router