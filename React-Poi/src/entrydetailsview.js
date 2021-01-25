import React from 'react'



function update_ui(status , label, person , person_modifier){
    if (status == true) {
        person_modifier(prev=>{
            const person_name = Object.keys(person)[0];
            delete prev[person_name].entries[label]
            return prev;
        })
        
    }
}
export default function DetailsView({entry,self_state_controller, change_person_data , person}) {
    if (entry) {
        const label = Object.keys(entry)[0];
        return(
        <div id= "EntryDetailedView">
            <div id = "DetailedHeader">
                <h3>Entry Details</h3>
                <button onClick= {()=>{
                        update_ui(true , label,person,change_person_data)


                }} id = "remove_selected_button"><img src = "../Images/trash.png" ></img></button>
            </div>
            <div id= "ActualDetails">
                <div id ="details_level_img_wrapper" >
                    <img id= "details_level_img" src = {"../Images/level"+entry[label].threat_level+".png"}></img>
                </div>
                <h3 id = "entry_date">{entry[label].date}</h3>
                <h3 id = "threat_level">{"Threat Level:" + entry[label].threat_level}</h3>
                <div id = "entry_details_wrapper">
                    <p id = "entry_details">{entry[label].data}</p>
            </div>
                
                    
            
            </div>
            
        </div>
        )
      
    }
    else{
        return (
            <div id= "EntryDetailedView">
                <div id = "DetailedHeader">
                    <h3>Entry Details</h3>
                    <button id = "remove_selected_button"><img src = "../Images/trash.png" ></img></button>
                </div>
                <div id= "ActualDetails">
                    <div id ="details_level_img_wrapper" >
                        <img id= "details_level_img" src = "../Images/level1.png"></img>
                    </div>
                    <h3 id = "entry_date">Waiting....</h3>
                    <h3 id = "threat_level">Waiting....</h3>
                    <div id = "entry_details_wrapper">
                        <p id = "entry_details">Waiting....</p>
                    </div>
                    
                        
                
                </div>
                
            </div>
        )
    }
}
