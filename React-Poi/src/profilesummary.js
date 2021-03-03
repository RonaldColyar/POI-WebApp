import React from 'react'

/* update_ui Changes the selected person state
   once its deleted, the
   state of all persons 
   and the selected entry state.
*/
function update_ui(
    status,
    all_person_modifier,
    names,
    change_selected_person,
    change_seleted_entry){
    if (status == true) {
        all_person_modifier(prev=>{
            const name = names[0]+"-"+names[1];
            delete prev[name];
            return prev;


        })
        change_selected_person(null);
        change_seleted_entry(null);
        
    }

}



export default function Profilesummary(
    {person , 
    actions,
    entry_popup_display_selector,
    all_modifier,
    edit_state_modifier,
    change_person_state,
    change_magnified_state,
    change_entry_state}) {

   
    
    if(person != null){ 
        const name = Object.keys(person);
        const first_and_last = String(name[0]).split("-");
        if(person[name].image){
            
            return (
                <div id= "profile_summary">
                    <div id = "profile_summary_header">
                        <img id = "Main_Profile_Image" src= {person[name].image}></img>
                        <button id = "image_magnify_button" onClick = {()=>{change_magnified_state(true)}}>
                            <img src = "../Images/magni.png"></img>
                        </button>
                    </div>
                    <div id = "profile_summary_footer">
                        <h3>{"First:" +first_and_last[0] }</h3>
                        <h3>{"Last:" + first_and_last[1]}</h3>
                        <h3>{"Height:" + person[name].height}</h3>
                        <h3>{"Location:" + person[name].location}</h3>
                        <h3>{"Race/Skin Tone:" + person[name].race}</h3>
                        <button id = "add_entry_button" 
                            onClick = {
                                ()=>{actions.change_display_state(entry_popup_display_selector)}
                            }   
                            >New Entry
                        </button>
                        <div>
                            <button 
                                onClick = {()=>{edit_state_modifier(true)}}
                                id = "editbutton"><img id= "editImage" src = "../Images/pencil.png"></img></button>
                            <button id = "deletebutton"  onClick = {async()=>{                          
                                const response = await actions.delete_person(name);
                                update_ui(
                                    actions.check_cud_response(response),
                                    all_modifier,
                                    first_and_last,
                                    change_person_state,
                                    change_entry_state);
                                
                            }


                            }><img id= "deleteImage" src = "../Images/trash.png"></img></button>
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
                        <h3>{"First:" +first_and_last[0] }</h3>
                        <h3>{"Last:" + first_and_last[1]}</h3>
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
                            <button 
                                onClick = {()=>{edit_state_modifier(true)}}
                                id = "editbutton"><img id= "editImage" src = "../Images/pencil.png"></img></button>
                            <button id = "deletebutton"          
                            onClick = {async()=>{                          
                                    const response = await actions.delete_person(name);
                                    update_ui(
                                        actions.check_cud_response(response),
                                        all_modifier,
                                        first_and_last,
                                        change_person_state,
                                        change_entry_state);
                                    
                                     }}  
                                     ><img id= "deleteImage" src = "../Images/trash.png"></img>
                            </button>
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
