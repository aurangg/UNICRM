import React from "react";
import moment from "moment";
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

import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import axios from 'axios';

/*Redux code start*/
import {useEffect} from 'react';
/*Redux code end*/
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

export default function Aeditteacher(props) {
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  
  const [courseLabSelect, setCourseLabSelect] = React.useState("");
  const [startDate, setStartDate] = React.useState(moment);
  const [endDate, setEndDate] = React.useState(moment);
  const [alert, setAlert] = React.useState(null);
  const [btndisable, setBtnDisable] = React.useState(false);

  var yesterday = Datetime.moment().subtract( 1, 'day' );
  var valid = function( current ){
      return current.isAfter( yesterday );
  };
  var validend = function( current ){
      return current.isAfter( startDate );
  };

  useEffect(() => {
    const cancelDetele = (text) => {
      setAlert(
        <SweetAlert
          danger
          style={{ display: "block", marginTop: "-100px" }}
          title="Cancelled"
          onConfirm={() => {
            hideAlert()
            setBtnDisable(false)
          }}
          onCancel={() => {
            hideAlert()
            setBtnDisable(false)
          }}
          confirmBtnCssClass={classesA.button + " " + classesA.success}
        >
          {text}
        </SweetAlert>
      );
    };
    const hideAlert = () => {
      setAlert(null);
    }; 
    function getSemester() {
      axios.get(`/admin/editsemester?id=${props.match.params.id}`)
        .then(function (response) {
            setCourseLabSelect(response.data.semester)
            setStartDate(moment(response.data.start).format("MM/DD/YYYY"))
            setEndDate(moment(response.data.end).format("MM/DD/YYYY"))
        })
        .catch(function (error) {
          cancelDetele("Server is not responding Please try again");
          props.history.push("/admin")
        })
    }
    getSemester()
  },[classesA.button,classesA.success,props.match.params.id,props.history]);
    const hideAlert = () => {
    setAlert(null);
  };  
  // function that returns true if value is email, false otherwise
  const handleSimple = event => {
    setCourseLabSelect(event.target.value);
  };
  const cancelDetele = (text) => {
    setAlert(
      <SweetAlert
        danger
        style={{ display: "block", marginTop: "-100px" }}
        title="Cancelled"
        onConfirm={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        onCancel={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
        {text}
      </SweetAlert>
    );
  };
  const successAlert = () => {
    setAlert(
      <SweetAlert
        success
        style={{ display: "block", marginTop: "-100px" }}
        title="Data Update successfully !!!"
        onConfirm={() => 
          {
            hideAlert()
            setBtnDisable(false)
            props.history.push("/admin/navteacher")
          }
        }
        onCancel={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
      </SweetAlert>
    );
  };
  const warningWithConfirmMessage = (courseLabSelect,datediff,sdate,edate,Syear) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => {
            hideAlert()
            setBtnDisable(false)
            axios.post('/admin/editsemester', {
                _id:props.match.params.id,
                semester: courseLabSelect,
                start: sdate,
                end: edate,
                year:Syear
              })
              .then(function (response) {
                console.log(response.data)
                  if(response.data.success ===true){
                    successAlert();
                    resetvalues();
                    props.history.push("/admin/navsemester")
                  }
              })
              .catch(function (error) {
                if(error.response.data.success ===false){
                    cancelDetele("Semester Alreadt exist");                
                }
                else{
                  cancelDetele("Server is not responding Or application Crash need to be lounch again");
                }
              })
        }}
        onCancel={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
        cancelBtnCssClass={classesA.button + " " + classesA.danger}
        confirmBtnText="Yes, Add it!"
        cancelBtnText="Cancel"
        showCancel
      >
        You are going to add <b>{courseLabSelect}</b> semester of <b>{datediff}</b> days!
      </SweetAlert>
    );
  };  
  const submitForm = (e) => {
    e.preventDefault();
    setBtnDisable(true);
    let Syear = moment(startDate).format('YYYY')
    let sdate = moment(startDate).format('MM/DD/YYYY')
    let edate = moment(endDate).format('MM/DD/YYYY')
    let sd = moment(startDate)
    let ed = moment(endDate)
    let datediff = ed.diff(sd, 'days')
    if (courseLabSelect === "") {
        cancelDetele("The Semester dropdown is not selected")
        return null;
    }
    if (sdate === edate) {
        cancelDetele("The Date fields empity")
        return null;
      }
    if(datediff <=0 ){
        cancelDetele("The Date is incorrect")
        return null; 
    }
    if(datediff >=1){
        warningWithConfirmMessage(courseLabSelect,datediff,sdate,edate,Syear)
    }
    //first make request then alert true
   }
   const resetvalues=()=>{  
    setCourseLabSelect("")
    setStartDate(moment)
    setEndDate(moment)
  }
  
  return (
    <div>                     
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" icon>
              <CardIcon color="primary">
                <PermIdentity />
              </CardIcon>
              <h4 className={classesC.cardIconTitle}>
                Update Semester
              </h4>
            </CardHeader>
            {alert}
            <CardBody>
              <form onSubmit={submitForm} >
                <GridContainer>
                <GridItem xs={12} sm={12} md={6} lg={6}>
                    <FormControl
                      fullWidth
                      className={classes.selectFormControl}
                    >
                      <InputLabel
                        htmlFor="semester"
                        className={classes.selectLabel}
                      >
                        Semester
                      </InputLabel>
                      <Select
                        MenuProps={{
                          className: classes.selectMenu
                        }}
                        classes={{
                          select: classes.select
                        }}
                        value={courseLabSelect}
                        onChange={handleSimple}
                        inputProps={{
                          name: "semester",
                          id: "semester"
                        }}
                      >
                        <MenuItem
                          disabled
                          classes={{
                            root: classes.selectMenuItem
                          }}
                        >
                          Lab Status
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="FALL"
                        >
                          Fall
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="SPRING"
                        >
                          Spring
                        </MenuItem>
                        <MenuItem
                          classes={{
                            root: classes.selectMenuItem,
                            selected: classes.selectMenuItemSelected
                          }}
                          value="SUMMER"
                        >
                          Summer
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <Datetime
                                value={startDate}
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                timeFormat={false}
                                isValidDate={ valid }
                                inputProps={{ placeholder: "Select starting Date" }}
                            />
                        </FormControl>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6} lg={6}>
                        <FormControl fullWidth>
                            <Datetime
                                value={endDate}
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                isValidDate={validend}
                                timeFormat={false}
                                inputProps={{placeholder: "Select starting Date" }}
                            />
                        </FormControl>
                    </GridItem>
                </GridContainer>      
                <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                    <CardBody style={{ textAlign: "center" }}>
                      <br/>
                      {
                        btndisable ?
                        <Button 
                          type="submit"
                          color="primary"
                          disabled
                          className={classes.updateProfileButton}
                        >
                          Update Semester
                        </Button>
                        :
                        <Button 
                          type="submit"
                          color="primary"
                          id="submitbutton"
                          className={classes.updateProfileButton}
                        >
                          Update Semester
                        </Button>
                      }
                    </CardBody>
                </GridItem>
              </GridContainer>
              </form>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}