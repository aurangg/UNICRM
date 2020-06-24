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
// import InputAdornment from "@material-ui/core/InputAdornment"
/*custom code start*/
import styles from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";

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

const Aaddcourses=()=> {
  
  const [inputList, setInputList] = React.useState([{ section: "", teacher: "" }]);
  const [simpleSelect, setSimpleSelect] = React.useState("");
  const [courseCode, setcourseCode] = React.useState("");
  const [courseCodeState, setcourseCodeState] = React.useState("");
  const [courseName, setcourseName] = React.useState("");
  const [courseNameState, setcourseNameState] = React.useState("");
//   let [sectionlist, setSectionist] = React.useState({index: Math.random(), section: '', teacher: ''});
//   const addNewRow = (e) => setSectionist( { ...sectionlist, index: Math.random(), section: "", teacher: "" })
  const classes = useStyles();
  const classes1 = usestylesC();
    const handleSimple = event => {
    setSimpleSelect(event.target.value);
  };
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  const submitClick = () => {

    if (courseCodeState === "") {
      setcourseCodeState("error");
    }
    if (courseNameState === "") {
        setcourseNameState("error");
    }

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
  setInputList([...inputList, { section: "", teacher: "" }]);
};
  return (
    <GridContainer>
      <GridItem xs={12}>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes1.cardIconTitle}>Add Course</h4>
          </CardHeader>
          <CardBody>
            <form >
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
    {inputList.map((x, i) => {
      return (
        <div key ={i}>
        <GridContainer >
            <GridItem xs={12} sm={4} md={4} lg={4}>
            <CustomInput
                    value={x.section}
                    labelText="Section Name"
                    name="section"
                    onChange={e => handleInputChange(e, i)}
                    id={`course-code-${i}`}
                    formControlProps={{
                    fullWidth: true
                  }}
                    inputProps={{
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
                
            <GridItem xs={12} sm={2} md={2} lg={2}>
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
                <GridItem xs={12} sm={2} md={2} lg={2}>
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
    {/* <div style={{ marginTop: 20 }}>{JSON.stringify(inputList)}</div> */}
                <div className={classes.center}>
                <Button color="primary" onClick={submitClick} >
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

export default Aaddcourses