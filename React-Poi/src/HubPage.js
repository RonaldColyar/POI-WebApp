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

    this.fetch_and_respond =async function(header,url){
        const response = await  fetch(url,header)
        const data = await response.json()
        return data  
    }
    this.logout = async function(){
        const header = {
            method: "POST",
            body : {
                email:this.email,
                token:this.token
            }
        }
        return await this.fetch_and_respond(header,"http://localhost:8020/logout")
    }
    this.change_code = async function(data){
        data.token = this.token;
        data.email = this.email;
        const header = {method:"POST",body:data}
        return await this.fetch_and_respond(header,"http://localhost:8020/change-code")
    }
    this.profile_data = async function(){
        const url = "http://localhost:8020/userprofiledata/" + this.email+"/"+this.token
        const header = {method:"GET"} ;
        return await  this.fetch_and_respond(header,url)
    }

    this.create_new_person_or_entry = async function(data,url,method){
        data.token = this.token;
        data.email = this.email;
        const header = { method : method, body : data};
        return await this.fetch_and_respond(header,url);
    }

    this.delete_all_data =async  function(){
        const url = "http://localhost:8020/breached/"+this.email+"/"+this.token ;
        const header = {method:"DELETE"};
        return await this.fetch_and_respond(header,url);
    }

    this.send_profile_to_all =async function(profile_name, type){
        const header = {method:"GET"};
        const base_url = "http://localhost:8020/send-profile-to-all/" + this.email+"/"+this.token;
        if(type == "all"){//send all profiles to all contacts
           return await this.fetch_and_respond(header,base_url);
        }
        else{//send one profile to all contacts
            const all_url = base_url+"/"+profile_name;
            return await this.fetch_and_respond(header,all_url);
        }


    }
    this.remove_contact = async function(contact_email){
        const url = "http://localhost:8020/remove-contact/" 
            +this.token+"/"+this.email+"/"+contact_email
        const header = {method:"DELETE"};
        return await this.fetch_and_respond(header,url)
    }
     
    this.breach = async function(){
        
        var email_result = await this.send_profile_to_all(null , "all")
        var delete_result = await this.delete_all_data();
        if(email_result.status == "error" || delete_result.status == "error"){
            //user popup
        }
        else{
            //user popup
        }

    }
}

export default function HubPage(params) {
    const [person , changeperson] = useState([])
    { var Interface = new Client(params)}

    //not authed or server issues
    
        return (
            
            
            <div id = "hub_main_wrapper">    
                <Profilesummary data = {person}/>
                <Entryhubview data = {person}/>
                <Profileview persons = {Interface.profile_data} selector = {changeperson}/>
                <DetailsView data = {person}/>
                <StatsBar />
                <Accountbar data = {Interface.email} />
                <Newpersonpopup/>    
                <Newentrypopup/>
                <Confirmbreachpopup/>    
                <ContactsPopup/>
                <Createcontactspopup/>    
            </div>
                
        )
    
}
