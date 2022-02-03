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
        required: true,
        select:false
    },
    cnfrmPassword: {
        type: String,
        required: true,
        validate : {
            validator: function (el) {
                return this.password === el;
            },
            message: "Passwords does not match"
        },
    },
    designation: {
        type: String,
        required: true
    }
}); 

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime()/1000, 10
        );
        return JWTTimestamp < changedTimestamp;
    }
    return false;
}

const userModel = mongoose.model("User",userSchema);

module.exports = userModel;