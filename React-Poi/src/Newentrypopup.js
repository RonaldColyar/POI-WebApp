import React from 'react'

export default function Newentrypopup({state}, {self_state_controller}, {actions}) {
    return (
        <div className= "popupwrappers" style = {{display:(state? "block":"none")}} id= "entry_popup">
            <div id = "entry_popup_header">
               <h1 id= "add_entry_label">Add Entry</h1>
               <img id = "entry_popup_logo" src = "../Images/authlogo.png"></img>
               <button id = "close_entry_popup" onClick= {function(){actions.change_display_state(self_state_controller)}}>X</button>
            </div>
            <div id = "threat_popup_entries">
                <img id = "threat_popup_rotation"  src = "../Images/level1.png"></img>
                <select id = "threat_level_dropdown">
                        <option>Level 1</option>
                        <option>Level 2</option>
                        <option>Level 3</option>
                </select>
                <input className = "persondata"  id = "Entry_Details_label" placeholder = "Label of Entry..."></input>
                <textarea placeholder= "Details...." id = "Entry_Details_desc"></textarea>
                <button id = "Submit_Entry_Button" >Create</button>
                    

            </div>
            
        </div>
    )
}
