// chatlist.js
//AXIOS
import axios from "axios";

import logo from "../../pages/Login/image/slackLogo.png"

// Actions


const LOAD = "chatlist/LOAD";
// const ADD = "chatlist/ADD";

const initialState = {
  list: [
    {
      nickname: "최성우",
      message: "이렇게 하는게 맞나?",
      iconUrl: logo
    },
    {
      nickname: "하율찬",
      message: "아마도? 맞나?",
      iconUrl: logo
    },
  ],
};

// Action Creators
export function loadchatlist(chatlist_list) {
  return { type: LOAD, chatlist_list };
}

// export function addchatlist(chatlist) {
//   return { type: ADD, chatlist: chatlist };
// }

// // middlewares

export const LoadChatAxios = (channelId) => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: `/api/chat/${channelId}`,
        method: "get",
        baseURL: "http://54.180.154.178",
        headers: {
          "authorization": localStorage.getItem('access_token')
        },
      }
    )
      .then(response => {
        console.log(response)
        const axios_data = response.data.list;
        let chatlist_list = [...axios_data];
        dispatch(loadchatlist(chatlist_list));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "chatlist/LOAD": {
      return { list: action.chatlist_list };
    }

    // case "chatlist/ADD": {
    //   const new_chatlist_list = [action.chatlist, ...state.list];
    //   return { list: new_chatlist_list };
    // }

    default:
      return state;
  }
}