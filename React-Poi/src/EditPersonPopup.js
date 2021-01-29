import React, {useRef , useEffect} from 'react'

//avoiding long un-readable code
function data_obj(ref_obj){
    const data = {
        first:ref_obj.first_name.current.value,
        last : ref_obj.last_name.current.value,
        height: ref_obj.height_name.current.value,
        location:ref_obj.location_name.current.value,
        race : ref_obj.race_name.current.value,
     
    };
    return data;
}

function remove_old_person(actions,modify_all_persons,person_name){
        actions.delete_person(person_name);
        modify_all_persons(prev=>{
            delete prev[person_name];
            return prev;
        })
}

function edit_person(person_name,modifier,actions,type,person,ref_obj){
    var data = data_obj(ref_obj);//returns object
    data["entries"] = person[person_name].entries;
    //with or without image
    if (type == "without") {
        data["image"] = person[person_name].image;
        actions.send_person_creation_request(data,modifier);
    }
    else{
        const file = ref_obj.image_input.current.files[0];
        actions.person_CU_with_image(file,data,modifier);
    }
    remove_old_person(actions,modifier,person_name);
}

export default function EditPersonPopup(
    
    {   state,
        person,
        modify_all_persons,
        self_state_controller,
        actions}) {



    var ref_obj = {
        first_name : useRef(),
        last_name : useRef(),
        height_name : useRef(),
        location_name : useRef(),
        race_name : useRef(),    
        image_input : useRef()
    }

  

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
                        id = "edit_first"
                        ref = {ref_obj.first_name}></input>
                    <input 
                       
                        placeholder = {"Last:"+first_and_last[1]} 
                        className = "edit_person_data" 
                        id = "edit_last"
                        ref = {ref_obj.last_name}></input>
                    <input 
                       
                        placeholder = {"Height:"+person[person_name].height} 
                        className = "edit_person_data" 
                        id = "edit_height"
                        ref = {ref_obj.height_name}></input>
                    <input 
                      
                        placeholder = {"Location:"+person[person_name].location} 
                        className = "edit_person_data" 
                        id = "edit_location"
                        ref = {ref_obj.location_name}></input>

                    <input 
                   
                        placeholder= {"Race:"+person[person_name].race} 
                        className = "edit_person_data" 
                        id = "edit_race"
                        ref = {ref_obj.race_name}></input>

                    <input 
                        className = "edit_person_data" 
                        type = "File" 
                        id = "editImageInput"
                        onChange= {
                            ()=>{
                                edit_person(person_name,modify_all_persons,actions,"with",person,ref_obj)
                                    }} 
                        ref = {ref_obj.image_input}></input>
                    <button 
                        onClick={()=>{document.getElementById("editImageInput").click()}} 
                        id = "change_photo_button">With Photo</button>
                    <button 
                        onClick = {()=>{
                 

                        edit_person(person_name,modify_all_persons,actions,"without",person,ref_obj);
                           
                            

                        }}
                        id = "submit_edit_button">Without Photo</button>
                    
                    
    
    
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
