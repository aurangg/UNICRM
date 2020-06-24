import React from "react";
import moment from 'moment';
import Datetime from "react-datetime";
import './details.css';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import PermIdentity from "@material-ui/icons/PermIdentity";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
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
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import axios from 'axios';
import Add from "@material-ui/icons/Add";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

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

const CFCDetails = () => {
    const buttonStyle={
        textAlign:"center",
        cursor: "pointer",
        width:"100%",
        paddingTop:"25px",
        paddingBottom:"50px",
        marginTop:"40px"
    }
    const buttonStyle2={
      textAlign:"center",
      cursor: "pointer",
      width:"100%",
      marginTop:"40px"
  }
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  
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
                    Details
                  </h4>
                </CardHeader>
                <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Course Outline<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Quizzes<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Assignments<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Mids<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Finals<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Attendance<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/check" color="primary" round style={buttonStyle}> Lecture Notes<br/>
                          <div className="circle"><p>A</p>
                            
                          </div>
                          
                        </Button> 
                    </CardBody>
                </GridItem>
                </GridContainer>
              </Card>   
            </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={4}>
            
                </GridItem>
            <GridItem xs={12} sm={4} md={4} lg={4}>
            <Button href="/teacher/check" color="primary" round style={buttonStyle2}> Approve All</Button>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
            
                </GridItem>
          </GridContainer>
        </div>
      );
}







export default CFCDetails;