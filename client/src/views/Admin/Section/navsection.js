import React, { useEffect } from 'react';
import { useDispatch } from "react-redux";
import axios from 'axios';
// react plugin for creating charts
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
// import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
// import Assignment from "@material-ui/icons/Assignment";
// imp  ort Person from "@material-ui/icons/Person";

import SweetAlert from "react-bootstrap-sweetalert";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
// import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
/*colors*/
import Danger from "components/Typography/Danger.js";
// core components
// import Grid from '@material-ui/core/Grid';

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
// import CardText from "components/Card/CardText.js";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
// import priceImage1 from "assets/img/card-2.jpeg";

var stylesCard = {
    cardTitle: {
      marginTop: "0",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none"
    }
  };
const useStyles = makeStyles(styles);
const useCardStyles = makeStyles(stylesCard);
const useStylesA = makeStyles(stylesAlert);
export default function Anavsections(props) {
  /*custom code*/
  const [courselist, setCourseList] = React.useState([]);
  const [alert, setAlert] = React.useState(null);
  const [count, setCount] = React.useState(0);
//   const [count, setCount] = React.useState(0);
  const dispatch = useDispatch();
  function getSectionsList() {
    return dispatch => {
      axios.get(`/admin/navsections`)
      .then(response =>{
        console.log(response.data)
        setCourseList(response.data)
      })
      .catch(err=>{
        console.log(err)
      })
    };
  }
  useEffect(() => {
    dispatch(getSectionsList())
  },[dispatch,count]);
  const successDelete = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Deleted!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
        Data has been deleted.
      </SweetAlert>
    );
  };
  const cancelDetele = (text) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
        {text}
      </SweetAlert>
    );
  };
  const warningWithConfirmAndCancelMessage = (id) => {
    console.log(id)
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => handleSectionDelete(id)}
        onCancel={() => cancelDetele("Your Data is safe :)")}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
        cancelBtnCssClass={classesA.button + " " + classesA.danger}
        confirmBtnText="Yes, delete it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You will not be able to recover this Action!
      </SweetAlert>
    );
  };
  const hideAlert = () => {
    setAlert(null);
  };
  const handleSectionDelete = (sectionId) => {
    console.log(sectionId)
    axios.delete(`/admin/navsections?id=${sectionId}`)
    .then(response=>{
      console.log(response.data)
      if(response.data){
        successDelete()
        setCount(count+1)
      }
    })
    .catch(function (error) {
      console.log((error.response.data))
      if(error.response.data.success ===false){
        // console.log(response.data.success)
        cancelDetele(`${error.response.data.message}`);                
      }
      else{
        cancelDetele("Unexpected Error");
      }
    })
  };
  
 /*custom code*/
  const classes = useStyles();
  const classesCard = useCardStyles();
  const classesA = useStylesA();
  return (
    <div>
        {console.log(courselist)}
      <h3>Sections Details</h3>
      <br />
      <GridContainer>
        {   
          courselist.map((data,key)=>{
            return(
                <GridItem key={key}  xs={12} sm={4} md={4} lg={3} >
                    <Card>
                        <CardHeader color="primary" style={{ textAlign: "center"}}>
                        <h4 className={classesCard.cardTitle}><b>{data.course.coursetitle.toUpperCase()}</b></h4>
                        <p>{data.semester.semester} {data.semester.year}</p>
                        </CardHeader>
                        <CardBody 
                        style={{ textAlign: "center"}}>
                            <b>Lecture</b>
                            <br/>
                            {
                              data.sections.map((item,index )=>{
                                  if(item.labstatus === "lecture"){
                                    return <div key={index} style={{ display: "inline"}}>{`${item.name} `}</div>  
                                    // return (
                                      //     <div key={index}>
                                      //         {`${item.name} `}
                                      //         {/* <div className={`${classes.stats} ${classes.productStats}`}>
                                      //             <Assignment /> 
                                      //             {`${item.name} `}
                                      //         </div>
                                      //         <div className={`${classes.stats} ${classes.productStats}`} >
                                      //             <Person />
                                      //             {`${item.lecteacher.fullname}`}
                                      //         </div>   */}
                                      //    </div>
                                      // )
                                  }else{
                                      return null
                                  }
                              })
                            }
                            <br/>
                            <b>Lab</b>
                            <br/>
                            {console.log(data.course.labstatus)}
                            {   
                              data.course.labstatus==="lecture only" 
                              ? 
                              <Danger>No Labs</Danger> 
                              // <div className={`${classes.stats} ${classes.productStats}`}>
                              //     <Assignment /> 
                              //     {/* <Danger>No Labs</Danger> */}
                              //     No Labs
                              // </div>
                              :
                              null
                          }
                          {
                            data.sections.map((item,index)=>{    
                              if(item.labstatus === "lab"){
                                return <div key={index} style={{ display: "inline"}}>{`${item.name} `}</div>
                                // return (
                                //     <div key={index}>
                                //         <div className={`${classes.stats} ${classes.productStats}`}>
                                //             <Assignment /> 
                                //             {`${item.name} `}
                                //         </div>
                                //         <div className={`${classes.stats} ${classes.productStats}`} >
                                //             <Person />
                                //             {`${item.labteacher.fullname}`}
                                //         </div>  
                                //    </div>
                                // )
                              }else{
                                return null
                              }
                            })
                          }
                        </CardBody>
                        {alert}
                        <CardFooter product  style={{ textAlign: "center"}}>
                            <div style={{ margin: "0 auto"}} >
                            <Tooltip
                            id="tooltip-top"
                            title="View"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            >
                            <Button color="transparent" simple justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                            </Button>
                            </Tooltip>
                            <Tooltip
                            id="tooltip-top"
                            title="Edit"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            >
                            <Button 
                              color="success" 
                              simple 
                              justIcon
                              onClick={() => props.history.push(`/admin/editsections/${data._id}`)}
                            >
                                <Edit className={classes.underChartIcons} />
                            </Button>
                            </Tooltip>
                            <Tooltip
                            id="tooltip-top"
                            title="Remove"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            >
                            <Button 
                                color="danger" 
                                simple 
                                justIcon
                                onClick={() => warningWithConfirmAndCancelMessage(data._id)}     
                            >
                                <Close className={classes.underChartIcons} />
                            </Button>
                            </Tooltip>
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            )    
          })
        }

        {/* {
          courselist.map((data,key)=>{
            return(
                <GridItem key={key}  xs={12} sm={4} md={3}>
                    <Card product className={classes.cardHover}>
                        <CardHeader image className={classes.cardHeaderHover}>
                        <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img src={priceImage1} alt="..." />
                        </a>
                        </CardHeader>
                        <CardBody>
                        <div className={classes.cardHoverUnder}>
                            <Tooltip
                            id="tooltip-top"
                            title="View"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            >
                            <Button color="transparent" simple justIcon>
                                <ArtTrack className={classes.underChartIcons} />
                            </Button>
                            </Tooltip>
                            <Tooltip
                            id="tooltip-top"
                            title="Edit"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            >
                            <Button color="success" simple justIcon>
                                <Refresh className={classes.underChartIcons} />
                            </Button>
                            </Tooltip>
                            <Tooltip
                            id="tooltip-top"
                            title="Remove"
                            placement="bottom"
                            classes={{ tooltip: classes.tooltip }}
                            >
                            <Button color="danger" simple justIcon>
                                <Edit className={classes.underChartIcons} />
                            </Button>
                            </Tooltip>
                        </div>
                        <h4 className={classes.cardProductTitle}>{data.course.coursetitle}</h4>
                        <br/>
                        <p className={classes.cardProductDesciprion}>Semester {data.semester.semester} {data.semester.year} <br/>
                            Mentor {data.mentor.fullname}
                        </p>
                        </CardBody>
                        <CardFooter product>
                        <div className={`${classes.stats} ${classes.productStats}`}>
                            <Assignment /> 
                            Lecture:{
                                data.sections.map((item)=>{
                                    if(item.labstatus === "lecture"){
                                        return (` ${item.name}` )
                                    }else{
                                        return null
                                    }
                                })
                            } 
                            
                        </div>
                        <div className={`${classes.stats} ${classes.productStats}`} >
                            <Assignment />
                            Lab:{
                                data.sections.map((item)=>{
                                    if(item.labstatus === "lab"){
                                        return (` ${item.name}` )
                                    }else{
                                        return null
                                    }
                                })
                            } 
                        </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            )    
          })
        } */}
      </GridContainer>
    </div>
  );
}
