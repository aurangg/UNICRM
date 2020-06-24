// import React from "react";
// // react component for creating dynamic tables
// import ReactTable from "react-table";

// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons
// import Add from "@material-ui/icons/Add";
// import Edit from "@material-ui/icons/Edit";
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

// import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

// /*custom code start*/
// import { useDispatch } from "react-redux";
// import {useEffect,useState} from 'react';
// import axios from 'axios';
// // import axios from 'axios';

// /*custom code end*/

// const styles = {
//   cardIconTitle: {
//     ...cardTitle,
//     marginTop: "15px",
//     marginBottom: "0px"
//   }
// };

// const useStyles = makeStyles(styles);

// const Practice=()=> {
//   const dispatch = useDispatch();
  
//   const [courses,setCourses] =useState([]);
//   function getCourses(
//     start = 0,
//     order = 'asc'
//   ) {
//     return dispatch => {
//       axios.get(`/admin/navcourse?skip=${start}&order=${order}`)
//       .then(response =>{
//         setCourses(response.data)
//       })
//       .catch(err=>{
//         console.log(err)
//       })
//     };
//   }
//   useEffect(() => {
//     dispatch(getCourses(0,'asc'))
//   },[dispatch]);
//   const classes = useStyles();
//   return (
//     <GridContainer>
//       <GridItem xs={12}>
        
//       <Button color="primary" round href="/admin/addcourse"><Add /> Add Course</Button>
//         <Card>
//           <CardHeader color="primary" icon>
//             <CardIcon color="primary">
//               <Assignment />
//             </CardIcon>
//             <h4 className={classes.cardIconTitle}>Course's Detail</h4>
//           </CardHeader>
//           <CardBody>
//             <ReactTable
//               data={
//                 courses.map(prop => {
//                   return ({
//                     id: prop._id,
//                     coursecode: prop.coursecode,
//                     coursename: prop.coursename,
//                     mentor: prop.mentor,
//                     sections: prop.sections,
//                     teachers: prop.teachers,
//                     actions: (
//                       // we've added some custom button actions
//                       <div className="actions-right">
//                         { /* use this button to add a like kind of action */ }
//                         <Button
//                           justIcon
//                           round
//                           simple
//                           onClick={() => alert("You've pressed the like button on colmun id: "+prop._id)}
//                           color="info"
//                           className="like"
//                         >
//                           <Assignment />
//                         </Button>{" "}
//                         { /* use this button to add a edit kind of action */ }
//                         <Button
//                           justIcon
//                           round
//                           simple
//                           onClick={() => alert("You've pressed the edit button on colmun id: "+prop._id)}
//                           color="success"
//                           className="edit">
//                           <Edit />
//                         </Button>{" "}
//                         { /* use this button to remove the data row */ }
//                         <Button
//                           justIcon
//                           round
//                           simple
//                           onClick={() => alert("You've pressed the delete button on colmun id: "+prop._id)}
//                           color="danger"
//                           className="remove">
//                           <Close />
//                         </Button>{" "}
//                       </div>
//                     )
//                   })
//                 })
//               }
//               filterable
//               columns={[
//                 {
//                   Header: "Course Code",
//                   accessor: "coursecode",
//                 },
//                 {
//                   Header: "Course Name",
//                   accessor: "coursename"
//                 },
//                 {
//                   Header: "Mentor",
//                   accessor: "mentor"
//                 },
//                 {
//                   Header: "Sections",
//                   accessor: "sections"
//                 },
//                 {
//                   Header: "Teachers",
//                   accessor: "teachers"
//                 },
//                 {
//                   Header: "Actions",
//                   accessor: "actions",
//                   sortable: false,
//                   filterable: false,
//                 }
//               ]}
//               defaultPageSize={10}
//               showPaginationTop
//               showPaginationBottom={false}
//               className="-striped -highlight"
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }

// export default Practice

import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Add from "@material-ui/icons/Add";
// import Edit from "@material-ui/icons/Edit";
import Assignment from "@material-ui/icons/Assignment";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
// import Table from "components/Table/Table.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

// import InputAdornment from "@material-ui/core/InputAdornment"
/*custom code start*/
import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import { useDispatch } from "react-redux";
import axios from 'axios';
/*custom code end*/

const stylesC = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const usestylesC= makeStyles(stylesC)
const useStyles = makeStyles(styles);

const Aaddcourse=()=> {
  const dispatch = useDispatch();
  const [checkedA, setCheckedA] = React.useState(false);
  const [inputList, setInputList] = React.useState([{ section: "", teacher: "", labteacher: "" }]);
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const [courseCode, setcourseCode] = React.useState("");
  const [courseCodeState, setcourseCodeState] = React.useState("");
  const [courseName, setcourseName] = React.useState("");
  const [courseNameState, setcourseNameState] = React.useState("");
  const classes = useStyles();
  const classesC = usestylesC();
    const handleSimple = event => {
    setSimpleSelect(event.target.value);
  };
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  
 // handle input change
 const handleInputChange = (e, index) => {
  const list = [...inputList];
  const { name, value } = e.target;
  list[index][name] = value;
  setInputList(list);
};
// handle click event of the Remove button
const handleRemoveClick = index => {
  const list = [...inputList];
  list.splice(index, 1);
  setInputList(list);
};
// handle click event of the Add button
const handleAddClick = () => {
  setInputList([...inputList, { section: "", teacher: "", labteacher: ""  }]);
};
const handleswitchChange = (e) => {
  setCheckedA(e.target.checked)
  for(let i =0;i<inputList.length;i++){
    inputList[i]['labteacher'] ='';
  }
  console.log(inputList[0]['labteacher'])
  console.log(inputList)
};

function addCourse(course) {
  return dispatch => {
    console.log(course)
    axios.post(`/admin/addcourse`,course)
    .then(response =>
      response.data
    )
    .catch(err=>{
      console.log(err)
    })
  };
}
const submitForm = (e) => {
  e.preventDefault();
  if (courseCodeState === "") {
    setcourseCodeState("error");
  }
  if (courseNameState === "") {
      setcourseNameState("error");
  }
  dispatch(addCourse({
    coursecode: courseCode,
    coursename: courseName,
    mentor: simpleSelect,
    teacher: simpleSelect,
    sections: 3
  }))
};
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classesC.cardIconTitle}>Add Course</h4>
          </CardHeader>
          <CardBody>
            <form onSubmit={submitForm} >
            <GridContainer>
            {console.log(1)} 
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
                        setcourseCodeState("success");
                        } else {
                        setcourseCodeState("error");
                        }
                        setcourseCode(event.target.value);
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
                    id="course-Name"
                    formControlProps={{
                    fullWidth: true
                    }}
                    inputProps={{
                    onChange: event => {
                        if (verifyLength(event.target.value, 1)) {
                        setcourseNameState("success");
                        } else {
                        setcourseNameState("error");
                        }
                        setcourseName(event.target.value);
                    },
                    type: "text",
                    autoComplete: "off"
                    }}
                />
                </GridItem>
            </GridContainer>
            <GridContainer>
            <GridItem xs={12} sm={6} md={6} lg={6}>
                    <FormControl
                        fullWidth
                        className={classes.selectFormControl}
                    >
                        <InputLabel
                          htmlFor="select-mentor"
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
                          value={simpleSelect}
                          onChange={handleSimple}
                          inputProps={{
                            name: "select-mentor",
                            id: "select-mentor"
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
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="2"
                          >
                            Paris
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="3"
                          >
                            Bucharest
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="4"
                          >
                            Rome
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="5"
                          >
                            New York
                          </MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
            </GridContainer>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                  <legend>Course Lab</legend>
                  <div className={classes.block}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={checkedA}
                          onChange={e => handleswitchChange(e)}
                          // onChange={event => setCheckedA(event.target.checked)}
                          value="checkedA"
                          classes={{
                            switchBase: classes.switchBase,
                            checked: classes.switchChecked,
                            thumb: classes.switchIcon,
                            track: classes.switchBar
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                      label=""
                    />
                  </div>
                </GridItem>
              </GridContainer>
    {inputList.map((x, i) => {
      return (
        <div key ={i}>
        <GridContainer >
          <GridItem xs={12} sm={3} md={3} lg={3}>
            <CustomInput
                    value={x.section}
                    labelText="Section Name"
                    name="section"
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
                          value={x.teacher}
                          onChange={e => handleInputChange(e, i)}
                          inputProps={{
                            name: "teacher",
                            id: "select-teacher"
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
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="Paris"
                          >
                            Paris
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="Bucharest"
                          >
                            Bucharest
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="Rome"
                          >
                            Rome
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="New York"
                          >
                            New York
                          </MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
                {checkedA &&
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
                          // onChange={handleSimple}
                          // value={x.lastName}
                          onChange={e => handleInputChange(e, i)}
                          // onChange={function(event, i){
                            
                          //   const  { name , value } = event.target;
                          //   console.log(value)
                          //   x.teacher = event.target.value;
  
                          //   const list = [...inputList];
                          //   console.log(  list[i][name]=name )
                          //   // list[i][name] = name ;
                          //   setInputList(list);
                          // }}
                          inputProps={{
                            name: "labteacher",
                            id: "select-lab-teacher"
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
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="Paris"
                          >
                            Paris
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="Bucharest"
                          >
                            Bucharest
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="Rome"
                          >
                            Rome
                          </MenuItem>
                          <MenuItem
                            classes={{
                              root: classes.selectMenuItem,
                              selected: classes.selectMenuItemSelected
                            }}
                            value="New York"
                          >
                            New York
                          </MenuItem>
                        </Select>
                    </FormControl>
                </GridItem>
              }
            <GridItem xs={12} sm={1} md={1} lg={1}>
                {inputList.length !== 1 && <Button 
                  justIcon 
                  round 
                  color="primary" 
                  value='remove' 
                  onClick={() => handleRemoveClick(i)}
                >
                <Close />
                </Button>}
                </GridItem>
                <GridItem xs={12} sm={1} md={1} lg={1}>
              {inputList.length - 1 === i && <Button 
                  color="primary" 
                  value='Add' 
                  onClick={handleAddClick}
                >
                <Add />
                </Button>}  
            </GridItem>
            </GridContainer>
        </div>
        );
    })}
    <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div>
                <div className={classes.center}>
                <Button color="primary" type="submit" >
                  Submit course
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
 
}

export default Aaddcourse
