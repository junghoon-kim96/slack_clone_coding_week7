// channel.js
//AXIOS
// import axios from "axios";
// Actions


const LOAD = "channel/LOAD";
const ADD = "channel/ADD";
const EDIT = "channel/EDIT";
const DELETE = "channel/DELETE";

const initialState = {
  list: [],
};

// Action Creators
export function loadchannel(channel_list) {
  return { type: LOAD, channel_list };
}

export function addchannel(channel) {
  return { type: ADD, channel: channel };
}

export function editchannel(channel, channel_index) {
  return { type: EDIT, channel, channel_index };
}

export function deletechannel(channel_index) {
  return { type: DELETE, channel_index };
}

// // middlewares

// export const LoadPostAxios = () => {
//   axios.defaults.withCredentials = true;
//   return async function (dispatch) {
//     await axios(
//       {
//         url: "/channel/all",
//         method: "get",
//         baseURL: "http://52.78.217.50:8080",
//       }
//     )
//       .then(response => {
//         const axios_data = response.data;
//         let channel_list = [...axios_data];
//         dispatch(loadchannel(channel_list));
//       })
//       .catch((response) => {
//         window.alert(response.message)
//       });
//   }
// }

// export const loadPostFB = () => {
//   return async function (dispatch) {
//     const channel_data = await getDocs(query(collection(db, "channel"), orderBy("timestamp", "desc")));
//     let channel_list = [];

//     channel_data.forEach((b) => {
//       channel_list.push({ id: b.id, ...b.data() });
//     });

//     dispatch(loadchannel(channel_list));
//   }
// }

// export const addPostFB = (channel) => {
//   return async function (dispatch) {
//     const docRef = await addDoc(collection(db, "channel"), channel);
//     const channel_data = { id: docRef.id, ...channel };

//     dispatch(addchannel(channel_data));
//   }
// }

// export const editPostFB = (channel, channel_id) => {
//   return async function (dispatch, getState) {
//     const docRef = doc(db, "channel", channel_id);

//     await updateDoc(docRef, { ...channel, ...channel });

//     const _channel_list = getState().channel.list;
//     const channel_index = _channel_list.findIndex((b) => {
//       return b.id === channel_id;
//     })

//     dispatch(editchannel(channel, channel_index));
//   };
// };

// export const deletePostFB = (channel_id) => {
//   return async function (dispatch, getState) {
//     if (!channel_id) {
//       return;
//     }
//     const docRef = doc(db, "channel", channel_id);
//     await deleteDoc(docRef);

//     const _channel_list = getState().channel.list;
//     const channel_index = _channel_list.findIndex((b) => {
//       return b.id === channel_id;
//     });

//     dispatch(deletechannel(channel_index));
//   }
// }

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

    case "channel/EDIT": {
      const edit_channel_list = state.list.map((channel, idx) => {
        return Number(action.channel_index) === idx
          ? { ...channel, ...action.channel }
          : channel;
      });
      return { ...state, list: edit_channel_list };
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