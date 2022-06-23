import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { AddUserListAxios } from "../../redux/modules/channel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchUser = (props) => {
    const dispatch = useDispatch();
    // const channelId = channelInfo.channelId

    const [invitor, setInvitor] = React.useState(false);
    const { closeSearch } = props;
    const channelId = props.channelInfo.channelId;
    const channelName = props.channelInfo.channelName;
    const isPrivate = props.channelInfo.isPrivate;
    console.log(props)
    const [userList, setUserList] = React.useState([]);
    //채널추가하기
    const AddUserList = () => {
        dispatch(AddUserListAxios({
            channelId: channelId,
            userList: userList,
        }));
        closeSearch(false)
    }

    // 추가할 아이디 검색
    const [value, setValue] = useState('');
    const [searchUser, setSearchUser] = useState([]);
    const onSearch = () => {
        axios.defaults.withCredentials = true;
        axios({
            method: 'GET',
            url: `/api/userSearch?nickname=${value}&channelId=${channelId}`,
            baseURL: "http://54.180.154.178",
            headers: {
                "authorization": localStorage.getItem('access_token')
            }
        }).then(function (response) {
            console.log(response)
            setSearchUser(response.data.list)

        }).catch(function (error) {
            alert("조회를 하지 못하였습니다.");
            console.log(error)
        })

        setValue("");

    }

    const onChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }

    const AddUser = (userId) => {
        if (userList === "" || userList === null) {
            setUserList([userId])
            setInvitor(false)
            setSearchName([FindNick(userId)])
        } else {
            setUserList([...userList, userId])
            setSearchName([...searchName, FindNick(userId)])
        } setInvitor(true)
    }

    function FindNick(id) {
        let nick = "";
        if (id === "" || id === null) {
            return (null);
        } else {
            for (let i = 0; i < searchUser.length; i++) {
                if (id === searchUser[i].userId) {
                    nick = searchUser[i].nickname;
                }
            }
            return (nick);
        }
    }

    const [searchName, setSearchName] = useState([])

    const DelUser = (index) => {
        const new_user = userList.filter((l, idx) => {
            return parseInt(index) !== idx;
        });
        setUserList(new_user);
        const new_search = searchName.filter((l, idx) => {
            return parseInt(index) !== idx;
        });
        setSearchName(new_search);
    }

    return (
        <Container>
            <Background onClick={() => closeSearch(false)} />
            <ModalBlock >
                <Close onClick={() => closeSearch(false)} >
                    <FontAwesomeIcon icon="fa-xmark" />
                </Close>
                <Contents>
                    <div>
                        {(isPrivate === true) ?
                            (<FontAwesomeIcon icon="fa-lock" style={{ color: "gray", marginRight: "5px" }} />)
                            : (<FontAwesomeIcon icon="fa-hashtag" style={{ color: "gray", marginRight: "5px" }} />)}
                        {channelName}에 사용자 추가<br />
                    </div>
                    <Label >
                        <span>친구검색하기</span>
                        <div>
                            <Input2 type="text" value={value} onChange={onChange} placeholder="예: 항해99" />
                            <Button onClick={onSearch}>search </Button>
                        </div>
                        <div style={{ height: "200px", overflowY: "auto" }}>
                            {searchUser.map((list, index) => {
                                return (
                                    <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                                        <img src={list.iconUrl} style={{ width: "50px", height: "50px", borderRadius: "10px" }} />
                                        <div style={{ textAlign: "left", margin: "0 10px" }}>
                                            <div>{list.nickname}</div>
                                            <div>{list.username}</div>
                                        </div>
                                        <Button onClick={() => AddUser(list.userId)}>ADD</Button>
                                    </div>
                                )
                            })}
                        </div>
                        {invitor ? <div style={{ border: "1px solid gray", float: 'auto', margin: "10px", padding: "15px", borderRadius: "10px" }}>
                            {userList.map((Id, index) => {
                                return (
                                    <div key={index} style={{ display: "flex", flexDirection: "row" }}>
                                        <div style={{ width: "95%", textAlign: "left" }} >{searchName[index]}</div>
                                        <button style={{ display: "inline-block", width: "20px", backgroundColor: "white", border: "1px solid white" }} onClick={() => DelUser(index)}>
                                            <FontAwesomeIcon icon="fa-xmark" />
                                        </button>
                                    </div>
                                )
                            })}
                        </div> : ""}
                    </Label>
                    <Button onClick={AddUserList}>추가</Button>
                </Contents>
            </ModalBlock>
        </Container>
    );
};

const Input2 = styled.input`
border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 60%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`

const Container = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Background = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: rgba(255,255,255,0.15);
    backdrop-filter: blur(5px);
    
`;

const ModalBlock = styled.div`
    overflow-y: auto;
    position: absolute;
    top: 6.5rem;
    border-radius: 10px;
    padding: 1.5rem;
    background-color: white;
    color: black;
    width: 700px;
    box-shadow: 1px 1px 1px 1px gray;

`;

const Contents = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
   
`;

const Close = styled.button`
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    cursor: pointer;
`;

const Label = styled.label`
  margin-bottom: 16px;
  & > span {
    display: block;
    text-align: left;
    padding-bottom: 8px;
    font-size: 15px;
    cursor: pointer;
    line-height: 1.46666667;
    font-weight: 700;
  }
`;

const Button = styled.button`
  margin-bottom: 12px;
  width: 150px;
  max-width: 75px;
  color:#fff;
  background-color: #4a154b;
  border: none;
  font-size: 18px;
  font-weight: 900;
  height: 44px;
  min-width: 96px;
  padding: 0 16px 3px;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);

   &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  };
`

export default SearchUser