import React , {useState,useEffect} from 'react'
import Accountbar from './accountbar'
import Confirmbreachpopup from './Confirmbreachpopup'
import ContactsPopup from './ContactsPopup'
import Createcontactspopup from './Createcontactspopup'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import ErrorDialog from './ErrorDialog'
import Newentrypopup from './Newentrypopup'
import Newpersonpopup from './newpersonpopup'
import Profilesummary from './profilesummary'
import Profileviewheader from './profileviewheader'
import StatsBar from './statsbar'
import SuccessDialog from './SuccessDialog'

class Client{
    constructor(params,modify_success_dialog,modify_error_dialog){
        this.params = params
        this.email = params.match.params.email;
        this.token = localStorage.getItem("POITOKEN");
        this.success_modifier = modify_success_dialog;
        this.error_modifier = modify_error_dialog;
    
    }
 
    async fetch_and_respond(options,url){
        const response = await  fetch(url,options)
        const data = await response.json()
        return data  
    }
    logout(){
        const options = {
            method: "POST",
            body : JSON.stringify({
                email:this.email,
                token:this.token
            }),
            headers: { "Content-Type": "application/json" }
        }
        return  this.fetch_and_respond(options,"http://localhost:8020/logout")
    }
    change_code(data){
        data.token = this.token;
        data.email = this.email;
        const options = {method:"POST",body:JSON.stringify(data), headers: { "Content-Type": "application/json" }}
        return  this.fetch_and_respond(options,"http://localhost:8020/change-code")
    }
    profile_data(){
        const url = "http://localhost:8020/userprofiledata/" + this.email+"/"+this.token
        const options = {method:"GET"} ;
        return  this.fetch_and_respond(options,url)
    }

    create_person_or_entry(data,url,method){
        data.token =this.token;
        data.email = this.email;
        const options = { method : method, body :JSON.stringify(data), headers: { "Content-Type": "application/json" }};
        return this.fetch_and_respond(options,url);
    }
    delete_person(name){
        const url = "http://localhost:8020/remove-person/"+this.token+"/"+this.email+"/"+name;
        const options = {method: "DELETE"}
        return this.fetch_and_respond(options,url)
    }

    delete_all_data(){
        const url = "http://localhost:8020/breached/"+this.email+"/"+this.token ;
        const options = {method:"DELETE"};
        return  this.fetch_and_respond(options,url);
    }

    send_profile_to_all(profile_name, type){
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
    add_contact(contact_email){
        const url = "http://localhost:8020/add-contact";
        const contact_request_data = {
            token :localStorage.getItem("POITOKEN"),
            email : localStorage.getItem("POIEMAIL"),
            contacts_email:contact_email
        }
        const options = {
            method:"POST",
            body :JSON.stringify(contact_request_data),
            headers: { "Content-Type": "application/json" }}
        return this.fetch_and_respond(options,url);

    }
    remove_contact(contact_email){
        const url = "http://localhost:8020/remove-contact/" 
            +this.token+"/"+this.email+"/"+contact_email;
        const options = {method:"DELETE"};
        return  this.fetch_and_respond(options,url);
    }
     
    async breach(){
        
        var email_result = await this.send_profile_to_all(null , "all")
        var delete_result =  await this.delete_all_data();
        if(email_result.status == "error" || delete_result.status == "error"){
            //user popup
        }
        else{
            //user popup
        }

    }
    change_display_state(change_fun){
        change_fun(prev=>{
            if(prev == false){
                return true;
            }
            else{
                return false;
            }
        })


    }
    convert_file(file,state_changer ){
		//converts image to base 64
		 var converter = new FileReader();
	  	 converter.readAsDataURL(file);
	     converter.onloadend = function () {
            this.uploaded_image = converter.result;
            this.change_display_state(state_changer); // changing the uploaded status
        
            
            
	   			
	}
}
    check_cud_response(response){
        if (response.status=="success") {
                this.change_display_state(this.success_modifier);
                return true;
        }
        else{
                this.change_display_state(this.error_modifier);
                return false;
        }
    }


}

export default function HubPage(params) {
    
    const [person , changeperson] = useState(null);
    const [all_persons , addperson] = useState(null)
    const [contacts_display_state , change_contacts_display_state] = useState(false);
    const [breach_display_state , change_breach_display_state] = useState(false);
    const [add_contact_display_state, change_add_contact_display_state] = useState(false);
    const [new_entry_display_state , change_new_entry_display_state] = useState(false);
    const [new_person_display_state, change_new_person_display_state]= useState(false);
    const [image_state , change_image_state] = useState(false);   
    const [Contacts , addcontact] = useState([]);
    const [entry ,change_selected_entry] = useState(null)
    const [success_dialog_state , change_success_dialog_state] = useState(false);
    const [error_dialog_state , change_error_dialog_state] = useState(false);
    var Interface = new Client(
                    params,change_success_dialog_state,
                    change_error_dialog_state)

    useEffect(async()=>{


        const data = await Interface.profile_data()
        console.log(data)
        addperson(()=>{
            if (data.status == "error") {
                return null
            }
            else{
                return data.data.persons
            }
            
            
            })
        addcontact((prev)=>{
            if (data.status == "error") {
                return null
                
            }
            else{
                if (data.data.contacts == null || typeof data.data.contacts ==="undefined" ) {
                    return null
                }
                else{
                    return data.data.contacts
                }
        }
        })

    },[])
   

    
        return (
            
            
            <div id = "hub_main_wrapper">    
                <Profilesummary 
                    actions = {Interface} 
                    entry_popup_display_selector = {change_new_entry_display_state}
                    person = {person}
                    all_modifier = {addperson}/>
                <Entryhubview change_selected_entry = {change_selected_entry} person = {person}/>
                
                <Profileviewheader
                 persons = {all_persons} 
                 display_selector = {changeperson} 
                 />

                <DetailsView 
                    entry = {entry}
                    self_state_controller = {change_selected_entry}  
                    change_person_data ={changeperson}  
                    person = {person}/>
                <StatsBar 
                    data = {all_persons} 
                    contacts = {Contacts}
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
                        all_modifier = {addperson}
                        image_state_controller = {change_image_state}
                />    
                <Newentrypopup 
                        actions = {Interface}
                        person = {person}
                        self_state_controller = {change_new_entry_display_state}
                        state = {new_entry_display_state}
                        all_modifier = {addperson}
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
                        all_modifier = {addcontact}
                />
                <Createcontactspopup 
                        state= {add_contact_display_state} 
                        self_state_controller = {change_add_contact_display_state}
                        all_modifier = {addcontact}
                        actions = {Interface}
                />    
                <ErrorDialog
                        state = {error_dialog_state}
                        self_state_controller = {change_error_dialog_state}
                        actions = {Interface}

                />
                <SuccessDialog
                      state = {success_dialog_state}
                      self_state_controller = {change_success_dialog_state}
                      actions = {Interface}
                
                />
            </div>
                
        )
    
}
