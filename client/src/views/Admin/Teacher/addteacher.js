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
// import {useEffect} from 'react';
// import { addTeacher } from './../../../actions';
import PASSWORD from './teacherdefaultpassword';
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

export default function Aaddteacher() {
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  /*Redux code start*/
  // const dispatch = useDispatch();
  // const actionDataState = useSelector(state => state.user.data, []) || [];
  /*Redux code end*/
  const [teacherName, setteacherName] = React.useState("");
  const [teacherNameState, setteacherNameState] = React.useState("");
  const [Email, setEmail] = React.useState("");
  const [registerEmailState, setregisterEmailState] = React.useState("");
  const [department, setdepartment] = React.useState("");
  const [departmentState, setdepartmentState] = React.useState("");
  const [employeeCode, setemployeeCode] = React.useState("");
  const [employeeCodeState, setemployeeCodeState] = React.useState("");
  const [simpleSelect, setSimpleSelect] = React.useState("");
  
  const [alert, setAlert] = React.useState(null);
  const [btndisable, setBtnDisable] = React.useState(false);

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
        title="Form Submitted !!!"
        onConfirm={() => {
          hideAlert()
          setBtnDisable(false)
          resetvalues();

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
    // setEmail(Email.toLowerCase())
    //first make request then alert true    
    axios.post('/admin/addteacher', {
      fullname: teacherName,
      email: Email,
      department: department,
      employeecode: employeeCode,
      designation: simpleSelect,
      password: PASSWORD
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
        cancelDetele("Teacher Alreadt exist");                
      }
      else{
        cancelDetele("Server is not responding Or application Crash need to be lounch again");
      }
    })
    // dispatch( addTeacher({
    //   fullname: teacherName,
    //   email: Email,
    //   department: department,
    //   employeecode: employeeCode,
    //   designation: simpleSelect,
    //   password: PASSWORD
    // }))
   }
  const resetvalues=()=>{  
    setteacherName("")
    setteacherNameState("")
    setEmail("")
    setregisterEmailState("")
    setdepartment("")
    setdepartmentState("")
    setemployeeCode("")
    setemployeeCodeState("")
    setSimpleSelect("")
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
                Add Teacher
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
                  <GridItem xs={12} sm={6} md={6} lg={6}>
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
                            Add Teacher
                          </Button>
                          :
                          <Button 
                            type="submit"
                            color="primary"
                            id="submitbutton"
                            className={classes.updateProfileButton}
                          >
                           Add Teacher
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





// /*eslint-disable*/
// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // material ui icons
// import MailOutline from "@material-ui/icons/MailOutline";

// // core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardHeader from "components/Card/CardHeader.js";
// import CardText from "components/Card/CardText.js";
// import CardIcon from "components/Card/CardIcon.js";
// import CardBody from "components/Card/CardBody.js";
// import CardFooter from "components/Card/CardFooter.js";
// import InputLabel from "@material-ui/core/InputLabel";
// import SweetAlert from "react-bootstrap-sweetalert";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// // style for this view
// import styles from "assets/jss/material-dashboard-pro-react/views/validationFormsStyle.js";
// import stylesS from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
// import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
// const useStyles = makeStyles(styles);
// const useStylesS = makeStyles(stylesS);
// const useStylesA = makeStyles(stylesAlert);

// /*Redux code start*/
// import { useDispatch ,useSelector,shallowEqual } from "react-redux";
// import {useEffect} from 'react';
// import { addTeacher } from './../../../actions';
// import PASSWORD from './teacherdefaultpassword';



// const actions = {
//   nameChanged: 'NAME_CHANGED',
//   emailChanged: 'EMAIL_CHANGED',
//   formSubmitted: 'FORM_SUBMITTED',
// }

// const initialState = {
//   fullname: '',
//   email: '',
//   department:"",
//   employeecode:"",
//   designation:"",
//   password:"uol@123",
//   role:"teacher",
//   nameError: null,
//   emailError: null,
//   departmentError:null,
//   employeecodeError:null,
//   designationError:null,
//   submitAttempted: false,
//   submitMessage: '',
//   status: 'clean',
// }

// function formReducer(state, action) {
//   let error
//   switch (state.status) {
//     case 'dirty':
//       switch (action.type) {
//         case actions.formSubmitted:
//           let formValid = true
//           let nameError = validate('fullname', state.fullname)
//           let emailError = validate('email', state.email)
//           if (nameError || !state.fullname || emailError || !state.email) {
//             formValid = false
//           }
//           return {
//             ...state,
//             nameError,
//             emailError,
//             submitAttempted: true,
//             status: formValid ? 'completed' : 'dirty',
//             submitMessage: formValid
//               ? 'Form Submitted Successfully'
//               : 'Form Has Errors',
//           }
//       }
//     // no 'break' or 'return', case 'dirty' continues!
//     case 'clean':
//       switch (action.type) {
//         case actions.nameChanged:
//           error = validate('fullname', action.payload)
//           return {
//             ...state,
//             fullname: action.payload,
//             nameError: error,
//             submitMessage: '',
//             status: 'dirty',
//           }
//         case actions.emailChanged:
//           error = validate('email', action.payload)
//           return {
//             ...state,
//             email: action.payload,
//             emailError: error,
//             submitMessage: '',
//             status: 'dirty',
//           }
//         case actions.formSubmitted:
//           return {
//             ...state,
//             submitMessage: 'Please fill out the form',
//           }
//         default:
//           return state
//       }
//     case 'completed':
//     // no 'break' or 'return', case 'completed' continues!
//     default:
//       return state
//   }
// }

// function validate(name, value) {
//   if (typeof value === 'string') value = value.trim()
//   switch (name) {
//     case 'name':
//       if (value.length === 0) {
//         return 'Must enter name'
//       } else if (value.split(' ').length < 2) {
//         return 'Must enter first and last name'
//       } else {
//         return null
//       }
//       break
//     case 'email':
//       if (value.length === 0) {
//         return 'Must enter email'
//       } else if (
//         !value.includes('@') ||
//         !value.includes('.') ||
//         value.split('.')[1].length < 2
//       ) {
//         return 'Must enter valid email'
//       } else {
//         return null
//       }
//       break
//   }
// }
// export default function Aaddteacher(props) {
//   const classes = useStyles();
//   const classesS = useStylesS();
//   const classesA = useStylesA();
//   const [state, dispatch] = React.useReducer(formReducer, initialState)

//   function handleChange({ target: { name, value } }) {
//     dispatch({ type: actions[name + 'Changed'], payload: value })
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     dispatch({ type: actions.formSubmitted })
//   }

//   const columnStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//   }
  
//   const [teacherName, setteacherName] = React.useState("");
//   const [teacherNameState, setteacherNameState] = React.useState("");
//   const [Email, setEmail] = React.useState("");
//   const [registerEmailState, setregisterEmailState] = React.useState("");
//   const [department, setdepartment] = React.useState("");
//   const [departmentState, setdepartmentState] = React.useState("");
//   const [employeeCode, setemployeeCode] = React.useState("");
//   const [employeeCodeState, setemployeeCodeState] = React.useState("");
//   const [simpleSelect, setSimpleSelect] = React.useState("");
//   const [count,setcount] = React.useState(0);
//   const [alert, setAlert] = React.useState(null);
// // https://leewarrick.com/blog/a-guide-to-usestate-and-usereducer/

// //   useEffect(() => {
// //     setAlert(null);
// //     // resetvalues()
// // }, [count]);

//   // function that returns true if value is email, false otherwise
//   const verifyEmail = value => {
//     var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     if (emailRex.test(value)) {
//       return true;
//     }
//     return false;
//   };
//   // function that verifies if a string has a given length or not
//   const verifyLength = (value, length) => {
//     if (value.length >= length) {
//       return true;
//     }
//     return false;
//   };
//   // verifies if value is a valid URL
//   const verifyUrl = value => {
//     try {
//       new URL(value);
//       return true;
//     } catch (_) {
//       return false;
//     }
//   };
//   const handleSimple = event => {
//     setSimpleSelect(event.target.value);
//   };
//   const cancelDetele = (text) => {
//     setAlert(
//       <SweetAlert
//         danger
//         style={{ display: "block", marginTop: "-100px" }}
//         title="Cancelled"
//         onConfirm={() => hideAlert()}
//         onCancel={() => hideAlert()}
//         confirmBtnCssClass={classesA.button + " " + classesA.success}
//       >
//         {text}
//       </SweetAlert>
//     );
//   };
//   const hideAlert = () => {
//     setAlert(null);
//   };
//   const submitForm = (e) => {
//     e.preventDefault();
//     if (teacherNameState !== "success" ) {
//       setteacherNameState("error");
//       cancelDetele("The Name field is incorrect or empity")
//       return null;
//     }
//     if (registerEmailState !== "success") {
//       setregisterEmailState("error");
//       cancelDetele("The Email field is incorrect or empity")
//       return null;
//     }
//     if (departmentState !== "success") {
//       setdepartmentState("error");
//       cancelDetele("The Department field is incorrect or empity")
//       return null;
//     }
//     if (employeeCodeState !== "success") {
//       setemployeeCodeState("error");
//       cancelDetele("The Employee Code field is incorrect or empity")
//       return null;
//     }
//     if (simpleSelect === "") {
//       cancelDetele("The Designation field is empity")
//       return null;
//     }
//     // first make request then alert true
//     dispatch( addTeacher({
//       fullname: teacherName,
//       email: Email,
//       department: department,
//       employeecode: employeeCode,
//       designation: simpleSelect,
//       password: PASSWORD
//     }))
//     setcount(count +1)
//   }
  
  
//   return (
//     <GridContainer>
//       {console.log(1)}
//       <GridItem xs={12} sm={12} md={12}>
//         <Card>
//           <CardHeader color="primary" icon>
//             <CardIcon color="primary">
//               <MailOutline />
//             </CardIcon>
//             <h4 className={classes.cardIconTitle}>Add Teacher</h4>
//           </CardHeader>
//           {alert}
//           <CardBody>
//             <form onSubmit={submitForm}>
//               <GridContainer>
//                   <GridItem xs={12} sm={6} md={6} lg={6}>
//                     <CustomInput
//                       success={teacherNameState === "success"}
//                       error={teacherNameState === "error"}
//                       onChange={handleChange}
//                       name="name"
//                       value={state.name}
//                       labelText="Teacher Name"
//                       id="teacher-name"
//                       formControlProps={{
//                       fullWidth: true
//                       }}
//                       inputProps={{
//                       // onChange: event => {
//                       //     if (verifyLength(event.target.value, 1)) {
//                       //     setteacherNameState("success");
//                       //     } else {
//                       //     setteacherNameState("error");
//                       //     }
//                       //     setteacherName(event.target.value);
//                       // },
//                       type: "text",
//                       autoComplete: "off"
//                       }}
//                     />
//                   </GridItem>
//                   <GridItem xs={12} sm={12} md={6}>
//                     <CustomInput
//                       success={registerEmailState === "success"}
//                       error={registerEmailState === "error"}
//                       value={Email}
//                       labelText="Email Address "
//                       id="register-email"
//                       formControlProps={{
//                         fullWidth: true
//                       }}
//                       inputProps={{
//                         onChange: event => {
//                           if (verifyEmail(event.target.value)) {
//                             setregisterEmailState("success");
//                           } else {
//                             setregisterEmailState("error");
//                           }
//                           setEmail(event.target.value);
//                         },
//                         type: "email"
//                       }}
//                     />
//                   </GridItem>
//                 </GridContainer>
//                 <GridContainer>
//                 <GridItem xs={12} sm={4} md={4} lg={4}>
//                   <CustomInput
//                       success={departmentState === "success"}
//                       error={departmentState === "error"}
//                       value={department}
//                       labelText="Department"
//                       id="department"
//                       formControlProps={{
//                         fullWidth: true
//                       }}                    
//                       inputProps={{
//                         onChange: event => {
//                           if (verifyLength(event.target.value, 1)) {
//                             setdepartmentState("success");
//                           } else {
//                             setdepartmentState("error");
//                           }
//                           setdepartment(event.target.value);
//                         },
//                         type: "text",
//                         autoComplete: "off"
//                       }}
//                     />
//                   </GridItem>
//                 <GridItem xs={12} sm={4} md={4} lg={4}>
//                   <CustomInput
//                       success={employeeCodeState === "success"}
//                       error={employeeCodeState === "error"}
//                       value={employeeCode}
//                       labelText="Employee Code"
//                       id="employee-code"
//                       formControlProps={{
//                         fullWidth: true
//                       }}                    
//                       inputProps={{
//                         onChange: event => {
//                           if (verifyLength(event.target.value, 1)) {
//                             setemployeeCodeState("success");
//                           } else {
//                             setemployeeCodeState("error");
//                           }
//                           setemployeeCode(event.target.value);
//                         },
//                         type: "text",
//                         autoComplete: "off"
//                       }}
//                     />
//                   </GridItem>
//                   <GridItem xs={12} sm={4} md={4} lg={4}>
//                     <FormControl
//                       fullWidth
//                       className={classesS.selectFormControl}
//                     >
//                       <InputLabel
//                         htmlFor="select-designation"
//                         className={classesS.selectLabel}
//                       >
//                         Select Designation
//                       </InputLabel>
//                       <Select
//                         MenuProps={{
//                           className: classesS.selectMenu
//                         }}
//                         classes={{
//                           select: classesS.select
//                         }}
//                         value={simpleSelect}
//                         onChange={handleSimple}
//                         inputProps={{
//                           name: "select-designation",
//                           id: "select-designation"
//                         }}
//                       >
//                         <MenuItem
//                           disabled
//                           classes={{
//                             root: classesS.selectMenuItem
//                           }}
//                         >
//                           Select Designation
//                         </MenuItem>
//                         <MenuItem
//                           classes={{
//                             root: classesS.selectMenuItem,
//                             selected: classesS.selectMenuItemSelected
//                           }}
//                           value="Jonir Lecturer"
//                         >
//                           Jonir Lecturer
//                         </MenuItem>
//                         <MenuItem
//                           classes={{
//                             root: classesS.selectMenuItem,
//                             selected: classesS.selectMenuItemSelected
//                           }}
//                           value="Lecturer"
//                         >
//                           Lecturer
//                         </MenuItem>
//                         <MenuItem
//                           classes={{
//                             root: classesS.selectMenuItem,
//                             selected: classesS.selectMenuItemSelected
//                           }}
//                           value="Assistent Lecturer"
//                         >
//                           Assistent Lecturer
//                         </MenuItem>
//                       </Select>
//                       </FormControl>
//                   </GridItem>
//                 </GridContainer>
//                 <GridContainer justify="center">
//                 <GridItem xs={12} sm={12} md={6}>
//                     <CardBody style={{ textAlign: "center" }}>
//                       <Button 
//                         type="submit"
//                         color="primary" 
//                         className={classes.updateProfileButton}
//                       >
//                         Add Teacher
//                       </Button>
//                     </CardBody>
//                 </GridItem>
//               </GridContainer>
//             </form>
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }
// import axios from 'axios'
// import React from "react"
// import Axios from "axios"
// const actions = {
//   nameChanged: 'NAME_CHANGED',
//   emailChanged: 'EMAIL_CHANGED',
//   formSubmitted: 'FORM_SUBMITTED',
// }

// const initialState = {
//   name: '',
//   email: '',
//   department:'',
//   employeecode:'',
//   designation:'',
//   nameError: null,
//   emailError: null,
//   departmentError:null,
//   employeecodeError:null,
//   designationError:null,
//   submitAttempted: false,
//   submitMessage: '',
//   status: 'clean'
// }

// function formReducer(state, action) {
//   let error
//   switch (state.status) {
//     case 'dirty':
//       switch (action.type) {
//         case actions.formSubmitted:
//           let formValid = true
//           let nameError = validate('name', state.name)
//           let emailError = validate('email', state.email)
//           if (nameError || !state.name || emailError || !state.email) {
//             formValid = false
//           }
//           console.log(state)
//           const prevN = state.name
//           const prevE = state.email
//           if (formValid){
//             const request = axios.post(`/admin/addteacher`,
//             {
//               fullname:prevN,
//               email:prevE,
//               department:"CS",
//               employeecode:"CS-E-11fgd12sa3add3a21",
//               designation:"lecturer",
//               password:"UOL@123"
//             })
//             .then(response =>response.data)
//             const success = "success"
//             console.log(request[0])
//             // .then(response =>{response.data})
//             return{
//               request,
//               name: '',
//               email: '',
//               nameError: null,
//               emailError: null,
//               submitAttempted: true,
//               submitMessage: 'Form Submitted Successfully',
//               status: 'clean'
//             }
//           }else
//           return {
//             ...state,
//             nameError,
//             emailError,
//             submitAttempted: true,
//             status: formValid ? 'completed' : 'dirty',
//             submitMessage: formValid
//               ? 'Form Submitted Successfully'
//               : 'Form Has Errors',
//           }
//       }
//     // no 'break' or 'return', case 'dirty' continues!
//     case 'clean':
//       switch (action.type) {
//         case actions.nameChanged:
//           error = validate('name', action.payload)
//           return {
//             ...state,
//             name: action.payload,
//             nameError: error,
//             submitMessage: '',
//             status: 'dirty',
//           }
//         case actions.emailChanged:
//           error = validate('email', action.payload)
//           return {
//             ...state,
//             email: action.payload,
//             emailError: error,
//             submitMessage: '',
//             status: 'dirty',
//           }
//         case actions.formSubmitted:
//           return {
//             ...state,
//             submitMessage: 'Please fill out the form',
//           }
//         default:
//           return state
//       }
//     case 'completed':
//         // return{
//         //   name: '',
//         //   email: '',
//         //   nameError: null,
//         //   emailError: null,
//         //   submitAttempted: true,
//         //   submitMessage: 'Form Submitted Successfully',
//         //   status: 'clean'
//         // }
//     // no 'break' or 'return', case 'completed' continues!
//     default:
//       return state
//   }
// }

// function validate(name, value) {
//   if (typeof value === 'string') value = value.trim()
//   switch (name) {
//     case 'name':
//       if (value.length === 0) {
//         return 'Must enter name'
//       } else if (value.split(' ').length < 2) {
//         return 'Must enter first and last name'
//       } else {
//         return null
//       }
//       break
//     case 'email':
//       if (value.length === 0) {
//         return 'Must enter email'
//       } else if (
//         !value.includes('@') ||
//         !value.includes('.') ||
//         value.split('.')[1].length < 2
//       ) {
//         return 'Must enter valid email'
//       } else {
//         return null
//       }
//       break
//   }
// }

// export default function FormExample() {
//   const [state, dispatch] = React.useReducer(formReducer, initialState)

//   function handleChange({ target: { name, value } }) {
//     dispatch({ type: actions[name + 'Changed'], payload: value })
//   }

//   function handleSubmit(e) {
//     e.preventDefault()
//     dispatch({ type: actions.formSubmitted })
//   }

//   const columnStyle = {
//     display: 'flex',
//     flexDirection: 'column',
//   }
//   const inputStyle = hasError => {
//     return {
//       outline: hasError && state.submitAttempted ? '2px solid red' : 'none',
//     }
//   }
//   return (
//     <form style={{ ...columnStyle, width: '300px' }} onSubmit={handleSubmit}>
//       <label style={columnStyle}>
//         <span>Name:</span>
//         <input
//           style={inputStyle(state.nameError)}
//           onChange={handleChange}
//           name="name"
//           value={state.name}
//           type="text"
//         />
//         <span>{state.submitAttempted && state.nameError}</span>
//       </label>
//       <label style={columnStyle}>
//         <span>email:</span>
//         <input
//           style={inputStyle(state.emailError)}
//           onChange={handleChange}
//           name="email"
//           value={state.email}
//           type="text"
//         />
//         <span>{state.submitAttempted && state.emailError}</span>
//       </label>
//       <label style={columnStyle}>
//         <span>Department:</span>
//         <input
//           style={inputStyle(state.departmentError)}
//           onChange={handleChange}
//           name="department"
//           value={state.department}
//           type="text"
//         />
//         <span>{state.submitAttempted && state.departmentError}</span>
//       </label>
//       <label style={columnStyle}>
//         <span>Employee code:</span>
//         <input
//           style={inputStyle(state.employeecodeError)}
//           onChange={handleChange}
//           name="employeecode"
//           value={state.employeecode}
//           type="text"
//         />
//         <span>{state.submitAttempted && state.employeecodeError}</span>
//       </label>
//       <label style={columnStyle}>
//         <span>Designation:</span>
//         <input
//           style={inputStyle(state.designationError)}
//           onChange={handleChange}
//           name="name"
//           value={state.designation}
//           type="text"
//         />
//         <span>{state.submitAttempted && state.nameError}</span>
//       </label>
//       <p>{state.submitMessage}</p>
//       <button type="submit">Submit</button>
//       <pre>{JSON.stringify(state, null, 2)}</pre>
//     </form>
//   )
// }
