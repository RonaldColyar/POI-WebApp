import React, {useRef , useEffect} from 'react'



export default function EditPersonPopup({state,person,modify_all_persons,self_state_controller}) {


    if (person) {
        const person_name = String(Object.keys(person)[0]);
        const first_and_last = person_name.split("-");
        return (
        
            <div id = "EditPersonPopup" style = {{display:(state? "block":"none")}}>
                <div id = "edit_person_header">
                    <h1>Edit {person_name}</h1>
                    <button onClick = {()=>{self_state_controller(false);}} id = "close_edit_popup">X</button>
                </div>
                <div id = "edit_person_entries">
                    <input 
                       
                        placeholder = {"First:" + first_and_last[0]}
                        className = "edit_person_data"
                        id = "edit_first"></input>
                    <input 
                       
                        placeholder = {"Last:"+first_and_last[1]} 
                        className = "edit_person_data" 
                        id = "edit_last"></input>
                    <input 
                       
                        placeholder = {"Height:"+person[person_name].height} 
                        className = "edit_person_data" 
                        id = "edit_height"></input>
                    <input 
                      
                        placeholder = {"Location:"+person[person_name].location} 
                        className = "edit_person_data" 
                        id = "edit_location"></input>

                    <input 
                   
                        placeholder= {"Race:"+person[person_name].race} 
                        className = "edit_person_data" 
                        id = "edit_race"></input>

                    <input className = "edit_person_data" type = "File" id = "editImageInput"></input>
                    <button 
                        onClick={()=>{document.getElementById("editImageInput").click()}} 
                        id = "change_photo_button">Change Photo</button>
                    <button id = "submit_edit_button">Submit Change</button>
                    
                    
    
    
                </div>
    
                
            </div>
        )
        
        
    }
    else{
        return(

            <></>
        )
    }
   
}
