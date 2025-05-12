const CategoryModel = require("../../models/categoryModel")

const CatchAsyncErrors = require("../../middlewares/CatchAsyncErrors")
const ErrorHandler = require("../../utils/ErrorHandler.js")

const getCategory = CatchAsyncErrors(async (req, res, next) => {
    try {
        const category = await CategoryModel.find({})
        res.status(200).json({ success: true, category })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

const getSingleCategory = CatchAsyncErrors(async (req, res, next) => {
    try {
        const { category: category } = req.params
        const categoryDetails = await CategoryModel.findOne({ category: category })
        if (!categoryDetails) {
            return next(new ErrorHandler("No details with this id", 400))
        }
        res.status(200).json({ success: true, categoryDetails })
    } catch (error) {
        return next(new ErrorHandler(error.message, 500))
    }
})

module.exports = { getCategory, getSingleCategory }