const sharp = require('sharp'); 
const path = require('path')
const fs = require('fs')
const ErrorHandler = require("./ErrorHandler"); 

const resizeImage = async (inputPath, outputPath, width = 800, height = 600) => {
    try {
        const resizedFileName = Date.now() + "_" + Math.round(Math.random() * 1e9) + "_" + outputPath.split(".")[0] + ".png";
        const resizedFileUrl = path.join("upload", resizedFileName);
        await sharp(inputPath)
        .resize(width, height)  
        .jpeg({ quality: 80 })   
        .toFile(resizedFileUrl);
        
        return resizedFileUrl;
    } catch (error) {
        return next(new ErrorHandler("Error resizing image", 500))
    }
};

module.exports = { resizeImage }
