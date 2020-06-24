var imagefile = document.querySelector('#file');
console.log(imagefile);
formData.append("file", imagefile.files[0]);
axios.post('/teacher/uploadfile/courseoutline', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
})
    // axios.post('/admin/navcourseupload', data
    // // {
    // //   img_path: file,
    // //   fullname: "Muneeeb",
    // //   email: "muneeb123@g.com",
    // //   department: "SE",
    // //   employeecode: "EMP-00000000",
    // //   designation: "lecturer",
    // //   password: "12345678"
    // // }
    // )
    .then(function (response) {
      console.log(response.data)
        if(response.data.success ===true){
          console.log(response.data.success)
          // successAlert();                
        }
    })
    .catch(function (error) {
      console.log((error.response.data))
      // if(error.response.data.success ===false){
      //   console.log(response.data.success)
      //   // cancelDetele("Course Alreadt exist");                
      // }
      // else{
      //   // cancelDetele("Server is not responding Or application Crash need to be lounch again");
      // }
    })
}