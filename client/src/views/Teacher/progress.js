import React from "react";
import moment from 'moment';
import Datetime from "react-datetime";
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

const Progress = () => {
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
                    Courses Progress
                  </h4>
                </CardHeader>
                <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/sectionscfc" color="primary" round style={buttonStyle}><Add /> Web Engineering</Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/sectionscfc" color="primary" round style={buttonStyle}><Add /> Advance SE</Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/sectionscfc" color="primary" round style={buttonStyle}><Add /> IOT</Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <CardBody>
                        <Button href="/teacher/sectionscfc" color="primary" round style={buttonStyle}><Add /> Android</Button> 
                    </CardBody>
                </GridItem>
                </GridContainer>
              </Card>   
            </GridItem>
          </GridContainer>
        </div>
      );
}







export default Progress;