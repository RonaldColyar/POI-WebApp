import React from 'react'

export default function Profilesummary({data}) {
    return (
        <div id= "profile_summary">
            <div id = "profile_summary_header">
                <img id = "Main_Profile_Image" src= "/Images/defaultimage.png">
                </img>
               

            </div>
            <div id = "profile_summary_footer">
                <h3>First Name:</h3>
                <h3>Last Name:</h3>
                <h3>Height:</h3>
                <h3>Location:</h3>
                <h3>Race/Skin Tone:</h3>
                <button id = "add_entry_button">New Entry</button>
                <div>
                    <button id = "editbutton"><img id= "editImage" src = "../Images/pencil.png"></img></button>
                    <button id = "deletebutton"><img id= "deleteImage" src = "../Images/trash.png"></img></button>
                    <button id = "sharebutton">Share Profile</button>
                </div>
            </div>
            
            
        </div>
    )
}
