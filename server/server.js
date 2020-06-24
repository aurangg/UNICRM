const express = require('express');
const debug = require("debug")("server");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV)
const fileUpload = require('express-fileupload');
const app = express();

var cors = require('cors');
const mkdirp = require('mkdirp');
app.use(fileUpload());
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
  useNewUrlParser: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const {
  User
} = require('./models/user');
const {
  Semester
} = require('./models/semester');
const {
  Course
} = require('./models/course');
const {
  Sections
} = require('./models/section');
const {
  ActiveCourse
} = require('./models/activecourse');
const {
  Assignments
} = require('./models/assignments');
const {
  Attendance
} = require('./models/attendance');
const {
  CourseOutline
} = require('./models/courseOutline');
const {
  Finals
} = require('./models/finals');
const {
  Mids
} = require('./models/mid');
const {
  DL
} = require('./models/dailyLog');
const {
  Quiz
} = require('./models/quiz');
const {
  Result
} = require('./models/result');
const {
  CFM
} = require('./models/courseFolderMaterial');

const {
  auth
} = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static('assets')); //to access the files in public folder
//upload copy
app.use(cors()); // it enables all cors requests
//upload copy

/*--------------------------Teacher Section-------------------------------------*/

/*--------------------------Section-------------------------------------*/

// get sections id and names and section complete percentage
app.get('/teacher/sections', (req, res) => {
  // User.find({_id:req.query.id})
  User.find({
      _id: req.query.id
    })
    .populate('sections')
    .exec(function(err, users) {
      if (err) return res.status(400).send(err);
      res.status(200).send(users)
    })
})

/*--------------------------Section-------------------------------------*/

/*--------------------------Common-------------------------------------*/
// get courseFolder details
app.get('/teacher/coursefolders', (req, res) => {
  // CFM.find({sectioncourse:req.query.section_id})
  CFM.find({
      sectioncourse: req.query.section_id
    })
    .populate('sectioncourse')
    .exec(function(err, users) {
      if (err) return res.status(400).send(err);
      res.status(200).send(users)
    })
})

/*--------------------------Common-------------------------------------*/

/*--------------------------Courses-------------------------------------*/
// get cources of logged in teacher
app.get('/teacher/navcourse', (req, res) => {
  User.find({
      _id: req.query.id
    })
    .populate([{
      path: 'activecourse',
      populate: {
        path: 'course',
      }
    }])
    .exec(function(err, users) {
      if (err) return res.status(400).send(err);
      res.status(200).send(users)
    })
})

/*--------------------------Courses-------------------------------------*/


/*--------------------------Uploads-------------------------------------*/
//assignments
app.post('/teacher/addAssignment', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const QuestionFile = req.files.Questionfile;
      const AnswerFile = req.files.Answerfile;
      const minFile = req.files.Minfile;
      const midFile = req.files.Midfile;
      const maxFile = req.files.Maxfile;
      var fs = require('fs');
      var dirQ = 'server/uploadsfolder/Assignments/Questions/';
      var dirA = 'server/uploadsfolder/Assignments/Answers/';
      var dirMin = 'server/uploadsfolder/Assignments/Min/';
      var dirMid = 'server/uploadsfolder/Assignments/Mid/';
      var dirMax = 'server/uploadsfolder/Assignments/Max/';

      if (!fs.existsSync(dirQ)) {
        fs.mkdirSync(dirQ);
      }
      if (!fs.existsSync(dirA)) {
        fs.mkdirSync(dirA);
      }
      if (!fs.existsSync(dirMin)) {
        fs.mkdirSync(dirMin);
      }
      if (!fs.existsSync(dirMid)) {
        fs.mkdirSync(dirMid);
      }
      if (!fs.existsSync(dirMax)) {
        fs.mkdirSync(dirMax);
      }
      QuestionFile.mv(`${__dirname}/uploadsfolder/Assignments/Questions/${QuestionFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      AnswerFile.mv(`${__dirname}/uploadsfolder/Assignments/Answers/${AnswerFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      minFile.mv(`${__dirname}/uploadsfolder/Assignments/Min/${minFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      midFile.mv(`${__dirname}/uploadsfolder/Assignments/Mid/${midFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      maxFile.mv(`${__dirname}/uploadsfolder/Assignments/Max/${maxFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
        const ass = new Assignments({
          assignmentId: new mongoose.Types.ObjectId(),
          assignmentTitle:req.body.title,
          assignmentDescription:req.body.description,
          assignmentCopy:`/Assignments/Questions/${QuestionFile.name}`,
          assignmentSolution:`/Assignments/Answers/${AnswerFile.name}`,
          maxMarks:`/Assignments/Max/${maxFile.name}`,
          midMarks:`/Assignments/Mid/${midFile.name}`,
          minMarks:`/Assignments/Min/${minFile.name}`
        });
        ass.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.assingment.push(ass._id)
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 5;
            sec.save()
            cfm.save()
            return res.send({
              success: true,
              message: "Assignment Successfully saved"
            });
          })
        })
    }
  })
});

//quizes
app.post('/teacher/addQuizes', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const QuestionFile = req.files.Questionfile;
      const AnswerFile = req.files.Answerfile;
      const minFile = req.files.Minfile;
      const midFile = req.files.Midfile;
      const maxFile = req.files.Maxfile;
      var fs = require('fs');
      var dirQ = 'server/uploadsfolder/Quizes/Questions/';
      var dirA = 'server/uploadsfolder/Quizes/Answers/';
      var dirMin = 'server/uploadsfolder/Quizes/Min/';
      var dirMid = 'server/uploadsfolder/Quizes/Mid/';
      var dirMax = 'server/uploadsfolder/Quizes/Max/';

      if (!fs.existsSync(dirQ)) {
        fs.mkdirSync(dirQ);
      }
      if (!fs.existsSync(dirA)) {
        fs.mkdirSync(dirA);
      }
      if (!fs.existsSync(dirMin)) {
        fs.mkdirSync(dirMin);
      }
      if (!fs.existsSync(dirMid)) {
        fs.mkdirSync(dirMid);
      }
      if (!fs.existsSync(dirMax)) {
        fs.mkdirSync(dirMax);
      }
      QuestionFile.mv(`${__dirname}/uploadsfolder/Quizes/Questions/${QuestionFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      AnswerFile.mv(`${__dirname}/uploadsfolder/Quizes/Answers/${AnswerFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      minFile.mv(`${__dirname}/uploadsfolder/Quizes/Min/${minFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      midFile.mv(`${__dirname}/uploadsfolder/Quizes/Mid/${midFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      maxFile.mv(`${__dirname}/uploadsfolder/Quizes/Max/${maxFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
        const quiz = new Quiz({
          quizId: new mongoose.Types.ObjectId(),
          quizTitle:req.body.title,
          quizDescription:req.body.description,
          quizQuestionFile:`/Quizes/Questions/${QuestionFile.name}`,
          quizSolutionFile:`/Quizes/Answers/${AnswerFile.name}`,
          quizMaxMarks:`/Quizes/Max/${maxFile.name}`,
          quizMidMarks:`/Quizes/Mid/${midFile.name}`,
          quizMinMarks:`/Quizes/Min/${minFile.name}`
        });
        quiz.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.quiz.push(quiz._id)
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 5;
            sec.save()
            cfm.save()
            return res.send({
            success: true,
            message: "Quiz Successfully saved"
          });
        })
      })
    }
  })
});

//results
app.post('/teacher/addResults', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const myFile = req.files.file;
      var fs = require('fs');
      var dir = 'server/uploadsfolder/Results/';

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      myFile.mv(`${__dirname}/uploadsfolder/Results/${myFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
        const result = new Result({
          resultDescription: req.body.description,
          resultFile: `/Results/${myFile.name}`
        });
        result.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.result = result._id
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 10;
            sec.save()
            cfm.save()
            return res.send({
              success: true,
              message: "Assignment Successfully saved"
            });
          });
        })
      });
    }
  })
});

//finals
app.post('/teacher/addFinals', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const QuestionFile = req.files.Questionfile;
      const AnswerFile = req.files.Answerfile;
      var fs = require('fs');
      var dirQ = 'server/uploadsfolder/Finals/Questions/';
      var dirA = 'server/uploadsfolder/Finals/Answers/';

      if (!fs.existsSync(dirQ)) {
        fs.mkdirSync(dirQ);
      }
      if (!fs.existsSync(dirA)) {
        fs.mkdirSync(dirA);
      }
      QuestionFile.mv(`${__dirname}/uploadsfolder/Finals/Questions/${QuestionFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      AnswerFile.mv(`${__dirname}/uploadsfolder/Finals/Answers/${AnswerFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
        const final = new Finals({
          finalQuestionPaper:`/Finals/Questions/${QuestionFile.name}`,
          finalSolutionPaper:`/Finals/Answers/${AnswerFile.name}`
        });
        final.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.final = final._id
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 10;
            sec.save()
            cfm.save()
            return res.send({
              success: true,
              message: "Finals Successfully saved"
            });
          })
        })
    }
  })
});

//mids
app.post('/teacher/addMids', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const QuestionFile = req.files.midQuestionPaper;
      const AnswerFile = req.files.midSolutionPaper;
      var fs = require('fs');
      var dirQ = 'server/uploadsfolder/Mids/Questions/';
      var dirA = 'server/uploadsfolder/Mids/Answers/';

      if (!fs.existsSync(dirQ)) {
        fs.mkdirSync(dirQ);
      }
      if (!fs.existsSync(dirA)) {
        fs.mkdirSync(dirA);
      }
      QuestionFile.mv(`${__dirname}/uploadsfolder/Mids/Questions/${QuestionFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
      AnswerFile.mv(`${__dirname}/uploadsfolder/Mids/Answers/${AnswerFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
      });
        const mid = new Mids({
          midQuestionPaper:`/Mids/Questions/${QuestionFile.name}`,
          midSolutionPaper:`/Mids/Answers/${AnswerFile.name}`
        });
        mid.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.mid = mid._id
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 10;
            sec.save()
            cfm.save()
            return res.send({
              success: true,
              message: "Mids Successfully saved"
            });
          })
        })
    }
  })
});

//attendence
app.post('/teacher/addAttendance', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const myFile = req.files.file;
      var fs = require('fs');
      var dir = 'server/uploadsfolder/Attendance/';

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      myFile.mv(`${__dirname}/uploadsfolder/Attendance/${myFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
        const attendance = new Attendance({
          attendanceFile: `/Attendance/${myFile.name}`
        });
        attendance.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.attendance = attendance._id
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 10;
            sec.save()
            cfm.save()
            return res.send({
              success: true,
              message: "Attendance Successfully saved"
            });
          })
        })
      });
    }
  })
});

//courseOutline
app.post('/teacher/addCOutline', (req, res) => {
  const cfm = CFM.findOne({ '_id': req.body.sectionID }, function (err, person) {
    if (err){
      return handleError(err);
      return res.json({
        message: 'CFM not found'
      });
    }
    else {
      if (!req.files) {
        return res.status(500).send({
          msg: "file is not found"
        })
      }
      // accessing the file
      const myFile = req.files.file;
      var fs = require('fs');
      var dir = 'server/uploadsfolder/COutline/';

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
      }
      myFile.mv(`${__dirname}/uploadsfolder/COutline/${myFile.name}`, function(err) {
        if (err) {
          console.log(err)
          return res.status(500).send({
            msg: "Error occured"
          });
        }
        const coutline = new CourseOutline({
          courseOutlineDescription: req.body.description,
          courseOutlineDocument: `/COutline/${myFile.name}`
        });
        coutline.save()
        const cfm = CFM.findOne({'sectioncourse':req.body.sectionID},(err,cfm)=>{
          if(!cfm){
            return res.json({
              message: 'CFM not found'
            });
          }
          cfm.courseOutline = coutline._id
          const sec = Sections.findOne({'_id':req.body.sectionID},(err,sec)=>{
            if(!sec){
              return res.json({
                message: 'Section not found'
              });
            }
            sec.sectionComplete += 10;
            sec.save()
            cfm.save()
            return res.send({
              success: true,
              message: "Course Outline Successfully saved"
            });
          })
        })
      });
    }
  })
});

//get whole CFM object
app.get('/getResults',(req,res)=>{
  CFM.
  find({'sectioncourse':"5ef2e9ffd807fd67b219630b"}).
  populate('result').
  populate('final').
  populate('mid').
  populate('attendance').
  populate('courseOutline').
  populate([{
    path: 'assingment',
    populate: {
      path: 'Assignments',
    }
  }]).
  populate([{
    path: 'quiz',
    populate: {
      path: 'Quiz',
    }
  }]).
  exec(function(error, sectionarraydata) {
    if (error) return res.send({
      message: 'Error fetching Data'
    });
    res.send(sectionarraydata)
  });
})

/*--------------------------Uploads-------------------------------------*/

/*--------------------------Daily Logs-------------------------------------*/

//add daily log
app.post('/teacher/addLog',(req,res)=>{
  var startTime = req.body.startTime
  var st = new Date(startTime)
  const dl = new DL(req.body)
  dl.save((err, doc) => {
    if (err) return res.status(400).send({
      success: false,
      message: err
    });
    // console.log(dl.startTime.getHours()+': ' + dl.startTime.getMinutes())
    // console.log(dl.endTime.getHours()+': ' + dl.endTime.getMinutes())
    // if(err) return res.status(400).jason({success:false});
    res.status(200).json({
      success: true,
      user: doc
    })
  })

})

//get daily logs
app.get("/teacher/getLogs", (req, res) => {
  DL.find({'teacher':req.query.teacher_id}, (err, doc) => {
    if (err) return res.status(400).send(err)
    res.send(doc)
  })
})

/*--------------------------Daily Logs-------------------------------------*/


/*--------------------------Teacher Section-------------------------------------*/



app.post('/api/login', (req, res) => {
  User.findOne({
    'email': req.body.email
  }, (err, user) => {
    if (!user) return res.json({
      isAuth: false,
      message: 'Auth failed, email not found'
    });

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) return res.json({
        isAuth: false,
        message: 'wrong password'
      });
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie('auth', user.token).json({
          role: user.role,
          isAuth: true,
          id: user._id,
          email: user.email
        })
      })
    })
  })
});

app.get('/api/auth', auth, (req, res) => {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.fullname,
    role: req.user.role
  })
})

app.get('/admin/logout', auth, (req, res) => {
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.sendStatus(200)
  })
})
/*UPDATE*/

/*DELETE*/
/*USER REQUEST END*/

/*ADMIN TEACHER REQUEST START*/

/*GET All by role of teacher*/
app.get('/admin/navteacher', (req, res) => {
  User.find({
    role: 'teacher'
  }, (err, users) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(users)
  })
})
/*GET by ID*/
app.get('/admin/editteacher', (req, res) => {
  let id = req.query.id;
  User.findById(id, (err, user) => {
    if (err) return res.status(400).send({
      success: false
    });
    res.status(200).send(user)
  })
})
/*POST*/
app.post('/admin/addteacher', (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.status(400).send({
      success: false
    });
    // if(err) return res.status(400).jason({success:false});
    res.status(200).json({
      success: true,
      user: doc
    })
  })
});

/*UPDATE*/
app.post('/admin/editteacher', (req, res) => {
  User.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, (err, doc) => {
    if (err) return res.status(400).send({
      success: false
    })
    res.json({
      success: true,
      doc
    })
  })
})
/*DELETE*/
app.delete('/admin/navteacher', (req, res) => {
  User.findById(req.query.id, (err, doc) => {
    if (err) return res.status(400).send({
      error: err,
      success: false,
      message: "User not found"
    })
    if (doc.delete_check === false || doc.mentor_check === true) {
      return res.status(400).send({
        success: false,
        message: "Can't delete, First delete Sections associate to this Teacher"
      })
    } else {
      if (doc.delete_check === true && doc.mentor_check === false) {
        User.findByIdAndRemove(req.query.id, (err, doc) => {
          if (err) return res.status(400).send(err);
          res.json(true)
        })
      } else {
        return res.status(400).send({
          success: false,
          message: "Unexpected Error"
        })
      }
    }
  })
});
/*ADMIN TEACHER REQUEST END*/


/*ADMIN COURSE REQUEST START*/
/*GET*/
/*GET by ID*/
app.get('/admin/editcourse', (req, res) => {
  let id = req.query.id;
  Course.findById(id, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(user)
  })
})
/*courses*/
app.get("/admin/navcourse", (req, res) => {
  Course.find({}, (err, doc) => {
    if (err) return res.status(400).send(err)
    res.send(doc)
  })
})
// app.get("/admin/navcourse",(req,res)=>{
//     let skip = parseInt(req.query.skip);
//     // let limit = parseInt(req.query.limit);
//     // Course.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
//     let order = req.query.order;

//     Course.find().skip(skip).sort({_id:order}).exec((err,doc)=>{
//         if(err) return res.status(400).send(err)
//         res.send(doc)
//     })
// })
/*POST*/
app.post('/admin/addcourse', (req, res) => {
  const course = new Course(req.body)
  course.save((err, doc) => {
    if (err) return res.status(400).send({
      success: false
    })
    res.status(200).json({
      success: true,
      courseId: doc._id
    })
  })
})

app.post('/admin/addcourses', (req, res) => {
  // const courses = new Course(req.body)
  const courses = req.body
  Course.create(courses, (err, doc) => {
    if (err) return res.status(400).send({
      success: false
    })
    res.status(200).json({
      post: true,
      courseId: doc._id,
    })
  })
})
/*UPDATE*/
app.post('/admin/editcourse', (req, res) => {
  Course.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, (err, doc) => {
    if (err) return res.status(400).send({
      success: false
    })
    res.json({
      success: true,
      doc
    })
  })
})
/*DELETE*/
app.delete('/admin/navcourse', (req, res) => {
  // let id = req.query.id;
  Course.findById(req.query.id, (err, doc) => {
    if (err) return res.status(400).send({
      error: err,
      success: false,
      message: "Course not found"
    })
    if (doc.delete_check === false) {
      return res.status(400).send({
        error: err,
        success: false,
        message: "Can't delete, First delete Sections associate to this course"
      })
    } else {
      Course.findByIdAndRemove(req.query.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
      })
    }
  })
});
/*Un link course (not deleted)*/

// app.post('/admin/deletecourse',(req,res)=>{
//     Course.findById(req.query.id,(err,doc)=>{
//         if(err) return res.status(400).send(err)
//         if(doc.delete_check===false){
//             return res.status(400).send({message:"Can't delete, First delete Sections associate to this course"})
//         }
//     })
//     Course.findByIdAndUpdate(req.query.id,{is_deleted:true},{new: true},(err,doc)=>{
//         if(err) return res.status(400).send({success:false})
//         res.json({
//             success:true
//         })
//     })
// })
/*End of course request*/
/*ADMIN COURSE REQUEST END*/

/*ADMIN SEMESTER REQUEST START*/

/*Get all Semester*/
app.get("/admin/navsemester", (req, res) => {
  Semester.find({}, (err, doc) => {
    if (err) return res.status(400).send(err)
    res.send(doc)
  })
})
/*GET by ID*/
app.get('/admin/editsemester', (req, res) => {
  let id = req.query.id;
  Semester.findById(id, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(user)
  })
})
/*POST*/
app.post('/admin/addsemester', (req, res) => {
  const semester = new Semester(req.body)
  semester.save((err, doc) => {
    if (err) return res.status(400).send({
      success: false
    })
    res.status(200).json({
      success: true,
      courseId: doc._id
    })
  })
})
/*UPDATE*/
app.post('/admin/editsemester', (req, res) => {
  Semester.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, (err, doc) => {
    if (err) return res.status(400).send({
      success: false
    })
    res.json({
      success: true,
      doc
    })
  })
})
/*DELETE*/
app.delete('/admin/navsemester', (req, res) => {
  Semester.findById(req.query.id, (err, doc) => {
    if (err) return res.status(400).send({
      error: err,
      success: false,
      message: "Semester not found"
    })
    if (doc.delete_check === false) {
      return res.status(400).send({
        success: false,
        message: "Can't delete, First delete Sections associate to this semester"
      })
    } else {
      Semester.findByIdAndRemove(req.query.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
      })
    }
  })
});
/*ADMIN SEMESTER REQUEST END*/
/*ADMIN SECTION REQUEST START*/
/*GET*/
app.get('/admin/addsectiongetall', (req, res) => {
  User.find({
    $or: [{
      role: "teacher"
    }, {
      role: "mentor"
    }, {
      role: "hod"
    }, {
      role: "cfcommittee"
    }]
  }, {
    _id: 1,
    fullname: 1,
    employeecode: 1
  }, (err, users) => {
    if (err) return res.status(400).send(err);
    // res.status(200).send(users)
    Semester.find({
      expires: false
    }, {
      _id: 1,
      semester: 1,
      year: 1
    }, (err, semesters) => {
      if (err) return res.status(400).send(err)
      // res.send(doc)
      Course.find({}, {
        _id: 1,
        coursetitle: 1,
        labstatus: 1
      }, (err, courses) => {
        if (err) return res.status(400).send(err)
        res.send({
          courses: courses,
          semesters: semesters,
          teachers: users
        })
      })
    })
  })
})
/*get data for edit section page*/
app.get('/admin/editcourse', (req, res) => {
  let id = req.query.id;
  Course.findById(id, (err, user) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(user)
  })
})

app.get('/admin/navsections', (req, res) => {
  Section.
  find({}).
  populate('semester').
  populate('course').
  exec(function(error, sectionarraydata) {
    if (error) return res.send({
      message: 'Error fetching Data'
    });
    res.send(sectionarraydata)
  });
});


app.get('/admin/addsectiongetallforedit', (req, res) => {
  let id = req.query.id;
  Section.findOne({
    '_id': id
  }).
  populate('course', 'labstatus').
  exec(function(err, sections) {
    // Section.findById(id,(err,sections)=>{
    if (err) return res.status(400).send(err);
    User.find({
      $or: [{
        role: "teacher"
      }, {
        role: "mentor"
      }, {
        role: "hod"
      }, {
        role: "cfcommittee"
      }]
    }, {
      _id: 1,
      fullname: 1,
      employeecode: 1
    }, (err, users) => {
      if (err) return res.status(400).send(err);
      Semester.find({
        expires: false
      }, {
        _id: 1,
        semester: 1,
        year: 1
      }, (err, semesters) => {
        if (err) return res.status(400).send(err)
        Course.find({}, {
          _id: 1,
          coursetitle: 1,
          labstatus: 1
        }, (err, courses) => {
          if (err) return res.status(400).send(err)
          res.send({
            courses: courses,
            semesters: semesters,
            teachers: users,
            sectiondata: sections
          })
        })
      })
    })
  })
})
/*ADMIN GET SECTIONS*/
app.get('/admin/navsections', (req, res) => {

  Section.
  find({}).
  populate('semester').
  populate('course').
  populate('mentor').
  populate('sections.lecteacher').
  populate('sections.labteacher').
  exec(function(error, sectionarraydata) {
    if (error) return res.send({
      message: 'Error fetching Data'
    });
    res.send(sectionarraydata)
  });
});
/*testing*/
app.get('/admin/teachersection', (req, res) => {
  let id = req.query.id;
  User.
  findOne({
    '_id': id
  }).
  populate('activecourse').
  populate('sections').
  populate([{
    path: 'activecourse',
    populate: {
      path: 'course',
    }
  }]).
  exec(function(error, sectionarraydata) {
    if (error) return res.status(400).send({
      success: false
    })

    // let apple = sectionarraydata.activecourse.map(data=>{
    //     ActiveCourse.findOne({'_id':data._id}).populate('course').exec(function(error, coursedata) {
    //         if(error) return res.status(400).send({success:false})
    //         console.log(coursedata.course.coursetitle)
    //         return coursedata.course.coursetitle
    //     })
    //     return null
    // })

    res.json({
      success: true,
      sectionarraydata
    })
  })
})
// app.get('/admin/navsection',(req,res)=>{
//     Section.
//     find({}).
//     populate('semester').
//     populate('course').
//     populate('mentor').
//     exec(function(error, sectionarraydata) {
//         if(error) return res.send({message:'Error fetching Data'});
//         res.send(sectionarraydata)
//     });
// });

// app.get('/admin/navsections',(req,res)=>{
//     Section.
//     find({}).
//     populate('semester').
//     populate('course').
//     populate('mentor').
//     populate('sections.lecteacher').
//     populate('sections.labteacher').
//     exec(function(error, sectionarraydata) {
//         if(err) return res.send({message:'Error fetching Data'});
//         res.send(sectionarraydata)
//     });
// });
/* POST */
/*ADMIN ADD SECTIONS*/

app.post('/admin/addsections', (req, res) => {
  Semester.findOne({
    '_id': req.body.semester
  }, (err, semester) => {
    // if(!semester) return res.send({message:'Semester Not found'});
    if (!semester) return res.send(err);
    Course.findOne({
      '_id': req.body.course
    }, (err, course) => {
      // if(!course) return res.send({message:'Course Not found'});
      if (!course) return res.send(err);
      User.findOne({
        '_id': req.body.mentor
      }, (err, mentor) => {
        // if(!mentor) return res.send({message:'Mentor Not found'});
        if (!mentor) return res.send(err);

        const activecourses = new ActiveCourse({
          semester: req.body.semester,
          course: req.body.course,
          mentor: req.body.mentor
        })

        ActiveCourse.findOne({
          'course': req.body.course,
          'semester': req.body.semester
        }, (err, duplicatesection) => {
          if (!duplicatesection) {
            activecourses.save((err, activeC) => {
              if (err) return res.status(400).send({
                success: false
              })
              const sections = req.body.sections
              Sections.create(sections, (err, secs) => {
                if (err) return res.status(400).send({
                  success: false
                })
                semester.activecourse.push(activeC._id)
                semester.save();
                /*Assosiate with course*/
                course.activecourse.push(activeC._id)
                course.save();
                // /*Assosiate mentor with user*/
                mentor.coursementor.push(activeC._id)
                mentor.save();
                User.findByIdAndUpdate(req.body.mentor, {
                  mentor_check: true
                }, {
                  new: true
                }, (err, doc) => {
                  if (err) return res.status(400).send({
                    success: false,
                    message: "Mentor is not Assigned plz update again !!!"
                  })
                })
                Course.findByIdAndUpdate(req.body.course, {
                  delete_check: false
                }, {
                  new: true
                }, (err, doc) => {
                  if (err) return res.status(400).send({
                    success: false,
                    message: "Error while updating delete constraint"
                  })
                })
                Semester.findByIdAndUpdate(req.body.semester, {
                  delete_check: false
                }, {
                  new: true
                }, (err, doc) => {
                  if (err) return res.status(400).send({
                    success: false,
                    message: "Error while updating semester delete constraint"
                  })
                })

                console.log("sections" + secs);
                secs.map(data => {
                  if (data.labstatus === "lecture") {
                    User.findOne({
                      '_id': data.lecteacher
                    }, (err, lecteacherdoc) => {
                      if (err) return res.send({
                        error: err,
                        message: 'Error fetching teacher'
                      });
                      User.findByIdAndUpdate(lecteacherdoc._id, {
                        delete_check: false
                      }, {
                        new: true
                      }, (err, doc) => {
                        if (err) return res.status(400).send({
                          error: err,
                          success: false,
                          message: "Error while assign course to teacher !!!"
                        })
                      })
                      lecteacherdoc.sections.push(data._id)
                      lecteacherdoc.activecourse.push(activeC._id)
                      lecteacherdoc.save();

                      // const q = new Quiz()
                      // q.save()
                      // const a = new Assignments()
                      // a.save()
                      // const co = new CourseOutline()
                      // co.save()
                      // const f = new Finals()
                      // f.save()
                      // const m = new Mids()
                      // m.save()
                      // const r = new Result()
                      // r.save()
                      // const at = new Attendance()
                      // at.save()
                      const c = new CFM({
                        // quiz: q,
                        // assignment: a,
                        // courseOutline: co,
                        // final: f,
                        // mid: m,
                        // result: r,
                        // attendance: at,
                        sectioncourse: secs[0],
                      })
                      c.save()
                      // console.log(lecteacherdoc.courses)
                      // let demo;
                      // if(lecteacherdoc.courses.listen>0){
                      //     demo.from(new set(lecteacherdoc.courses))
                      //     console.log(demo)
                      // }
                    })
                  }
                  if (data.labstatus === "lab") {
                    User.findOne({
                      '_id': data.labteacher
                    }, (err, labteacherdoc) => {
                      if (err) return res.send({
                        error: err,
                        message: 'Error fetching teacher'
                      });
                      User.findByIdAndUpdate(labteacherdoc._id, {
                        delete_check: false
                      }, {
                        new: true
                      }, (err, doc) => {
                        if (err) return res.status(400).send({
                          error: err,
                          success: false,
                          message: "Error while assign course to teacher !!!"
                        })
                      })
                      labteacherdoc.sections.push(data._id)
                      labteacherdoc.activecourse.push(activeC._id)
                      labteacherdoc.save();
                      // const q = new Quiz()
                      // q.save()
                      // const a = new Assignments()
                      // a.save()
                      // const co = new CourseOutline()
                      // co.save()
                      // const f = new Finals()
                      // f.save()
                      // const m = new Mids()
                      // m.save()
                      // const r = new Result()
                      // r.save()
                      // const at = new Attendance()
                      // at.save()
                      const c = new CFM({
                        // quiz: q,
                        // assignment: a,
                        // courseOutline: co,
                        // final: f,
                        // mid: m,
                        // result: r,
                        // attendance: at,
                        sectioncourse: secs[1],
                      })
                      c.save()
                    })
                  }
                })

                res.status(200).json({
                  success: true,
                  courseId: activeC._id,
                })
              })
            })
          } else {
            return res.status(400).send({
              error: err,
              success: false,
              message: "Section Already Exist in this Semester !!!"
            })
          }
        })
      })
    })
  })
})

// app.post('/admin/addsections',(req,res)=>{
//     Semester.findOne({'_id':req.body.semester},(err,semester)=>{
//         // if(!semester) return res.send({message:'Semester Not found'});
//         if(!semester) return res.send(err);
//         Course.findOne({'_id':req.body.course},(err,course)=>{
//             // if(!course) return res.send({message:'Course Not found'});
//             if(!course) return res.send(err);
//             User.findOne({'_id':req.body.mentor},(err,mentor)=>{
//                 // if(!mentor) return res.send({message:'Mentor Not found'});
//                 if(!mentor) return res.send(err);
//                 // Section.collection.estimatedDocumentCount((err,countsec)=>{
//                 //     if(countsec === 1){
//                 //         Section.collection.dropIndexes("sections.uniq_1", function(err, delOK) {
//                 //         // Section.collection.dropIndexes("sections.uniq_1","uniq_1", function(err, delOK) {
//                 //             if(err) return res.status(400).send({error:err,success:false,message:"Unique Index Error in sections field uniq"})
//                 //             if (delOK) console.log("Collection deleted");
//                 //         })
//                 //         Section.collection.dropIndexes("uniq_1", function(err, delOK) {
//                 //             // Section.collection.dropIndexes("sections.uniq_1","uniq_1", function(err, delOK) {
//                 //             if(err) return res.status(400).send({error:err,success:false,message:"Unique Index Error in sections field uniq"})
//                 //             if (delOK) console.log("Collection deleted");
//                 //         })
//                 //     }
//                 // })
//                 const section = new Section(req.body)
//                 Section.findOne({'course':req.body.course,'semester':req.body.semester},(err,duplicatesection)=>{
//                     if(!duplicatesection){
//                         section.save((err,doc)=>{
//                             // if(err) return res.status(400).send({success:false})
//                             if(err) return res.status(400).send(err)
//                             /*Assosiate with semester*/
//                             semester.sectionsemester.push(section._id)
//                             semester.save();
//                             /*Assosiate with course*/
//                             course.sectioncourse.push(section._id)
//                             course.save();
//                             // /*Assosiate mentor with user*/
//                             mentor.coursementor.push(section._id)
//                             mentor.save();
//                             User.findByIdAndUpdate(req.body.mentor,{mentor_check:true},{new: true},(err,doc)=>{
//                                 if(err) return res.status(400).send({success:false,message:"Mentor is not Assigned plz update again !!!"})
//                             })
//                             Course.findByIdAndUpdate(req.body.course,{delete_check:false},{new: true},(err,doc)=>{
//                                 if(err) return res.status(400).send({success:false,message:"Error while updating delete constraint"})
//                             })
//                             Semester.findByIdAndUpdate(req.body.semester,{delete_check:false},{new: true},(err,doc)=>{
//                                 if(err) return res.status(400).send({success:false,message:"Error while updating semester delete constraint"})
//                             })
//                             let secs = section.sections;
//                             secs.map(data=>{
//                                 if(data.labstatus === "lecture"){
//                                     User.findOne({'_id':data.lecteacher},(err,lecteacherdoc)=>{
//                                         if(err) return res.send({error:err,message:'Error fetching teacher'});
//                                         User.findByIdAndUpdate(lecteacherdoc._id,{delete_check:false},{new: true},(err,doc)=>{
//                                             if(err) return res.status(400).send({error:err,success:false,message:"Error while assign course to teacher !!!"})
//                                         })
//                                         lecteacherdoc.sections.push(data._id)
//                                         lecteacherdoc.courses.push(section._id)
//                                         lecteacherdoc.save();

//                                         // console.log(lecteacherdoc.courses)
//                                         // let demo;
//                                         // if(lecteacherdoc.courses.listen>0){
//                                         //     demo.from(new set(lecteacherdoc.courses))
//                                         //     console.log(demo)
//                                         // }
//                                     })
//                                 }
//                                 if(data.labstatus === "lab"){
//                                     User.findOne({'_id':data.labteacher},(err,labteacherdoc)=>{
//                                         if(err) return res.send({error:err,message:'Error fetching teacher'});
//                                         User.findByIdAndUpdate(labteacherdoc._id,{delete_check:false},{new: true},(err,doc)=>{
//                                             if(err) return res.status(400).send({error:err,success:false,message:"Error while assign course to teacher !!!"})
//                                         })
//                                         labteacherdoc.sections.push(data._id)
//                                         labteacherdoc.courses.push(section._id)
//                                         labteacherdoc.save();
//                                     })
//                                 }
//                             })
//                             res.status(200).json({
//                                 success:true,
//                                 sectionId: doc._id
//                             })
//                         })
//                     }else{
//                         return res.status(400).send({error:err,success:false,message:"Section Already Exist in this Semester !!!"})
//                     }
//                 })
//             })
//         })
//     })
// })


app.get('/admin/testing', (req, res) => {
  User.
  find({
    _id: "5eb83eabbd63373c688ee388"
  }).
  // populate('courses').
  exec(function(error, sectionarraydata) {
    if (error) return res.send({
      message: 'Error fetching Data'
    });

    function removeDuplicates(array) {
      if (array.length > 0) {
        return array.filter((a, b) => array.indexOf(a) === b)
      }
    };
    let x = removeDuplicates(sectionarraydata[0].courses)
    User.findByIdAndUpdate("5eb83eabbd63373c688ee388", {
      courses: x
    }, {
      new: true
    }, (err, doc) => {
      // if(err) return res.status(400).send({success:false})
      // res.json({
      //     success:true,
      //     doc
      // })
    })
  });

  User.
  find({
    _id: "5eb83eabbd63373c688ee388"
  }).
  // populate('courses').
  exec(function(error, sectionarraydata) {
    if (error) return res.send({
      message: 'Error fetching Data'
    });
    let x = sectionarraydata[0].courses.map((data => {
      return data
    }))
    let valuye = "5eb8b8c9a8252b31c0acead8";
    const index = x.indexOf(valuye);
    x.splice(index, 1);
    console.log(sectionarraydata[0].courses)
    console.log(x)
    User.findByIdAndUpdate("5eb83eabbd63373c688ee388", {
      courses: x
    }, {
      new: true
    }, (err, doc) => {
      if (err) return res.status(400).send({
        success: false
      })
      res.json({
        success: true,
        doc
      })
    })
  });
})

/*DELETE*/
app.delete('/admin/navsections', (req, res) => {
  Section.findById(req.query.id, (err, section) => {
    if (err) return res.status(400).send({
      error: err,
      success: false,
      message: "Section not found"
    })
    if (section.delete_check === false) {
      return res.status(400).send({
        success: false,
        message: "Can't delete, First Ask HOD Or Course Folder Committee to approve Delete"
      })
    } else {
      // console.log(section)
      Semester.findOne({
        '_id': section.semester
      }, (err, semester) => {
        if (!semester) return res.send({
          success: false,
          message: 'Semester Not found'
        });
        /*Remove section association from semester*/
        // console.log(semester.sectionsemester)
        const index = semester.sectionsemester.indexOf(req.query.id);
        semester.sectionsemester.splice(index, 1);
        // console.log(semester.sectionsemester)
        // console.log(semester.sectionsemester.length)
        if (semester.sectionsemester.length < 1) {
          Semester.findByIdAndUpdate(section.semester, {
            sectionsemester: semester.sectionsemester,
            delete_check: true
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating semester TO remove ActiveSectons Association "
            })
          })
        } else {
          Semester.findByIdAndUpdate(section.semester, {
            sectionsemester: semester.sectionsemester
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating semester TO remove ActiveSectons Association "
            })
          })
        }
      })
      Course.findOne({
        '_id': section.course
      }, (err, course) => {
        if (!course) return res.send({
          success: false,
          message: 'Course Not found'
        });
        /*Remove sections association from course*/
        // console.log(course.sectioncourse)
        const index = course.sectioncourse.indexOf(req.query.id);
        course.sectioncourse.splice(index, 1);
        // console.log(course.sectioncourse)
        // console.log(course.sectioncourse.length)
        if (course.sectioncourse.length < 1) {
          Course.findByIdAndUpdate(section.course, {
            sectioncourse: course.sectioncourse,
            delete_check: true
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating semester TO remove ActiveSectons Association "
            })
          })
        } else {
          Course.findByIdAndUpdate(section.course, {
            sectioncourse: course.sectioncourse
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating course TO remove ActiveSectons Association "
            })
          })
        }
      })
      User.findOne({
        '_id': section.mentor
      }, (err, mentor) => {
        if (!mentor) return res.send({
          success: false,
          message: 'Mentor Not found'
        });
        /*Remove sections association from mentor*/
        // console.log(mentor.coursementor)
        const index = mentor.coursementor.indexOf(req.query.id);
        mentor.coursementor.splice(index, 1);
        // console.log(mentor.coursementor)
        // console.log(mentor.coursementor.length)
        if (mentor.coursementor.length < 1) {
          User.findByIdAndUpdate(section.mentor, {
            coursementor: mentor.coursementor,
            mentor_check: false
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating semester TO remove ActiveSectons Association "
            })
          })
        } else {
          User.findByIdAndUpdate(section.mentor, {
            coursementor: mentor.coursementor
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating course TO remove ActiveSectons Association "
            })
          })
        }
      })
      const teacherslist = section.sections.map((singleSection) => {
        if (singleSection.labstatus === "lecture") {
          return singleSection.lecteacher
        }
        if (singleSection.labstatus === "lab") {
          return singleSection.labteacher
        }
      })
      console.log(teacherslist)

      const removeDuplicate = (array) => {
        return array.filter((value, index) =>
          array.indexOf(value) === index
        )
      }
      const UniqueTeacherList = removeDuplicate(teacherslist)
      console.log(UniqueTeacherList)
      UniqueTeacherList.map((singleTeacher) => {
        let sectionsList = [];
        section.sections.map((singleSection) => {
          if (singleSection.labstatus === "lecture") {
            let slect = JSON.stringify(singleSection.lecteacher);
            let ct = JSON.stringify(singleTeacher);
            if (slect === ct) {
              sectionsList.push(singleSection._id)
            }
          }
          if (singleSection.labstatus === "lab") {
            let slabt = JSON.stringify(singleSection.lecteacher);
            let ct = JSON.stringify(singleTeacher);
            if (slabt === ct) {
              sectionsList.push(singleSection._id)
            }
          }
        })
        // console.log(sectionsList)
        User.findOne({
          '_id': singleTeacher
        }, (err, lecteacherdoc) => {
          if (!lecteacherdoc) return res.send({
            success: false,
            message: 'Teacher Not found'
          });
          // console.log(lecteacherdoc.sections)
          sectionsList.map((SinglesecId) => {
            const index = lecteacherdoc.sections.indexOf(SinglesecId);
            lecteacherdoc.sections.splice(index, 1);
          })
          // console.log(lecteacherdoc.sections)
          function removeDuplicates(array) {
            if (array.length > 0) {
              return array.filter((a, b) => array.indexOf(a) === b)
            }
          };
          let x = removeDuplicates(lecteacherdoc.courses)
          const index = x.indexOf(section._id);
          x.splice(index, 1);
          console.log(x);
          if (lecteacherdoc.sections < 1) {
            User.findByIdAndUpdate(singleTeacher, {
              sections: lecteacherdoc.sections,
              courses: x,
              delete_check: true
            }, {
              new: true
            }, (err, doc) => {
              if (err) return res.status(400).send({
                success: false,
                message: "Error while updating teacher TO remove ActiveSectons Association "
              })
            })
          } else {
            User.findByIdAndUpdate(singleTeacher, {
              sections: lecteacherdoc.sections,
              courses: x
            }, {
              new: true
            }, (err, doc) => {
              if (err) return res.status(400).send({
                success: false,
                message: "Error while updating teacher TO remove ActiveSectons Association "
              })
            })
          }
        })
      })

      Section.findByIdAndRemove(req.query.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
      })
    }
  })
});
/*UPDATE SECTION REQUEST START*/
// app.post('',(req,res)=>{

app.post('/admin/editsections', (req, res) => {
  Section.findOne({
    '_id': req.body._id
  }, (err, section) => {
    // if(!semester) return res.send({message:'Semester Not found'});
    if (!section) return res.send(err);
    Semester.findOne({
      '_id': section.semester
    }, (err, semester) => {
      if (!semester) return res.send({
        success: false,
        message: 'Semester Not found'
      });
      /*Remove section association from semester*/
      // console.log(semester.sectionsemester)
      const index = semester.sectionsemester.indexOf(req.query.id);
      semester.sectionsemester.splice(index, 1);
      // console.log(semester.sectionsemester)
      // console.log(semester.sectionsemester.length)
      if (semester.sectionsemester.length < 1) {
        Semester.findByIdAndUpdate(section.semester, {
          sectionsemester: semester.sectionsemester,
          delete_check: true
        }, {
          new: true
        }, (err, doc) => {
          if (err) return res.status(400).send({
            success: false,
            message: "Error while updating semester TO remove ActiveSectons Association "
          })
        })
      } else {
        Semester.findByIdAndUpdate(section.semester, {
          sectionsemester: semester.sectionsemester
        }, {
          new: true
        }, (err, doc) => {
          if (err) return res.status(400).send({
            success: false,
            message: "Error while updating semester TO remove ActiveSectons Association "
          })
        })
      }
    })
    Course.findOne({
      '_id': section.course
    }, (err, course) => {
      if (!course) return res.send({
        success: false,
        message: 'Course Not found'
      });
      /*Remove sections association from course*/
      // console.log(course.sectioncourse)
      const index = course.sectioncourse.indexOf(req.query.id);
      course.sectioncourse.splice(index, 1);
      // console.log(course.sectioncourse)
      // console.log(course.sectioncourse.length)
      if (course.sectioncourse.length < 1) {
        Course.findByIdAndUpdate(section.course, {
          sectioncourse: course.sectioncourse,
          delete_check: true
        }, {
          new: true
        }, (err, doc) => {
          if (err) return res.status(400).send({
            success: false,
            message: "Error while updating semester TO remove ActiveSectons Association "
          })
        })
      } else {
        Course.findByIdAndUpdate(section.course, {
          sectioncourse: course.sectioncourse
        }, {
          new: true
        }, (err, doc) => {
          if (err) return res.status(400).send({
            success: false,
            message: "Error while updating course TO remove ActiveSectons Association "
          })
        })
      }
    })
    User.findOne({
      '_id': section.mentor
    }, (err, mentor) => {
      if (!mentor) return res.send({
        success: false,
        message: 'Mentor Not found'
      });
      /*Remove sections association from mentor*/
      // console.log(mentor.coursementor)
      const index = mentor.coursementor.indexOf(req.query.id);
      mentor.coursementor.splice(index, 1);
      // console.log(mentor.coursementor)
      // console.log(mentor.coursementor.length)
      if (mentor.coursementor.length < 1) {
        User.findByIdAndUpdate(section.mentor, {
          coursementor: mentor.coursementor,
          mentor_check: false
        }, {
          new: true
        }, (err, doc) => {
          if (err) return res.status(400).send({
            success: false,
            message: "Error while updating semester TO remove ActiveSectons Association "
          })
        })
      } else {
        User.findByIdAndUpdate(section.mentor, {
          coursementor: mentor.coursementor
        }, {
          new: true
        }, (err, doc) => {
          if (err) return res.status(400).send({
            success: false,
            message: "Error while updating course TO remove ActiveSectons Association "
          })
        })
      }
    })

  })
  Section.findByIdAndUpdate(req.body._id, req.body, {
    new: true
  }, (err, secdoc) => {
    if (err) return res.status(400).send({
      success: false
    })
    Semester.findOne({
      '_id': req.body.semester
    }, (err, semesterdoc) => {
      // if(!semester) return res.send({message:'Semester Not found'});
      if (!semesterdoc) return res.send(err);
      Course.findOne({
        '_id': req.body.course
      }, (err, coursedoc) => {
        // if(!course) return res.send({message:'Course Not found'});
        if (!coursedoc) return res.send(err);
        User.findOne({
          '_id': req.body.mentor
        }, (err, mentordoc) => {
          // if(!mentor) return res.send({message:'Mentor Not found'});
          if (!mentordoc) return res.send(err);
          if (err) return res.status(400).send(err)
          /*Assosiate with semester*/
          semesterdoc.sectionsemester.push(section._id)
          semesterdoc.save();
          /*Assosiate with course*/
          coursedoc.sectioncourse.push(section._id)
          coursedoc.save();
          // /*Assosiate mentor with user*/
          mentordoc.coursementor.push(section._id)
          mentordoc.save();
          User.findByIdAndUpdate(req.body.mentor, {
            mentor_check: true
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Mentor is not Assigned plz update again !!!"
            })
          })
          Course.findByIdAndUpdate(req.body.course, {
            delete_check: false
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating delete constraint"
            })
          })
          Semester.findByIdAndUpdate(req.body.semester, {
            delete_check: false
          }, {
            new: true
          }, (err, doc) => {
            if (err) return res.status(400).send({
              success: false,
              message: "Error while updating semester delete constraint"
            })
          })
          let secs = secdoc.sections;
          secs.map(data => {
            if (data.labstatus === "lecture") {
              User.findOne({
                '_id': data.lecteacher
              }, (err, lecteacherdoc) => {
                if (err) return res.send({
                  error: err,
                  message: 'Error fetching teacher'
                });
                User.findByIdAndUpdate(lecteacherdoc._id, {
                  delete_check: false
                }, {
                  new: true
                }, (err, doc) => {
                  if (err) return res.status(400).send({
                    error: err,
                    success: false,
                    message: "Error while assign course to teacher !!!"
                  })
                })
                lecteacherdoc.sections.push(data._id)
                lecteacherdoc.courses.push(section._id)
                lecteacherdoc.save();

                // console.log(lecteacherdoc.courses)
                // let demo;
                // if(lecteacherdoc.courses.listen>0){
                //     demo.from(new set(lecteacherdoc.courses))
                //     console.log(demo)
                // }
              })
            }
            if (data.labstatus === "lab") {
              User.findOne({
                '_id': data.labteacher
              }, (err, labteacherdoc) => {
                if (err) return res.send({
                  error: err,
                  message: 'Error fetching teacher'
                });
                User.findByIdAndUpdate(labteacherdoc._id, {
                  delete_check: false
                }, {
                  new: true
                }, (err, doc) => {
                  if (err) return res.status(400).send({
                    error: err,
                    success: false,
                    message: "Error while assign course to teacher !!!"
                  })
                })
                labteacherdoc.sections.push(data._id)
                labteacherdoc.courses.push(section._id)
                labteacherdoc.save();
              })
            }
          })
        })
      })
    })
    res.json({
      success: true,
      doc
    })
  })
})

/*UPDATE SECTION REQUEST END*/
/*ADMIN SECTION REQUEST END*/


app.post('/teacher/addResult', (req, res) => {
  if (!req.files) {
    return res.status(500).send({
      msg: "file is not found"
    })
  }
  // accessing the file
  const myFile = req.files.file;
  //  mv() method places the file inside public directory
  //    mkdirp('server/assets',function(err){

  //     return res.status(500).send({ msg: "Error occured" });
  //    })
  var fs = require('fs');
  var dir = 'server/assets1';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  myFile.mv(`${__dirname}/assets1/${myFile.name}`, function(err) {
    if (err) {
      console.log(err)
      return res.status(500).send({
        msg: "Error occured"
      });
    }
    // returing the response with file path and name
    return res.send({
      name: myFile.name,
      path: `/${myFile.name}`
    });
  });
});

/*Upload file code start*/


/*Upload file code end*/

const port = process.env.PORT || 3001;

app.listen(3001, () => debug(`Listening on port ${port}`));
