import React from 'react';
import Button from "components/CustomButtons/Button.js";
import axios from 'axios';
import PublishIcon from '@material-ui/icons/Publish';
import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";
import UploadedAssignment from './uploadedAssignment';


const AddAssignment = (props) => {
    const [file, setFile] = React.useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = React.useState(
    props.avatar ? defaultAvatar : defaultImage
  );
  let fileInput = React.createRef();
  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setFile(file);
      setImagePreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };
  const handleSubmit = e => {
    e.preventDefault();
    // file is the file/image uploaded
    // in this function you can save the image (file) on form submit
    // you have to call it yourself
  };
  const handleClick = () => {
    fileInput.current.click();
  };
  const handleRemove = () => {
    setFile(null);
    setImagePreviewUrl(props.avatar ? defaultAvatar : defaultImage);
    fileInput.current.value = null;
  };
    const submitForm = (e) => {
        e.preventDefault();
        const formData = new FormData();
        let file = document.querySelector('uploadedfile')
        formData.append('myImage',file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("/teacher/assignment",formData,config)
            .then((response) => {
                alert("The file is successfully uploaded");
            }).catch((error) => {
        });
    }
    let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (
    <React.Fragment>
        <div className="fileinput text-center">
        <h3 style={{textAlign:"center", margin:"20px 0px"}}>Upload Assignments</h3>
    <form encType="multipart/form-data" onSubmit={submitForm}  >
      <input type="file" id="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? "Add Photo" : "Select Document"}
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
       <Button type="submit" color="primary"><PublishIcon />Upload</Button>
      </form>
    </div>
    <UploadedAssignment />
    </React.Fragment>
  );
}
export default AddAssignment;