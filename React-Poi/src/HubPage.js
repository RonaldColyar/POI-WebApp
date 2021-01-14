import React , {useState,useRef} from 'react'
import Accountbar from './accountbar'
import Confirmbreachpopup from './Confirmbreachpopup'
import ContactsPopup from './ContactsPopup'
import Createcontactspopup from './Createcontactspopup'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import Newentrypopup from './Newentrypopup'
import Newpersonpopup from './newpersonpopup'
import Profilesummary from './profilesummary'
import Profileview from './Profileview'
import StatsBar from './statsbar'

function Client(params){
    this.email = params.match.params.email;
    this.token = localStorage.getItem("poitoken");
    var self = this;

    this.fetch_and_respond =async function(header,url){
        const response = await  fetch(url,header)
        const data = await response.json()
        return data  
    }
    this.logout = async function(){
        const header = {
            method: "POST",
            body : {
                email:self.email,
                token:self.token
            }
        }
        return await this.fetch_and_respond(header,"http://localhost:8020/logout")
    }
    this.change_code = async function(data){
        data.token = self.token;
        data.email = self.email;
        const header = {method:"POST",body:data}
        return await self.fetch_and_respond(header,"http://localhost:8020/change-code")
    }
    this.profile_data = async function(){
        const url = "http://localhost:8020/userprofiledata/" + self.email+"/"+self.token
        const header = {method:"GET"} ;
        return await  self.fetch_and_respond(header,url)
    }

    this.create_new_person_or_entry = async function(data,url,method){
        data.token = self.token;
        data.email = self.email;
        const header = { method : method, body : data};
        return await self.fetch_and_respond(header,url);
    }

    this.delete_all_data =async  function(){
        const url = "http://localhost:8020/breached/"+self.email+"/"+self.token ;
        const header = {method:"DELETE"};
        return await self.fetch_and_respond(header,url);
    }

    this.send_profile_to_all =async function(profile_name, type){
        const header = {method:"GET"};
        const base_url = "http://localhost:8020/send-profile-to-all/" + self.email+"/"+self.token;
        if(type == "all"){//send all profiles to all contacts
           return await self.fetch_and_respond(header,base_url);
        }
        else{//send one profile to all contacts
            const all_url = base_url+"/"+profile_name;
            return await self.fetch_and_respond(header,all_url);
        }


    }
    this.remove_contact = async function(contact_email){
        const url = "http://localhost:8020/remove-contact/" 
            +self.token+"/"+self.email+"/"+contact_email
        const header = {method:"DELETE"};
        return await self.fetch_and_respond(header,url)
    }
     
    this.breach = async function(){
        
        var email_result = await self.send_profile_to_all(null , "all")
        var delete_result = await self.delete_all_data();
        if(email_result.status == "error" || delete_result.status == "error"){
            //user popup
        }
        else{
            //user popup
        }

    }
}

export default function HubPage(params) {
    { var Interface = new Client(params)}
    const [person , changeperson] = useState(null)
    const [all_persons , addperson] = useState(Interface.profile_data)
   

    //not authed or server issues
    
        return (
            
            
            <div id = "hub_main_wrapper">    
                <Profilesummary data = {person}/>
                <Entryhubview data = {person}/>
                <Profileview persons = {all_persons} display_selector = {changeperson} />
                <DetailsView data = {person}/>
                <StatsBar data = {all_persons}  />
                <Accountbar actions = {Interface} />
                <Newpersonpopup actions = {Interface}/>    
                <Newentrypopup actions = {Interface}/>
                <Confirmbreachpopup actions = {Interface}/>    
                <ContactsPopup actions = {Interface} />
                <Createcontactspopup actions = {Interface}/>    
            </div>
                
        )
    
}
