import React from 'react'
import Contactschild from './Contactschild'

export default function  ContactsPopup({
    
                state,
                self_state_controller,
                actions,
                add_state_controller,
                data ,
                all_modifier}) {
    if (data) {
        return (
            <div id = "contacts_popup_wrapper" style = {{display:(state? "block":"none")}}>
                <h1 id = "contact_label">My Contacts</h1>
                <div id = "contacts_list">
                    
                    {
                    //displaying all contacts
                    Object.keys(data).map(contact =>{
                        return <Contactschild key ={contact} all_modifier = {all_modifier} actions = {actions} data = {contact}/>
                    })}
    
                </div>
                <button id= "add_contact_button" 
                    onClick= {()=>{
                        
                        actions.change_display_state(add_state_controller)
                        actions.change_display_state(self_state_controller)
                    }}>
                        Add Contact
                </button>
                <button id= "close_contact_button" onClick= {()=>{actions.change_display_state(self_state_controller)}}>X</button>
                
            </div>
        )
        
        
    }
    else{
        return(
            <div id = "contacts_popup_wrapper" style = {{display:(state? "block":"none")}}>
                <h1 id = "contact_label">My Contacts</h1>
                <div id = "contacts_list">
                    <h1>No Contacts</h1>
                    
            
                </div>
                <button id= "add_contact_button" 
                    onClick= {()=>{
                        actions.change_display_state(add_state_controller)
                        actions.change_display_state(self_state_controller)
                        }}>
                        Add Contact
                </button>
                <button id= "close_contact_button" onClick= {()=>{actions.change_display_state(self_state_controller)}}>X</button>
                
            </div>
        )
    }
 
}
