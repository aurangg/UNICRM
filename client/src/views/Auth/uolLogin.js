import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import SweetAlert from "react-bootstrap-sweetalert";


import axios from 'axios';

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";

const useStyles = makeStyles(styles);
const useStylesA = makeStyles(stylesAlert);
export default function LoginPage(props) {
  console.log(props);
  const classes = useStyles();
  const classesA = useStylesA();
  const [loginpassword, setloginpassword] = React.useState("");
  const [loginpasswordState, setloginpasswordState] = React.useState("");
  const [loginEmail, setloginEmail] = React.useState("");
  const [loginEmailState, setLoginEmailState] = React.useState("");
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [alert, setAlert] = React.useState(null);
  setTimeout(function() {
    setCardAnimation("");
  }, 700);

  const verifyEmail = value => {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
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
  const hideAlert = () => {
    setAlert(null);
  };
  const resetvalues=()=>{  
    setloginEmail("")
    setLoginEmailState("")
    setloginpassword("")
    setloginpasswordState("")
  }
  const redir=(role)=>{
    if(role==="teacher"){
      return props.history.push("/teacher/dashboard") 
    }
    if(role==="admin"){
      return props.history.push("/admin/dashboard") 
    }
    if(role==="mentor"){
      return props.history.push("/mentor/dashboard") 
    }
    if(role==="hod"){
      return props.history.push("/hod/dashboard") 
    }
    if(role==="cfcommittee"){
      return props.history.push("/cfcommittee/dashboard") 
    }
  }
  const loginreq = (email,password)=>{
    axios.post('/api/login', {email,password})
    .then(function (response) {
      const message = response.data.message;
        if(response.data.isAuth ===true){
          resetvalues()
          redir(response.data.role)                         
        }
        if(response.data.isAuth ===false){ 
          cancelDetele(message)
        }
    })
    .catch(function (error) {
      cancelDetele("Server is not responding Please try again");
    })
  }
  const submitForm = (e) =>{
    e.preventDefault();
    loginreq(loginEmail,loginpassword);
  }
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form onSubmit={submitForm}>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                <div className={classes.socialLine}>
                  <div> UOL ACF</div>
                  {/* {[
                    "fab fa-facebook-square",
                    "fab fa-twitter",
                    "fab fa-google-plus"
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })} */}
                </div>
              </CardHeader>
              {alert}
              <CardBody>
                <CustomInput
                  success={loginEmailState === "success"}
                  error={loginEmailState === "error"}
                  value={loginEmail}
                  labelText="Email..."
                  id="login-email"
                  formControlProps={{
                    fullWidth: true
                  }}
                  inputProps={{
                    onChange: event => {
                      if (verifyEmail(event.target.value)) {
                        setLoginEmailState("success");
                      } else {
                        setLoginEmailState("error");
                      }
                      setloginEmail(event.target.value);
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    type: "email",
                    autoComplete: "off"
                  }}
                />
                <CustomInput
                  success={loginpasswordState === "success"}
                  error={loginpasswordState === "error"}
                  value={loginpassword}
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true
                  }}                    
                  inputProps={{
                    onChange: event => {
                      if (verifyLength(event.target.value, 1)) {
                        setloginpasswordState("success");
                      } else {
                        setloginpasswordState("error");
                      }
                      setloginpassword(event.target.value);
                    },
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
              </CardBody>
              <CardFooter className={classes.justifyContentCenter}>
                <Button 
                  color="rose" 
                  simple size="lg" 
                  block
                  type="submit"
                >
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}