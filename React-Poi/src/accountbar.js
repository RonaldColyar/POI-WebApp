import React from 'react'

export default function Accountbar({actions}) {
    var self = this;
    this.check_logout_status = async function(){
        response = await actions.logout()
        if(response.status == "error"){
            //popup
        }
        else{
            //popup
        }   
    }

    
    return (
        <div id = "accountbar">
            <button id = "logoutbutton" onClick = {self.check_logout_status()}> Logout </button>
            <button id = "contactsbutton">Contacts</button>
            <button id = "breachbutton">Breach(Very Dangerous)</button>
            
        </div>
    )
}
