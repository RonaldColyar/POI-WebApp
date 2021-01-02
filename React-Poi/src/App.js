import logo from './logo.svg';
import './App.css';

function App() {
  const html = ` <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-app.js"></script>
  <script src="https://www.gstatic.com/firebasejs/8.2.1/firebase-analytics.js"></script>
  <script>
  var firebaseConfig = {
      apiKey: "AIzaSyC8LKUWXcPGW7MLd7ajViEVAJhplBPZNQc",
      authDomain: "persons-2c0d5.firebaseapp.com",
      projectId: "persons-2c0d5",
      storageBucket: "persons-2c0d5.appspot.com",
      messagingSenderId: "129080388478",
      appId: "1:129080388478:web:cdcf48fba6bce9f9e3e12f",
      measurementId: "G-VMBNTG3RRT"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  </script>



  <div id="TopBar">
      <h1 id="main-label">PERSONS OF INTEREST</h1>
      <img id="rotation" src="/Images/rotation.jpg">
      <img id="rotation2" src="/Images/buttonlogo.jpg">
      <button onclick="state_modifier.display_login_or_signup('signup')"  id="sign_up">SIGN UP</button>
      <button onclick="state_modifier.display_login_or_signup('login')" id="sign_in">SIGN IN</button>
      <hr id = "TopLine">
   

  </div>

  <img id="finch_image" src="/Images/finch.png">
  <h1 id="LuringMessage">Want to Build Profiles On Suspicious Persons?</h1>
  
  <div id="usage">
      <img id="usageicon" src="../Images/usageicon.png">
      <p id="usage_desc">This Site allows you to build Profiles
          on persons of interest! Use this tool to
          remotely keep tabs on Suspicious persons.
          This application does not support social events
          for the sake of security.
      </p>
      


  </div>
  <div id="versions">
      <img id="versionsicon" src="/Images/threeversions.png">
      <p id="version_desc">
          The Persons of interest software collection 
          has three different applications: The web version[this one],
          the local desktop version , and the remote desktop version.
          Click <a href="https://github.com/RonaldColyar/POI"> Here</a>
          to view the other versions!
      </p>
      
      
  </div>
  <div id="systems">
      <img id="systemicon" src="/Images/systemslogo.png">
      <p id="system_desc">
          Persons of interest(Web) uses secure systems 
          and microservices from trusted software companies
          to safely store your person[s] data. The storing of 
          this data is anonymous. 
      </p>

  </div>
  <div id="auth_entries">
      <div id="sign_in_inner">
          <input class="entries" id="email_entry"  placeholder="Email.." >
          <input class="entries" id="password_entry" type="password" placeholder="Password..">
          <input class="entries" id="code_entry" type="password" placeholder="Special Code..">
          <button   id="check_login" >Login</button>
          <img src="/Images/authlogo.png" id="login_rotation">
          <button onclick="state_modifier.hide_element('auth_entries')" id="close_login">X</button>

      </div>
      <div id="sign_up_inner">
          <input class="entries" id="signup_email_entry"  placeholder="Email.." >
          <input class="entries" id="signup_password_entry" type="password" placeholder="Password..">
          <input class="entries" id="password_entry_verify" type="password" placeholder="Verify Password..">
          <input class="entries" id="Special_Code" type="password" placeholder="Special Verification Code..">
          <button id="check_signup" >Sign Up</button>
          <img src="/Images/authlogo.png" id="signup_rotation">
          <button onclick="state_modifier.hide_element('auth_entries')" id="close_signup">X</button>
      </div>
     



  </div>`
  return (
    <div dangerouslySetInnerHTML= {{
      __html:html

    }







      
    }></div>
      

    
  );
}

export default App;
