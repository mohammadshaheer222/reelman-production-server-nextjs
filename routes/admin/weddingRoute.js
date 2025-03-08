const express = require("express")
const router = express.Router()
const upload = require("../../multer")
const { createWedding, getWedding, getSingleWedding } = require("../../controllers/admin/weddingController")

router.route("/get-stories").get(getWedding)
router.route("/create-stories").post(upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "hero", maxCount: 1 },
    { name: "wedding-avatar", maxCount: 8}
]), createWedding)
router.route("/get-stories/:id").get(getSingleWedding)

module.exports = router