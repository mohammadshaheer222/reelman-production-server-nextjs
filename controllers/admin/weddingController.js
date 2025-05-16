const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp.js")
const WeddingModel = require("../../models/weddingModel")
const ErrorHandler = require("../../utils/ErrorHandler.js")

const getWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const wedding = await WeddingModel.find({})
        res.status(200).json({ success: true, wedding })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

// const createWedding = catchAsyncErrors(async (req, res, next) => {
//     try {
//         const errors = {}
//         const { category, groom, bride, description } = req.body

//         if (!category) errors.groom = "Please provide the category field."
//         if (!groom) errors.groom = "Please provide the groom field."
//         if (!bride) errors.bride = "Please provide the bride field."
//         if (!description) errors.description = "Please provide the description field."
//         if (!req.files["hero"] || !req.files.length === 0) errors.avatar = "Please provide the hero field."
//         if (Object.keys(errors).length > 0) return next(new ErrorHandler("Validation failed", 400, errors))

//         const dbPhotosCount = await WeddingModel.countDocuments()
//         const totalUploadedFiles = dbPhotosCount + req.files.length

//         if (totalUploadedFiles > 8) return next(new ErrorHandler("You can upload a maximum of 10 photos ,Delete photos in your list", 400))

//         const heroPath = req.files["hero"][0].path

//         const resizedHeroImage = await resizeImage(heroPath)
//         if (!resizedHeroImage) return next(new ErrorHandler("Error resizing the hero image", 500))

//         const weddingAvatar = []
//         for (const file of req.files["wedding-avatar"]) {
//             const weddingAvatarPath = file.path
//             const resizedWeddingAvatar = await resizeImage(weddingAvatarPath)
//             if (!resizedWeddingAvatar) return next(new ErrorHandler("Error resizing a wedding avatar image", 500))
//             weddingAvatar.push(resizedWeddingAvatar)
//         }

//         const weddingDetails = {
//             hero: resizedHeroImage,
//             category,
//             groom,
//             bride,
//             description,
//             weddingAvatar
//         }

//         const createWedding = await WeddingModel.create(weddingDetails)
//         if (!createWedding) return next(new ErrorHandler("Details are not created to database", 400))
//         res.status(201).json({ success: true, createWedding })
//     } catch (error) {
//         return next(new ErrorHandler(error.message, 500))
//     }
// })

const createWedding = catchAsyncErrors(async (req, res, next) => {
    const errors = {};
    const { category, groom, bride, description } = req.body;

    // Validation
    if (!category) errors.category = "Category is required";
    if (!groom) errors.groom = "Groom's name is required";
    if (!bride) errors.bride = "Bride's name is required";
    if (!description) errors.description = "Description is required";
    if (!req.files['hero']) errors.hero = "Hero image is required";
    if (!req.files['wedding-avatar']) errors.avatar = "At least one wedding photo is required";

    if (Object.keys(errors).length > 0) {
        return next(new ErrorHandler("Validation failed", 400, errors));
    }

    try {
        // Check total photos limit (10 including existing ones)
        const existingCount = await WeddingModel.countDocuments();
        const newPhotosCount = req.files['wedding-avatar'].length + 1; // +1 for hero image
        if (existingCount + newPhotosCount > 10) {
            return next(new ErrorHandler("Maximum limit of 10 photos reached", 400));
        }

        // Process hero image (single)
        const heroImage = req.files['hero'][0];
        const heroResult = await cloudinary.uploader.upload(heroImage.path, {
            folder: 'weddings/hero',
            transformation: { width: 1200, height: 800, crop: 'fill' }
        });

        // Process wedding avatars (multiple)
        const weddingAvatars = [];
        for (const file of req.files['wedding-avatar']) {
            const result = await cloudinary.uploader.upload(file.path, {
                folder: 'weddings/avatars',
                transformation: { width: 800, height: 800, crop: 'fill' }
            });
            weddingAvatars.push({
                url: result.secure_url,
                public_id: result.public_id
            });
        }

        const wedding = await WeddingModel.create({
            hero: {
                url: heroResult.secure_url,
                public_id: heroResult.public_id
            },
            category,
            groom,
            bride,
            description,
            weddingAvatar: weddingAvatars
        });

        res.status(201).json({
            success: true,
            wedding
        });

    } catch (error) {
        if (heroResult) await cloudinary.uploader.destroy(heroResult.public_id);
        for (const avatar of weddingAvatars) {
            await cloudinary.uploader.destroy(avatar.public_id);
        }
        return next(new ErrorHandler(error.message, 500));
    }
});

const getSingleWedding = catchAsyncErrors(async (req, res, next) => {
    try {
        const { id: weddingId } = req.params
        const weddingDetails = await WeddingModel.findOne({ _id: weddingId })
        if (!weddingDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, weddingDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createWedding, getWedding, getSingleWedding }