import React from 'react'



function download_image(data,name){
    var a = document.createElement("a"); 
    a.href = data
    a.download = "POI_"+name+"_image.png";
    a.click(); 
}
export default function MagnifiedImagePopup({state,person,self_state_controller}) {
    
    if (person) {
         const person_name = Object.keys(person)[0];
    
        if (person[person_name].image) {
            return(
                <div 
                    id = "magnified_image_wrapper" 
                    
                    style = {{display:(state? "block":"none")}}>
                        <img id = "magnified_image" src = {person[person_name].image} ></img>
                        <button 
                            onClick = {()=>{download_image(person[person_name].image , person_name)}}
                            id = "download_image_button">
                           
                                <img 
                                    id = "download_image" 
                                    src = "../Images/download_icon.png">
                                    
                                </img>
                        </button>
                        <button 
                            onClick = {()=>{self_state_controller(false)}} 
                            id = "close_magnified_image">X</button>
                </div>
            )
        }
        else{
            return(<></>)
        }
    }
    else{
        return(<></>)
    }
    
}
