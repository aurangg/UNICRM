const mongoose = require('mongoose');

const courseOutlineSchema = mongoose.Schema({
    courseOutlineId:{
        type: String,
        unique: true,
    },
    courseOutlineDocument:{
        type: String,
    },
    courseOutlineDescription:{
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

const CourseOutline = mongoose.model('CourseOutline', courseOutlineSchema);

module.exports = {CourseOutline}