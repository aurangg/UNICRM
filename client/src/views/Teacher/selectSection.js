import React from 'react';
import {useEffect,useState} from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import Button from "components/CustomButtons/Button.js";
import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(styles);


const Section = (props) => {
    const dispatch = useDispatch();
    const [section, setSection] = React.useState([]);
    let sectionID = props.match.params.id
    // console.log(props)
    // console.log(sectionID)
    const classes = useStyles();
    function getSection(){
        return dispatch => {
            axios.get(`/teacher/sections?id=${props.user.id}`)
                .then(response => {
                    setSection(response.data)
                }).catch(err => {
                    console.log(err)
                })
        }
    }


    useEffect(()=>{
        dispatch(getSection())
    },[dispatch])
    
    const Loop = (section, sectionID) => {
     for(let i =0; i < section.length; i ++){
         for (let j =0; j < 2; j++){
             if(section[i].sections[j]._id === sectionID){
                //  console.log(sectionID)
                 return section[i].sections[j].name
             }
         }
     }
    }

    return(
        <GridContainer>
            Courses
            <GridItem xs={12} sm={4} md={4} lg={4}>
                {/* {section.map(u => (
                    <Card>
                        {u.sections.map((i, index) => (
                            <CardHeader key={u._id} >
                                <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                                {i.name}
                                {smallFun(section, index)}
                            </h3>
                            </CardHeader>
                        ))}
                    </Card>
                ))} */}
                <Card>
                    <CardHeader onClick={() => props.history.push(`/teacher/coursefolder/${sectionID}`)}>
                    <h3 className={classes.cardTitle} style={{textAlign:'center', padding:'20px 0px'}}>
                        {Loop(section, sectionID)}
                    </h3>
                    </CardHeader>
                </Card>
                
            </GridItem>
        </GridContainer>
    )
}
export default Section;