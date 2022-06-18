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
        <div>

            <div>
                <Logo src="https://raw.githubusercontent.com/lnuvy/slack-clone-front/master/src/shared/images/slackLogo.png"/>
                <h1>로그인</h1>
                <h4>슬랙을 처음 사용하시나요?</h4>
                <StyledLink to='/SignUp'> 계정생성</StyledLink>
                <div>
             

                        <input onChange={(e) => setUserName(e.target.value)} ref={id_ref} />  <br />
                                     
                  

                        <input onChange={(e) => setPwd(e.target.value)} ref={pw_ref} />  <br />
                  
                
                        <button onClick={loginAxios} >로그인</button>
                        <button onClick={() =>{ navigate('/SignUp')}} >회원가입</button>
                


                </div>


            </div>
        </div>
    );
}

const StyledLink = styled.Link`
text-decoration: none;

`


const Logo = styled.img`
height: 34px;
text-align: center;
box-sizing: inherit;
`

export default LogIn