const { cloudinary } = require("./cloudinary")

const deleteImageFromCloudinary = async (publicId) => {
    if (!publicId) return;
    try {
        await cloudinary.uploader.destroy(publicId);
        console.log(`Successfully deleted image from Cloudinary: ${publicId}`);
    } catch (error) {
        console.error('Error deleting from Cloudinary:', error.message);
    }
}

module.exports = { deleteImageFromCloudinary }