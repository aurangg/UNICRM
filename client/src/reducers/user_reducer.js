
const initialState = {
    employeecode:"",
    designation:"",
    department:"",
    email:"",
    password:"uol@123",
    fullname:"",
    role:"teacher"
}
export default function(state = initialState, action) {
    switch (action.type) {
        case "GET_USERS":
            return {
                ...state,
                data: action.payload
            };
        case "ADD_TEACHER":    
            return{
                ...state,
                data: action.payload
            }
        case "CLEAR_ADD_TEACHER":    
            return{
                ...state,
                data: action.payload
            }
        default:
            return state;
    }
}












// const initialState = {
//     user:[
//         {
//             employeecode:"",
//             designation:"",
//             department:"",
//             email:"",
//             password:"uol@123",
//             fullname:"",
//             role:"teacher"
//         }
//     ]
// }


// export default function(state , action) {
//     switch (action.type) {
//         case "GET_USERS":
//             return {
//                 ...state,
//                 data: action.payload
//             };
//         case "ADD_TEACHER":    
//             return{
//                 ...state,
//                 data: [...state,action.payload]
//             }
//         case "CLEAR_ADD_TEACHER":    
//             return{
//                 ...state,
//                 data: action.payload
//             }
//         default:
//             return state;
//     }
// }

