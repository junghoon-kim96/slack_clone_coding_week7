<<<<<<< HEAD
import React from "react";
import styled from "styled-components";
import logo from "../pages/Login/image/slackLogo.png"
import { useDispatch, useSelector } from "react-redux";
// import { LoadChatAxios, adduser, deleteuser } from "../redux/modules/channel";

// import * as StompJS from "stompjs";
// import * as SockJS from "sockjs-client";

const ChatBox = (props) => {
    const dispatch = useDispatch();
    //채널 정보
    const { channelInfo } = props;

    // React.useEffect(() => {
    //     dispatch(LoadChatAxios(channelInfo.channelId));
    //     connect();
    //     return () => {};
    // }, [])

    //socket
    // const [chatting, setChatting] = React.useState([]);
    // const [message, setMessage] = React.useState("");

    // let sock = new SockJS("http://54.180.154.178/socket");
    // let client = StompJS.over(sock);

    // const connect = () => {
    //     client.connect({}, onConnected, onError);
    // };

    // const onConnected = () => {
    //     client.subscribe("/sub/channel/" + channelInfo.channelId,
    //         // onMessageReceived
    //         function (message) {
    //             console.log(message)
    //             if (message.body) {
    //                 alert(message.body)
    //             } else {
    //                 alert("got empty message");
    //             }
    //         }
    //     );
    // };
    // const onError = (err) => {
    //     console.log(err);
    // }

    // const onMessageReceived = (payload) => {
    //     console.log(payload)
    //     // var payloadData = JSON.parse(payload.body);
    //     // console.log(payloadData);
    //     // dispatch(addchatlist({nickname:"", message:"", iconUrl:""}))
    //     setChatting((list) => [...list, payload]);
    // }

    // const sendMessage = () => {
    //     client.send("/pub/message", {}, JSON.stringify({
    //         roomId: roomId,
    //         message: message,
    //     }))
    // }

    const chattinglist = useSelector((state) => state.chatlist.list);
    // const newProfile = (list) =>{
    //     dispatch(deleteuser(0));
    //     dispatch(adduser(list))
    // }
    return (
        <CenterBody>
            <CenterHeader>
                <ChannelTitle>
                    {(channelInfo.isPrivate === true) ?
                        (<div style={{ width: "20px", height: "20px" }}>👌</div>)
                        : (<div style={{ width: "20px", height: "20px" }}>🖐</div>)}
                    <div style={{ marginLeft: "10px" }}>{channelInfo.channelName}</div>
                </ChannelTitle>
                <ChannelPeople>
                    <div style={{ marginRight: "5px" }}>👌</div>
                    <div>71</div>
                </ChannelPeople>
            </CenterHeader>
            <ChattingDiv>
                {chattinglist.map((list, idx) => {
                    return (
                        <SingleMes 
                        // onClick={newProfile}
                        key={idx}>
                            <ChatImg src={list.iconUrl} />
                            <SingleMesInfo>
                                <div style={{ fontWeight: "600" }}>{list.nickname}</div>
                                <div>{list.message}</div>
                            </SingleMesInfo>
                        </SingleMes>
                    )
                })
                }
            </ChattingDiv>
            <MessageBox>
                <MessageInput
                // onChange={(e) => { setMessage(e.target.value) }} 
                placeholder="메세지 보내기" />
                {/* <button onClick={sendMessage}>보내기</button> */}
            </MessageBox>
        </CenterBody>
    )
}

const CenterBody = styled.div`
width:100%;
background-color: white;
`;

const CenterHeader = styled.div`
z-index: 10;
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 20px;
margin: 10px 0;
font-size: 20px;
font-weight: 600;
border-bottom: 1px solid lightgray;
`;

const ChannelTitle = styled.div`
display: flex;
flex-direction: row;
margin-right: 72%;
`;

const ChannelPeople = styled.div`
display: flex;
flex-direction: row;
border: 1px solid lightgray;
padding: 0 10px;
font-size: 15px;
`
const ChattingDiv = styled.div`
display: flex;
flex-direction: column-reverse;
width: calc(100%-20px);
height: 70%;
padding: 20px;
border: 1px solid black;
`;

const SingleMes = styled.div`
display: flex;
flex-direction: row;
border-radius: 5px;
margin: 5px 0;
&:hover{
    background-color: #ececec;
}
`;

const ChatImg = styled.img`
width: 36px;
height: 36px;
border-radius: 5px;
`;

const SingleMesInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 10px;
text-align: left;
`;

const MessageBox = styled.div`
height: 116px;
position: relative;
width: calc(100%-20px);
top: 10px;
margin: 0px;
`;

const MessageInput = styled.input`
width: 95%;
height: 85%;
min-height: 95px;
padding: 5px;
border: 1px solid lightgray;
border-radius: 5px;
`;

=======
import React from "react";
import styled from "styled-components";
import logo from "../pages/Login/image/slackLogo.png"
import { useDispatch, useSelector } from "react-redux";
// import { LoadChatAxios, adduser, deleteuser } from "../redux/modules/channel";

// import * as StompJS from "stompjs";
// import * as SockJS from "sockjs-client";

const ChatBox = (props) => {
    const dispatch = useDispatch();
    //채널 정보
    const { channelInfo } = props;

    // React.useEffect(() => {
    //     dispatch(LoadChatAxios(channelInfo.channelId));
    //     connect();
    //     return () => {};
    // }, [])

    //socket
    // const [chatting, setChatting] = React.useState([]);
    // const [message, setMessage] = React.useState("");

    // let sock = new SockJS("http://54.180.154.178/socket");
    // let client = StompJS.over(sock);

    // const connect = () => {
    //     client.connect({}, onConnected, onError);
    // };

    // const onConnected = () => {
    //     client.subscribe("/sub/channel/" + channelInfo.channelId,
    //         // onMessageReceived
    //         function (message) {
    //             console.log(message)
    //             if (message.body) {
    //                 alert(message.body)
    //             } else {
    //                 alert("got empty message");
    //             }
    //         }
    //     );
    // };
    // const onError = (err) => {
    //     console.log(err);
    // }

    // const onMessageReceived = (payload) => {
    //     console.log(payload)
    //     // var payloadData = JSON.parse(payload.body);
    //     // console.log(payloadData);
    //     // dispatch(addchatlist({nickname:"", message:"", iconUrl:""}))
    //     setChatting((list) => [...list, payload]);
    // }

    // const sendMessage = () => {
    //     client.send("/pub/message", {}, JSON.stringify({
    //         roomId: roomId,
    //         message: message,
    //     }))
    // }

    const chattinglist = useSelector((state) => state.chatlist.list);
    // const newProfile = (list) =>{
    //     dispatch(deleteuser(0));
    //     dispatch(adduser(list))
    // }
    return (
        <CenterBody>
            <CenterHeader>
                <ChannelTitle>
                    {(channelInfo.isPrivate === true) ?
                        (<div style={{ width: "20px", height: "20px" }}>👌</div>)
                        : (<div style={{ width: "20px", height: "20px" }}>🖐</div>)}
                    <div style={{ marginLeft: "10px" }}>{channelInfo.channelName}</div>
                </ChannelTitle>
                <ChannelPeople>
                    <div style={{ marginRight: "5px" }}>👌</div>
                    <div>71</div>
                </ChannelPeople>
            </CenterHeader>
            <ChattingDiv>
                {chattinglist.map((list, idx) => {
                    return (
                        <SingleMes 
                        // onClick={newProfile}
                        key={idx}>
                            <ChatImg src={list.iconUrl} />
                            <SingleMesInfo>
                                <div style={{ fontWeight: "600" }}>{list.nickname}</div>
                                <div>{list.message}</div>
                            </SingleMesInfo>
                        </SingleMes>
                    )
                })
                }
            </ChattingDiv>
            <MessageBox>
                <MessageInput
                // onChange={(e) => { setMessage(e.target.value) }} 
                placeholder="메세지 보내기" />
                {/* <button onClick={sendMessage}>보내기</button> */}
            </MessageBox>
        </CenterBody>
    )
}

const CenterBody = styled.div`
width:100%;
background-color: white;
`;

const CenterHeader = styled.div`
z-index: 10;
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 20px;
margin: 10px 0;
font-size: 20px;
font-weight: 600;
border-bottom: 1px solid lightgray;
`;

const ChannelTitle = styled.div`
display: flex;
flex-direction: row;
margin-right: 72%;
`;

const ChannelPeople = styled.div`
display: flex;
flex-direction: row;
border: 1px solid lightgray;
padding: 0 10px;
font-size: 15px;
`
const ChattingDiv = styled.div`
display: flex;
flex-direction: column-reverse;
width: calc(100%-20px);
height: 70%;
padding: 20px;
border: 1px solid black;
`;

const SingleMes = styled.div`
display: flex;
flex-direction: row;
border-radius: 5px;
margin: 5px 0;
&:hover{
    background-color: #ececec;
}
`;

const ChatImg = styled.img`
width: 36px;
height: 36px;
border-radius: 5px;
`;

const SingleMesInfo = styled.div`
display: flex;
flex-direction: column;
margin-left: 10px;
text-align: left;
`;

const MessageBox = styled.div`
height: 116px;
position: relative;
width: calc(100%-20px);
top: 10px;
margin: 0px;
`;

const MessageInput = styled.input`
width: 95%;
height: 85%;
min-height: 95px;
padding: 5px;
border: 1px solid lightgray;
border-radius: 5px;
`;

>>>>>>> 106d094945736bd385e44783be13ed8d38526051
export default ChatBox