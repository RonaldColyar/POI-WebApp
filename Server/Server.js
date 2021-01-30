

var bodyParser = require("body-parser");
const { request, response } = require("express");
var { v4: uuidv4 } = require('uuid');

class EmailManager{
    constructor(){
        this.mailer  = require('nodemailer');
        this.fs  = require('fs');
        this.transporter = this.mailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'PersonsOfInterestEmailService@gmail.com',
              password: 'blahblah123'
            }
          });
    
    }
   
    //fs.writeFile(filename, data, [encoding], [callback])
    //https://nodemailer.com/message/attachments/
  
    create_temp_file(persondata){
        //avoid sending blank files
        if(persondata.length>0){
            this.fs.writeFileSync("temp.txt", persondata);

        }
        
    }
    //will send a email to a contact(contactdata) containing multiple persons or one
    send_email( contactdata,persondata){
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
class MongoManager{
     
    constructor(){
    
        this.uri = "mongodb://localhost:27017/";
        this.mongo = require("mongodb").MongoClient;
        this.connected = false;
       
    
    }

    //makes the user collection accessible by other class methods
    async connect(session_manager){
        this.mongo.connect(this.uri,async(error ,client)=>{
            if(error){
                console.log("error connecting to database")
            }
            else{
                const db = client.db("POI");
                this.collection = db.collection("users");
                this.connected = true;
                session_manager.locked_accounts = await this.locked_accounts();
            }
        })
       
    }
    code_check_tier_two(result,request,session_manager,response){
        if (result.code == request.body.code) {
            session_manager.add_session(request.body.email,response)     
        }
        else{//wrong code
            response.json({status:"error"}) 
        }
    }
    //compares codes and update requester 
   check_user_code(request,session_manager,response){
        if (this.connected == true){ 
            this.collection.findOne({email:request.body.email} , (error,result)=>{
                if(result){ //user exist
                    this.code_check_tier_two(result,request,session_manager,response)
                }
           })
        }
        else{
            response.json({status:"error"})  
        }   
    }


    CUD_error_check(error,response){//create,update,delete
        if(error){
            console.log(error)
            response.json({status : "error"});
        }
        else{
            response.json({status : "success"})
        }


    }

    update_and_check(wherequery,setquery,response){
        this.collection.updateOne(wherequery ,setquery , (error,result)=>{
            this.CUD_error_check(error,response);
        } );

    }
    create_person_tier2(data,response){
        const name = data.first +"-"+ data.last;
        const path = "persons."+name;
        var metadata = {height : data.height, race : data.race,
            location :data.location,
            image : data.image,
        }
        if (data.entries) {
            metadata["entries"] = data.entries;
        }
        this.update_and_check({email :data.email},{$set:{[path]:metadata}},response);
    }

    create_person(data,response){
        if(this.connected == true){
            //avoiding long functionality
            this.create_person_tier2(data,response);
        }
        else{
            response.json({status:"error"});
        }
    }

    //repeated logic as create_person, but for understanding purposes
    create_entry(data,response){
        if(this.connected == true){
            const name = data.first +"-"+data.last
            const path = "persons."+name +".entries."+data.label
            this.update_and_check({email :data.email} , {
                $set:{[path]:
                    {threat_level : data.threat_level , data : data.description,date :this.current_date()}}},response);
        }
        else{
            response.json({status:"error"});
        }
    }

    create_user(data , response){   
            this.collection.insertOne(data , (error , result)=>{
                console.log("creation")
                this.CUD_error_check(error,response)
            });
        }
    
    add_contact(email,contacts_email,response){
        const path_to_set = "contacts."+"'"+contacts_email+"'"
        this.collection.updateOne({email:email} 
            , {$set :{[path_to_set]:null}},(error,result)=>{
               this.CUD_error_check(error,response)
            })
}

    user_exist_check(email,data,response){
    
        if (this.connected == true){
            this.collection.findOne({email:email} , (error,result)=>{
                
                if(result){
                    response.json({status:"error"})
                }
                else{
                    this.create_user(data,response)
                }       
            })
            }

        }
    login_user_check
    
    

    
    //breach of security
    delete_all(email,response){
        this.collection.deleteMany({email:email} , (error,result)=>{
            this.CUD_error_check(error,response);

        })

    }


    //general purpose removal of a child
    delete(email,response,query){
        
        this.collection.updateOne({email:email} ,query 
        , (error,result)=>{
            this.CUD_error_check(error,response)
        })
    }

    gather_all(email,response){
        
         this.collection.findOne({email:email} , (error,result)=>{
            if(result){
                response.json({status:"DATA" , data:result })
            }
            else{
                response.json({status:"error"})
            }

           
        })
    }
    change_code(new_code,email,response){
        this.collection.updateOne({email:email} , {$set:{code:new_code}} , (error,result)=>{
            this.CUD_error_check(error,response)
        })

    }
    async locked_accounts(){
        var locked = [];
        await this.collection.find({account_status:"locked"}).toArray((error,result)=>{
            for(var i = 0; i<result.length-1; i++ ){
                locked.push(result[i].email)
            }
        })
        return locked;
    }
    current_date(){
        var date = new  Date();
        var current_month = date.getUTCMonth() +1; 
        var current_day = date.getUTCDate();
        var current_year = date.getUTCFullYear();
        var stringified_date = current_month + "/" +current_day+ "/"+ current_year;
        return stringified_date;
    }
    

}

class SessionManager{
    constructor(){
        this.sessions = new Map();
        this.locked_accounts = new Array();
       
    }
   

    add_session(email,response){
        if(this.locked_accounts.includes(email)){
            response.json({status : "ACCOUNT_LOCKED"});
        }
        else{
            const token = uuidv4();
            this.sessions.set(email,token);
            console.log(this.sessions)
            response.json({status:"AUTHED" , auth_token :token});

        }
    }

    remove_session(email,response){
        const status = this.sessions.delete(email);
        if(status == false){
            //issue
        }
        else{
            response.json({status:"success"});
        }


    }
    is_authed(email,token){
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
class ServerRequestHandler {
    constructor(){
        this.express = require("express");
        this.app = this.express();
        this.session_manager = new SessionManager();
        this.mongo_manager = new MongoManager();
        this.mongo_manager.connect(this.session_manager);
        this.email_manager = new EmailManager();

      

    }
    
   
     check_auth_and_proceed(res,email,token,response){
        if(this.session_manager.is_authed(email,token) == true){
            console.log("works")
            res()
        }
        else{
            console.log(email+""+token)
        
            response.json({status:"error"})
        }
     }
     send_email_router(request,type){
        const data = this.mongo_manager.gather_all(request.params.userEmail).persons
         if(type == "all"){
            const person_data = data
            this.email_manager.send_email(request.params.receiver,person_data
            )
         }
         else{
            const person_data = data[request.params.profilename]
            this.email_manager.send_email(request.params.receiver,person_data
            )
         }

     }
     send_email_to_all_router(request,type){
        var data = this.mongo_manager.gather_all(request.params.userEmail)
        const contacts = data.contacts

         //send all persons to all contacts
        if(type == "all"){
            const person_data = data.persons
            for(contact in contacts){
                this.email_manager.send_email(contacts.email,person_data
                    )
            }
         }

         //send one person to all contacts
         else{
            const person_data = data.persons[request.params.profilename]
            for (contact in contacts){
                this.email_manager.send_email(request.params.receiver,person_data
                    )
            }
         }
     }
     setup_all(){
        this.app.all('*', function(req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Credentials', 'true');
            res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
            res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Authorization'
            );
            next();
        });
        this.app.use(bodyParser.json({limit:"50mb"}));
        
     }
     setup_put(){
        this.app.put("/addentry",(request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.mongo_manager.create_entry(request.body,response)
            },request.body.email,request.body.token,response)
            
        })

        this.app.put("/change-code" ,(request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.mongo_manager.change_code(request.body.newCode,request.body.email,response)
            },request.body.email,request.body.token,response)
        })
    
        
        
     }
     setup_delete(){
        this.app.delete("/remove-contact/:token/:email/:contactEmail" , (request,response)=>{
            this.check_auth_and_proceed(()=>{
                const child_to_remove = "contacts." +request.params.contactEmail ;
                this.mongo_manager.delete(request.params.email,response,{$unset:{[child_to_remove] : ""}});
            },request.params.email,request.params.token,response)
        })

        this.app.delete("/remove-person/:token/:email/:person_name" , (request,response)=>{
            this.check_auth_and_proceed(()=>{
                const child_to_remove = "persons."+request.params.person_name;
                this.mongo_manager.delete(request.params.email,response,{$unset:{[child_to_remove]:""}})


            },request.params.email,request.params.token,response)
        })
         //removes all data associated with an account
        this.app.delete("/breached/:email/:token", (request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.mongo_manager.delete_all(request.params.email,response)
            },request.params.email,request.params.token,response)
        })

     }
     
     setup_post(){


        this.app.post("/signup" , (request,response)=>{
            //user exist handles user creation logic
            this.mongo_manager.user_exist_check(request.body.email,request.body,response) 
            
        })
        

        this.app.post("/login", (request,response)=>{
         
               this.mongo_manager.check_user_code(request,this.session_manager,response);
 
        })
     
    
        this.app.post("/add-contact" , (request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.mongo_manager.add_contact(request.body.email,request.body.contacts_email,response)
            },request.body.email,request.body.token,response)
        })
 
        this.app.post("/logout", (request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.session_manager.remove_session(request.body.email,response)
            },request.body.email,request.body.token,response)

        })
       
        this.app.post("/addperson",(request,response)=>{
            this.check_auth_and_proceed(()=>{
                    this.mongo_manager.create_person(request.body,response)
            },request.body.email,request.body.token,response)
        })

    


     
     this.app.listen(8020);
}
    setup_get(){
        //identifies the user account and responds with data
        this.app.get("/userprofiledata/:email/:token",(request,response)=>{
            
            this.check_auth_and_proceed(async()=>{
                this.mongo_manager.gather_all(request.params.email,response)
                
                
            },request.params.email,request.params.token,response)

        })
        //getting or accessing the profile data
        this.app.get("/sendprofile/:type/:receiver/:userEmail/:token/:profilename" , (request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.send_email_router(request,request.params.type)
        },request.params.userEmail,request.params.token,response)
        })
        //send one profile to all contacts
        this.app.get("/send-profile-to-all/:userEmail/:token/:profilename" , (request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.mongo_manager.send_email_to_all_router(request,"one")
            },request.params.userEmail,request.params.token,response)
        })
        //sends all profiles to all contacts
        this.app.get("/send-profile-to-all/:userEmail/:token", (request,response)=>{
            this.check_auth_and_proceed(()=>{
                this.mongo_manager.send_email_to_all_router(request,"all")
            }, request.params.userEmail,request.params.token,response)
        })


    }
}

const start_server = new ServerRequestHandler();
start_server.setup_all();
start_server.setup_post();
start_server.setup_get();
start_server.setup_put();
start_server.setup_delete();