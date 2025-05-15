const mongoose = require("mongoose");
const { Schema , model } = mongoose;

const projectSchema = new Schema({
    chat:{
        type: Array,
        default:[],
        required: false
    },
    code:{
        type:Array,
        default: [],
        required: false
    },
    user:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now(),
    },
    status:{
        type:String,
        required: true
    }
});

const Project = model('Project',projectSchema);
module.exports = Project;