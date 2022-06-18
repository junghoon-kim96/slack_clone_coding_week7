// chatlist.js
//AXIOS
import axios from "axios";
// Actions


const LOAD = "chatlist/LOAD";
const ADD = "chatlist/ADD";
const EDIT = "chatlist/EDIT";
const DELETE = "chatlist/DELETE";

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
export function loadchatlist(chatlist_list) {
  return { type: LOAD, chatlist_list };
}

export function addchatlist(chatlist) {
  return { type: ADD, chatlist: chatlist };
}

export function editchatlist(chatlist, chatlist_index) {
  return { type: EDIT, chatlist, chatlist_index };
}

export function deletechatlist(chatlist_index) {
  return { type: DELETE, chatlist_index };
}

// // middlewares

export const LoadPostAxios = () => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/chatlist/all",
        method: "get",
        baseURL: "http://52.78.217.50:8080",
      }
    )
      .then(response => {
        const axios_data = response.data;
        let chatlist_list = [...axios_data];
        dispatch(loadchatlist(chatlist_list));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

// export const loadPostFB = () => {
//   return async function (dispatch) {
//     const chatlist_data = await getDocs(query(collection(db, "chatlist"), orderBy("timestamp", "desc")));
//     let chatlist_list = [];

//     chatlist_data.forEach((b) => {
//       chatlist_list.push({ id: b.id, ...b.data() });
//     });

//     dispatch(loadchatlist(chatlist_list));
//   }
// }

// export const addPostFB = (chatlist) => {
//   return async function (dispatch) {
//     const docRef = await addDoc(collection(db, "chatlist"), chatlist);
//     const chatlist_data = { id: docRef.id, ...chatlist };

//     dispatch(addchatlist(chatlist_data));
//   }
// }

// export const editPostFB = (chatlist, chatlist_id) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, "chatlist", chatlist_id);

//     await updateDoc(docRef, { ...chatlist, ...chatlist });

//     const _chatlist_list = getState().chatlist.list;
//     const chatlist_index = _chatlist_list.findIndex((b) => {
//       return b.id === chatlist_id;
//     })

//     dispatch(editchatlist(chatlist, chatlist_index));
//   };
// };

// export const deletePostFB = (chatlist_id) => {
//   return async function (dispatch, getState) {
//     if (!chatlist_id) {
//       return;
//     }
//     const docRef = doc(db, "chatlist", chatlist_id);
//     await deleteDoc(docRef);

//     const _chatlist_list = getState().chatlist.list;
//     const chatlist_index = _chatlist_list.findIndex((b) => {
//       return b.id === chatlist_id;
//     });

//     dispatch(deletechatlist(chatlist_index));
//   }
// }

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "chatlist/LOAD": {
      return { list: action.chatlist_list };
    }

    case "chatlist/ADD": {
      const new_chatlist_list = [action.chatlist, ...state.list];
      return { list: new_chatlist_list };
    }

    case "chatlist/EDIT": {
      const edit_chatlist_list = state.list.map((chatlist, idx) => {
        return Number(action.chatlist_index) === idx
          ? { ...chatlist, ...action.chatlist }
          : chatlist;
      });
      return { ...state, list: edit_chatlist_list };
    }

    case "chatlist/DELETE": {
      const new_chatlist_list = state.list.filter((l, idx) => {
        return parseInt(action.chatlist_index) !== idx;
      });

      return { list: new_chatlist_list };
    }

    default:
      return state;
  }
}