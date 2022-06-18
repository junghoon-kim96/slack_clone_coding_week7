import React from 'react';
import { useNavigate } from 'react-router-dom';
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


    const [username, setUserName] = React.useState("");
    const [password, setPwd] = React.useState("");
    const [pwdCheck, setPwdCheck] = React.useState("");

    const UpImageUrl = async (e) => {


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
            "password": pw_ref.current.value,
            
        }).then((response)=>{

            console.log(profile_ref.current?.url)
            alert("회원가입을 축하드립니다!!")
            navigate('/');

        }).catch((error)=>{
            console.log(error)
        })

    }
   
    return (
        

            <div>
                 <Header><img src='https://raw.githubusercontent.com/lnuvy/slack-clone-front/master/src/shared/images/slackLogo.png'/></Header>

                <div >
                                <Input type="file"   onChange={UpImageUrl}  ref={profile_ref} /> <br/>
                                <Input type="text" onChange={(e) => setUserName(e.target.value)}  ref={id_ref} /><br/>
                       
                                
                                <Input type="password" onChange={(e) => setPwd(e.target.value)} ref={pw_ref}  /><br/>
                               
                                <Input type="password" onChange={(e) => setPwdCheck(e.target.value)} ref={pw_check_ref} /><br/>
                                
                               
                      

                           <div>
                             <br/>
                          
                            <button onClick={signupdata}>회원가입</button>
                            <button onClick={()=>{navigate('/')}}>취소</button>

                           </div>



                    </div>

                </div>


            
        
    );
}

const Header = styled.div`
text-align: center;
  margin-top: 100px;
  margin-bottom: 50px;
  & > img { height:34px; 
            width:134px;
        }
`
const Input = styled.input`

`


export default SignUp