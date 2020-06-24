const mongoose = require('mongoose');

const dl = mongoose.Schema({
    date:{
        type: Date,
        required: true
    },
    startTime:{
        type: Date,
        required: true
    },
    endTime:{
        type: Date,
        required: true
    },
    topicCovered:{
        type:String,
        required: true
    },
    evaluation:{
        type:String,
        required: true
    },
    teacher:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
}, {timestamps: true})

const DL = mongoose.model('DL', dl);

module.exports = {DL}