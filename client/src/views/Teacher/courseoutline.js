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
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import TextField from '@material-ui/core/TextField';
const textFieldStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        // margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));

const stylesC = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};
const useStyles = makeStyles(stylesCustom,stylesCard,stylesAlert);
const useStylesA = makeStyles(stylesAlert);
const usestylesC= makeStyles(stylesC);




export default function AddCourseOutline(props) {
  const classes = useStyles();
  const classesA = useStylesA();
  const classesC = usestylesC();
  const classesText = textFieldStyles()
  const [file, setFile] = React.useState(null);
  const [description, setDescription] = React.useState("")
  const [alert, setAlert] = React.useState(null);
  const [btndisable, setBtnDisable] = React.useState(false);

  const hideAlert = () => {
    setAlert(null);
  };

  const handleDescriptionChange = e => {
    setDescription(e.target.value)
  }
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  
  let fileInput = React.createRef();
  
  const handleImageChange = e => {
    console.log(e)
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


  // eslint-disable-next-line
  const handleSubmit = e => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = (e) => {
    // fileInput.current.click();
    fileInput.current.click();
  };
  const handleRemove = (e) => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null; 
  };
  let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  
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
        title="Uploaded Successfully"
        onConfirm={() => {
          hideAlert()
          resetvalues();
          setBtnDisable(false);
          props.history.push("/teacher/dashboard")
        }}
        onCancel={() => {
          hideAlert()
          setBtnDisable(false)
        }}
        confirmBtnCssClass={classesA.button + " " + classesA.success}
      >
      </SweetAlert>
    );
  };
  const warningWithConfirmMessage = (title,datediff,sdate,edate,Syear) => {
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => {
            hideAlert()
            setBtnDisable(false)
            axios.post('/teacher/addQuiz', {
              })
              .then(function (response) {
                console.log(response.data)
                  if(response.data.success ===true){
                    successAlert();
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
        }} confirmBtnCssClass={classesA.button + " " + classesA.success} cancelBtnCssClass={classesA.button + " " + classesA.danger} confirmBtnText="Yes, Add it!" cancelBtnText="Cancel" showCancel>
        You are going to add <b>{title}</b> Quiz
      </SweetAlert>
    );
  };
  const submitForm = (e) => {
    e.preventDefault();
    var formData = new FormData();
    var imagefile = document.querySelector('#file');
    
    // formData.append("file", imagefile.files[0]);
    axios.post('/teacher/addMids',{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
    })
        .then(function (response) {
          console.log(response.data)
            if(response.data.success ===true){
              console.log(response.data.success)
              // successAlert();                
            }
        })
        .catch(function (error) {
          console.log((error.response.data))
        })
    setBtnDisable(true)
    if (file === null) {
        cancelDetele("You must upload Course Outline")
        return null;
    }
    else if(description === ""){
      cancelDetele("You must add Description for Course Outline")
      return  null;
    }
    else{
        successAlert()
    }
    
    //first make request then alert true
   }
   const resetvalues=()=>{  
    setFile(null)
    setDescription("")
  }
// CLEAR THE SCREEN

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
                Upload Course Outline
              </h4>
            </CardHeader>
            {alert}
            <CardBody>
              <form onSubmit={submitForm} encType="multipart/form-data">
              <GridContainer>
                    <GridItem xs={12} sm={12} md={6} className={classesText.root}>
                        <TextField
                            id="outlined-textarea"
                            label="Description"
                            placeholder="Course Outline"
                            multiline
                            value={description}
                            onChange={handleDescriptionChange}
                            variant="outlined"
                            />
                    </GridItem>    
                </GridContainer>
                <GridContainer style={{marginTop:"30px"}}>
                <GridItem xs={12} sm={12} md={6}>
                <div className="fileinput text-center">
                <input type="file" id="file1" onChange={handleImageChange} ref={fileInput} />
                    <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
                      <img src={imagePreviewUrl} alt="..." />
                    </div>
                    <div>
                      {file === null ? (
                        <Button {...addButtonProps} onClick={() => handleClick()} color="primary">
                          {avatar ? "Upload Result" : "Upload Final Exam"}
                        </Button>
                      ) : (
                        <span>
                          <Button {...changeButtonProps} onClick={() => handleClick()}>
                            Change
                          </Button>
                          {avatar ? <br /> : null}
                          <Button {...removeButtonProps} onClick={() => handleRemove()}>
                            <i className="fas fa-times" /> Remove
                          </Button>
                        </span>
                      )}
                    </div>
                </div>
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
                          Add Files
                        </Button>
                        :
                        <Button 
                          type="submit"
                          color="primary"
                          id="submitbutton"
                          className={classes.updateProfileButton}
                        >
                          Add Course Outline
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

