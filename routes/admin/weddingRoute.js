const express = require("express")
const router = express.Router()
// const upload = require("../../multer")
const multer = require("multer")
const { cloudinary, createCloudinaryStorage } = require("../../utils/cloudinary.js")
const { createWedding, getWedding, getSingleWedding } = require("../../controllers/admin/weddingController")

// Create a custom middleware for wedding uploads
const weddingUpload = () => {
    const heroStorage = createCloudinaryStorage('wedding-hero-images')
    const avatarStorage = createCloudinaryStorage('wedding-avatar-images')

    return (req, res, next) => {
        // Process hero image first
        const uploadHero = multer({ storage: heroStorage }).single('hero')
        uploadHero(req, res, (err) => {
            if (err) return next(err)

            // Then process wedding-avatar images
            const uploadWeddingAvatars = multer({ storage: avatarStorage }).array('wedding-avatar', 8)
            uploadWeddingAvatars(req, res, next)
        })
    }
}

router.route("/get-stories").get(getWedding)
router.route("/create-stories").post(weddingUpload(), createWedding)
router.route("/get-stories/:id").get(getSingleWedding)

module.exports = router