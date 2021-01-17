import React from 'react'

export default function Profilesummary({person , actions,entry_popup_display_selector}) {

   
    
    if(person != null){
        const name = Object.keys(person);
        const first_and_last = String(name[0]).split("-");
        if(person.image){
            return (
                <div id= "profile_summary">
                    <div id = "profile_summary_header">
                        <img id = "Main_Profile_Image" src= {person[name].image}>
                        </img>
                    </div>
                    <div id = "profile_summary_footer">
                        <h3>{"First Name:" +first_and_last[0] }</h3>
                        <h3>{"Last Name:" + first_and_last[1]}</h3>
                        <h3>{"Height:" + person[name].height}</h3>
                        <h3>{"Location:" + person[name].location}</h3>
                        <h3>{"Race/Skin Tone:" + person[name].race}</h3>
                        <button id = "add_entry_button" 
                            onClick = {
                                function(){actions.change_display_state(entry_popup_display_selector)}
                            }   
                            >New Entry
                        </button>
                        <div>
                            <button id = "editbutton"><img id= "editImage" src = "../Images/pencil.png"></img></button>
                            <button id = "deletebutton"><img id= "deleteImage" src = "../Images/trash.png"></img></button>
                            <button id = "sharebutton">Share Profile</button>
                        </div>
                    </div>
                    
                    
                </div>
            )
                }



        else{
                    return(
                    <div id= "profile_summary">
                    <div id = "profile_summary_header">
                        <img id = "Main_Profile_Image" src= "../Images/defaultimage.png">
                        </img>
                    </div>
                    <div id = "profile_summary_footer">
                        <h3>{"First Name:" +first_and_last[0] }</h3>
                        <h3>{"Last Name:" + first_and_last[1]}</h3>
                        <h3>{"Height:" + person[name].height}</h3>
                        <h3>{"Location:" + person[name].location}</h3>
                        <h3>{"Race/Skin Tone:" + person[name].race}</h3>
                        <button id = "add_entry_button" 
                            onClick = {
                                function(){actions.change_display_state(entry_popup_display_selector)}
                            }   
                            >New Entry
                        </button>
                        <div>
                            <button id = "editbutton"><img id= "editImage" src = "../Images/pencil.png"></img></button>
                            <button id = "deletebutton"><img id= "deleteImage" src = "../Images/trash.png"></img></button>
                            <button id = "sharebutton">Share Profile</button>
                        </div>
                    </div>
                    
                </div>
                    )
                    
                }
            }
            
    else{
        
        return (


            <div id= "profile_summary">
            <div id = "profile_summary_header">
                <img id = "Main_Profile_Image" src= "../Images/defaultimage.png">
                </img>
            </div>
            <div id = "profile_summary_footer">
                <h1>No Person Selected</h1>
                <div>
                    <button id = "editbutton"><img id= "editImage" src = "../Images/pencil.png"></img></button>
                    <button id = "deletebutton"><img id= "deleteImage" src = "../Images/trash.png"></img></button>
                    <button id = "sharebutton">Share Profile</button>
                </div>
            </div>
        </div>


        )
    }
}
