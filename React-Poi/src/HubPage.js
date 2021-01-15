import React , {useState} from 'react'
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
    var email = params.match.params.email;
    var token = localStorage.getItem("poitoken");
    var self = this;

    const fetch_and_respond =async function(header,url){
        const response = await  fetch(url,header)
        const data = await response.json()
        return data  
    }
    const logout = async function(){
        const header = {
            method: "POST",
            body : {
                email:email,
                token:token
            }
        }
        return await fetch_and_respond(header,"http://localhost:8020/logout")
    }
    const change_code = async function(data){
        data.token = token;
        data.email = email;
        const header = {method:"POST",body:data}
        return await fetch_and_respond(header,"http://localhost:8020/change-code")
    }
    const profile_data = async function(){
        const url = "http://localhost:8020/userprofiledata/" + self.email+"/"+self.token
        const header = {method:"GET"} ;
        return await  fetch_and_respond(header,url)
    }

    const create_new_person_or_entry = async function(data,url,method){
        data.token =token;
        data.email = email;
        const header = { method : method, body : data};
        return await fetch_and_respond(header,url);
    }

    const delete_all_data =async  function(){
        const url = "http://localhost:8020/breached/"+email+"/"+token ;
        const header = {method:"DELETE"};
        return await fetch_and_respond(header,url);
    }

    const send_profile_to_all =async function(profile_name, type){
        const header = {method:"GET"};
        const base_url = "http://localhost:8020/send-profile-to-all/" + email+"/"+token;
        if(type == "all"){//send all profiles to all contacts
           return await fetch_and_respond(header,base_url);
        }
        else{//send one profile to all contacts
            const all_url = base_url+"/"+profile_name;
            return await fetch_and_respond(header,all_url);
        }


    }
    const remove_contact = async function(contact_email){
        const url = "http://localhost:8020/remove-contact/" 
            +self.token+"/"+email+"/"+contact_email;
        const header = {method:"DELETE"};
        return await fetch_and_respond(header,url);
    }
     
    const breach = async function(){
        
        var email_result = await send_profile_to_all(null , "all")
        var delete_result = await delete_all_data();
        if(email_result.status == "error" || delete_result.status == "error"){
            //user popup
        }
        else{
            //user popup
        }

    }
    const change_display_state = function(change_fun){
        change_fun(prev=>{
            if(prev == false){
                return true;
            }
            else{
                return false;
            }
        })


    }
    const convert_file = function(file,state_changer ){
		//converts image to base 64
		 var converter = new FileReader();
	  	 converter.readAsDataURL(file);
	  	
	     converter.onloadend = function () {
            self.uploaded_image = converter.result;
            change_display_state(state_changer); // changing the uploaded status
        
            
            
	   			
	}
}
}

export default function HubPage(params) {
    var Interface = new Client(params)
    const [person , changeperson] = useState(null)
    const [all_persons , addperson] = useState(Interface.profile_data)
    const [contacts_display_state , change_contacts_display_state] = useState(false);
    const [breach_display_state , change_breach_display_state] = useState(false);
    const [add_contact_display_state, change_add_contact_display_state] = useState(false);
    const [new_entry_display_state , change_new_entry_display_state] = useState(false);
    const [new_person_display_state, change_new_person_display_state]= useState(false);
    const [image_state , change_image_state] = useState(false);
   

    
        return (
            
            
            <div id = "hub_main_wrapper">    
                <Profilesummary data = {person}/>
                <Entryhubview data = {person}/>
                <Profileview
                 persons = {all_persons} 
                 display_selector = {changeperson} 
                 />

                <DetailsView data = {person}/>
                <StatsBar 
                    data = {all_persons} 
                    all_selector = {addperson} 
                />
                <Accountbar 
                        contacts_display_controller = {change_contacts_display_state}  
                        actions = {Interface} 

                        breach_display_controller = {change_breach_display_state}
                />
                <Newpersonpopup 
                        actions = {Interface}
                        self_state_controller = {change_new_person_display_state}
                        state = {new_person_display_state}
                        image_state = {image_state}
                        image_state_controller = {change_image_state}
                />    
                <Newentrypopup 
                        actions = {Interface}
                        self_state_controller = {change_new_entry_display_state}
                        state = {new_entry_display_state}
                />
                <Confirmbreachpopup 
                        actions = {Interface}
                        state = {breach_display_state}
                        self_state_controller = {change_breach_display_state}
                />    
                <ContactsPopup 
                        add_state_controller = {change_add_contact_display_state} 
                        self_state_controller = {change_contacts_display_state}
                        state= {contacts_display_state}  
                        actions = {Interface} 
                />
                <Createcontactspopup 
                        state= {add_contact_display_state} 
                        self_state_controller = {change_add_contact_display_state}
                        actions = {Interface}
                />    
            </div>
                
        )
    
}
