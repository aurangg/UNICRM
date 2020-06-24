const mongoose = require('mongoose');

const finalSchema = mongoose.Schema({
    finalId:{
        type: String,
        unique: true
    },
    finalQuestionPaper:{
        type: String,
    },
    finalSolutionPaper:{
        type: String,
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

const Finals  = mongoose.model('Finals', finalSchema);

module.exports = {Finals}