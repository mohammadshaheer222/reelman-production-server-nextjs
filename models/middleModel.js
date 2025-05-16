const mongoose = require("mongoose")

const middleSchema = new mongoose.Schema({
    avatar: {type: String, required: true },
    cloudinary_id: {
        type: String,
        required: [true, "Cloudinary ID is required"],
    },
},{ timestamps: true })

module.exports = mongoose.model("middle", middleSchema)