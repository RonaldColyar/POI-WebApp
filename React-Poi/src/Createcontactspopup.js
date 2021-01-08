import React from 'react'

export default function Createcontactspopup() {
    return (
        <div id = "create_contacts_wrapper">
            <h1 id = "create_contact_label">Create New Contact</h1>
            <input placeholder = "Contact's Name" id = "Contact_name_entry"></input>
            <input placeholder = "Contact's Email" id = "Contact_email_entry"></input>
            <button id = "create_contact_button">Create</button>
            <button id = "close_add_contact_popup">X</button>
            
        </div>
    )
}
