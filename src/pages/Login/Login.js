import React from 'react';
import { useNavigate, Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Login = () => {

  const navigate = useNavigate();
  const id_ref = React.useRef(null);
  const pw_ref = React.useRef(null);

  let [active, setActive] = React.useState(false);

  const [username, setUserName] = React.useState("");
  const [password, setPwd] = React.useState("");

  const ActiveIsPassedLogin = () => {
    return username.includes('@') && password.length >= 5
      ? setActive(true)
      : setActive(false);
  };

  const handlerId = (e) => {
    setUserName(e.target.value);
  }

  const handlerPw = (e) => {
    setPwd(e.target.value);
  }


  const loginAxios = () => {
    axios({
      method: 'POST',
      url: "/api/login",
      data: {
        username: username,
        password: password,
      },
      baseURL: "http://54.180.154.178"
    }).then(function (response) {
      console.log(response)
      alert(response.data.message);
      localStorage.setItem('access_token', response.headers.authorization);
      localStorage.setItem('username', response.data.userinfo.username);
      localStorage.setItem('nickname', response.data.userinfo.nickname);
      localStorage.setItem('iconUrl', response.data.userinfo.iconUrl);
      navigate('/main');
    }).catch(function (error) {
      alert(error.response.data.message);
      console.log(error)
    })
  }

  //엔터키 작동
  const onKeyPress = (e) => {
    if (e.key == "Enter") {
      loginAxios();
    }
}


  return (
    <div>
      <LinkContainer>
        Slack을 처음 사용하시나요? <br />
        <Link to="/signup">계정생성</Link>
      </LinkContainer>
      <Header><img src='https://raw.githubusercontent.com/lnuvy/slack-clone-front/master/src/shared/images/slackLogo.png' /></Header>
      <Form>
        <Label>
          <span>이메일 주소</span>
          <div>

            <Input type="email" id="email" placeholder='abc@example.com' ref={id_ref} onChange={handlerId}
              onKeyUp={ActiveIsPassedLogin} onKeyPress={onKeyPress} />
          </div>
        </Label>
        <Label>
          <span>비밀번호</span>
          <div>
            <Input type="password" id='password' placeholder='비밀번호를 입력해주세요' ref={pw_ref} onChange={handlerPw}
              onKeyUp={ActiveIsPassedLogin} onKeyPress={onKeyPress}/>
          </div>

        </Label>

        <Button id="login_btn" onClick={loginAxios} className={active ? 'ActiveLoginBtn' : 'LoginBtn'}
          disabled={username === '' || password === '' ? true : false}>로그인</Button>
      </Form>

    </div>
  );
};

const Header = styled.header`
  text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
  & > img { height:34px; 
            width:134px;
        }
`;

const Form = styled.div`
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
  background-color: ${props => props.disabled ? 'gray' : '#4a154b;'};
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

  ${props => props.disabled ? '' : `&:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }` };
  
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
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
export default Login