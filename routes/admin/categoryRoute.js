const express = require("express")
const router = express.Router()
const { storage } = require("../../utils/cloudinary");
const multer = require("multer");
const upload = multer({ storage });
const { createCategory, getCategory, getSingleCategory, deleteCategory } = require("../../controllers/admin/categoryController")

router.route("/get-category").get(getCategory)
router.route("/create-category").post(upload.single("avatar"), createCategory)
router.route("/get-category/:id").get(getSingleCategory)
router.route("/delete-category/:id").delete(deleteCategory)

module.exports = router