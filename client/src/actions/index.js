import axios from 'axios';
export function getCourse(
    start = 0,
    order = 'asc'
) {
    const request = axios.get(`/admin/navcourse?&skip=${start}&order=${order}`)
    .then(response => response.data)

    return{
        type: "GET_COURSES",
        payload: request
    }
  }

//   export const FETCH_COURSES = 'GET_COURSES';  
//   export const fetchActionData = (data) => {
//     return {
//         type: FETCH_COURSES,
//         payload:data
//     }
//   }
//   export const getCourse = (
//         start = 0,
//         order = 'asc'
//     ) => {
//     return (dispatch) => {
//       return axios.get(`/admin/navcourse?&skip=${start}&order=${order}`)
//         .then(response => {
//           dispatch(fetchActionData(response.data))
//         })
//         .catch(error => {
//           throw(error);
//         })
//     }
//   }

/*===================Admin (Teacher Action) =================*/
// export function addTeacher(teacher) {
//     const request = axios.post(`/admin/addteacher`,teacher)
//     .then(response =>response.data)
//     .catch(err=>{console.log(err)})
//     return{
//         type: "ADD_TEACHER",
//         payload: request
//     }
// }
// //Clear screen on submit form
// export function clearAddTeacher() {
//     return{
//         type: "CLEAR_ADD_TEACHER",
//         payload: {}
//     }
// }

export const  addTeacher=(teacher)=> {
    const request = axios.post(`/admin/addteacher`,teacher)
    .then(response =>response.data)
    .catch(err=>{console.log(err)})
    return{
        type: "ADD_TEACHER",
        payload: request
    }
}

