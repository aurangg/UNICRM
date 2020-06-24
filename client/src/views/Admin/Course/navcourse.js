import React from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import Add from "@material-ui/icons/Add";
import Edit from "@material-ui/icons/Edit";
import Assignment from "@material-ui/icons/Assignment";
import Close from "@material-ui/icons/Close";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import CardHeader from "components/Card/CardHeader.js";
import SweetAlert from "react-bootstrap-sweetalert";
import stylesAlert from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

/*custom code start*/
import { useDispatch } from "react-redux";
import {useEffect,useState} from 'react';
import axios from 'axios';
// import axios from 'axios';

/*custom code end*/

const styles = {
  cardIconTitle: {
    ...cardTitle,
    marginTop: "15px",
    marginBottom: "0px"
  }
};

const useStyles = makeStyles(styles);
const useStylesA = makeStyles(stylesAlert);
const Anavcourse=(props)=> {
  const dispatch = useDispatch();
  console.log(props.user.id)
  const [teachers,setTeachers] =useState([]);
  const [alert, setAlert] = React.useState(null);
  const [count, setCount] = React.useState(0);
  function getTeachers() {
    return dispatch => {
      axios.get(`/admin/navcourse`)
      .then(response =>{
        console.log(response.data)
        setTeachers(response.data)
      })
      .catch(err=>{
        console.log(err)
      })
    };
  }
  useEffect(() => {
    dispatch(getTeachers())
  },[dispatch,count]);
  const warningWithConfirmAndCancelMessage = (id) => {
    console.log(id)
    setAlert(
      <SweetAlert
        warning
        style={{ display: "block", marginTop: "-100px" }}
        title="Are you sure?"
        onConfirm={() => {
          axios.delete(`/admin/navcourse?id=${id}`)
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
        }}
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
  const hideAlert = () => {
    setAlert(null);
  };  
  const classes = useStyles();
  const classesA = useStylesA();
  return (
    <GridContainer>
      <GridItem xs={12}>
      <Button color="primary" round href="/admin/addcourse"><Add /> Add Course</Button>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Course's Detail</h4>
          </CardHeader>
          {alert}
          <CardBody>
            <ReactTable
              data={
                teachers.map(prop => {
                  return ({
                    id: prop._id,
                    coursecode: prop.coursecode,
                    coursetitle: prop.coursetitle,
                    labstatus: prop.labstatus,
                    actions: (
                      // we've added some custom button actions
                      <div className="actions-right">
                        { /* use this button to add a like kind of action */ }
                        <Button
                          justIcon
                          round
                          simple
                          onClick={() => alert("You've pressed the like button on colmun id: "+prop._id)}
                          color="info"
                          className="like"
                        >
                          <Assignment />
                        </Button>{" "}
                        { /* use this button to add a edit kind of action */ }
                        <Button
                          justIcon
                          round
                          simple
                          onClick={() => props.history.push(`/admin/editcourse/${prop._id}`)}
                          color="success"
                          className="edit">
                            <Edit />
                        </Button>{" "}
                        { /* use this button to remove the data row */ }
                        <Button
                          justIcon
                          round
                          simple
                          onClick={() => {
                            warningWithConfirmAndCancelMessage(prop._id)
                          }}
                          color="danger"
                          className="remove">
                          <Close />
                        </Button>{" "}
                      </div>
                    )
                  })
                })
              }
              filterable
              columns={[
                {
                  Header: "Course code",
                  accessor: "coursecode"
                },
                {
                  Header: "Course Name",
                  accessor: "coursetitle"
                },
                {
                  Header: "Lab Status",
                  accessor: "labstatus"
                },
                {
                  Header: "Actions",
                  accessor: "actions",
                  sortable: false,
                  filterable: false,
                }
              ]}
              defaultPageSize={10}
              showPaginationTop
              showPaginationBottom={false}
              className="-striped -highlight"
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default Anavcourse