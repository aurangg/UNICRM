import React from 'react';
import Button from "components/CustomButtons/Button.js";
import Add from "@material-ui/icons/Add";

import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";

const CourseFolder = (props) => {
    const buttonStyle={
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        width:"100%"
    }
    let id = props.match.params.id
    return(
        <div>
            <GridContainer>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card onClick={() => props.history.push(`/teacher/addAssignment/${id}`)}>
                        <CardHeader >
                            <Button color="primary" round style={buttonStyle}> Assignment</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card onClick={() => props.history.push(`/teacher/addQuiz/${id}`)} >
                        <CardHeader >
                            <Button color="primary" round style={buttonStyle}> Quiz</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card  onClick={() => props.history.push(`/teacher/addCourseOutline/${id}`)}>
                        <CardHeader >
                            <Button color="primary" round style={buttonStyle}> Course Outline</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card  onClick={() => props.history.push(`/teacher/addMids/${id}`)}>
                        <CardHeader >
                            <Button color="primary" round style={buttonStyle}> Mids</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card onClick={() => props.history.push(`/teacher/addFinals/${id}`)}>
                        <CardHeader>
                            <Button color="primary" round style={buttonStyle}> Finals</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card  onClick={() => props.history.push(`/teacher/addAttendance/${id}`)}>
                        <CardHeader >
                            <Button color="primary" round style={buttonStyle}> Attendance</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={4} md={4} lg={4}>
                    <Card onClick={() => props.history.push(`/teacher/addResult/${id}`)} >
                        <CardHeader >
                            <Button color="primary" round style={buttonStyle}> Result</Button> 
                        </CardHeader>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

export default CourseFolder;