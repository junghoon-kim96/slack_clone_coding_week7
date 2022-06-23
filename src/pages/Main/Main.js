import React from "react";
import styled from "styled-components";
import logo from "../Login/image/slackLogo.png"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadChannelAxios, DelChaListAxios } from "../../redux/modules/channel";
import { delchatlist } from "../../redux/modules/chatlist";

import ChatBox from "../../components/ChatBox"
import Modal from './Modal'
import SearchUser from "./SearchUser";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 채널 리스트 get axios
    React.useEffect(() => {
        dispatch(loadChannelAxios());
    }, [])

    // 채널 리스트 가져오기
    const chaList = useSelector((state) => state.channel.list);

    function FindChIndex(id) {
        let index = 0;
        for (let i = 0; i < chaList.length; i++) {
            if (id === chaList[i].channelId) {
                index += i;
            }
        }
        return (index);
    }

    const DelChaList = (channelId) => {
        dispatch(DelChaListAxios(FindChIndex(channelId), channelId));
        SetChannelInfo({});
        dispatch(delchatlist());  
    }



    // 채널 정보 넘기기
    const [channelInfo, SetChannelInfo] = React.useState({});
    console.log(channelInfo)
    //우측 프로필 칸
    // 로그인 유저 정보 -> localstorage.getItem(user) 사용
    const username = localStorage.getItem("username");
    const nickname = localStorage.getItem("nickname");
    const iconUrl = localStorage.getItem("iconUrl");


    //프로필 창 용
    const [proInfo, setProInfo] = React.useState({
        username: "",
        nickname: "",
        iconUrl: "",
    })

    const UserProfile = () => {
        setProInfo({
            username: username,
            nickname: nickname,
            iconUrl: iconUrl,
        });
        setProfile(true);
    }

    //프로필 창 열고 닫기
    const [profile, setProfile] = React.useState(false);

    //채널 메세지 열고 닫기
    const [ch, setCh] = React.useState(false);
    const [Dm, setDm] = React.useState(false);
    const isChOpen = () => {
        if (ch) {
            setCh(false);
        } else {
            setCh(true);
        }
    }
    const isDmOpen = () => {
        if (Dm) {
            setDm(false);
        } else {
            setDm(true);
        }
    }

    // 로그아웃
    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("username");
        localStorage.removeItem("nickname");
        localStorage.removeItem("iconUrl");
        dispatch(delchatlist());       
        alert("로그아웃 하셨습니다.");
        navigate("/login");
    }

    // 모달창 오픈
    const [openMoadal, setOpenMoadal] = React.useState(false);
    const [openSearch, setOpenSearch] = React.useState(false);
    const [searchBar, setSearchBar] = React.useState(false);
    // 조원 이름
    const channel = {
        dm: ["최성우", "하율찬", "김정훈", "김창규", "김이안"]
    };

    return (
        < Page >
            <Head >
                <LeftHead></LeftHead>
                <CenterHead>
                    <SearchID onClick={() => { setOpenSearch(true) }}>채널에 추가할 아이디 검색</SearchID>
                    {openSearch && searchBar && <SearchUser closeSearch={setOpenSearch} channelInfo={channelInfo} />}
                </CenterHead>
                <RightHead>
                    <ProfileImg src={iconUrl} onClick={UserProfile} />
                </RightHead>
            </Head >
            <Body>
                <LefeBody>
                    <LeftTitle>
                        <LeftT>HangHae99</LeftT>
                        <LeftNewBtn onClick={() => {
                            setOpenMoadal(true);
                        }}>
                            <FontAwesomeIcon icon="fa-pen" />
                        </LeftNewBtn>
                        {openMoadal && <Modal closeModal={setOpenMoadal} />}
                    </LeftTitle>
                    <LeftChannel>


                        <LeftChTi>
                            {ch ? (
                                <TriT onClick={isChOpen}>▼</TriT>
                            ) : (
                                <TriF onClick={isChOpen}>▼</TriF>
                            )}
                            <div style={{ marginLeft: "10px" }}>채널</div>
                        </LeftChTi>
                        {ch ? (
                            <LeftMap>
                                {chaList.map((list, idx) => {
                                    return (
                                        <div style={{ display: "flex", flexDirection: "row" }} key={idx}>
                                            <LeftMapList onClick={() => {SetChannelInfo(list); setSearchBar(true);}}>
                                                {(list.isPrivate === true) ?
                                                    (<FontAwesomeIcon icon="fa-lock" />)
                                                    : (<FontAwesomeIcon icon="fa-hashtag" />)}
                                                <div style={{ marginLeft: "10px", width: "95%" }}>{list.channelName}</div>
                                            </LeftMapList>
                                            {
                                                (list.isOwner === true) ?
                                                    (<div onClick={() => { DelChaList(list.channelId) }}>x</div>) : (null)
                                            }
                                        </div>
                                    )
                                })}
                            </LeftMap>
                        ) : (null)}
                    </LeftChannel>
                    <LeftChannel>
                        <LeftChTi>
                            {Dm ? (
                                <TriT onClick={isDmOpen}>▼</TriT>
                            ) : (
                                <TriF onClick={isDmOpen}>▼</TriF>
                            )}
                            <div style={{ marginLeft: "10px" }}>Developer</div>
                        </LeftChTi>
                        {Dm ? (
                            <LeftMap>
                                {channel.dm.map((list, idx) => {
                                    return (
                                        <LeftMapList key={idx}>
                                            <div style={{ width: "20px", height: "20px" }}>👌</div>
                                            <div style={{ marginLeft: "10px", marginRight: "55%" }}>{list}</div>
                                        </LeftMapList>
                                    )
                                })}
                            </LeftMap>
                        ) : (null)}
                    </LeftChannel>
                </LefeBody>
                <ChatBox channelInfo={channelInfo} openProfile={setProfile} userInfo={setProInfo} />
                {profile ? (
                    <RightBody>
                        <Profile>
                            <div style={{ marginRight: "75%" }}>프로필</div>
                            <div onClick={() => setProfile(false)}>x</div>
                        </Profile>
                        <ProfileBig src={proInfo.iconUrl} />
                        <NameEditDiv>
                            <ProfileName>{proInfo.nickname}</ProfileName>
                        </NameEditDiv>
                        <ContactDiv>
                            <ContInfo>Contact information</ContInfo>
                        </ContactDiv>
                        <InfoDiv>
                            <EmailIcon>✉</EmailIcon>
                            <EmailDiv >
                                <h5 style={{ margin: "0" }}>Email Address</h5>
                                <EmailInfo>{proInfo.username}</EmailInfo>
                            </EmailDiv >
                        </InfoDiv>
                        {(proInfo.username === username) ? (
                            <button style={{ width: "80%", margin: "0 auto" }} onClick={logout}>로그아웃</button>
                        ) : (null)}
                    </RightBody>
                ) : (null)}
            </Body>
        </ Page >
    )
}

const Page = styled.div`
width : 100vw;
height: 100vh;
display: flex;
flex-direction: column;
`;
//상단 헤더
const Head = styled.div`
background: #350d36;
box-shadow: 0 1px 0 0 rgb(255 255 255 /10%);
display: flex;
flex-direction: row;
align-items: center;
position: relative;
z-index: 203;
min-width: 0;
padding:10px;
height: 44px;
`
const LeftHead = styled.div`
display: flex;
align-items: center;
justify-content: center;
color: white;
width: 20vw;
height: 100%;
margin: 0;
`;

const RightHead = styled.div`
align-items: center;
color: white;
box-sizing: border-box;
display: flex;
justify-content: flex-end;
padding-left: 32px;
padding-right: 16px;
position: relative;
width: 10vw;
height: 100%;
margin: 0;
`;

const CenterHead = styled.div`
width: 80vw;
padding:0;
margin:0;
`;

const SearchID = styled.button`
align-items: center;
text-align: left;
margin: 0;
width: 80%;
background-color: rgba(255, 255, 255, 0.2);
border : 0px solid transparent;
border-radius: 4px;
color: white;
font-size: 15px;
font-weight: 400;
line-height: 22.0002px;
height: 26px;
max-width: 732px;
padding: 0 8px;
`;

const ProfileImg = styled.img`
width: 26px;
height: 26px;
border-radius: 4px;
background-color: white;
box-sizing: border-box;
display: inline-block;
`;

const Body = styled.div`
display: flex;
flex-direction: row;
background-color: lightblue;
width: 100%;
height: 100%;
`;
// 왼쪽 리스트
const LefeBody = styled.div`
background-color: #460046; 
border: rgb(82,38,83);
width: 17vw;
min-width: 250px;
`;

const LeftTitle = styled.div`
display: flex;
flex-direction: row;
align-items: center;
border-bottom: 1px solid rgb(82,38,83);
padding: 0 19px 0 16px;
position: relative;
z-index: 1;
color: white;
font-size: 18px;
font-weight: 600;
height: 49px;
`;

const LeftT = styled.div`
width: 80%;
`;

const LeftNewBtn = styled.button`
width: 34px;
height: 34px;
border: 0px solid;
border-radius: 17px;
`;

const LeftChannel = styled.div`
padding: 20px 10px;
border-bottom: 1px solid rgb(82,38,83);
color: #c3b7c3;
font-weight: 500;
`;

const LeftChTi = styled.div`
display: flex;
flex-direction: row;
padding:0 10px;
`;

const TriF = styled.div`
width: 20px;
height: 20px;
transition: 100ms;
&:hover{
background-color: rgba(255,255,255, 0.2);
};
transform: rotate(270deg);
border-radius: 5px;
`;

const TriT = styled.div`
width: 20px;
height: 20px;
transition: 100ms;
&:hover{
background-color: rgba(255,255,255,0.2);
};
border-radius: 5px;

`;

const LeftMap = styled.div`
display: flex;
margin-top: 10px;
flex-direction: column;
gap: 5px;
padding:0 10px;
`;

const LeftMapList = styled.div`
display: flex;
flex-direction: row;
width:90%;
`;



//오른쪽 프로필
const RightBody = styled.div`
display: flex;
flex-direction: column;
min-width: 356px;
width: 20vw;
background-color: #ffffff;
margin-right: 0px;
border-left: 1px solid lightgray;
`;

const Profile = styled.div`
display: flex;
flex-direction: row;
align-items: center;
padding: 10px 20px;
margin: 10px 0;
font-size: 20px;
font-weight: 600;
border-bottom: 1px solid lightgray;
`;

const ProfileBig = styled.img`
width: 256px;
height: 256px;
margin: 10px auto;
border: 0.5px solid lightgray;
border-radius: 5px;
`;

const NameEditDiv = styled.div`
display: flex;
flex-direction: row;
margin: 10px 0;
padding: 20px;
border-bottom: 1px solid lightgray;
`;

const ProfileName = styled.div`
font-size: 25px;
font-weight: 600;
margin-right: 60%;
`;

const Edit = styled.strong`
color: #5280ad;
&:hover{
    text-decoration: underline;
    color: blue;
}
`

const ContactDiv = styled.div`
display: flex;
flex-direction: row;
margin: 0;
padding: 10px 20px;
`;

const ContInfo = styled.div`
font-size: 15px;
font-weight: 700;
margin-right: 40%;
`;

const InfoDiv = styled.div`
display: flex;
flex-direction: row;
height: 40px;
padding: 10px 20px;
`;

const EmailIcon = styled.div`
background-color: #f6f6f6;
border-radius: 2px;
height: 40px;
width: 40px;
margin: 0 5px 0 0;
line-height: 40px;
font-size: 20px;
`;

const EmailDiv = styled.div`
display: flex;
flex-direction: column;
margin: 0;
height: 50px;
text-align: left;
`;

const EmailInfo = styled.div`
margin: 0;
color: #5d88b3;
&:hover{
    text-decoration: underline;
    color: blue;
}
`
export default Main;