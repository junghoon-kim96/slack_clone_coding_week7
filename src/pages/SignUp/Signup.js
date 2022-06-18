import React from 'react';
import { useNavigate,Link } from 'react-router-dom';
import styled from 'styled-components'
import axios from 'axios'
import { storage } from '../shared/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

function SignUp() {
    const navigate = useNavigate();

    const profile_ref = React.useRef(null);
    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);
    const pw_check_ref = React.useRef(null);
    const nickname_ref = React.useRef(null);

    const [profile,setprofile] = React.useState("");
    const [username, setUserName] = React.useState("");
    const [password, setPwd] = React.useState("");
    const [pwdCheck, setPwdCheck] = React.useState("");
    const [nickname, setNickName] = React.useState("");
    const UpImageUrl = async (e) => {

        setprofile(e.target.value)
        const upload_file = await uploadBytes(
            ref(storage, `images/${e.target.files[0].name}`),
            e.target.files[0]
        );

        
        const file_url = await getDownloadURL(upload_file.ref)
        profile_ref.current = { url: file_url };

        
    };


    const signupdata = () => {

        axios.post("http://localhost:5001/list", {

            "userImageUrl": profile_ref.current.url,
            "userId": id_ref.current.value,
            "Nickname": nickname_ref.current.value,
            "password": pw_ref.current.value,

        }).then((response) => {

            console.log(profile_ref.current?.url)
            alert("회원가입을 축하드립니다!!")
            navigate('/');

        }).catch((error) => {
            console.log(error)
        })

    }

    const handlerId = (e) => {
        setUserName(e.target.value);
    }

    const handlerPw = (e) => {
        setPwd(e.target.value);
    }


    const handlerNickName = (e) => {
        setNickName(e.target.value);
    }

    const handlerPwcheck = (e) => {
        setPwdCheck(e.target.value);
    }
    
 

    return (
        <div >
            <LinkContainer>
                이미 회원이신가요? <br />
                <Link to="/">로그인하러가기</Link>
            </LinkContainer>
            
            <Header>
                <img src='https://raw.githubusercontent.com/lnuvy/slack-clone-front/master/src/shared/images/slackLogo.png' />
            </Header>
            <Form>
                <Label >
                    <span>이메일 주소</span>
                    <div>
                        <Input type="email" placeholder="abc@example.com" ref={id_ref} onChange={handlerId} />
                    </div>
                </Label>
                <Label>
                    <span>닉네임</span>
                    <div>
                        <Input type="text" ref={nickname_ref}  onChange={handlerNickName} />
                    </div>
                    <Label>
                        <span>프로필사진</span>
                        <span>
                        <Inlabel htmlFor="files">사진 업로드</Inlabel> 
                        <Inex htmlFor="files">{profile}</Inex>
                        <Input2 type="file" id="files" ref={profile_ref} onChange={UpImageUrl} /> <br />
                        </span>
                      
                    </Label>
                </Label>
                <Label >
                    <span>비밀번호</span>
                    <div>
                        <Input type="password" ref={pw_ref} onChange={handlerPw} />
                    </div>
                </Label>
                <Label >
                    <span>비밀번호 확인</span>
                    <div>
                        <Input
                            type="password"
                            onChange={handlerPwcheck}
                            ref={pw_check_ref}
                        />
                    </div>

                </Label>
                <Button onClick={signupdata} >회원가입</Button>
            </Form>


        </div>
    );
}

const Inex =styled.label`
border-radius: 4px;
  --saf-0: rgba(var(--sk_foreground_high_solid, 134, 134, 134), 1);
 
  transition: border 80ms ease-out, box-shadow 80ms ease-out;
 
  margin: 0 0 20px;
  width: 73.5%;
  color: rgba(var(--sk_primary_foreground, 29, 28, 29), 1);
  background-color: rgba(var(--sk_primary_background, 255, 255, 255), 1);
  padding: 12px;
  height: 44px;
  font-size: 18px;
  line-height: 1.33333333;
  text-overflow: ellipsis;
  overflow: hidden;
`

const Inlabel =styled.label`
    border-radius:4px;
    display: inline-block;
    padding: 10px 10px;
    color: #fff;
    vertical-align: middle;
    background-color: #999999;
    cursor: pointer;
    height: 24px;
    margin: 0 0 3px;
    margin-left: 5px;
`

const Input2=styled.input`
    display:none;
`


const Header = styled.header`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
  & > img { height:34px; 
            width:134px;
        }
`;

const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
  
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
  width: 100%;
  max-width: 100%;
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
  
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }}
`



export const LinkContainer = styled.p`

font-size: 13px;
color: #616061;

margin: 60px 60px 0px;

text-align: right;
& a {
  color: #1264a3;
  text-decoration: none;
  font-weight: 700;
  &:hover {
    text-decoration: underline;
  }}
`;

export default SignUp