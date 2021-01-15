import React from 'react'

export default function ContactsPopup({state,self_state_controller,actions,add_state_controller }) {
    return (
        <div id = "contacts_popup_wrapper" style = {{display:(state? "block":"none")}}>
            <h1 id = "contact_label">My Contacts</h1>
            <div id = "contacts_list">


            </div>
            <button id= "add_contact_button" 
                onClick= {function(){actions.change_display_state(add_state_controller)}}>
                    Add Contact
            </button>
            <button id= "close_contact_button" onClick= {function(){actions.change_display_state(self_state_controller)}}>X</button>
            
        </div>
    )
}
