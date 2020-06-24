const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
    attendanceId:{
        type: String,
        unique:true,
    },
    attendanceFile:{
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

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = {Attendance}