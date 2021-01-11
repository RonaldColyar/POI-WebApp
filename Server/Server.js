

function EmailManager(){

}


/* 
ContactsManager handles the CRUD of the  contact list of the user
contactsManager has a component EmailManager that contribute
to its breach protocol capabilites.

*/

function ContactsManager(collection){
    

}

/*
Mongo Manager handles all of the interaction with 
the mongo database. Mongo Manager is composed of smaller
classes that handles specific functionality for optimal
encapsulation.

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
                this.contacts_manager = new ContactsManager(self.collection);
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
            if(error){
                response.json({status:"error"});
            }
            else{
                response.json({status:"success"});
            }
        } );

    }
    this.create_person = function(email,data,response){
        if(this.connected == true){
            const name = data.first + data.last
            this.update_and_check({email :email},{$set:{persons: {[name]:""}}},response);
        }
        else{
            response.json({status:"error"});
        }
    }

    //repeated logic as create_person, but for understanding purposes
    this.create_entry = function(email,data,response){
        if(this.connected == true){
            const name = data.first +data.last
            this.update_and_check({email :email} , {
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
    this.import_locked_accounts = function(){

    }
    

}
function ServerRequestHandler (){
     this.express = require("express");
     this.app = this.express();
     this.fs = require("fs");
     app.listen(8020); // start listening for requests
     this.mongo_manager = new MongoManager();
     this.session_manager = new SessionManager();


}
