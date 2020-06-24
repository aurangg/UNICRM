const mongoose = require('mongoose');
const activecourseSchema = mongoose.Schema({
    semester:{
        // type: String,
        // required: true
        type:mongoose.Schema.Types.ObjectId,
        ref:"Semester",
        required: true
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",
        /*work fine when even not unique and this unique is true*/
        // unique: true,
        required: true
    },
    mentor:{
        // type: String,
        // required: true
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    delete_check:{
        type: Boolean,
        default: true
    },
    sections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sections"
    }]
},{timestamps:true})

const ActiveCourse = mongoose.model('ActiveCourse',activecourseSchema)

module.exports = {ActiveCourse}
