
import { combineReducers } from 'redux';
import courses from './admin_course_reducer';
import user from './user_reducer';
import errorReducer from './error_reducer';
const rootReducer = combineReducers({
    courses,
    errorReducer,
    user
});

export default rootReducer;

// function reducer(state = { data: "" }, action) {
//   switch (action.type) {
//     case "FETCH_DATA":
//       return {
//         ...state,
//         data: action.data
//       };
//     default:
//       return state;
//   }
// }
// export default reducer;

// function reducer(state = [], action) {
//   switch (action.type) {
//     case "FETCH_DATA":  
//     return {
//       ...state,
//       data: action.data
//     };
//     default:
//       return state;
//   }
// }

// export default reducer;

// export default function (state = [], action) {
//   switch (action.type) {
//       case 'FETCH_DATA': // you should not mutate state 
//       console.log(1)
//       return {
//             ...state,
//             data: action.data,
//         };
//       default:
//           return state;
//   }
// }
