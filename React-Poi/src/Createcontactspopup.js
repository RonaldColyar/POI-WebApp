import React from 'react'

export default function Createcontactspopup({state}, {self_state_controller}, {actions}) {
    return (
        <div id = "create_contacts_wrapper" style = {{display:(state? "block":"none")}} >
            <h1 id = "create_contact_label">Create New Contact</h1>
            <input placeholder = "Contact's Name" id = "Contact_name_entry"></input>
            <input placeholder = "Contact's Email" id = "Contact_email_entry"></input>
            <button id = "create_contact_button">Create</button>
            <button id = "close_add_contact_popup" onClick = {function () {
                actions.change_display_state(self_state_controller)                
            }}>X</button>
            
        </div>
    )
}
