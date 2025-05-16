require("dotenv").config({ path: "config/.env" })
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const requiredCredentials = [
    'CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET'
];

for (const credential of requiredCredentials) {
    if (!process.env[credential]) {
        console.error(`Missing Cloudinary credential: ${credential}`);
        process.exit(1);
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'reelman-production',
        allowed_formats: ['jpg', 'jpeg', 'png', 'gif'],
        transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
    }
});

module.exports = { cloudinary, storage };