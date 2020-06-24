// import React from "react";
// // react component for creating dynamic tables
// import ReactTable from "react-table";

// // @material-ui/core components
// import { makeStyles } from "@material-ui/core/styles";
// // @material-ui/icons
// import Add from "@material-ui/icons/Add";
// import Edit from "@material-ui/icons/Edit";
// import Person from "@material-ui/icons/Person";
// import Close from "@material-ui/icons/Close";
// // core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Button from "components/CustomButtons/Button.js";
// import Card from "components/Card/Card.js";
// import CardBody from "components/Card/CardBody.js";
// import CardIcon from "components/Card/CardIcon.js";
// import CardHeader from "components/Card/CardHeader.js";

// import { dataTable } from "variables/general.js";

// import { cardTitle } from "assets/jss/material-dashboard-pro-react.js";

// import { useDispatch ,useSelector } from "react-redux";
// import {useEffect} from 'react';
// import { getCourse } from './../../../actions';


// const styles = {
//   cardIconTitle: {
//     ...cardTitle,
//     marginTop: "15px",
//     marginBottom: "0px"
//   }
// };

// const useStyles = makeStyles(styles);

// export default function Anavteacher() {
//   const dispatch = useDispatch();
//   const actionData = useSelector(state => state.courses.data, []) || [];
// //   const action = useSelector(state => state, []) || [];
//   const list = actionData;
//   const [data, setData] = React.useState(
//     dataTable.dataRows.map((prop, key) => {
//       return {
//         id: key,
//         name: prop[0],
//         email: prop[1],
//         department: prop[2],
//         employeecode: prop[3],
//         designation:prop[4],
//         actions: (
//           // we've added some custom button actions
//           <div className="actions-right">
//             {/* use this button to add a like kind of action */}
//             <Button
//               justIcon
//               round
//               simple
//               onClick={() => {
//                 let obj = data.find(o => o.id === key);
//                 alert(
//                   "You've clicked LIKE button on \n{ \nName: " +
//                     obj.name +
//                     ", \nposition: " +
//                     obj.position +
//                     ", \noffice: " +
//                     obj.office +
//                     ", \nage: " +
//                     obj.age +
//                     "\n}."
//                 );
//               }}
//               color="info"
//               className="like"
//             >
//               <Person />
//             </Button>{" "}
//             {/* use this button to add a edit kind of action */}
//             <Button
//               justIcon
//               round
//               simple
//               onClick={() => {
//                 let obj = data.find(o => o.id === key);
//                 alert(
//                   "You've clicked EDIT button on \n{ \nName: " +
//                     obj.name +
//                     ", \nposition: " +
//                     obj.position +
//                     ", \noffice: " +
//                     obj.office +
//                     ", \nage: " +
//                     obj.age +
//                     "\n}."
//                 );
//               }}
//               color="success"
//               className="edit"
//             >
//               <Edit />
//             </Button>{" "}
//             {/* use this button to remove the data row */}
//             <Button
//               justIcon
//               round
//               simple
//               onClick={() => {
//                 var newData = data;
//                 newData.find((o, i) => {
//                   if (o.id === key) {
//                     // here you should add some custom code so you can delete the data
//                     // from this component and from your server as well
//                     newData.splice(i, 1);
//                     return true;
//                   }
//                   return false;
//                 });
//                 setData([...newData]);
//               }}
//               color="danger"
//               className="remove"
//             >
//               <Close />
//             </Button>{" "}
//           </div>
//         )
//       };
//     })
//   );
//   const classes = useStyles();
//   return (
//     <GridContainer>
//       <GridItem xs={12}>
//       <Button color="primary" round href="/admin/addteacher"><Add /> Add Teacher</Button>
//         <Card>
//           <CardHeader color="primary" icon>
//             <CardIcon color="primary">
//               <Person />
//             </CardIcon>
//             <h4 className={classes.cardIconTitle}>Teacher's Detail</h4>
//           </CardHeader>
//           <CardBody>
            
//             <ReactTable
//               data={data}
//               filterable
//               columns={[
                // {
                //   Header: "Full Name",
                //   accessor: "name"
                // },
                // {
                //   Header: "Email",
                //   accessor: "email"
                // },
                // {
                //   Header: "Department",
                //   accessor: "department"
                // },
                // {
                //   Header: "Employee Code",
                //   accessor: "employeecode"
                // },
                // {
                //   Header: "Designation",
                //   accessor: "designation"
                // },
//                 {
//                   Header: "Actions",
//                   accessor: "actions",
//                   sortable: false,
//                   filterable: false
//                 }
//               ]}
//               defaultPageSize={10}
//               showPaginationTop
//               showPaginationBottom={false}
//               className="-striped -highlight"
//             />
//           </CardBody>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }

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
const Practice=(props)=> {
  const dispatch = useDispatch();
  const [teachers,setTeachers] =useState([]);
  const [alert, setAlert] = React.useState(null);
  const [count, setCount] = React.useState(0);
  function getTeachers() {
    return dispatch => {
      axios.get(`/admin/navteacher`)
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
          axios.delete(`/admin/navteacher?id=${id}`)
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
      <Button color="primary" round href="/admin/addteacher"><Add /> Add Teacher</Button>
        <Card>
          <CardHeader color="primary" icon>
            <CardIcon color="primary">
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardIconTitle}>Teacher's Detail</h4>
          </CardHeader>
          {alert}
          <CardBody>
            <ReactTable
              data={
                teachers.map(prop => {
                  return ({
                    id: prop._id,
                    fullname: prop.fullname,
                    email: prop.email,
                    department: prop.department,
                    employeecode: prop.employeecode,
                    designation: prop.designation,
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
                          onClick={() => props.history.push(`/admin/editteacher/${prop._id}`)}
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
                  Header: "Full Name",
                  accessor: "fullname"
                },
                {
                  Header: "Email",
                  accessor: "email"
                },
                {
                  Header: "Department",
                  accessor: "department"
                },
                {
                  Header: "Employee Code",
                  accessor: "employeecode"
                },
                {
                  Header: "Designation",
                  accessor: "designation"
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

export default Practice