import React,{useRef} from 'react'


export default function Newpersonpopup(
    
    {
        state, 
        self_state_controller, 
        actions,
        all_modifier,
        image_state_controller
        }) {

    var ref_obj = {
        first_name : useRef(),
        last_name : useRef(),
        height_name : useRef(),
        location_name : useRef(),
        race_name : useRef(),    
        image_input : useRef()
    }

    function update_data_if_successful(status,data){
        if (status == true) {
            const name = data.first+"-"+data.last;
            const new_obj = {
                height: data.height,
                location: data.location,
                race:data.race,
                image:data.image
            }
            all_modifier(prev=>{
                console.log(prev);
                prev[name] = new_obj;
                console.log(prev);
                return prev;
            })
        }

    }

    async function send_person_creation_request(){
        const response_obj = {
            first:ref_obj.first_name.current.value,
            last : ref_obj.last_name.current.value,
            height: ref_obj.height_name.current.value,
            location:ref_obj.location_name.current.value,
            race : ref_obj.race_name.current.value,
            image: actions.uploaded_image

        };
        const response = await actions.create_person_or_entry
                    (response_obj,"http://localhost:8020/addperson","POST");
        update_data_if_successful(actions.check_cud_response(response),response_obj);
        
    }

    return (
        <div className= "popupwrappers" style = {{display:(state? "block":"none")}} id = "new_person_wrapper">
            <div id = "new_person_form">
                <div id = "new_person_header">
                    <h2>Add New Person</h2>
                    <img src = "../Images/authlogo.png"></img>
                    <button id = "close_create_person" onClick= {function(){actions.change_display_state(self_state_controller)}}>X</button>
                </div>
                <div id = "new_person_entries">
                    <input id= "new_first_entry" 
                        className = "persondata" ref = {ref_obj.first_name} placeholder = "First Name..."></input>
                    <input id= "new_last_entry" 
                        className = "persondata" ref = {ref_obj.last_name}  placeholder = "Last Name..."></input>
                    <input id= "new_height_entry" 
                        className = "persondata" ref = {ref_obj.height_name} placeholder = "Height..."></input>
                    <input id= "new_location_entry"  
                        className = "persondata" ref = {ref_obj.location_name}  placeholder = "Location..."></input>
                    <input id = "new_race_entry"  
                        className = "persondata" ref = {ref_obj.race_name} placeholder = "Race/Skin Tone..."></input>
                        
                    <input type='file' id="getFile" 
                            onChange= {
                                function(){
                                actions.convert_file(ref_obj.image_input.current.files[0],image_state_controller)
                                        }} 
                            ref= {ref_obj.image_input } >       
                    </input> 

                    <button id="Image" onClick = {
                       ref_obj.image_input.click
                        
                    }  >Choose Your Profile Image</button>
                    <button id = "Create_person_button" onClick = {
                        function(){
                            send_person_creation_request()
                        }
                    }>Create</button>
                    
                </div>
				


            </div>
            
        </div>
    )

}
