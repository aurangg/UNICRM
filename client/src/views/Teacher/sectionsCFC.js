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

const CFCSections = () => {
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
            <GridItem xs={12} sm={12} md={12} lg={12}>
              <h3 style={{marginBottom:"30px", textAlign:"center"}}>
                Sections
              </h3>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}  lg={6}>
              <Card>
                <CardHeader color="primary" icon>
                  <CardIcon color="primary">
                    <PermIdentity />
                  </CardIcon>
                  <h4 className={classesC.cardIconTitle}>
                    Lecture
                  </h4>
                </CardHeader>
                <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CardBody>
                        <Button href="/teacher/details" color="primary" round style={buttonStyle}>Section S</Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CardBody>
                        <Button href="/teacher/details" color="primary" round style={buttonStyle}>Section T</Button> 
                    </CardBody>
                </GridItem>
                </GridContainer>
              </Card>
            </GridItem>

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
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CardBody>
                        <Button href="/teacher/details" color="primary" round style={buttonStyle}>Section S</Button> 
                    </CardBody>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <CardBody>
                        <Button href="/teacher/details" color="primary" round style={buttonStyle}>Section T</Button> 
                    </CardBody>
                </GridItem>
                </GridContainer>
              </Card>
            </GridItem>

          </GridContainer>
        </div>
      );
}







export default CFCSections;