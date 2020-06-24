const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);

const SALT_I = 10;

const userSchema = mongoose.Schema({
    employeecode:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    }, 
    designation:{
        type: String,
        trim: true
    },
    department:{
        type: String,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type: String,
        required: true,
        minlength:6
    },
    fullname:{
        type: String,
        // maxlength:100
    },
    role:{
        type: String,
        default: 'teacher'
    },
    token:{
        type: String
    },
    is_deleted:{
        type: Boolean,
        default: false
    },
    delete_check:{
        type: Boolean,
        default: true
    },
    mentor_check:{
        type: Boolean,
        default: false
    },
    active:{
        type: Boolean,
        default: true
    },
    coursementor:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ActiveCourse"
    }],
    activecourse:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ActiveCourse" 
    }],
    sections:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sections" 
    }]
})
userSchema.pre('save',function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    }else{
        next()
    }
})
userSchema.methods.comparePassword = function(candidatepassword,cb){
    bcrypt.compare(candidatepassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch)
    })
}

userSchema.methods.generateToken = function(cb){
    var user= this;
    var token= jwt.sign(user._id.toHexString(),config.SECRET)
    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken= function(token,cb){
    var user= this;
    jwt.verify(token,config.SECRET,function(err,decode){
        user.findOne({"_id":decode,"token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}
userSchema.methods.deleteToken = function(token,cb){
    var user = this;
    user.update({$unset:{token:1}},(err,user)=>{
        if(err) return cb(err);
        cb(null,user) 
    })
}
const User = mongoose.model('User',userSchema)

module.exports = {User}