import './App.css';
import { Link } from "react-router-dom"
function Start() {
  return (
    <div className="App">
      <header className="App-header">
<<<<<<< HEAD
        <img className="App-logo" src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png'  alt="logo" />

        <Link to= '/login' style={{margin:"50px",backgroundColor:"lightblue", padding:"10px", borderRadius:"10px"}}>슬랙 시작하기</Link>
=======
        <img className="App-logo" src='https://a.slack-edge.com/80588/marketing/img/icons/icon_slack_hash_colored.png' className="App-logo" alt="logo" />
        
        
        <Link to= '/login'  
        style={{backgroundColor: '#c3b7c3', marginTop: '30px', padding:'5px', borderRadius: '5px'
        ,textDecoration: 'none', color: 'white'}}> 슬랙 시작하기</Link>
>>>>>>> 106d094945736bd385e44783be13ed8d38526051
      </header>
    </div>
  );
}

export default Start;
