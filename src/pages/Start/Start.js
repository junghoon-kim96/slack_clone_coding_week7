import './App.css';
import { Link } from "react-router-dom"
function Start() {
  return (
    <div className="App">
      <header className="App-header">
        <img src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png' className="App-logo" alt="logo" />
        <p>
        슬랙 시작하기
        </p>
        <Link to= '/login'> 로그인 하러가기</Link>
      </header>
    </div>
  );
}

export default Start;
