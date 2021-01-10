



function MongoManager(){
    this.uri = "mongodb://localhost:27017/";
    this.mongo = require("mongodb").MongoClient;
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
            }
        })
       
    }
    //returns special code 
    this.user_code = function(email){

    }
    this.CUD_error_check = function(error,response){//create,update,delete
        if(error){
            response.json({status : "error"});
        }
        else{
            response.json({status : "success"})
        }


    }

    this.create_user = function(data , response){
        if (this.user_exist(data.email) == true){
            const error_message = {status:"error"}
            response.json(error_message)
        }
        else{
            user_object = {
                [data.email] : {code: data.code}
            }
            self.collection.insertOne(user_object , function(error , result){
                self.CUD_error_check(error,response)
            })
        }
    }
    this.user_exist = function(email){

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
