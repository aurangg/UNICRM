const mongoose = require('mongoose');

const semesterSchema = mongoose.Schema({
    start:{
        type: Date,
        required: true
    },
    end:{
        type: Date,
        required: true
    },
    semester:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    expires:{
        type: Boolean,
        default: false
    },
    // is_deleted:{
    //     type: Boolean,
    //     default: false
    // },
    delete_check:{
        type: Boolean,
        default: true
    },
    activecourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ActiveCourse"
    }]
},{timestamps:true})
const Semester = mongoose.model('Semester',semesterSchema)

module.exports = {Semester}