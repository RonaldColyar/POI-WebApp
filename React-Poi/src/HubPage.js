import React , {useState,useEffect} from 'react'
import Accountbar from './accountbar'
import Confirmbreachpopup from './Confirmbreachpopup'
import ContactsPopup from './ContactsPopup'
import Createcontactspopup from './Createcontactspopup'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import Newentrypopup from './Newentrypopup'
import Newpersonpopup from './newpersonpopup'
import Profilesummary from './profilesummary'
import Profileviewheader from './profileviewheader'

import StatsBar from './statsbar'

function Client(params){
    this.email = params.match.params.email;
    this.token = localStorage.getItem("poitoken");

 
    this.fetch_and_respond =async function(options,url){
        const response = await  fetch(url,options)
        const data = await response.json()
        return data  
    }
    this.logout = function(){
        const options = {
            method: "POST",
            body : {
                email:this.email,
                token:this.token
            }
        }
        return  this.fetch_and_respond(options,"http://localhost:8020/logout")
    }
    this.change_code =  function(data){
        data.token = this.token;
        data.email = this.email;
        const options = {method:"POST",body:data}
        return  this.fetch_and_respond(options,"http://localhost:8020/change-code")
    }
    this.profile_data =  function(){
        const url = "http://localhost:8020/userprofiledata/" + this.email+"/"+this.token
        const options = {method:"GET"} ;
        return  this.fetch_and_respond(options,url)
    }

    this.create_new_person_or_entry =  function(data,url,method){
        data.token =this.token;
        data.email = this.email;
        const options = { method : method, body : data};
        return this.fetch_and_respond(options,url);
    }

    this.delete_all_data =  function(){
        const url = "http://localhost:8020/breached/"+this.email+"/"+this.token ;
        const options = {method:"DELETE"};
        return  this.fetch_and_respond(options,url);
    }

    this.send_profile_to_all = function(profile_name, type){
        const options = {method:"GET"};
        const base_url = "http://localhost:8020/send-profile-to-all/" + this.email+"/"+this.token;
        if(type == "all"){//send all profiles to all contacts
           return this.fetch_and_respond(options,base_url);
        }
        else{//send one profile to all contacts
            const all_url = base_url+"/"+profile_name;
            return  this.fetch_and_respond(options,all_url);
        }


    }
    this.remove_contact = function(contact_email){
        const url = "http://localhost:8020/remove-contact/" 
            +this.token+"/"+this.email+"/"+contact_email;
        const options = {method:"DELETE"};
        return  this.fetch_and_respond(options,url);
    }
     
    this.breach = async function(){
        
        var email_result = await this.send_profile_to_all(null , "all")
        var delete_result =  await this.delete_all_data();
        if(email_result.status == "error" || delete_result.status == "error"){
            //user popup
        }
        else{
            //user popup
        }

    }
    this.change_display_state = function(change_fun){
        change_fun(prev=>{
            if(prev == false){
                return true;
            }
            else{
                return false;
            }
        })


    }
    this.convert_file = function(file,state_changer ){
		//converts image to base 64
		 var converter = new FileReader();
	  	 converter.readAsDataURL(file);
	  	
	     converter.onloadend = function () {
            this.uploaded_image = converter.result;
            this.change_display_state(state_changer); // changing the uploaded status
        
            
            
	   			
	}
}


}

export default function HubPage(params) {
    var Interface = new Client(params)
    const [person , changeperson] = useState(null)
    const [all_persons , addperson] = useState(null)
    const [contacts_display_state , change_contacts_display_state] = useState(false);
    const [breach_display_state , change_breach_display_state] = useState(false);
    const [add_contact_display_state, change_add_contact_display_state] = useState(false);
    const [new_entry_display_state , change_new_entry_display_state] = useState(false);
    const [new_person_display_state, change_new_person_display_state]= useState(false);
    const [image_state , change_image_state] = useState(false);   
    const [Contacts , addcontact] = useState([]);
    const [entry ,change_selected_entry] = useState(null)
    useEffect(async()=>{
        //const profile_data = await  Interface.profile_data();
        addperson((prev)=>{
            //return profile_data.persons
            return [
            {"ron-colyar" :{height:"5'0" , location:"unknown" , race :"white" , 
                        entries:[{"kill":{level:3,date:"1/3/2020", details:"nothing"}}]}},
            {"josh-king" :{height:"5'5" , location:"trinidad" , race :"white" }},
            {"kell-test" :{height:"5'1" , location:"chicago" , race :"white" }} ,
            {"kelvin-second":{height:"5'3" , location:"la" , race :"white" }},
            {"ashe-josh":{height:"5'11" , location:"outskirts" , race :"white" }},
            {"kelvin-super":{height:"5'4" , location:"home" , race :"white" }},
            {"ashe-over":{height:"5'2" , location:"unknown" , race :"white" }}] //test       
        })
        addcontact((prev)=>{
            // return profile_data.contacts
            return [{email:"kellz@gmail.com"}]
        })

    },[])
   

    
        return (
            
            
            <div id = "hub_main_wrapper">    
                <Profilesummary 
                    actions = {Interface} 
                    entry_popup_display_selector = {change_new_entry_display_state}
                    person = {person}/>
                <Entryhubview change_selected_entry = {change_selected_entry} person = {person}/>
                
                <Profileviewheader
                 persons = {all_persons} 
                 display_selector = {changeperson} 
                 />

                <DetailsView entry = {entry}/>
                <StatsBar 
                    data = {all_persons} 
                    all_selector = {addperson} 
                    person_popup_display_selector ={change_new_person_display_state}
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
                        data = {Contacts}
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
