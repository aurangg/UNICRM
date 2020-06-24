import React from 'react';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";
import Card from "components/Card/Card.js";
import CardIcon from "components/Card/CardIcon.js";
import PermIdentity from "@material-ui/icons/PermIdentity";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CardHeader from "components/Card/CardHeader.js";
import { makeStyles } from "@material-ui/core/styles";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import stylesCard from "assets/jss/material-dashboard-pro-react/views/userProfileStyles.js";
import stylesCustom from "assets/jss/material-dashboard-pro-react/customSelectStyle.js";
import TextField from '@material-ui/core/TextField';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

const stylesC = {
    cardIconTitle: {
      ...cardTitle,
      marginTop: "15px",
      marginBottom: "0px"
    }
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));
  const useStylesA = makeStyles(stylesAlert);
  const usestylesC= makeStyles(stylesC)
  
  

const Check = (props) => {
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
    const [value, setValue] = React.useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

    let id = props.match.params.id
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
                    Course Outline
                  </h4>
                </CardHeader>
                <GridContainer>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                        <h3>
                            Description
                        </h3>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6} >
                    <h4>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </h4>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6} >
                        <h3>
                            Download File
                        </h3>
                </GridItem>
                <GridItem xs={12} sm={6} md={6} lg={6}>
                    <Button
                        variant="contained"
                        color="success"
                        className={classes.button}
                        
                    >
                        Download
                    </Button> 
                    <CloudDownloadIcon style={{marginLeft:"30px", marginTop:"5px", color:"green"}}/>
                </GridItem>
                <GridItem xs={12} sm={12} md={12} lg={12} style={{margin:"30px 20px"}}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <div>
                            <TextField
                            required 
                            id="outlined-textarea"
                            label="Comment"
                            placeholder="Write Your Comment"
                            value={value}
                            onChange={handleChange}
                            multiline
                            variant="outlined"
                            />
                        </div>
                        </form>
                </GridItem>
                <GridItem xs={12} sm={6}md={6} lg={6}>
                <Button
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        size="large"   
                    >
                        Approve
                    </Button> 
                </GridItem>
                <GridItem xs={12} sm={6}md={6} lg={6}>
                <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        size="large"   
                    >
                        Reject
                    </Button> 
                </GridItem>
                </GridContainer>
              </Card>   
            </GridItem>
          </GridContainer>
        </div>
    )
}

export default Check;

{/* <GridContainer>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addAssignment/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Assignment</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addQuiz/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Quiz</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addCourseOutline/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Course Outline</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addMids/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Mids</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addFinals/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Finals</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addAttendance/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Attendance</Button> 
        </CardHeader>
    </GridItem>
    <GridItem xs={12} sm={4} md={4} lg={4}>
        <CardHeader onClick={() => props.history.push(`/teacher/addResult/`)}>
            <Button color="primary" round style={buttonStyle}><Add /> Result</Button> 
        </CardHeader>
    </GridItem>
</GridContainer> */}