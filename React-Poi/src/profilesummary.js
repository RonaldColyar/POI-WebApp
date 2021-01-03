import React from 'react'

export default function Profilesummary() {
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
                <button>New Entry</button>
            </div>
            
        </div>
    )
}
