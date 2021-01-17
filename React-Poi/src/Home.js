import React , {useState} from 'react'
import { useHistory } from "react-router-dom";


function Client(){
    this.login_status_check = function(email,result){
        if(result.status == "AUTHED"){
            localStorage.setItem("POIEMAIL", email );
            localStorage.setItem("POITOKEN",result.auth_token );
            useHistory.push("/accounts/" + email);
        }
        else{
            //popup
        }
    }

    this.sign_up_status_check = function(result){
        if(result.status == "success"){
            //popup
        }
        else{
            //popup
        }

    }

    this.login_or_signup= async function(email,code,type){
        if(type == "login"){
            const url = "http://localhost:8020/login";
            const options = {method : "POST",body : {email:email,code:code}};
            const result = await this.fetch_and_respond(options,url); 
            this.login_status_check(result,email);
        }
        else{
            const url = "http://localhost:8020/signup";
            const options = {method : "POST",body : {email:email,code:code}};
            const result = await this.fetch_and_respond(options,url); 
            this.sign_up_status_check(result);
        }

        
    }

    this.fetch_and_respond =async function(options,url){
        const response = await  fetch(url,options);
        const data = await response.json();
        return data  ;
    }
}


export default function HomePage() {
    var client = new Client();
    const [sign_up_state, change_sign_up_state] = useState(false);
    const [login_state, change_login_state] = useState(false);

    return (
<>
<div id="TopBar">
    <h1 id="main-label">PERSONS OF INTEREST</h1>
    <img id="rotation" src="/Images/rotation.jpg"></img>
    <img id="rotation2" src="/Images/buttonlogo.jpg"></img>
    <button onClick={
        change_sign_up_state(prev=>{
            return true;
        })
    }  id="sign_up">SIGN UP</button>
    <button onClick = {
        change_login_state(prev =>{
            return true;
        })
    } id="sign_in">SIGN IN</button>
    <hr id = "TopLine"></hr>
 

</div>

<img id="finch_image" src="/Images/finch.png"></img>
<h1 id="LuringMessage">Want to Build Profiles On Suspicious Persons?</h1>

<div id="usage">
    <img id="usageicon" src="../Images/usageicon.png"></img>
    <p id="usage_desc">This Site allows you to build Profiles
        on persons of interest! Use this tool to
        remotely keep tabs on Suspicious persons.
        This application does not support social events
        for the sake of security.
    </p>
    


</div>
<div id="versions">
    <img id="versionsicon" src="/Images/threeversions.png"></img>
    <p id="version_desc">
        The Persons of interest software collection 
        has three different applications: The web version[this one],
        the local desktop version , and the remote desktop version.
        Click <a href="https://github.com/RonaldColyar/POI"> Here</a>
        to view the other versions!
    </p>
    
    
</div>
<div id="systems">
    <img id="systemicon" src="/Images/systemslogo.png"></img>
    <p id="system_desc">
        Persons of interest(Web) uses secure systems 
        and microservices from trusted software companies
        to safely store your person[s] data. The storing of 
        this data is anonymous. 
    </p>

</div>
<div id="auth_entries">
    <div id="sign_in_inner" style = {{display:(sign_up_state? "block":"none")}}>
        <input class="entries" id="email_entry"  placeholder="Email.." ></input>
        <input class="entries" id="password_entry" type="password" placeholder="Password.."></input>
        <input class="entries" id="code_entry" type="password" placeholder="Special Code.."></input>
        <button   id="check_login" >Login</button>
        <img src="/Images/authlogo.png" id="login_rotation"></img>
        <button onclick = {change_login_state(prev=>{
            return false;
        })}  id="close_login">X</button>

    </div>
    <div id="sign_up_inner" style = {{display:(login_state? "block":"none")}} >
        <input class="entries" id="signup_email_entry"  placeholder="Email.." ></input>
        <input class="entries" id="Special_Code" type="password" placeholder="Special Verification Code.."></input>
        <button id="check_signup" >Sign Up</button>
        <img src="/Images/authlogo.png" id="signup_rotation"></img>
        <button id="close_signup" onClick = {
            change_sign_up_state(prev =>{
                return false;
            })
        }> X</button>
    </div>
   



</div>
</>
    )
}
