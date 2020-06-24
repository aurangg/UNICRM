const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    quizId:{
        type: String,
        unique: true,
    },
    quizTitle: {
        type: String,
        default:'',
    },
    quizDescription:{
        type: String,
        default:'',
    },
    quizQuestionFile:{
        type: String,
        default:'',
    },
    quizSolutionFile:{
        type: String,
        default:'',
    },
    quizMaxMarks:{
        type: String,
        default:'',
    },
    quizMidMarks:{
        type: String,
        default:'',
    },
    quizMinMarks:{
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

const Quiz = mongoose.model('Quiz', quizSchema)

module.exports = {Quiz}