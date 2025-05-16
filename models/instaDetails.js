const mongoose = require("mongoose")

const instaDetailSchema = new mongoose.Schema({
    link: { type: String, required: true },
    avatar: {type: String, required: true },
    cloudinary_id: {
        type: String,
        required: [true, "Cloudinary ID is required"],
    },
},{ timestamps: true })

module.exports = mongoose.model("instaDetail", instaDetailSchema)