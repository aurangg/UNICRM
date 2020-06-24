import React from 'react';
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import './sections.css';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import PermIdentity from "@material-ui/icons/PermIdentity";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Language from "@material-ui/icons/Language";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";


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




const Sections = (props) => {
    const buttonStyle={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width:"100%",
        boxShadow:"0 2px 2px 0 rgba(156, 39, 176, 0.14), 0 3px 1px -2px rgba(156, 39, 176, 0.2), 0 1px 5px 0 rgba(156, 39, 176, 0.12"
    }
    const dispatch = useDispatch();
    const [section, setSection] = React.useState([]);
    console.log(props)
    // console.log(sectionID)
    let getcourseID = props.location.pathname;
    
    let courseID = getcourseID.slice(18);
    const classes = useStyles();
    const classesA = useStylesA();
    const classesC = usestylesC();

    function getSection(){
        return dispatch => {
            axios.get(`/teacher/sections?id=${props.user.id}`)
                .then(response => {
                    console.log(response.data)
                    setSection(response.data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }


    useEffect(()=>{
        dispatch(getSection())
    },[dispatch])
    
    

    const CheckLabOrLecture = (s, id) => {
      if(s.labstatus === "lecture" && id === s.course){
        return(
          <GridItem xs={12} sm={6} md={6} lg={6} key={s._id}>
          <CardBody onClick={() => props.history.push(`/teacher/coursefolders/${s._id}`)}>
              <Button color="primary" round style={buttonStyle}>Section {s.name}</Button> 
          </CardBody>
      </GridItem> 
        )
      }
    }
    const CheckLab = (s, id) => {
      if(s.labstatus === "lab" && id === s.course){
        return(
          <GridItem xs={12} sm={6} md={6} lg={6} key={s._id}>
          <CardBody onClick={() => props.history.push(`/teacher/coursefolders/${s._id}`)}>
              <Button color="primary" round style={buttonStyle}>Section {s.name}</Button> 
          </CardBody>
      </GridItem> 
        )
      } 
    }

    return(
        <React.Fragment>
            <h3 style={{marginBottom: "60px"}}>
                Section for Course
            </h3>
            <GridContainer>
            {section.map(s => (
            <React.Fragment>
            <GridItem xs={12} sm={12} md={6}  lg={6}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classesC.cardIconTitle}>
                    Lectures
                  </h4>
                </CardHeader>
                <GridContainer>
                    
                            {s.sections.map(p => (
                              <React.Fragment>
                                {CheckLabOrLecture(p, courseID)}
                              </React.Fragment>
                            ))}
                  
                </GridContainer>
              </Card>
            </GridItem>
            </React.Fragment>
            ))}
            {section.map(s => (
            <React.Fragment>
              <GridItem xs={12} sm={12} md={6}  lg={6}>
                <Card>
                  <CardHeader color="primary" icon>
                    <CardIcon color="primary">
                      <PermIdentity />
                    </CardIcon>
                    <h4 className={classesC.cardIconTitle}>
                      Labs
                    </h4>
                  </CardHeader>
                  <GridContainer>
                    {s.sections.map(p => (
                        <React.Fragment>
                          {CheckLab(p, courseID)}
                        </React.Fragment>
                      ))}
                  </GridContainer>
                </Card>
              </GridItem>
              </React.Fragment>
            ))}
          </GridContainer>
        </React.Fragment>
    )
}
export default Sections;


{/* <GridContainer>
        
        <GridItem xs={12} sm={4} md={4} lg={6}>
        <h3 style={{marginBottom: "60px", textAlign:'center'}}>
                Courses
            </h3>
        <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/coursefolders/`)}>
        <CardIcon color="success" style={{marginRight:'0px'}}>
            <Language />
          </CardIcon>
                
                <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                    Section S
                </h3>
                </CardHeader>
                <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/coursefolders/`)}>
                
                <CardIcon color="success" style={{marginRight:'0px'}}>
                    <Language />
                </CardIcon>
                <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                    Section T
                </h3>
                </CardHeader>
        </GridItem>
        <GridItem xs={12} sm={4} md={4} lg={6}>
        <h3 style={{marginBottom: "60px", textAlign:'center'}}>
                Labs
            </h3>
        <CardHeader color="primary" className="button_styles" style={{marginBottom:'50px'}} onClick={() => props.history.push(`/teacher/coursefolders/`)}>
                
                    <CardIcon color="success" style={{marginRight:'0px'}}>
                        <Language />
                    </CardIcon>
                <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                    Section T
                </h3>
                </CardHeader>
        </GridItem>
    </GridContainer> */}