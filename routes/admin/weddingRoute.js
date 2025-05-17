const express = require("express")
const router = express.Router()
const { storage } = require("../../utils/cloudinary");
const multer = require("multer");
const upload = multer({ storage }).fields([
    { name: 'hero', maxCount: 1 }, 
    { name: 'wedding-avatar', maxCount: 8 }
]);
const { createWedding, getWedding, getSingleWedding, deleteWedding } = require("../../controllers/admin/weddingController")

router.route("/get-stories").get(getWedding)
router.route("/create-stories").post(upload, createWedding)
router.route("/get-stories/:id").get(getSingleWedding)
router.route("/delete-stories/:id").delete(deleteWedding)

module.exports = router