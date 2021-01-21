

import React from 'react'
import Profileviewchild from './profileviewchild'


export default function Profileviewheader({persons,display_selector}) {
    console.log(persons)
    if(persons == null  || persons.status == "error"){
        return(
            <div id = "profileview">
            <div id = "profile_view_header">
                <h1 id = "current_profiles_label">Current Profiles</h1>
                <img id = "current_profiles_logo" src = "/Images/buttonlogo.jpg"></img>
                <img id = "current_profiles_logo2" src = "/Images/authlogo.png"></img>
            </div>
            </div>
            
        )
    }
    else{
       
        return (
        
            <div id = "profileview">
            <div id = "profile_view_header">
                <h1 id = "current_profiles_label">Current Profiles</h1>
                <img id = "current_profiles_logo" src = "/Images/buttonlogo.jpg"></img>
                <img id = "current_profiles_logo2" src = "/Images/authlogo.png"></img>
            </div>
            
             <Profileviewchild key = {Object.keys(person)[0]} person = {persons} change_selected = {display_selector}/>
             
            </div>

        
    
    
   
    
     
    
    )


    }

}

