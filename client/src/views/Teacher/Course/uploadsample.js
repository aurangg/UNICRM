import React from 'react';
import axios from 'axios'

class UploadSample extends React.Component{
    state ={
        selectedFile:null,
        selectedFileName:'Choose File'
    }
    fileHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
            selectedFileName:event.target.files[0].name
        })
        console.log(event.target.files[0])
    }
    fileUpload = async e => {
        const fd = new FormData();
        
        fd.append('file', this.state.selectedFile)
        try{
            const res = await axios.post('/teacher/uploadfile', fd, {
                headers:{
                    'Content-Type': 'multipart/form-data'
                }
            })
        } catch(err){
            if(err.response.status === 500)
            {
                console.log('There was problem')
            }
            else{console.log(err.response.data.msg)}
        }
    }
    render(){
        return(
            <div>
                <form ref="uploadform" onSubmit ={this.fileUpload} method='post' encType="multipart/form-data">
                    <input type="file" onChange={this.fileHandler} name="sampleFile" />
                    <label>{this.state.selectedFile}</label>
                    <button>Upload</button>
                </form>
            </div>
        )
    }
}

export default UploadSample;