import React from "react";
// used for making the prop types of this component
// import PropTypes from "prop-types";
import axios from "axios";
// core components
import Button from "components/CustomButtons/Button.js";

import defaultImage from "assets/img/image_placeholder.jpg";
import defaultAvatar from "assets/img/placeholder.jpg";

export default function AddResult(props) {
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
  // eslint-disable-next-line
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
    // console.log(file);
    // const data = new FormData()
   	// data.append('file',file)
   	var formData = new FormData();
var imagefile = document.querySelector('#file');
console.log(imagefile);
formData.append("file", imagefile.files[0]);
axios.post('/teacher/addResult', formData, {
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
}
  let { avatar, addButtonProps, changeButtonProps, removeButtonProps } = props;
  return (
    <div className="fileinput text-center">
    <form encType="multipart/form-data" onSubmit={submitForm}  >
      <input type="file" id="file" onChange={handleImageChange} ref={fileInput} />
      <div className={"thumbnail" + (avatar ? " img-circle" : "")}>
        <img src={imagePreviewUrl} alt="..." />
      </div>
      <div>
        {file === null ? (
          <Button {...addButtonProps} onClick={() => handleClick()}>
            {avatar ? "Upload Result" : "Upload Result"}
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
       <Button 
        type="submit"
        color="primary"
        >
            Add Result
        </Button>
      </form>
    </div>
  );
}
