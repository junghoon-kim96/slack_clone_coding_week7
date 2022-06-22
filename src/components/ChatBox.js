import React from "react";
import styled from "styled-components";
import logo from "../pages/Login/image/slackLogo.png"
import { useDispatch, useSelector } from "react-redux";
import { LoadChatAxios } from "../redux/modules/chatlist";

import * as StompJS from "stompjs";
import * as SockJS from "sockjs-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ChatBox = (props) => {
    const dispatch = useDispatch();
    //채널 정보
    const { channelInfo } = props;
    console.log(channelInfo.channelId);
    const channelId = channelInfo.channelId
    const headers = { "Authorization": localStorage.getItem('access_token') };
    //메세지 보내기
    const [message, setMessage] = React.useState("");
    //채팅 기록
    const chattinglist = useSelector((state) => state.chatlist.list);
    const [chatting, setChatting] = React.useState(chattinglist);

    React.useEffect(() => {
        dispatch(LoadChatAxios(channelId))
        connect();
        return () => { };
    }, [channelInfo])


    let sock = new SockJS("http://54.180.154.178/socket");
    let client = StompJS.over(sock);

    //socket
    const connect = () => {
        client.connect(headers, onConnected, onError);
    };

    const onConnected = () => {
        client.subscribe(`/sub/channel/${channelId}`,
            // onMessageReceived
            function (message) {
                console.log(message)
                if (message.body) {
                    alert(message.body)
                } else {
                    alert("got empty message");
                }
            }
        );
    };

    const onError = (err) => {
        console.log(err);
    }

    // const onMessageReceived = (payload) => {
    //     console.log(payload)
    //     // var payloadData = JSON.parse(payload.body);
    //     // console.log(payloadData);
    // const newchating = [payload, ...chattinglist];
    //     setChatting(newchating);
    // }

    const sendMessage = () => {
        client.send(`/pub/message/${channelId}`, headers, JSON.stringify({
            message: message,
        }))

    }


    return (
        <CenterBody>
            <CenterHeader>
                <ChannelTitle>
                    {(channelInfo.isPrivate === true) ?
                        (<FontAwesomeIcon icon="fa-lock" style={{ color: "gray" }} />)
                        : (<FontAwesomeIcon icon="fa-lock-open" style={{ color: "gray" }} />)}
                    <div style={{ marginLeft: "10px" }}>{channelInfo.channelName}</div>
                </ChannelTitle>
                {/* <div>
                    {channelInfo.description}
                </div> */}
            </CenterHeader>
            <ChattingDiv>
                {chatting.map((list, idx) => {
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
                    onChange={(e) => { setMessage(e.target.value) }}
                    placeholder="메세지 보내기" />
                <button onClick={sendMessage}>보내기</button>
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

export default ChatBox