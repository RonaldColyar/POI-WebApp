import React from 'react'

export default function Newpersonpopup() {
    return (
        <div className= "popupwrappers"  id = "new_person_wrapper">
            <div id = "new_person_form">
                <div id = "new_person_header">
                    <h2>Add New Person</h2>
                    <img src = "../Images/authlogo.png"></img>
                    <button id = "close_create_person">X</button>
                </div>
                <div id = "new_person_entries">
                    <input id= "new_first_entry" className = "persondata" placeholder = "First Name..."></input>
                    <input id= "new_last_entry" className = "persondata"  placeholder = "Last Name..."></input>
                    <input id= "new_height_entry" className = "persondata" placeholder = "Height..."></input>
                    <input id= "new_location_entry"  className = "persondata" placeholder = "Location..."></input>
                    <input id = "new_race_entry"  className = "persondata" placeholder = "Race/Skin Tone..."></input>
                    <input type='file' id="getFile"  ></input> 
                    <button id="Image" >Choose Your Profile Image</button>
                    <button id = "Create_person_button">Create</button>
                    
                </div>
				


            </div>
            
        </div>
    )
}
