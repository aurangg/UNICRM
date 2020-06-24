import React, { Component } from 'react';
import ReactTable from "react-table";
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Edit from "@material-ui/icons/Edit";
import SweetAlert from "react-bootstrap-sweetalert";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);



const Tnavcourse = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [course, setCourses] = React.useState([]);
    const [sectionId, setSectionId] = React.useState('')
    let teacher_id = props.user.id;
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
        let id1 = i.sections[0]._id
        let id2 = i.sections[1]._id
        let lecture = i.sections[e].labstatus;
        if(lecture === "lecture"){
            return (<React.Fragment>        
                <CardHeader color="warning" stats icon style={{padding:'10px', cursor:'pointer'}}  onClick={() => props.history.push(`/teacher/sections/${id1}`)}>
                    <p className={classes.cardCategory} style={{textAlign:'left'}}>Courses</p>
                    <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                        {i.course.coursetitle}
                    </h3>
                    </CardHeader>
            </React.Fragment>)
        }
        else {
             return (<React.Fragment>
                <CardHeader color="warning" stats icon style={{padding:'10px', cursor:'pointer'}}  onClick={() => props.history.push(`/teacher/sections/${id2}`)}>
                    <p className={classes.cardCategory} style={{textAlign:'left'}}>Courses</p>
                    <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                        {i.course.coursetitle} Lab
                    </h3>
                    </CardHeader>
            </React.Fragment>)
        }
    }
    return (
        <div>
            Teacher nav course
            <div style={{marginTop:'100px'}}>
                <GridContainer>
                    Courses
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                        {course.map(i => (
                            <React.Fragment>
                                <Card key={i._id}>
                                    {checkLecture(i, 0)}
                                </Card>
                            </React.Fragment>
                        ))}
                        </GridItem>
                        Labs
                    {/* {checkLab(course)} */}
                    <GridItem xs={12} sm={4} md={4} lg={4}>
                        {course.map(i => (
                            <React.Fragment>
                                <Card key={i._id}>
                                    {checkLecture(i, 1)}
                                </Card>
                            </React.Fragment>
                                
                        ))}
                        </GridItem>
                </GridContainer>
                
            </div>
        </div>
    );
}







export default Tnavcourse;