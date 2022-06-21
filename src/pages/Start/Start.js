import './App.css';
import { Link } from "react-router-dom"
function Start() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png'  alt="logo" />

        <Link to= '/login' style={{margin:"50px",backgroundColor:"lightblue", padding:"10px", borderRadius:"10px"}}>슬랙 시작하기</Link>
      </header>
    </div>
  );
}

export default Start;
