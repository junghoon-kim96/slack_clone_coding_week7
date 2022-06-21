// channel.js
//AXIOS
import axios from "axios";
// Actions

const LOAD = "channel/LOAD";
const ADD = "channel/ADD";
const DELETE = "channel/DELETE";

const initialState = {
  list: [{
    channelId: "123",
    channelName: "채널 이름",
    isPrivate: true,
    isOwner : false,
    userList : [ "userId", "userId" ]
    },
    {
    channelId: "123",
    channelName: "채널 1",
    isPrivate: false,
    isOwner : true,
    userList : [ "userId", "userId" ]
    },],
};

// Action Creators
export function loadchannel(channel_list) {
  return { type: LOAD, channel_list };
}

export function addchannel(channel) {
  return { type: ADD, channel: channel };
}

export function deletechannel(channel_index) {
  return { type: DELETE, channel_index };
}

// // middlewares

export const LoadChannelAxios = () => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/api/channelList",
        method: "get",
        baseURL: "http://52.78.217.50:8080",
        headers:""
      }
    )
      .then(response => {
        const axios_data = response.data;
        let channel_list = [...axios_data];
        dispatch(loadchannel(channel_list));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}


export const AddChaListAxios = () => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/api/channel",
        method: "post",
        data:{
          channelName: "채널이름",
          description : "채널 설명",
          isPrivate: true,
          userList : [ "userId", "userId" ]
          },
        baseURL: "http://52.78.217.50:8080",
        headers:"",
      }
    )
      .then(response => {
        const axios_data = response.data;
        dispatch(addchannel(axios_data));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}

export const DelChaListAxios = (channelId) => {
  axios.defaults.withCredentials = true;
  return async function (dispatch) {
    await axios(
      {
        url: "/api/channel/" + channelId,
        method: "delete",
        baseURL: "http://52.78.217.50:8080",
        headers:"",
      }
    )
      .then(response => {
        console.log(response);
        const _channel_list = initialState.list;
        const channel_index = _channel_list.findIndex((b) => {
          return b.id === channelId;
        });
        dispatch(deletechannel(channel_index));
      })
      .catch((response) => {
        window.alert(response.message)
      });
  }
}


// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case "channel/LOAD": {
      return { list: action.channel_list };
    }

    case "channel/ADD": {
      const new_channel_list = [action.channel, ...state.list];
      return { list: new_channel_list };
    }

    case "channel/DELETE": {
      const new_channel_list = state.list.filter((l, idx) => {
        return parseInt(action.channel_index) !== idx;
      });

      return { list: new_channel_list };
    }

    default:
      return state;
  }
}