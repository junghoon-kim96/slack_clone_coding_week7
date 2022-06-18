// user.js
//AXIOS
import axios from "axios";
// Actions


const LOAD = "user/LOAD";
const ADD = "user/ADD";
const EDIT = "user/EDIT";
const DELETE = "user/DELETE";

const initialState = {
  list: [
    //   {
    //                   id: 100,
    //                   title: "제목",
    //                   imgUrl: "img_check",
    //                   tagList: [{id:0, tag:"머머리"}, {id:1, tag:"럭키짱"}],
    //                   up_layer_value: "upText",
    //                   down_layer_value: "downText",
    //                   up_txt: "up_txt",
    //                   down_txt: "down_txt",
    //                   commentCnt: "0",
    //                   nickname: "현재 유저"
    // }
  ],
};

// Action Creators
export function loaduser(user_list) {
  return { type: LOAD, user_list };
}

export function adduser(user) {
  return { type: ADD, user: user };
}

export function edituser(user, user_index) {
  return { type: EDIT, user, user_index };
}

export function deleteuser(user_index) {
  return { type: DELETE, user_index };
}

// // middlewares

export const LoadPostAxios = () => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/user/all",
        method: "get",
        baseURL: "http://52.78.217.50:8080",
      }
    )
      .then(response => {
        const axios_data = response.data;
        let user_list = [...axios_data];
        dispatch(loaduser(user_list));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

// export const loadPostFB = () => {
//   return async function (dispatch) {
//     const user_data = await getDocs(query(collection(db, "user"), orderBy("timestamp", "desc")));
//     let user_list = [];

//     user_data.forEach((b) => {
//       user_list.push({ id: b.id, ...b.data() });
//     });

//     dispatch(loaduser(user_list));
//   }
// }

// export const addPostFB = (user) => {
//   return async function (dispatch) {
//     const docRef = await addDoc(collection(db, "user"), user);
//     const user_data = { id: docRef.id, ...user };

//     dispatch(adduser(user_data));
//   }
// }

// export const editPostFB = (user, user_id) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, "user", user_id);

//     await updateDoc(docRef, { ...user, ...user });

//     const _user_list = getState().user.list;
//     const user_index = _user_list.findIndex((b) => {
//       return b.id === user_id;
//     })

//     dispatch(edituser(user, user_index));
//   };
// };

// export const deletePostFB = (user_id) => {
//   return async function (dispatch, getState) {
//     if (!user_id) {
//       return;
//     }
//     const docRef = doc(db, "user", user_id);
//     await deleteDoc(docRef);

//     const _user_list = getState().user.list;
//     const user_index = _user_list.findIndex((b) => {
//       return b.id === user_id;
//     });

//     dispatch(deleteuser(user_index));
//   }
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "user/LOAD": {
      return { list: action.user_list };
    }

    case "user/ADD": {
      const new_user_list = [action.user, ...state.list];
      return { list: new_user_list };
    }

    case "user/EDIT": {
      const edit_user_list = state.list.map((user, idx) => {
        return Number(action.user_index) === idx
          ? { ...user, ...action.user }
          : user;
      });
      return { ...state, list: edit_user_list };
    }

    case "user/DELETE": {
      const new_user_list = state.list.filter((l, idx) => {
        return parseInt(action.user_index) !== idx;
      });

      return { list: new_user_list };
    }

    default:
      return state;
  }
}