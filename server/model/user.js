const mongoose = require("mongoose")
const { Schema,model } = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    availableCredits:{
        type:Number,
        default:100
    },
});

const User = mongoose.model("User",userSchema);
module.exports = User;