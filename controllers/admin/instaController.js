const ErrorHandler = require("../../utils/ErrorHandler")
const catchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const { resizeImage } = require("../../utils/sharp")
const fs = require("fs")
const InstaDetails = require("../../models/instaDetails")

const getInsta = catchAsyncErrors(async(req, res, next) => {
    try {
        const insta = await InstaDetails.find({});
        res.status(200).json({ success: true, insta });
    } catch (error) {
        return next(new ErrorHandler(error.message, 500));
    }
})

const createInstaController = catchAsyncErrors(async(req, res, next) => {
    try {
        const { link } = req.body
        if(!link) {
            return next(new ErrorHandler("All fields are mandatory", 400))
        } 
        if (!req.file || !req.file.filename) {
            return next(new ErrorHandler("Avatar is required", 400));
        }
        const fileName = req.file.filename
        const fileUrl = `uploads/${fileName}`
        const resizedImage = await resizeImage(fileUrl, fileName)
        if(!resizedImage) {
            return next(new ErrorHandler("Error resizing the image", 500))
        }
        try {
            fs.unlink(fileUrl, (error) => {
                if (error) {
                    console.log(error)
                }
            });
        } catch(error) {
            
        }
        
        const instaDetails = {
            link,
            avatar: resizedImage
        }
        const createInsta = await InstaDetails.create(instaDetails)
        if(!createInsta) {
            return next(new ErrorHandler("Instagram details is not created to database", 400))
        }
        res.status(201).json({ success: true, createInsta})
    } catch(error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { createInstaController, getInsta }