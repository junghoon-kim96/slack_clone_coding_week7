import './App.css';
import { Link } from "react-router-dom"
import styled from 'styled-components'


function Start() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png'  alt="logo" />

        <LinkContainer>
        <Link to= '/login' style={{margin:"50px",backgroundColor:"#c3b7c3", padding:"10px", borderRadius:"10px"}}>슬랙 시작하기</Link>
        </LinkContainer>
      </header>
    </div>
  );
}

export const LinkContainer = styled.p`

  
  color: #616061;
  
  margin: 60px 60px 0px;

  text-align: right;

  & a {
    color: white;
    text-decoration: none;
    font-weight: 700;
   
  }
`;

export default Start;
