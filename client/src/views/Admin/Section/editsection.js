import React from "react";
import {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";
import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import SweetAlert from "react-bootstrap-sweetalert";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import axios from 'axios';

/*Redux code start*/
// import { useDispatch ,useSelector } from "react-redux";

/*Redux code end*/
const stylesC = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const useStyles = makeStyles(stylesCustom,stylesCard,stylesAlert);
const useStylesA = makeStyles(stylesAlert);
const usestylesC= makeStyles(stylesC)

export default function Aeditsection(props) {
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  /*Redux code start*/
  // const dispatch = useDispatch();
  // co nst actionDataState = useSelector(state => state.user.data, []) || [];
  /*Redux code end*/
  const [semesterSelect, setSemesterSelect] = React.useState("");
  const [courseSelect, setCourseSelect] = React.useState("");
  const [mentorSelect, setMentorSelect] = React.useState("");
  
  const [teacherList, setTeacherList] = React.useState([]);
  const [semesterList, setSemesterList] = React.useState([]);
  const [courseList, setCourseList] = React.useState([]);
  
  const [labdisplay, setLabdisplay] = React.useState(false);
  const [inputList, setInputList] = React.useState([{ uniq: uuidv4(),course:"", name: "", lecteacher: "", labteacher: "",labstatus:"lecture" }]);
  const [labList, setLabList] = React.useState([{ uniq: uuidv4(),course:"", name: "", lecteacher: "", labteacher: "",labstatus:"lab" }]);
  
  const [alert, setAlert] = React.useState(null);
  const [btndisable, setBtnDisable] = React.useState(false);
  const [editsecId, seteditsecId] = React.useState("");
  useEffect(() => {
    const cancelDetele = (text) => {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => hideAlert()}
          onCancel={() => hideAlert()}
          confirmBtnCssClass={classesA.button + " " + classesA.success}
        >
          {text}
        </SweetAlert>
      );
    };
    const hideAlert = () => {
      setAlert(null);
    }; 
    
    function getdropdownlists() {
      axios.get(`/admin/addsectiongetallforedit?id=${props.match.params.id}`)
        .then(function (response) {
          setTeacherList(response.data.teachers)
          setSemesterList(response.data.semesters)
          setCourseList(response.data.courses)
          console.log(response.data.sectiondata)
          console.log(response.data.sectiondata.course._id)
          
          // setSemesterSelect(response.data.sectiondata.semester._id)
          seteditsecId(response.data.sectiondata._id)
          setSemesterSelect(response.data.sectiondata.semester)
          setCourseSelect(response.data.sectiondata.course._id)
          if(response.data.sectiondata.course.labstatus === "lecture and lab"){
            setLabdisplay(true) 
          }
          if(response.data.sectiondata.course.labstatus === "lecture only"){
            setLabdisplay(false)
          }
          setMentorSelect(response.data.sectiondata.mentor)
          let seclecturelist= [];
          let seclablist= [];
          console.log(response.data.sectiondata.sections)
          response.data.sectiondata.sections.map((sec,i)=>{
            // console.log(sec)
            if(sec.labstatus==="lecture"){
              seclecturelist.push(sec)
            }else{
              seclablist.push(sec)
            }
            return null
          })
          console.log(seclecturelist)
          console.log(seclablist)
          setInputList(seclecturelist)
          setLabList(seclablist)
        })
        .catch(function (error) {
          cancelDetele("Server is not responding Please try again");
          props.history.push("/admin")
        })
    }
    // function getSections() {
    //   axios.get(`/admin/editsections?id=${props.match.params.id}`)
    //   .then(function (response) {
    //     setTeacherList(response.data.teachers)
    //     setSemesterList(response.data.semesters)
    //     setCourseList(response.data.courses)
    //   })
    //   .catch(function (error) {
    //     cancelDetele("Server is not responding Please try again");
    //     props.history.push("/admin")
    //   })
    // }
    getdropdownlists()
    // getSections()
  },[classesA.button,classesA.success,props.match.params.id,props.history]); 
  
  const hideAlert = () => {
    setAlert(null);
  };
  
  const cancelDetele = (text) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
        {text}
      </SweetAlert>
    );
  };
  const successAlert = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Form Submitted !!!"
        onConfirm={() => {
          hideAlert()
          setBtnDisable(false)
          props.history.push("/admin")
        }}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
      </SweetAlert>
    );
  };
  const submitForm = (e) => {
    e.preventDefault();
    setBtnDisable(true)
    if (semesterSelect === "") {
      cancelDetele("The Semester field is empity")
      return null;
    }
    if (courseSelect === "") {
      cancelDetele("The Course field is empity")
      return null;
    }
    if (mentorSelect === "") {
      cancelDetele("The Mentor field is empity")
      return null;
    }
    for(let i=0;i<inputList.length;i++){
      if(inputList[i].name ===""){
        console.log("empty")
        cancelDetele("The section field is empity")
        return false;
      }
      if(inputList[i].lecteacher ===""){
        cancelDetele("The Teacher field is empity")
        return false;
      }
      if(labdisplay===true){
        if(inputList[i].labteacher ===""){
          cancelDetele("The Lab Teacher field is empity")
          return false;
        }
      }
    }
    let finallist;
    if(labdisplay===true){
      finallist = inputList.concat(labList)
      finallist.map((data)=>{
        data.course = courseSelect;
        return data;
      })
      console.log(finallist) 
    }else{
      finallist = inputList.map((data)=>{
        data.labteacher = data.lecteacher;
        data.course = courseSelect;
        return data;
      })
      console.log(finallist)
    }
    axios.post('/admin/editsections', { 
      _id: editsecId,
      semester: semesterSelect,
      course: courseSelect,
      mentor: mentorSelect,
      sections: finallist
    })
    .then(function (response) {
      console.log(response.data)
        if(response.data.success ===true){
          successAlert();

        }
    })
    .catch(function (error) {
      console.log((error.response.data))
      if(error.response.data.success ===false){
        // console.log(response.data.success)
        cancelDetele("Course Alreadt exist");                
      }
      else{
        cancelDetele("Unexpected Error occur");
      }
    })
  }

// CLEAR THE SCREEN
  const handleRemoveClick = index => {
    const list =  [...inputList];
    list.splice(index, 1);
    setInputList(list);
    if(labdisplay===true){
      const slistlab =  [...labList];
      slistlab.splice(index, 1);
      setLabList(slistlab);
    }
  };
// handle click event of the Add button
  const handleAddClick = () => {
    setInputList([...inputList, { uniq: uuidv4(),course:"", name: "", lecteacher: "", labteacher: "",labstatus:"lecture" }]);
    setLabList([...labList, { uniq: uuidv4(),course:"", name: "", lecteacher: "", labteacher: "",labstatus:"lab" }]);
  };
  const handleInputChange = (e, index) => {
    const list = [...inputList];
    const { name, value } = e.target;
    list[index][name] = value;
    setInputList(list);
    const listlab = [...labList];
    listlab[index][name] = value;
    setLabList(listlab)
  };
  return (
    <div>                           
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <PermIdentity />
              </CardIcon>
              <h4 className={classesC.cardIconTitle}>
                Update Sections
              </h4>
            </CardHeader>
            {alert}
            <CardBody>
              <form onSubmit={submitForm} >
                <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="semester"
                        className={classes.selectLabel}
                      >
                        Choose Semester
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={semesterSelect}
                        onChange={
                          event=>{
                            setSemesterSelect(event.target.value)
                          }
                        }
                        inputProps={{
                          name: "semester",
                          id: "semester"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Semester
                        </MenuItem>
                        {
                          semesterList.map((prop,key) => {
                            return (
                              <MenuItem key={key}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={`${prop._id}`}
                              >
                                {prop.year} {prop.semester} 
                              </MenuItem>      
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="course"
                        className={classes.selectLabel}
                      >
                        Choose Course
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={courseSelect}
                        onChange={
                          event=>{
                            setCourseSelect(event.target.value)
                            for(let i =0;i<inputList.length;i++){
                              inputList[i]['labteacher'] ='';
                            }
                            for(let i =0;i<labList.length;i++){
                              labList[i]['labteacher'] ='';
                            }
                            courseList.find( prop => {
                              if(prop._id === event.target.value){
                                if(prop.labstatus === "lecture and lab"){
                                  setLabdisplay(true) 
                                }
                                if(prop.labstatus === "lecture only"){
                                  setLabdisplay(false)
                                }
                              }
                              return null;                   
                            })
                          }
                        }
                        inputProps={{
                          name: "course",
                          id: "course"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Course
                        </MenuItem>
                        {
                          courseList.map( (prop,key) => {
                            return (
                              <MenuItem key={key}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={`${prop._id}`}
                              >
                                {prop.coursetitle} 
                              </MenuItem>      
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="mentor"
                        className={classes.selectLabel}
                      >
                        Choose Mentor
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={mentorSelect}
                        onChange={
                          event=>{
                            setMentorSelect(event.target.value)
                          }
                        }
                        inputProps={{
                          name: "mentor",
                          id: "mentor"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Choose Mentor
                        </MenuItem>
                        {
                          teacherList.map( (prop,key) => {
                            return (
                              <MenuItem key={key}
                                classes={{
                                  root: classes.selectMenuItem,
                                  selected: classes.selectMenuItemSelected
                                }}
                                value={`${prop._id}`}
                              >
                                {prop.employeecode} {prop.fullname} 
                              </MenuItem>      
                            )
                          })
                        }
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                {inputList.map((x, i) => {
                  return (
                    <div key ={i}>
                      <GridContainer >
                        <GridItem xs={12} sm={3} md={3} lg={3}>
                          <CustomInput
                            value={x.name}
                            labelText="Section Name"
                            name="name"
                            onChange={e => handleInputChange(e, i)}
                            id={`section-name-${i}`}
                            formControlProps={{
                            fullWidth: true
                          }}
                            inputProps={{
                            type: "text",
                            autoComplete: "off"
                          }}
                        />
                        </GridItem>
                        <GridItem xs={12} sm={3} md={3} lg={3}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                          >
                            <InputLabel
                              htmlFor="select-teacher"
                              className={classes.selectLabel}
                            >
                              Choose Teacher
                            </InputLabel>
                            <Select
                              MenuProps={{
                                className: classes.selectMenu
                              }}
                              classes={{
                                select: classes.select
                              }}
                              value={x.lecteacher}
                              onChange={e => handleInputChange(e, i)}
                              inputProps={{
                                name: "lecteacher",
                                id: `select-teacher-${i}`
                              }}
                            >
                              <MenuItem
                                disabled
                                classes={{
                                  root: classes.selectMenuItem
                                }}
                              >
                                Choose Teacher
                              </MenuItem>
                              {
                                teacherList.map( (prop,key) => {
                                  return (
                                    <MenuItem key={key}
                                      classes={{
                                        root: classes.selectMenuItem,
                                        selected: classes.selectMenuItemSelected
                                      }}
                                      value={`${prop._id}`}
                                    >
                                      {prop.employeecode} {prop.fullname} 
                                    </MenuItem>      
                                  )
                                })
                              }  
                            </Select>
                          </FormControl>
                        </GridItem>
                        {
                          labdisplay &&
                          <GridItem xs={12} sm={3} md={3} lg={3}>
                            <FormControl
                              fullWidth
                              className={classes.selectFormControl}
                            >
                              <InputLabel
                                htmlFor="select-lab-teacher"
                                className={classes.selectLabel}
                              >
                                Choose Lab Teacher
                              </InputLabel>
                              <Select
                                MenuProps={{
                                  className: classes.selectMenu
                                }}
                                classes={{
                                  select: classes.select
                                }}
                                value={x.labteacher}
                                onChange={e => handleInputChange(e, i)}
                                inputProps={{
                                  name: "labteacher",
                                  id: `select-lab-teacher-${i}`
                                }}
                              >
                                <MenuItem
                                  disabled
                                  classes={{
                                    root: classes.selectMenuItem
                                  }}
                                >
                                  Choose Lab Teacher
                                </MenuItem>
                                {
                                  teacherList.map( (prop,key) => {
                                    return (
                                      <MenuItem key={key}
                                        classes={{
                                          root: classes.selectMenuItem,
                                          selected: classes.selectMenuItemSelected
                                        }}
                                        value={`${prop._id}`}
                                      >
                                        {prop.employeecode} {prop.fullname} 
                                      </MenuItem>      
                                    )
                                  })
                                }
                              </Select>
                            </FormControl>
                          </GridItem>
                        }
                        <GridItem xs={12} sm={1} md={1} lg={1}>
                          {
                            inputList.length !== 1 && <Button 
                            justIcon 
                            round 
                            color="primary" 
                            value='remove' 
                            onClick={() => handleRemoveClick(i)}
                            >
                              <Close />
                            </Button>
                          }
                        </GridItem>
                        <GridItem xs={12} sm={1} md={1} lg={1}>
                          {
                            inputList.length - 1 === i && <Button 
                            color="primary" 
                            value='Add' 
                            onClick={handleAddClick}
                            >
                              <Add />
                            </Button>
                          }  
                        </GridItem>
                      </GridContainer>
                    </div>
                  );
                })}
                <br/>
                <GridContainer justify="center">
                  <GridItem xs={12} sm={12} md={6}>
                      <CardBody style={{ textAlign: "center" }}>
                        {
                          btndisable ?
                          <Button 
                            type="submit"
                            color="primary"
                            disabled
                            className={classes.updateProfileButton}
                          >
                            Update Sections
                          </Button>
                          :
                          <Button 
                            type="submit"
                            color="primary"
                            id="submitbutton"
                            className={classes.updateProfileButton}
                          >
                            Update Sections
                          </Button>
                        }
                      </CardBody>
                  </GridItem>
                </GridContainer>
                {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
                <div style={{ marginTop: 20 }}>{JSON.stringify(labList)}</div> */}
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
