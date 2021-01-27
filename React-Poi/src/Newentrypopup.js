import React , {useRef} from 'react'




function current_date(){
    var date = new  Date();
    var current_month = date.getUTCMonth() +1; 
    var current_day = date.getUTCDate();
    var current_year = date.getUTCFullYear();
    var stringified_date = current_month + "/" +current_day+ "/"+ current_year;
    return stringified_date;
}


export default function Newentrypopup({state,self_state_controller,person ,actions,all_modifier}) {
    const level_ref = useRef();
    const label_ref = useRef();
    const details_ref = useRef();


    function update_data_if_successful(status,data,first_last_array){
        if (status == true) {
            const new_obj = {threat_level : data.threat_level,
                            data: data.description,
                            date:current_date()}

            all_modifier(prev=>{
                const name = first_last_array[0]+"-"+first_last_array[1];
                console.log(prev)
                if (prev[name].entries) {
                    prev[name].entries[data.label]= new_obj;
                    return prev;
                }
                else{
                    prev[name].entries = {[data.label]:new_obj}
                    return prev;
                }
            })
        }

    }
    async function send_entry_request() {
        const name = Object.keys(person);//first layer only will be the name(one key)
        const first_and_last = String(name[0]).split("-");
        const url = "http://localhost:8020/addentry";
        const data = {
          first : first_and_last[0],
          last : first_and_last[1],
          email: localStorage.getItem("POIEMAIL"),
          label:label_ref.current.value,
          description : details_ref.current.value,
          threat_level: level_ref.current.value,
          token: localStorage.getItem("POITOKEN")
              }
        const response = await actions.create_person_or_entry(data,url,"PUT")
        update_data_if_successful(actions.check_cud_response(response),data,first_and_last);
        
    }

    return (
        <div className= "popupwrappers" style = {{display:(state? "block":"none")}} id= "entry_popup">
            <div id = "entry_popup_header">
               <h1 id= "add_entry_label">Add Entry</h1>
               <img id = "entry_popup_logo" src = "../Images/authlogo.png"></img>
               <button id = "close_entry_popup" onClick= {function(){actions.change_display_state(self_state_controller)}}>X</button>
            </div>
            <div id = "threat_popup_entries">
                <img id = "threat_popup_rotation"  src = "../Images/level1.png"></img>
                <select ref = {level_ref} id = "threat_level_dropdown">
                        <option value = "1">Level 1</option>
                        <option value = "2">Level 2</option>
                        <option value = "3"> Level 3</option>
                </select>
                <input ref = {label_ref} className = "persondata"  id = "Entry_Details_label" placeholder = "Label of Entry..."></input>
                <textarea ref = {details_ref} placeholder= "Details...." id = "Entry_Details_desc"></textarea>
                <button   onClick = {()=>{

                    if (label_ref.current.value) {
                        if (label_ref.current.value.includes(" ")) {
                            alert("Please Make Sure The Label Includes No Spaces!!")
                        }
                        else{
                            send_entry_request()
                        }
                        
                    }
                          


                }} id = "Submit_Entry_Button" >Create</button>
                    

            </div>
            
        </div>
    )
}
