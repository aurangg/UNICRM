const mongoose = require('mongoose');

const courseFolderMaterial = mongoose.Schema({
    quiz:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Quiz"
    }],
    assingment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Assignments"
    }],
    courseOutline:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "CourseOutline",
    },
    final:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Finals"
    },
    mid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mids"
    },
    attendance:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance"
    },
    result:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Result"
    },
    sectioncourse:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sections",
        unique:true,
    }
}, {timestamps: true})

const CFM = mongoose.model('CFM', courseFolderMaterial);

module.exports = {CFM}
