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

export default function Aeditteacher(props) {
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  
  const [teacherName, setteacherName] = React.useState("");
  const [teacherNameState, setteacherNameState] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [registerEmailState, setregisterEmailState] = React.useState("");
  const [department, setdepartment] = React.useState("");
  const [departmentState, setdepartmentState] = React.useState("");
  const [employeeCode, setemployeeCode] = React.useState("");
  const [employeeCodeState, setemployeeCodeState] = React.useState("");
  const [simpleSelect, setSimpleSelect] = React.useState("");
  // const [loading, setLoading] = React.useState(true);
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
      axios.get(`/admin/editteacher?id=${props.match.params.id}`)
        .then(function (response) {
          console.log(response.data.designation)
          setteacherName(response.data.fullname)
          setteacherNameState("success")
          setEmail(response.data.email)
          setregisterEmailState("success")
          setdepartment(response.data.department)
          setdepartmentState("success")
          setemployeeCode(response.data.employeecode)
          setemployeeCodeState("success")
          setSimpleSelect(response.data.designation)
        })
        .catch(function (error) {
          cancelDetele("Server is not responding Please try again");
          props.history.push("/admin")
        })
    }
    getTeacher()
  },[classesA.button,classesA.success,props.match.params.id,props.history]);
    const hideAlert = () => {
    setAlert(null);
  };  
  // function that returns true if value is email, false otherwise
  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  const handleSimple = event => {
    setSimpleSelect(event.target.value);
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
        title="Data Update successfully !!!"
        onConfirm={() => {
          hideAlert()
          setBtnDisable(false)
          props.history.push("/admin/navteacher")
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
    if (teacherNameState !== "success" ) {
      setteacherNameState("error");
      cancelDetele("The Name field is incorrect or empity")
      return null;
    }
    if (registerEmailState !== "success") {
      setregisterEmailState("error");
      cancelDetele("The Email field is incorrect or empity")
      return null;
    }
    if (departmentState !== "success") {
      setdepartmentState("error");
      cancelDetele("The Department field is incorrect or empity")
      return null;
    }
    if (employeeCodeState !== "success") {
      setemployeeCodeState("error");
      cancelDetele("The Employee Code field is incorrect or empity")
      return null;
    }
    if (simpleSelect === "") {
      cancelDetele("The Designation field is empity")
      return null;
    }
    //first make request then alert true
    
    axios.post('/admin/editteacher',{
      _id:props.match.params.id,
      fullname: teacherName,
      email: Email,
      department: department,
      employeecode: employeeCode,
      designation: simpleSelect,
      password:props.match.params.password
    })
    .then(function (response) {
        if(response.data.success ===true){
          successAlert();              
        }
          // if(response.data.success ===false){
        //   cancelDetele("Teacher Alreadt exist");                
        // }
    })
    .catch(function (error) {
      if(error.response.data.success ===false){
        console.log(error.response.data.success)
        cancelDetele("Teacher Alreadt exist");                
      }
      else{
        cancelDetele("Server is not responding Or application Crash need to be lounch again");
      }
    })
   }
  
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
                Update Teacher
              </h4>
            </CardHeader>
            {alert}
            <CardBody>
              <form onSubmit={submitForm} >
                <GridContainer>
                  <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CustomInput
                      success={teacherNameState === "success"}
                      error={teacherNameState === "error"}
                      value={teacherName}
                      labelText="Teacher Name"
                      id="teacher-name"
                      formControlProps={{
                      fullWidth: true
                      }}
                      inputProps={{
                      onChange: event => {
                          if (verifyLength(event.target.value, 1)) {
                          setteacherNameState("success");
                          } else {
                          setteacherNameState("error");
                          }
                          setteacherName(event.target.value.toUpperCase());
                      },
                      type: "text",
                      autoComplete: "off"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      success={registerEmailState === "success"}
                      error={registerEmailState === "error"}
                      value={Email}
                      labelText="Email Address "
                      id="register-email"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: event => {
                          if (verifyEmail(event.target.value)) {
                            setregisterEmailState("success");
                          } else {
                            setregisterEmailState("error");
                          }
                          setEmail(event.target.value.toLowerCase());
                        },
                        type: "email"
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                  <CustomInput
                      success={departmentState === "success"}
                      error={departmentState === "error"}
                      value={department}
                      labelText="Department"
                      id="department"
                      formControlProps={{
                        fullWidth: true
                      }}                    
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 1)) {
                            setdepartmentState("success");
                          } else {
                            setdepartmentState("error");
                          }
                          setdepartment(event.target.value.toUpperCase());
                        },
                        type: "text",
                        autoComplete: "off"
                      }}
                    />
                  </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                  <CustomInput
                      success={employeeCodeState === "success"}
                      error={employeeCodeState === "error"}
                      value={employeeCode}
                      labelText="Employee Code"
                      id="employee-code"
                      formControlProps={{
                        fullWidth: true
                      }}                    
                      inputProps={{
                        onChange: event => {
                          if (verifyLength(event.target.value, 1)) {
                            setemployeeCodeState("success");
                          } else {
                            setemployeeCodeState("error");
                          }
                          setemployeeCode(event.target.value);
                        },
                        type: "text",
                        autoComplete: "off"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={4} md={4} lg={4}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="select-designation"
                        className={classes.selectLabel}
                      >
                        Select Designation
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={simpleSelect}
                        onChange={handleSimple}
                        inputProps={{
                          name: "select-designation",
                          id: "select-designation"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Select Designation
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="JONIR LECTURER"
                        >
                          Jonir Lecturer
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="LECTURER"
                        >
                          Lecturer
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="ASSISTENT LECTURER"
                        >
                          Assistent Lecturer
                        </MenuItem>
                      </Select>
                    </FormControl>
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
                            Update Teacher
                          </Button>
                          :
                          <Button 
                            type="submit"
                            color="primary"
                            id="submitbutton"
                            className={classes.updateProfileButton}
                          >
                            Update Teacher
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