import React from 'react';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import PermIdentity from "@material-ui/icons/PermIdentity";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import {useEffect} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

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
  
  

const CourseFolders = (props) => {
    const buttonStyle={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width:"100%",
        padding:"20px 0",
        marginTop:"40px"
    }


    const classes = useStyles();
    const classesA = useStylesA();
    const classesC = usestylesC();

    const dispatch = useDispatch();
    let getsectionID = props.location.pathname;
    let sectionID = getsectionID.slice(23);
    const [courseFolder, setCourseFolder] = React.useState([]);
    function getCourseFolder(){
        return dispatch => {
            axios.get(`/teacher/coursefolders?id=${sectionID}`)
                .then(response => {
                    console.log(response.data)
                    setCourseFolder(response.data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    useEffect(()=>{
        dispatch(getCourseFolder())
    },[dispatch])

    console.log(props)
    
    return(
        <div>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}  lg={12}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classesC.cardIconTitle}>
                    Course Folder
                  </h4>
                </CardHeader>
                <GridContainer>
                    {courseFolder.map(cf => (
                        <React.Fragment key={cf._id}>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addAssignment/${cf.assignment}`)} > 
                                    <Button color="primary" round style={buttonStyle}><Add /> Assignment</Button> 
                                </CardBody>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addResult/${cf.result}`)}>
                                    <Button color="primary" round style={buttonStyle}><Add /> Results</Button> 
                                </CardBody>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addAttendance/${cf.attendance}`)}>
                                    <Button color="primary" round style={buttonStyle}><Add /> Attendance</Button> 
                                </CardBody>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addCourseOutline/${cf.courseOutline}`)}>
                                    <Button color="primary" round style={buttonStyle}><Add /> Course Outline</Button> 
                                </CardBody>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addFinals/${cf.final}`)}>
                                    <Button color="primary" round style={buttonStyle}><Add /> Final</Button> 
                                </CardBody>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addMids/${cf.mid}`)}>
                                    <Button color="primary" round style={buttonStyle}><Add /> Mids</Button> 
                                </CardBody>
                            </GridItem>
                            <GridItem xs={12} sm={4} md={4} lg={4}>
                                <CardBody onClick={() => props.history.push(`/teacher/addQuiz/${cf.quiz[0]}`)}>
                                    <Button color="primary" round style={buttonStyle}><Add /> Quiz</Button> 
                                </CardBody>
                            </GridItem>
                        </React.Fragment>        
                    ))}
                </GridContainer>
              </Card>   
            </GridItem>
          </GridContainer>
        </div>
    )
}

export default CourseFolders;

{/* <GridContainer>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addAssignment/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Assignment</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addQuiz/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Quiz</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addCourseOutline/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Course Outline</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addMids/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Mids</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addFinals/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Finals</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addAttendance/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Attendance</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addResult/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Result</Button> 
        </CardHeader>
    </GridItem>
</GridContainer> */}