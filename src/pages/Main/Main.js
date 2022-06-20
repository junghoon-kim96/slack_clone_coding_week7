import React from "react";
import styled from "styled-components";
import logo from "../Login/image/slackLogo.png"



const Main = () => {

    const channel = {
        list: ["7기_c반_공지방", "6기_c반_공지방", "5기_c반_공지방", "4기_c반_공지방", "3기_c반_공지방"],
        dm: ["최성우", "하율찬", "김정훈", "김창규", "김이안"]
    };
    const user = {
        nickname: "최성우",
        email: "tjddn8195@naver.com"
    }

    const chat = [
        {
            nickname: "최성우",
            message: "이렇게 하는게 맞나?",
            img: logo
        },
        {
            nickname: "하율찬",
            message: "아마도? 맞나?",
            img: logo
        },
    ];



    const [ch, setCh] = React.useState(false);
    const [Dm, setDm] = React.useState(false);
    const [profile, setProfile] = React.useState(false);


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

    return (
        < Page >
            <Head >
                <LeftHead>돋보기</LeftHead>
                <CenterHead>
                    <SearchID>검색하기</SearchID>
                </CenterHead>
                <RightHead>
                    <ProfileImg src={logo} onClick={() => setProfile(true)} />
                </RightHead>
            </Head >
            <Body>
                <LefeBody>
                    <LeftTitle>
                        <LeftT>HangHae99</LeftT>
                        <LeftNewBtn>작</LeftNewBtn>
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
                                {channel.list.map((list, idx) => {
                                    return (
                                        <LeftMapList key={idx}>
                                            <div style={{ width: "20px", height: "20px" }}>👌</div>
                                            <div style={{ marginLeft: "10px" }}>{list}</div>
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
                                            <div style={{ marginLeft: "10px" }}>{list}</div>
                                        </LeftMapList>
                                    )
                                })}
                            </LeftMap>
                        ) : (null)}
                    </LeftChannel>
                </LefeBody>

                <CenterBody>
                    <CenterHeader>
                        <ChannelTitle>
                            <div style={{ marginRight: "5px" }}>👌</div>
                            <div>채널 타이틀</div>
                        </ChannelTitle>
                        <ChannelPeople>
                            <div style={{ marginRight: "5px" }}>👌</div>
                            <div>71</div>
                        </ChannelPeople>
                    </CenterHeader>
                    <ChattingDiv>
                        {chat.map((list, idx) => {
                            return (
                                <SingleMes key={idx}>
                                    <ChatImg src={list.img} />
                                    <SingleMesInfo>
                                        <div style={{fontWeight:"600"}}>{list.nickname}</div>
                                        <div>{list.message}</div>
                                    </SingleMesInfo>
                                </SingleMes>
                            )
                        })
                        }
                    </ChattingDiv>
                    <MessageBox> 
                        <MessageInput placeholder="메세지 보내기" />
                        </MessageBox>
                </CenterBody>

                {profile ? (
                    <RightBody>
                        <Profile>
                            <div style={{ marginRight: "75%" }}>프로필</div>
                            <div onClick={() => setProfile(false)}>x</div>
                        </Profile>
                        <ProfileBig src={logo} />
                        <NameEditDiv>
                            <ProfileName>{user.nickname}</ProfileName>
                            <Edit>편집</Edit>
                        </NameEditDiv>
                        <ContactDiv>
                            <ContInfo>Contact information</ContInfo>
                            <Edit>Edit</Edit>
                        </ContactDiv>
                        <InfoDiv>
                            <EmailIcon>✉</EmailIcon>
                            <EmailDiv >
                                <h5 style={{ margin: "0" }}>Email Address</h5>
                                <EmailInfo>{user.email}</EmailInfo>
                            </EmailDiv >
                        </InfoDiv>
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

// 가운데 채팅
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
border: 1px solid red;
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

const SingleMesInfo =styled.div`
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
padding: 5px;
border: 1px solid lightgray;
border-radius: 5px;
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