import React from 'react';
import { useNavigate,Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

function LogIn() {
    
    const navigate = useNavigate();
    const id_ref = React.useRef(null);
    const pw_ref = React.useRef(null);

    const [username, setUserName] = React.useState("");
    const [password, setPwd] = React.useState("");

    
    const loginAxios = () => {
        axios.post('http://localhost:5001/list', {
            "userId": id_ref.current.value,
            "password": pw_ref.current.value
        }).then(function (response) {
            alert("로그인 되었습니다!")
            navigate('/');

            localStorage.setItem('access_token', response.data.token);

            console.log(response)
        }).catch(function (error) {
            alert("로그인정보가 틀렸습니다.")
        })
    }


    return (
        <div id="container">
             <LinkContainer>
         Slack을 처음 사용하시나요? <br/>
          <Link to="/signup">계정생성</Link>
        </LinkContainer>
        <Header><img src='https://raw.githubusercontent.com/lnuvy/slack-clone-front/master/src/shared/images/slackLogo.png'/></Header>
        <Form>
          <Label>
            <span>이메일 주소</span>
            <div>
              <Input type="email" id="email" name="email" ref={id_ref} onChange={(e) => setUserName(e.target.value)} />
            </div>
          </Label>
          <Label>
            <span>비밀번호</span>
            <div>
              <Input type="password" id="password" name="password" ref={pw_ref} onChange={(e) => setPwd(e.target.value)} />
            </div>
          
          </Label>
          <Button onClick={loginAxios}>로그인</Button>
        </Form>
       
      </div>
    );
  };

export const Header = styled.header`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
  & > img { height:34px; 
            width:134px;
        }
`;

export const Form = styled.form`
  margin: 0 auto;
  width: 400px;
  max-width: 400px;
`;

export const Label = styled.label`
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

export const Input = styled.input`
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
  padding-top: 11px;
  padding-bottom: 13px;
  font-size: 18px;
  line-height: 1.33333333;
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Button = styled.button`
  margin-bottom: 12px;
  width: 100%;
  max-width: 100%;
  color: #fff;
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
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

export const Error = styled.div`
  color: #e01e5a;
  margin: 8px 0 16px;
  font-weight: bold;
`;

export const Success = styled.div`
  color: #2eb67d;
  font-weight: bold;
`;

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
    }
  }
`;
export default LogIn