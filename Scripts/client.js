

function HomeViewStateModifier() {
    const self = this;
    this.hide_element = function(id) {
        document.getElementById(id).style.display = "none";
    }
    this.display_login_or_signup = function(type) {
        if (type == "signup"){
            this.hide_element("sign_in_inner")
            document.getElementById("sign_up_inner").style.display = "block";
        }
        else{
            this.hide_element("sign_up_inner")
            document.getElementById("sign_in_inner").style.display = "block";
        }
        document.getElementById("auth_entries").style.display = "block";
    }
    
}

function FirebaseHandler() {
    const self = this;
    this.create_user_check = function (firebase) {
       const email =  document.getElementById("signup_email_entry").value
       const pass = document.getElementById("signup_password_entry").value
       const verified_pass = document.getElementById("password_entry_verify").value
       const code = document.getElementById("Special_Code").value
      
       if(email.length<1 || pass.length<1 || code.length<1){
           alert("Make Sure All Fields Are filled! ")
       }
       else if(pass != verified_pass){
        alert("Passwords Do Not Match!!")
         }
       else{
           self.create_user(firebase,email,pass,code)
       }
    }
    this.create_user = function(firebase,email,pass,code) {
        firebase.auth().signInWithEmailAndPassword(email,pass)
            .then((user)=>{
                const post_data = {
                    email:user.email,
                    special_code:code
                }
                self.post_data(post_data,self.display_status,"https://localhost:8020/codecreation")
               
            })
            .catch((error) => {
                const errormessage = error.message;
            }
            )

        
    }
    this.display_status = function (data) {
        if(data.status == "SUCCESS"){   
            alert("You have successfully created an account!") 
            localStorage.setItem("ijfdgfniwe" , data.token) 
            redirect("https://localhost:8020/accounts/" + data.email)

        }
        else if(data.status == "ACCOUNT_EXIST"){
            alert("Email Already has an account!")

        }
        else{
            alert("Error from server!")
        }
        
        
    }
    this.post_data = function (body_data,callback,url) {
        const options = {
            method:'POST',
            headers : {
                'Content-Type':'application/json'
            },
            body:body_data

        }
        fetch(url,options)
        .then(response =>response.json())
        .then(data => callback(data))
       
    }

 
    this.check_signin_status = function (data) {
        if(data.status == "FAILED"){
            alert("issue signing in!!!")
        }
        else{
            localStorage.setItem("ijfdgfniwe" , data.token) 
            redirect("https://localhost:8020/accounts/" + data.email)
        }
        
    }

    this.sign_in = function (firebase) {
        const email = document.getElementById("email_entry").value
        const password = document.getElementById("password_entry").value
        const code = document.getElementById("code_entry").value
        if(email.length < 1 || password.length < 1 ){
            alert("please make sure that you insert a password and email!")
        }
        else{
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user)=> {
                const post_data = {
                    email:user.email,
                    special_code : code 
                }
                self.post_data(post_data,self.check_signin_status,"https://localhost:8020/token-signin")
               

            })
         

        }
        
    }
    
}
const state_modifier  = new HomeViewStateModifier();