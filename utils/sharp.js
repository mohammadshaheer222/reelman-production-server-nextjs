const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

const resizeImage = async (filePath, width = 800, height = 600) => {
    try {
        const ext = path.extname(filePath)
        const resizedFileName = path.basename(filePath, ext) + "_resized" + ext
        const resizedFileUrl = path.join("uploads", resizedFileName)

        // Resize image to a temporary file
        await sharp(filePath)
            .resize(width, height)
            .jpeg({ quality: 90 })
            .toFile(resizedFileUrl)

        // Asynchronously delete the original file
        fs.unlink(filePath, (unlinkError) => {
            if (unlinkError) {
                console.error("Error deleting original file:", unlinkError)
            }
        })

        // Rename resized file to replace the original file
        fs.rename(resizedFileUrl, filePath, (renameError) => {
            if (renameError) {
                console.error("Error renaming file:", renameError)
            }
        })

        return filePath // Return the path to the resized image
    } catch (error) {
        console.error("Error resizing image:", error)
        throw new Error("Error resizing image")
    }
}

module.exports = { resizeImage }
