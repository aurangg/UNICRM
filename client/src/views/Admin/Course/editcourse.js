import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

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
import {useEffect} from 'react';
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

export default function Aeditcourse(props) {
  console.log(props)
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  /*Redux code start*/
  // const dispatch = useDispatch();
  // const actionDataState = useSelector(state => state.user.data, []) || [];
  /*Redux code end*/
  const [courseCode, setCourseCode] = React.useState("");
  const [courseCodeState, setCourseCodeState] = React.useState("");

  const [courseName, setCourseName] = React.useState("");
  const [courseNameState, setCourseNameState] = React.useState("");
  
  const [courseDescription, setCourseDescription] = React.useState("");
  const [courseDescriptionState, setCourseDescriptionState] = React.useState("");
  
  const [courseLabSelect, setCourseLabSelect] = React.useState("");
  
  const [alert, setAlert] = React.useState(null);
  const [btndisable, setBtnDisable] = React.useState(false);
  
  useEffect(() => {
    const cancelDetele = (text) => {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => {
            hideAlert()
            setBtnDisable(false)
          }}
          onCancel={() => {
            hideAlert()
            setBtnDisable(false)
          }}
          confirmBtnCssClass={classesA.button + " " + classesA.success}
        >
          {text}
        </SweetAlert>
      );
    };
    const hideAlert = () => {
      setAlert(null);
    }; 
    function getTeacher() {
      axios.get(`/admin/editcourse?id=${props.match.params.id}`)
        .then(function (response) {
            setCourseCode(response.data.coursecode)
            setCourseCodeState("success")
            setCourseName(response.data.coursetitle)
            setCourseNameState("success")
            setCourseDescription(response.data.description)
            setCourseDescriptionState("success")
            setCourseLabSelect(response.data.labstatus)
        })
        .catch(function (error) {
          cancelDetele("Server is not responding Please try again");
          props.history.push("/admin")
        })
    }
    getTeacher()
  },[classesA.button,classesA.success,props.match.params.id,props.history]);
//     useEffect(() => {
//     setAlert(null);
//     resetvalues()
//     props.history.push("/admin/addteacher")
// },[count]);

//   useEffect(() => {

//     console.log(actionDataState.success)
//     if(actionDataState.success===false )
//     {
//       console.log(actionDataState.success)
//       cancelDetele("Duplicate DATA or server is not responding")
//     }
//   },[actionDataState.success,cancelDetele]);
//   useEffect(() => {
//     console.log()
//     console.log(actionDataState.success)
//     if(actionDataState.success === true  ){
//       console.log(actionDataState.success)
//       resetvalues()
//       successAlert()
//     }
//     // Specify how to clean up after this effect:
//       return ()=> {
//         // to stop the warning of calling setState of unmounted component
//         console.log(1)
//         hideAlert()
//       };
//   },[actionDataState.success,count,successAlert]);
  const hideAlert = () => {
    setAlert(null);
  };
  // const onclickcheckingdata=(status)=>{
  //   if(status===false){
  //     cancelDetele("Duplicate DATA or server is not responding")
  //   }
  // }
  
  // function that returns true if value is email, false otherwise
  const handleSimple = event => {
    setCourseLabSelect(event.target.value);
  };
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  
  const cancelDetele = (text) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        onCancel={() => {
          hideAlert()
          setBtnDisable(false)
        }}
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
          resetvalues();
          setBtnDisable(false)
          props.history.push("/admin/navcourse") 
        }}
        onCancel={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
      </SweetAlert>
    );
  };
  const submitForm = (e) => {
    e.preventDefault();
    setBtnDisable(true)
    if (courseCodeState !== "success" ) {
      setCourseCodeState("error");
      cancelDetele("The Course Code field is incorrect or empity")
      return null;
    }
    if (courseNameState !== "success") {
      setCourseNameState("error");
      cancelDetele("The Course Name field is incorrect or empity")
      return null;
    }
    if (courseDescriptionState !== "success") {
      setCourseDescriptionState("error");
      cancelDetele("The Description field is incorrect or empity")
      return null;
    }
    if (courseLabSelect === "") {
      cancelDetele("The Lab status field is empity")
      return null;
    }
    //first make request then alert true
    
    axios.post('/admin/editcourse', {
      _id:props.match.params.id,
      coursecode: courseCode,
      coursetitle: courseName,
      description: courseDescription,
      labstatus: courseLabSelect
    })
    .then(function (response) {
      console.log(response.data)
        if(response.data.success ===true){
          // console.log(response.data.success)
          successAlert();               
        }
    })
    .catch(function (error) {
      console.log((error.response.data))
      if(error.response.data.success ===false){
        // console.log(response.data.success)
        cancelDetele("Course Code already Exist");                
      }
      else{
        cancelDetele("Server is not responding Or application Crash need to be lounch again");
      }
    })
   }
  const resetvalues=()=>{  
    setCourseCode("")
    setCourseCodeState("")
    setCourseName("")
    setCourseNameState("")
    setCourseDescription("")
    setCourseDescriptionState("")
    setCourseLabSelect("")
  }

// CLEAR THE SCREEN

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
                Update Course
              </h4>
            </CardHeader>
            {alert}
            <CardBody>
              <form onSubmit={submitForm} >
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CustomInput
                      success={courseCodeState === "success"}
                      error={courseCodeState === "error"}
                      value={courseCode}
                      labelText="Course Code"
                      id="course-code"
                      formControlProps={{
                      fullWidth: true
                      }}
                      inputProps={{
                      onChange: event => {
                          if (verifyLength(event.target.value, 1)) {
                            setCourseCodeState("success");
                          } else {
                            setCourseCodeState("error");
                          }
                          setCourseCode(event.target.value);
                      },
                      type: "text",
                      autoComplete: "off"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CustomInput
                      success={courseNameState === "success"}
                      error={courseNameState === "error"}
                      value={courseName}
                      labelText="Course Name"
                      id="course-name"
                      formControlProps={{
                      fullWidth: true
                      }}
                      inputProps={{
                      onChange: event => {
                          if (verifyLength(event.target.value, 1)) {
                            setCourseNameState("success");
                          } else {
                            setCourseNameState("error");
                          }
                          setCourseName(event.target.value.toUpperCase());
                      },
                      type: "text",
                      autoComplete: "off"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="lab-status"
                        className={classes.selectLabel}
                      >
                        Lab Status
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={courseLabSelect}
                        onChange={handleSimple}
                        inputProps={{
                          name: "lab-status",
                          id: "lab-status"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Lab Status
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="lecture only"
                        >
                          Lecture only
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="lecture and lab"
                        >
                          lecture and Lab
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12} lg={12}>
                    <CustomInput
                      success={courseDescriptionState === "success"}
                      error={courseDescriptionState === "error"}
                      value={courseDescription}
                      labelText="Description"
                      id="description"
                      formControlProps={{
                        fullWidth: true
                      }}                    
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 1)) {
                            setCourseDescriptionState("success");
                          } else {
                            setCourseDescriptionState("error");
                          }
                          setCourseDescription(event.target.value);
                        },
                        multiline: true,
                        rows: 5
                      }}
                    />
                  </GridItem>
                </GridContainer>
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
                            Update Course
                          </Button>
                          :
                          <Button 
                            type="submit"
                            color="primary"
                            id="submitbutton"
                            className={classes.updateProfileButton}
                          >
                            Update Course
                          </Button>
                        }
                    </CardBody>
                </GridItem>
              </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
