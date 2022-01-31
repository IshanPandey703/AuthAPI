const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNum: {
        type: String,
        required: true
    },
    workEditorial: {
        type: Boolean,
        required: true
    },
    workMediaReport: {
        type: Boolean,
        required: true
    },
    workSiteReport: {
        type: Boolean,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    profilePhoto: String,
    password: {
        type: String,
        required: true
    },
    cnfrmPassword: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    }
}); 

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;