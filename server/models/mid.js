const mongoose = require('mongoose');

const midSchema = mongoose.Schema({
    midId:{
        type:String,
        unique: true,
    },
    midQuestionPaper:{
        type: String,
        default:'',
    },
    midSolutionPaper:{
        type: String,
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

const Mids = mongoose.model('Mids', midSchema)

module.exports = {Mids}