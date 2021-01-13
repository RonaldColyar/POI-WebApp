


function EmailManager(){
    this.mailer  = require('nodemailer');
    this.fs  = require('fs');

    //fs.writeFile(filename, data, [encoding], [callback])
    //https://nodemailer.com/message/attachments/

    this.send_email  = function(email, data , datatype,formatt){

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
                            {threat_level : data.threat_level , data : data.description,date : data.date}}}}}})
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
    this.add_locked_accounts = function(accounts){

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
     //identifies the user account
    this.app.get("/userprofiledata/:email/:token", function(request,response){
        this.check_auth_and_proceed(function(){
            response.json({status:"DATA" , data: self.mongo_manager.gather_all(request.params.email)})
        },request.params.email,request.params.token,response)

    })
    //identifies the poi's data
    this.app.get("/sendemail/:profilename" , function(request,response){
        this.check_auth_and_proceed(function(){
            const data = self.mongo_manager.gather_all(request.body.email).contacts
            self.email_manager.send_email(request.body.email
                ,data.persons[request.params.profilename],data,"raw")

        })
        
    })
    this.app.get("/send-to-all/:profilename", function(request,response){
        this.check_auth_and_proceed(function(){
            const data = self.mongo_manager.gather_all(request.body.email)


        })
        

    })
    this.app.post("/add-contact" , function(request,response){
        this.check_auth_and_proceed(function(){
            self.mongo_manager.add_contact()
        })
    })

    this.app.post("/logout", function(request,response){
        this.check_auth_and_proceed(function(){
            self.session_manager.remove_session(request.body.email,response)
        },request.body.email,request.body.token,response)

    })

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
    
 



     app.listen(8020);
}
