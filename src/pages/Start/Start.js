import './App.css';
import { Link } from "react-router-dom"
function Start() {
  return (
    <div className="App">
      <header className="App-header">
        <img className="App-logo" src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png' className="App-logo" alt="logo" />
        
        
        <Link to= '/login'  
        style={{backgroundColor: 'lightblue', marginTop: '30px', padding:'5px', borderRadius: '5px'
        ,textDecoration: 'none', color: 'white'}}> 슬랙 시작하기</Link>
      </header>
    </div>
  );
}

export default Start;
