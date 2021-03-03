import React , {useState,useEffect} from 'react'
import Accountbar from './accountbar'
import Confirmbreachpopup from './Confirmbreachpopup'
import ContactsPopup from './ContactsPopup'
import Createcontactspopup from './Createcontactspopup'
import EditPersonPopup from './EditPersonPopup'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import ErrorDialog from './ErrorDialog'
import MagnifiedImagePopup from './MagnifiedImagePopup'
import Newentrypopup from './Newentrypopup'
import Newpersonpopup from './newpersonpopup'
import Profilesummary from './profilesummary'
import Profileviewheader from './profileviewheader'
import StatsBar from './statsbar'
import SuccessDialog from './SuccessDialog'
import Client from './Client'



export default function HubPage(params) {
    const [person , changeperson] = useState(null);
    const [all_persons , addperson] = useState(null)
    const [contacts_display_state , change_contacts_display_state] = useState(false);
    const [breach_display_state , change_breach_display_state] = useState(false);
    const [add_contact_display_state, change_add_contact_display_state] = useState(false);
    const [new_entry_display_state , change_new_entry_display_state] = useState(false);
    const [new_person_display_state, change_new_person_display_state]= useState(false);
    const [Contacts , addcontact] = useState([]);
    const [entry ,change_selected_entry] = useState(null)
    const [edit_person_state , change_edit_person_state ] = useState(false);
    const [success_dialog_state , change_success_dialog_state] = useState(false);
    const [error_dialog_state , change_error_dialog_state] = useState(false);
    const [magnified_state , change_magnified_state] = useState(false);
    var Interface = new Client(
                    params,change_success_dialog_state,
                    change_error_dialog_state)


    useEffect(async()=>{
        const data = await Interface.profile_data()
        Interface.check_authentication_response(data);

        addperson(()=>{
            if (data.status == "error") {
                return null
            }
            else{
                console.log(data.data.persons)
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
                    change_person_state = {changeperson}
                    all_modifier = {addperson}
                    edit_state_modifier = {change_edit_person_state}
                    change_magnified_state = {change_magnified_state}
                    change_entry_state = {change_selected_entry}/>
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
                        all_modifier = {addperson}
                       
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
                <EditPersonPopup 
                    state = {edit_person_state} 
                    person = {person}
                    modify_all_persons = {addperson}
                    actions = {Interface}
                    self_state_controller = {change_edit_person_state}/>
                <MagnifiedImagePopup
                    state = {magnified_state}
                    person = {person}
                    self_state_controller = {change_magnified_state}
                />
            </div>
                
        )
    
}
