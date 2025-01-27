const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createCategory, getCategory, getSingleCategory } = require("../../controllers/admin/categoryController")

router.route("/get-category").get(getCategory)
router.route("/create-category").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "hero", maxCount: 1 },
]), createCategory)
router.route("/get-category/:id").get(getSingleCategory)

module.exports = router