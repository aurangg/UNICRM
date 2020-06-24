import React, { Component } from 'react';
import ReactTable from "react-table";
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import PermIdentity from "@material-ui/icons/PermIdentity";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
import Edit from "@material-ui/icons/Edit";
import SweetAlert from "react-bootstrap-sweetalert";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Language from "@material-ui/icons/Language";
import CardIcon from "components/Card/CardIcon.js";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import Add from "@material-ui/icons/Add";



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


const Tnavcourses = (props) => {
    const buttonStyle={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width:"100%",
        padding:"20px 0",
        marginTop:"40px"
    }
  const classesA = useStylesA();
  const classesC = usestylesC();
    const classes = useStyles();
    const dispatch = useDispatch();
    const [course, setCourses] = React.useState([]);
    const [sectionId, setSectionId] = React.useState('')
    let teacher_id = props.user.id;
    console.log(teacher_id)
    console.log(props)
    function getCourses(){
        return dispatch => {
            axios.get(`/teacher/navcourse?id=${teacher_id}`)
                .then(response => {
                    console.log(response.data)
                    setCourses(response.data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }
    useEffect(()=>{
        dispatch(getCourses())
    },[dispatch])


    const checkLecture = (i, e) => {
        let lecture = i.sections[e].labstatus;
        console.log(i)
        if(true){
            return (<React.Fragment>
                        {i.activecourse.map(a => (
                            <GridItem xs={12} sm={4} md={4} lg={4}  key={a._id}>
                                <CardBody onClick={() => props.history.push(`/teacher/sections/${a.course._id}`)} >
                                    <Button color="primary" round style={buttonStyle} ><Add /> {a.course.coursetitle} </Button>
                                </CardBody>
                            </GridItem>
                        ))}
                        </React.Fragment>
            )
        }
    }
    return (
        <div>
            Teacher nav course
            <div style={{marginTop:'100px'}}>
            <GridContainer>
            <GridItem xs={12} sm={12} md={12}  lg={12}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classesC.cardIconTitle}>
                    List of Courses
                  </h4>
                </CardHeader>
                <GridContainer>
                    {course.map(a => (
                        <React.Fragment>
                            {checkLecture(a, 1)}
                        </React.Fragment>
                    ))}
                </GridContainer>
              </Card>   
            </GridItem>
          </GridContainer>
            </div>
        </div>
    );
}







export default Tnavcourses;


{/* <GridContainer>
                   <GridItem xs = {12} sm={4} md={4} lg={4}>
                       <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/sections/`)}>
                            <CardIcon color="success" style={{marginRight:'0px'}}>
                                <Language />
                            </CardIcon>
                            <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                                Web Engineering
                            </h3>
                        </CardHeader>
                   </GridItem>
                   <GridItem xs = {12} sm={4} md={4} lg={4}>
                        <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/sections/`)}>
                            <CardIcon color="success" style={{marginRight:'0px'}}>
                                <Language />
                            </CardIcon>
                            <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                                Database Systems
                            </h3>
                        </CardHeader>
                   </GridItem>
                   <GridItem xs = {12} sm={4} md={4} lg={4}>
                        <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/sections/`)}>
                            <CardIcon color="success" style={{marginRight:'0px'}}>
                                <Language />
                            </CardIcon>
                            <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                                Economics
                            </h3>
                        </CardHeader>
                   </GridItem>
                   <GridItem xs = {12} sm={4} md={4} lg={4}>
                        <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/sections/`)}>
                            <CardIcon color="success" style={{marginRight:'0px'}}>
                                <Language />
                            </CardIcon>
                            <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                                OOP
                            </h3>
                        </CardHeader>
                   </GridItem>
                </GridContainer> */}