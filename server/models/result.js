const mongoose = require('mongoose');

const result = mongoose.Schema({
    resultId:{
        type:String,
        unique: true,
    },
    resultDescription:{
        type: String,
        default:'',
    },
    resultFile:{
        type:String,
        default:'',
    },
    hodComment:{
        type:String,
        default:'No Comment',
    },
    hodApproval:{
        type:Boolean,
        default:false,
    },
    mentorComment:{
        type:String,
        default:'No Comment',
    },
    mentorAproval:{
        type:Boolean,
        default:false,
    },
    cfcComment:{
        type:String,
        default:'No Comment',
    },
    cfcApproval:{
        type:Boolean,
        default:false,
    },
}, {timestamps: true})

const Result = mongoose.model('Result', result);

module.exports = {Result}