const mongoose = require("mongoose")

const instaDetailSchema = new mongoose.Schema({
    link: { type: String, required: true },
    avatar: {type: String, required: true }
},{ timestamps: true })

module.exports = mongoose.model("instaDetail", instaDetailSchema)