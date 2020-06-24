export default function(state = {}, action) {
    switch (action.type) {
      case "GET_COURSES":
        return {
            ...state,
            data: action.payload
        };
      default:
        return state;
    }
}

// export default function(state = [], action) {
//     switch (action.type) {
//       case "GET_COURSES":
//         return {
//             ...state,
//             data: action.payload
//         };
//       default:
//         return state;
//     }
// }
