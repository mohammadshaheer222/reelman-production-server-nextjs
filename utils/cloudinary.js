// First, install required packages:
// npm install cloudinary multer-storage-cloudinary

// 1. Create a cloudinary.js file in your project root or utils folder
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary with your credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a function to generate multer storage for different folders
const createCloudinaryStorage = (folderName) => {
    return new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: folderName,
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
            transformation: [{ width: 1920, height: 1080, crop: 'limit' }],
            // Optional: add a timestamp and unique identifier to avoid name collisions
            public_id: (req, file) => {
                const fileName = file.originalname.split('.')[0];
                return `${fileName}_${Date.now()}`;
            }
        }
    });
};

// Create uploader instances for different content types
const heroUpload = multer({ storage: createCloudinaryStorage('hero-images') });
const instaUpload = multer({ storage: createCloudinaryStorage('instagram-images') });
const categoryUpload = multer({ storage: createCloudinaryStorage('category-images') });
const testimonialUpload = multer({ storage: createCloudinaryStorage('testimonial-images') });

// Generic uploader that uses a parameter to determine the folder
const dynamicUpload = (folderParam) => {
    return (req, res, next) => {
        const folder = req.params[folderParam] || 'default';
        const storage = createCloudinaryStorage(folder);
        const upload = multer({ storage }).single('avatar');
        upload(req, res, next);
    };
};

// Add this somewhere in your server startup code
// const testCloudinaryConnection = async () => {
//     try {
//         const result = await cloudinary.uploader.upload(
//             "https://cloudinary-res.cloudinary.com/image/upload/cloudinary_logo.png",
//             { folder: "test" }
//         );
//         console.log("Cloudinary test upload successful:", result.secure_url);
//         return true;
//     } catch (error) {
//         console.error("Cloudinary test upload failed:", error);
//         return false;
//     }
// };

// testCloudinaryConnection();

module.exports = {
    heroUpload,
    instaUpload,
    categoryUpload,
    testimonialUpload,
    dynamicUpload,
    cloudinary // Export cloudinary instance for direct operations if needed
};