import React from 'react';
import CardHeader from "components/Card/CardHeader.js";

const Assignments = () =>{
    return(
        <CardHeader color="warning" stats icon style={{padding:'10px', cursor:'pointer'}} >
            <form method="POST" enctype="multipart/form-data" action="/teacher/assignment">
                <input type="file" name="uploadedfile" />
                <input type="Submit" value="Upload file" />
            </form>
        </CardHeader>
    )
}

export default Assignments;