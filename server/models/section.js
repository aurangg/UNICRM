
// const mongoose = require('mongoose');

// const sectionSchema = mongoose.Schema({
//     semester:{
//         // type: String,
//         // required: true
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Semester",
//         required: true
//     },
//     course:{
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"Course",
//         unique: true,
//         required: true
//     },
//     mentor:{
//         // type: String,
//         // required: true
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required: true
//     },
//     sections:[{
//         uniq:{
//             type: String,
//             required: true,
//             unique:1
//         },
//         course:{
//             type: mongoose.Schema.Types.ObjectId,
//             ref:"Course",
//             required: true
//         },
//         name:{
//             type: String,
//             required: true
//         },
//         lecteacher:{
//             // type: String,
//             // required: true
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User",
//             required: true
//         },
//         labteacher:{
//             type:mongoose.Schema.Types.ObjectId,
//             ref:"User",
//             required: false,
//             default:null
//         },
//         labstatus:{
//             type: String,
//             required: true
//         }
//     }]
// },{timestamps:true})

// const Section = mongoose.model('Section',sectionSchema)

// module.exports = {Section}






// not working

const mongoose = require('mongoose');
const sectionsSchema = new mongoose.Schema({
    uniq:{
        type: String,
        required: true,
        unique:1  
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required: true
    },
    name:{
        type: String,
        required: true
    },
    lecteacher:{
        // type: String,
        // required: true
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    labteacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: false,
        default:null
    },
    labstatus:{
        type: String,
        required: true
    },
    sectionComplete:{
      type: Number,
      min: 0,
      max: 100,
      default: 0
    }
})
const Sections = mongoose.model('Sections',sectionsSchema)
module.exports = {Sections}

















// const mongoose = require('mongoose');

// const sectionSchema = mongoose.Schema({
//     uniq:{
//         type: String,
//         required: true  
//     },
//     name:{
//         type: String,
//         required: true
//     },
//     lecteacher:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required: true
//     },
//     labteacher:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required: false,
//         default:null
//     },
//     labstatus:{
//         type: String,
//         required: true
//     },
//     activecourse:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"ActiveCourses",
//     }
// },{timestamps:true})
// const Section = mongoose.model('Section',sectionSchema)

// module.exports = {Section}