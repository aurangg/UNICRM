// import React from "react";
// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons
// import Add from "@material-ui/icons/Add";
// // import Edit from "@material-ui/icons/Edit";
// import Assignment from "@material-ui/icons/Assignment";
// import Close from "@material-ui/icons/Close";
// // core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardIcon from "components/Card/CardIcon.js";
// import CardHeader from "components/Card/CardHeader.js";
// // import Table from "components/Table/Table.js";
// import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
// import Select from "@material-ui/core/Select";
// import MenuItem from "@material-ui/core/MenuItem";
// import FormControl from "@material-ui/core/FormControl";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";

// // import InputAdornment from "@material-ui/core/InputAdornment"
// /*custom code start*/
// import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
// import { useDispatch } from "react-redux";
// import axios from 'axios';
// /*custom code end*/

// const stylesC = {
//   cardIconTitle: {
//     ...cardTitle,
//     marginTop: "15px",
//     marginBottom: "0px"
//   }
// };
// const usestylesC= makeStyles(stylesC)
// const useStyles = makeStyles(styles);

// const Aaddcourse=()=> {
//   const dispatch = useDispatch();
//   const [checkedA, setCheckedA] = React.useState(false);
//   const [inputList, setInputList] = React.useState([{ section: "", teacher: "", labteacher: "" }]);
//   const [simpleSelect, setSimpleSelect] = React.useState("");
//   const [courseCode, setcourseCode] = React.useState("");
//   const [courseCodeState, setcourseCodeState] = React.useState("");
//   const [courseName, setcourseName] = React.useState("");
//   const [courseNameState, setcourseNameState] = React.useState("");
//   const classes = useStyles();
//   const classesC = usestylesC();
//     const handleSimple = event => {
//     setSimpleSelect(event.target.value);
//   };
//   const verifyLength = (value, length) => {
//     if (value.length >= length) {
//       return true;
//     }
//     return false;
//   };
  
//  // handle input change
//  const handleInputChange = (e, index) => {
//   const list = [...inputList];
//   const { name, value } = e.target;
//   list[index][name] = value;
//   setInputList(list);
// };
// // handle click event of the Remove button
// const handleRemoveClick = index => {
//   const list = [...inputList];
//   list.splice(index, 1);
//   setInputList(list);
// };
// // handle click event of the Add button
// const handleAddClick = () => {
//   setInputList([...inputList, { section: "", teacher: "", labteacher: ""  }]);
// };
// const handleswitchChange = (e) => {
//   setCheckedA(e.target.checked)
//   for(let i =0;i<inputList.length;i++){
//     inputList[i]['labteacher'] ='';
//   }
//   console.log(inputList[0]['labteacher'])
//   console.log(inputList)
// };

// function addCourse(course) {
//   return dispatch => {
//     console.log(course)
//     axios.post(`/admin/addcourse`,course)
//     .then(response =>
//       response.data
//     )
//     .catch(err=>{
//       console.log(err)
//     })
//   };
// }
// const submitForm = (e) => {
//   e.preventDefault();
//   if (courseCodeState === "") {
//     setcourseCodeState("error");
//   }
//   if (courseNameState === "") {
//       setcourseNameState("error");
//   }
//   dispatch(addCourse({
//     coursecode: courseCode,
//     coursename: courseName,
//     mentor: simpleSelect,
//     teacher: simpleSelect,
//     sections: 3
//   }))
// };
//   return (
//     <GridContainer>
//       <GridItem xs={12}>
//         <Card>
//           <CardHeader color="primary" icon>
//             <CardIcon color="primary">
//               <Assignment />
//             </CardIcon>
//             <h4 className={classesC.cardIconTitle}>Add Course</h4>
//           </CardHeader>
//           <CardBody>
//             <form onSubmit={submitForm} >
//             <GridContainer>
//             {console.log(1)} 
//                 <GridItem xs={12} sm={6} md={6} lg={6}>
//                 <CustomInput
//                     success={courseCodeState === "success"}
//                     error={courseCodeState === "error"}
//                     value={courseCode}
//                     labelText="Course Code"
//                     id="course-code"
//                     formControlProps={{
//                     fullWidth: true
//                     }}                    
//                     inputProps={{
//                     onChange: event => {
//                         if (verifyLength(event.target.value, 1)) {
//                         setcourseCodeState("success");
//                         } else {
//                         setcourseCodeState("error");
//                         }
//                         setcourseCode(event.target.value);
//                     },
//                     type: "text",
//                     autoComplete: "off"
//                     }}
//                 />
//                 </GridItem>
//                 <GridItem xs={12} sm={6} md={6} lg={6}>
//                 <CustomInput
//                     success={courseNameState === "success"}
//                     error={courseNameState === "error"}
//                     value={courseName}
//                     labelText="Course Name"
//                     id="course-Name"
//                     formControlProps={{
//                     fullWidth: true
//                     }}
//                     inputProps={{
//                     onChange: event => {
//                         if (verifyLength(event.target.value, 1)) {
//                         setcourseNameState("success");
//                         } else {
//                         setcourseNameState("error");
//                         }
//                         setcourseName(event.target.value);
//                     },
//                     type: "text",
//                     autoComplete: "off"
//                     }}
//                 />
//                 </GridItem>
//             </GridContainer>
//             <GridContainer>
//             <GridItem xs={12} sm={6} md={6} lg={6}>
//                     <FormControl
//                         fullWidth
//                         className={classes.selectFormControl}
//                     >
//                         <InputLabel
//                           htmlFor="select-mentor"
//                           className={classes.selectLabel}
//                         >
//                           Choose Mentor
//                         </InputLabel>
//                         <Select
//                           MenuProps={{
//                             className: classes.selectMenu
//                           }}
//                           classes={{
//                             select: classes.select
//                           }}
//                           value={simpleSelect}
//                           onChange={handleSimple}
//                           inputProps={{
//                             name: "select-mentor",
//                             id: "select-mentor"
//                           }}
//                         >
//                           <MenuItem
//                             disabled
//                             classes={{
//                               root: classes.selectMenuItem
//                             }}
//                           >
//                             Choose Mentor
//                           </MenuItem>
//                           <MenuItem
//                             classes={{
//                               root: classes.selectMenuItem,
//                               selected: classes.selectMenuItemSelected
//                             }}
//                             value="2"
//                           >
//                             Paris
//                           </MenuItem>
//                           <MenuItem
//                             classes={{
//                               root: classes.selectMenuItem,
//                               selected: classes.selectMenuItemSelected
//                             }}
//                             value="3"
//                           >
//                             Bucharest
//                           </MenuItem>
//                           <MenuItem
//                             classes={{
//                               root: classes.selectMenuItem,
//                               selected: classes.selectMenuItemSelected
//                             }}
//                             value="4"
//                           >
//                             Rome
//                           </MenuItem>
//                           <MenuItem
//                             classes={{
//                               root: classes.selectMenuItem,
//                               selected: classes.selectMenuItemSelected
//                             }}
//                             value="5"
//                           >
//                             New York
//                           </MenuItem>
//                         </Select>
//                     </FormControl>
//                 </GridItem>
//             </GridContainer>
//             <GridContainer>
//               <GridItem xs={12} sm={12} md={6}>
//                   <legend>Course Lab</legend>
//                   <div className={classes.block}>
//                     <FormControlLabel
//                       control={
//                         <Switch
//                           checked={checkedA}
//                           onChange={e => handleswitchChange(e)}
//                           // onChange={event => setCheckedA(event.target.checked)}
//                           value="checkedA"
//                           classes={{
//                             switchBase: classes.switchBase,
//                             checked: classes.switchChecked,
//                             thumb: classes.switchIcon,
//                             track: classes.switchBar
//                           }}
//                         />
//                       }
//                       classes={{
//                         label: classes.label
//                       }}
//                       label=""
//                     />
//                   </div>
//                 </GridItem>
//               </GridContainer>
    // {inputList.map((x, i) => {
    //   return (
    //     <div key ={i}>
    //     <GridContainer >
    //       <GridItem xs={12} sm={3} md={3} lg={3}>
    //         <CustomInput
    //                 value={x.section}
    //                 labelText="Section Name"
    //                 name="section"
    //                 onChange={e => handleInputChange(e, i)}
    //                 id={`section-name-${i}`}
    //                 formControlProps={{
    //                 fullWidth: true
    //               }}
    //                 inputProps={{
    //                 type: "text",
    //                 autoComplete: "off"
    //                 }}
    //             />
    //         </GridItem>
    //         <GridItem xs={12} sm={3} md={3} lg={3}>
    //                 <FormControl
    //                     fullWidth
    //                     className={classes.selectFormControl}
    //                 >
    //                     <InputLabel
    //                       htmlFor="select-teacher"
    //                       className={classes.selectLabel}
    //                     >
    //                       Choose Teacher
    //                     </InputLabel>
    //                     <Select
    //                       MenuProps={{
    //                         className: classes.selectMenu
    //                       }}
    //                       classes={{
    //                         select: classes.select
    //                       }}
    //                       value={x.teacher}
    //                       onChange={e => handleInputChange(e, i)}
    //                       inputProps={{
    //                         name: "teacher",
    //                         id: "select-teacher"
    //                       }}
    //                     >
    //                       <MenuItem
    //                         disabled
    //                         classes={{
    //                           root: classes.selectMenuItem
    //                         }}
    //                       >
    //                         Choose Teacher
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="Paris"
    //                       >
    //                         Paris
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="Bucharest"
    //                       >
    //                         Bucharest
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="Rome"
    //                       >
    //                         Rome
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="New York"
    //                       >
    //                         New York
    //                       </MenuItem>
    //                     </Select>
    //                 </FormControl>
    //             </GridItem>
    //             {checkedA &&
    //         <GridItem xs={12} sm={3} md={3} lg={3}>
    //                 <FormControl
    //                     fullWidth
    //                     className={classes.selectFormControl}
    //                 >
    //                     <InputLabel
    //                       htmlFor="select-lab-teacher"
    //                       className={classes.selectLabel}
    //                     >
    //                       Choose Lab Teacher
    //                     </InputLabel>
    //                     <Select
    //                       MenuProps={{
    //                         className: classes.selectMenu
    //                       }}
    //                       classes={{
    //                         select: classes.select
    //                       }}
    //                       value={x.labteacher}
    //                       // onChange={handleSimple}
    //                       // value={x.lastName}
    //                       onChange={e => handleInputChange(e, i)}
    //                       // onChange={function(event, i){
                            
    //                       //   const  { name , value } = event.target;
    //                       //   console.log(value)
    //                       //   x.teacher = event.target.value;
  
    //                       //   const list = [...inputList];
    //                       //   console.log(  list[i][name]=name )
    //                       //   // list[i][name] = name ;
    //                       //   setInputList(list);
    //                       // }}
    //                       inputProps={{
    //                         name: "labteacher",
    //                         id: "select-lab-teacher"
    //                       }}
    //                     >
    //                       <MenuItem
    //                         disabled
    //                         classes={{
    //                           root: classes.selectMenuItem
    //                         }}
    //                       >
    //                         Choose Teacher
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="Paris"
    //                       >
    //                         Paris
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="Bucharest"
    //                       >
    //                         Bucharest
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="Rome"
    //                       >
    //                         Rome
    //                       </MenuItem>
    //                       <MenuItem
    //                         classes={{
    //                           root: classes.selectMenuItem,
    //                           selected: classes.selectMenuItemSelected
    //                         }}
    //                         value="New York"
    //                       >
    //                         New York
    //                       </MenuItem>
    //                     </Select>
    //                 </FormControl>
    //             </GridItem>
    //           }
    //         <GridItem xs={12} sm={1} md={1} lg={1}>
    //             {inputList.length !== 1 && <Button 
    //               justIcon 
    //               round 
    //               color="primary" 
    //               value='remove' 
    //               onClick={() => handleRemoveClick(i)}
    //             >
    //             <Close />
    //             </Button>}
    //             </GridItem>
    //             <GridItem xs={12} sm={1} md={1} lg={1}>
    //           {inputList.length - 1 === i && <Button 
    //               color="primary" 
    //               value='Add' 
    //               onClick={handleAddClick}
    //             >
    //             <Add />
    //             </Button>}  
    //         </GridItem>
    //         </GridContainer>
    //     </div>
    //     );
    // })}
//     <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
//                 <div className={classes.center}>
//                 <Button color="primary" type="submit" >
//                   Submit course
//                 </Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
 
// }

// export default Aaddcourse

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

export default function Aaddcourse() {
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
    axios.post('/admin/addcourse', {
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
        cancelDetele("Course Alreadt exist");                
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
                Add Course
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
                          Add Course
                        </Button>
                        :
                        <Button 
                          type="submit"
                          color="primary"
                          id="submitbutton"
                          className={classes.updateProfileButton}
                        >
                          Add Course
                        </Button>
                      }
                    </CardBody>
                </GridItem>
              </GridContainer>
              {/* <GridContainer></GridContainer> */}
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
