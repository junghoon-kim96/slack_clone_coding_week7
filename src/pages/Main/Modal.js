import React, { useState } from 'react';
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from "react-redux";
import { addchannel, AddChaListAxios } from "../../redux/modules/channel";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useSearchParams } from 'react-router-dom';
// var data = require('http://54.180.154.178/channelInvite')

const Modal = ({ closeModal }) => {

    const [loading, setLoading] = React.useState(true);
    const dispatch = useDispatch();


    const Channl_ref = React.useRef(null);
    const friend_ref = React.useRef(null);
    const [channel, setchannel] = React.useState('')
    //채널추가하기
    const AddChaList = () => {
        dispatch(addchannel({
            channelId: "123",
            channelName: Channl_ref.current.value,
            isPrivate: true,
            isOwner: false,
        }));
        dispatch(AddChaListAxios({
            channelId: "123",
            channelName: Channl_ref.current.value,
            isPrivate: true,
            isOwner: false,
        }));
        closeModal(false)

    }
    // const onSearch = (e) => {
    //     e.preventDefault();
    //     if (search === null || search === "") {
    //         // axios.get("url")
    //         // .then((response)=>{
    //         //     setLists(response.data.post)
    //         // })
    //         setLists(post_lists);
    //     } else {
    //         const filterData = lists.filter((lists) => lists.tag.includes(search))
    //         setLists(filterData);
    //     }
    //     setSearch("");
    // }
    const onSearch = (searchTerm) => {
        setValue(searchTerm);
        //our api to fetch the search results
        console.log('search',searchTerm)
    }


    const onChange= (e) => {
        e.preventDefault();
        setValue(e.target.value);
    }
 
    const ChannlName = (e) => {

        setchannel(e.target.value)
    }
    const [value, setValue] = useState('');

    return (
        <Container>
            <Background onClick={() => closeModal(false)} />
            <ModalBlock >
                <Close onClick={() => closeModal(false)} >x</Close>
                <Contents>
                    채널생성  <br />
                    <Label >
                        <span>채널이름</span>
                        <div>
                            <Input type="text" ref={Channl_ref} onChange={ChannlName} />
                        </div>
                    </Label>

                    비공개로만들기<br />
                    <FormControlLabel
                            sx={{
                            display: 'block',
                            }}
                            control={
                            <Switch
                                checked={loading}
                                onChange={() => setLoading(!loading)}
                                name="loading"
                                color="primary"
                            />
                            }
                            label="비공개 활성화"
                        />

                    <Label >
                        <span>친구검색하기</span>
                        <div>
                            <Input2 type="text" value={value} onChange={onChange} />
                            <Button onclick={() =>{onSearch(value)}}>search </Button>
                        </div>
                        {/* <div>
                        {data
                        .filter((item) => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.userId.toLowerCase();


                            return(
                            searchTerm && fullName.startsWith(searchTerm)&& 
                            fullName !== searchTerm
                        );
                        }).slice(0,5)
                            .map((item)=> (
                                <Dropdown 
                                onclick={() =>{onSearch(item.userId)}}
                                key={item.userId}> {item.full_name}</Dropdown>
                            ))}
                        </div> */}
                    </Label>
                    <Button onClick={AddChaList}>생성</Button>
                </Contents>
            </ModalBlock>
          
        </Container>
    );
};
// const Dropdown = styled.Dropdown`
// `
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

const Input = styled.input`
  border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
  border: 1px solid var(--saf-0);
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
  box-sizing: border-box;
  margin: 0 0 20px;
  width: 100%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
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

export default Modal

