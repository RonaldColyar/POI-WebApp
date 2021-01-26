import React from 'react'

export default function Accountbar({actions, contacts_display_controller ,breach_display_controller}) {
    
    const check_logout_status = async function(){
        const response = await actions.logout()
        if (response.status == "success") {
            window.location.replace("http://localhost:3000/");
        }
    }
    
    return (
        <div id = "accountbar">
            <button id = "logoutbutton" onClick = {check_logout_status}> Logout </button>
            <button id = "contactsbutton" onClick = {function(){actions.change_display_state(contacts_display_controller)}}>Contacts</button>
            <button id = "breachbutton"onClick = {function(){actions.change_display_state(breach_display_controller)}} >Breach(Very Dangerous)</button>
            
        </div>
    )
}
