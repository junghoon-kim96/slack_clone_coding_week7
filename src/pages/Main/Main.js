import React from "react";
import styled from "styled-components";
import logo from "../Login/image/slackLogo.png"
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LoadChannelAxios, addchannel, AddChaListAxios, deletechannel, DelChaListAxios } from "../../redux/modules/channel";

import ChatBox from "../../components/ChatBox"
import Modal from './Modal'

const Main = () => {
    // const navigate = useNavigate();
    const dispatch = useDispatch();

    // 채널 리스트 get axios
    // React.useEffect(() => {
    //     dispatch(LoadChannelAxios());
    // },[])
    // 채널 리스트 가져오기
    const chaList = useSelector((state) => state.channel.list);
    // 채널 추가하기
    // const AddChaList = () => {           모달에창에서
    //     dispatch(addchannel({
    //         channelId: "123",
    //         channelName: "채널 이름3",
    //         isPrivate: true,
    //         isOwner: false,
    //     }));
        // dispatch(AddChaListAxios({
        //     channelId: "123",
        //     channelName: "채널 이름3",
        //     isPrivate: true,
        //     isOwner: false,
        // }));
    // }
    //채널 추가 시 필요
    // const createRoom = async () => {
    //     await axios(
    //       {
    //         url: "/room",
    //         method: "post",
    //         baseURL: "http://54.180.154.178",
    //         data: {
    //           "name": roomId,
    //         },
    //       })
    //       .then((res) => {
    //         console.log(JSON.stringify(res.data));
    //         setRoomId(res.data.roomId);
    //         getRoom();
    //       })
    //       .catch((error) => {
    //         console.log(error);
    //       });
    //   }
    const DelChaList = (channelId) => {
        // dispatch(DelChaListAxios(channelId));
        // dispatch(deletechannel(channelId));
    }

    const channel = {
        dm: ["최성우", "하율찬", "김정훈", "김창규", "김이안"]
    };

    // 채널 정보 넘기기
    const [channelInfo, SetChannelInfo] = React.useState({});

    //우측 프로필 칸
    // 로그인 유저 정보 -> localstorage.getItem(user) 사용
    const user = useSelector((state) => state.user.list);
    //다른 사람 프로필 검색할 때 사용
    const new_user = useSelector((state) => state.user.new);
    const [proInfo, setProInfo] = React.useState({
        userId: "",
        username: "",
        nickname: "",
        iconUrl: "",
    })
    const UserProfile = () => {
        setProInfo(user);
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

    const logout = () => {
        // localStorage.removeItem("Authorization");
        // localStorage.removeItem("RefreshToken");
        // localStorage.removeItem("user");
        // navigate("/login");
    }

    const [openMoadal,setOpenMoadal] = React.useState(false);

    return (
        < Page >
            <Head >
                <LeftHead>돋보기</LeftHead>
                <CenterHead>
                    <SearchID>검색하기</SearchID>
                </CenterHead>
                <RightHead>
                    <ProfileImg src={logo} onClick={UserProfile} />
                </RightHead>
            </Head >
            <Body>
                <LefeBody>
                    <LeftTitle>
                        <LeftT>HangHae99</LeftT>
                        <LeftNewBtn onClick={()=> {
                            setOpenMoadal(true);
                        }}>작</LeftNewBtn>
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
                                        <LeftMapList onClick={()=>SetChannelInfo(list)} key={idx}>
                                            {(list.isPrivate === true) ?
                                                (<div style={{ width: "20px", height: "20px" }}>👌</div>)
                                                : (<div style={{ width: "20px", height: "20px" }}>🖐</div>)}
                                            <div style={{ marginLeft: "10px", marginRight: "40%" }}>{list.channelName}</div>
                                            {(list.isPrivate === true) ?
                                                (<div onClick={()=>{DelChaList(list.channelId)}}>x</div>) : (null)}
                                        </LeftMapList>
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
                            <div style={{ marginLeft: "10px" }}>다이렉트 메세지</div>
                        </LeftChTi>
                        {Dm ? (
                            <LeftMap>
                                {channel.dm.map((list, idx) => {
                                    return (
                                        <LeftMapList key={idx}>
                                            <div style={{ width: "20px", height: "20px" }}>👌</div>
                                            <div style={{ marginLeft: "10px", marginRight: "55%" }}>{list}</div>
                                            <div>x</div>
                                        </LeftMapList>
                                    )
                                })}
                            </LeftMap>
                        ) : (null)}
                    </LeftChannel>
                </LefeBody>
                <ChatBox channelInfo = {channelInfo}/>
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
                        <button style={{ width: "80%", margin: "0 auto" }} onClick={logout}>로그아웃</button>
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
height: 44px;
`
const LeftHead = styled.div`
display: flex;
align-items: center;
justify-content: center;
color: white;
width: 10vw;
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
justify-content: space-between;
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