



function EmailManager(){
    this.mailer  = require('nodemailer');
    this.fs  = require('fs');
    //fs.writeFile(filename, data, [encoding], [callback])
    //https://nodemailer.com/message/attachments/
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'PersonsOfInterestEmailService@gmail.com',
          password: 'blahblah123'
        }
      });

    this.create_temp_file = function( persondata){
        //avoid sending blank files
        if(persondata.length>0){
            this.fs.writeFileSync("temp.txt", persondata);

        }
        
    }
    //will send a email to a contact(contactdata) containing multiple persons or one
    this.send_email  = function( contactdata,persondata){
        this.create_temp_file(persondata)
        var Options = {
            from: 'PersonsOfInterestEmailService@gmail.com',
            to: contactdata,
            subject: "person(s) profile(s)",
            attachments:[{
                filename: "profile.txt",
                path: __dirname + "/temp.txt"

            }]
            
          };
        this.transporter.sendMail(Options,function(error, info){
            if(error){
                console.log(error);
            }
            else{
                console.log(info);
            }
        })

    }
    


}





/*
Mongo Manager handles all of the interaction with 
the mongo database.The update querys could be polymorphed, but for
the sake of readability its repeated.

*/
function MongoManager(){
    this.uri = "mongodb://localhost:27017/";
    this.mongo = require("mongodb").MongoClient;
    this.connected = false;
    const self = this;

    //makes the user collection accessible by other class methods
    this.connect = function(){
        this.mongo.connect(this.uri,function(error ,client){
            if(error){
                console.log("error connecting to database")
            }
            else{
                const db = client.db("POI");
                self.collection = db.collection("users");
                self.connected = true;
            }
        })
       
    }

    //returns special verification code 
    this.user_code = function(email){
        var temp_code;
        if (this.connected == true){
            this.collection.findOne({email:email} , function(error,result){
                if(result){
                    temp_code = result.code;
                }
            })

        }
        
        return temp_code;

    }


    this.CUD_error_check = function(error,response){//create,update,delete
        if(error){
            response.json({status : "error"});
        }
        else{
            response.json({status : "success"})
        }


    }

    this.update_and_check = function(wherequery,setquery,response){
        this.collection.updateOne(wherequery ,setquery , function(error,result){
            this.CUD_error_check(error,response);
        } );

    }
    this.create_person = function(data,response){
        if(this.connected == true){
            const name = data.first +"-"+ data.last;
            this.update_and_check({email :data.email},{$set:{persons: {[name]:" "}}},response);
        }
        else{
            response.json({status:"error"});
        }
    }

    //repeated logic as create_person, but for understanding purposes
    this.create_entry = function(data,response){
        if(this.connected == true){
            const name = data.first +data.last
            this.update_and_check({email :data.email} , {
                $set:{persons :{[name] : 
                    {entries : 
                        {[data.label] :
                            {threat_level : data.threat_level , data : data.description,date : data.date}}}}}});
        }
        else{
            response.json({status:"error"});
        }
    }

    this.create_user = function(data , response){
        if (this.user_exist(data.email) == true){
            const error_message = {status:"error"}
            response.json(error_message);
        }
        else{
            user_object = {
                email : data.email, 
                code :  data.code
            }
            self.collection.insertOne(user_object , function(error , result){
                self.CUD_error_check(error,response)
            });
        }
    }
    this.add_contact = function(email,contacts_email,response){
        this.collection.updateOne({email:email} 
            , {$set :{contacts:{[contacts_email]:" "}}},function(error,result){
               this.CUD_error_check(error,response)
            })
}

    this.user_exist = function(email){
        var user_exists = false;
        if (this.connected == true){
            this.collection.findOne({email:email} , function(error,result){
                if(result){
                    user_exists = true;
                }
            })

        }
        return user_exists;

    }
    //breach of security
    this.delete_all = function(email,response){
        this.collection.deleteMany({email:email} , function(error,result){
            this.CUD_error_check(error,response);

        })

    }
    //delete person path : const child_to_remove = "persons." +name;
    //delete person query: {$set :{[child_to_remove] : ""}

    //general purpose removal of a child
    this.delete = function(email,response,query){
        
        this.collection.updateOne({email:email} ,query 
        , function(error,result){
            this.CUD_error_check(error,response)
        })
    }

    this.gather_all = function(email){
        var data;
        this.collection.findOne({email:email} , function(error,result){
            if(typeof error === 'undefined'){
              data = result;
            }
           
        })
        return data;
    }
    this.change_code = function(new_code,email,response){
        this.collection.updateOne({email:email} , {$set:{code:new_code}} , function(error,result){
            this.CUD_error_check(error,response)
        })

    }
    this.locked_accounts = async function(){
        var locked = [];
        await this.collection.find({account_status:"locked"}).toArray(function(error,result){
            for(i = 0; i<result.length-1; i++ ){
                locked.push(result[i].email)
            }
        })
        return locked;
    }
    

}
 
function SessionManager(){
    this.sessions = new Map();
    this.locked_accounts = [];
    const { v4: uuidv4 } = require('uuid');

    this.add_session = function( email,response){
        if(this.locked_accounts.includes(email)){
            response.json({status : "ACCOUNT_LOCKED"});
        }
        else{
            const token = uuidv4();
            this.sessions.set(email,token);
            response.json({status:"AUTHED" , auth_token :token});

        }
    }

    this.remove_session = function(email,response){
        const status = this.sessions.delete(email);
        if(status == false){
            //issue
        }
        else{
            response.json({status:"success"});
        }


    }
    this.is_authed = function(email,token){
        var auth_status = false;
        if(this.sessions.has(email)){
            // if the user has the auth token generated for the session
            if(this.sessions.get(email) == token){
                auth_status = true;
            }

        }
        return auth_status;
    }
   
    

}
function ServerRequestHandler (){
     this.express = require("express");
     this.app = this.express();
     this.fs = require("fs");
     this.mongo_manager = new MongoManager();
     this.session_manager = new SessionManager();
     this.email_manager = new EmailManager();
     var self = this;
     this.check_auth_and_proceed = function(res,email,token,response){
        if(self.session_manager.is_authed(email,token) == true){
            res()
        }
        else{
            response.json({status:"error"})
        }
     }
     this.send_email_router = function(request,type){
        const data = self.mongo_manager.gather_all(request.params.userEmail).persons
         if(type == "all"){
            const person_data = data
            self.email_manager.send_email(request.params.receiver,person_data
            )
         }
         else{
            const person_data = data[request.params.profilename]
            self.email_manager.send_email(request.params.receiver,person_data
            )
         }

     }
     this.send_email_to_all_router = function(request,type){
        var data = self.mongo_manager.gather_all(request.params.userEmail)
        const contacts = data.contacts

         //send all persons to all contacts
        if(type == "all"){
            const person_data = data.persons
            for(contact in contacts){
                self.email_manager.send_email(contacts.email,person_data
                    )
            }
         }

         //send one person to all contacts
         else{
            const person_data = data.persons[request.params.profilename]
            for (contact in contacts){
                self.email_manager.send_email(request.params.receiver,person_data
                    )
            }
         }
     }
     

     this.app.post("/signup" , function(request,response){
         if(self.mongo_manager.user_exist(request.body.email) == true){
             response.json({status:"error"})
         }
         else{
             self.mongo_manager.create_user(request.body)
         }
     })

     this.app.post("/login", function(request,response){
         if(self.mongo_manager.user_exist(request.body.email) == true){
             //if the codes match
             if(self.mongo_manager.user_code(request.body.email) == request.body.code){ 
                 //add session and send authentication token
                 self.session_manager.add_session(request.body.email,response)
             }
             else{//wrong code
                response.json({status:"error"}) 
             }
         }
        else{ //user does not exist
            response.json({status:"error"})
        }
     })
     //identifies the user account and responds with data
    this.app.get("/userprofiledata/:email/:token", function(request,response){
        this.check_auth_and_proceed(function(){
            response.json({status:"DATA" , data: self.mongo_manager.gather_all(request.params.email)})
        },request.params.email,request.params.token,response)

    })
    //getting or accessing the profile data
    this.app.get("/sendprofile/:type/:receiver/:userEmail/:token/:profilename" , function(request,response){
        this.check_auth_and_proceed(function(){
            this.send_email_router(request,request.params.type)
    },request.params.userEmail,request.params.token,response)
    })
    //send one profile to all contacts
    this.app.get("/send-profile-to-all/:userEmail/:token/:profilename" , function(request,response){
        this.check_auth_and_proceed(function(){
            this.mongo_manager.send_email_to_all_router(request,"one")
        },request.params.userEmail,request.params.token,response)
    })
    //sends all profiles to all contacts
    this.app.get("/send-profile-to-all/:userEmail/:token", function(request,response){
        this.check_auth_and_proceed(function(){
            this.mongo_manager.send_email_to_all_router(request,"all")
        }, request.params.userEmail,request.params.token,response)
    })

 
    this.app.post("/add-contact" , function(request,response){
        this.check_auth_and_proceed(function(){
            self.mongo_manager.add_contact()
        })
    })
    this.app.delete("/remove-contact/:token/:email/:contactEmail" , function(request,response){
        this.check_auth_and_proceed(function(){

            const child_to_remove = "contacts." +request.params.contactEmail ;
            self.mongo_manager.delete(request.params.email,response,{$set:{[child_to_remove] : ""}});
        })
    })

    this.app.post("/logout", function(request,response){
        this.check_auth_and_proceed(function(){
            self.session_manager.remove_session(request.body.email,response)
        },request.body.email,request.body.token,response)

    })
    //removes all data associated with an account
    this.app.delete("/breached/:email/:token", function(request,response){
        this.check_auth_and_proceed(function(){
            self.mongo_manager.delete_all(request.params.email,response)
        },request.params.email,request.params.token,response)
    })
    this.app.post("/addperson",function(request,response){
        this.check_auth_and_proceed(function(){
                self.mongo_manager.create_person(request.body,response)
        },request.body.email,request.body.token)
    })
    this.app.put("/addentry",function(request,response){
        this.check_auth_and_proceed(function(){
            self.mongo_manager.create_entry(request.body,response)
        },request.body.email,request.body.email)
        
    })
    this.app.put("/change-code" , function(request,response){
        this.check_auth_and_proceed(function(){
            self.mongo_manager.change_code(request.body.newCode,request.body.email,response)
        },request.body.email,request.body.token,response)
    })
    
 


     this.session_manager.locked_accounts = this.mongo_manager.locked_accounts();
     app.listen(8020);
}
