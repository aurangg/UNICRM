const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
    coursecode:{
        type: String,
        required: true,
        unique: true
    },
    coursetitle:{
        type: String,
        required: true,
        unique: true
    },
    description:{
        type: String,
        required: true 
    },
    labstatus:{
        type: String,
        required: true
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

const Course = mongoose.model('Course',courseSchema)

// courseSchema.pre('remove', function (next) {
//     var course = this;
//     course.model('User').update(
//         { courses: {$in: course.users}}, 
//         { $pull: { course: course._id } }, 
//         { multi: true }, 
//         next
//      );
// });


// courseSchema.pre('remove', function(next) {
//     // Remove all the assignment docs that reference the removed person.
//     this.model('userSchema').remove({ sections: this._id }, next);
// });

module.exports = {Course}