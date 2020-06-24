const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    assignmentId:{
        type:String,
        unique: true
    },
    assignmentTitle:{
        type: String,
        default:'',
    },
    assignmentDescription:{
        type: String,
        default:'',
    },
    assignmentCopy:{
        type:String,
        default:'',
    },
    assignmentSolution:{
        type:String,
        default:'',
    },
    maxMarks:{
        type:String,
        default:'',
    },
    midMarks:{
        type:String,
        default:'',
    },
    minMarks:{
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
}, {timestamps:true})

const Assignments = mongoose.model('Assignments', assignmentSchema)

module.exports = {Assignments}