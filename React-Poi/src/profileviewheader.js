

import React from 'react'
import Profileviewchild from './profileviewchild'

export default function Profileviewheader({persons,display_selector}) {
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
        console.log("rendering list")
        console.log()
    return (
    
        <div id = "profileview">
        <div id = "profile_view_header">
            <h1 id = "current_profiles_label">Current Profiles</h1>
            <img id = "current_profiles_logo" src = "/Images/buttonlogo.jpg"></img>
            <img id = "current_profiles_logo2" src = "/Images/authlogo.png"></img>
        </div>
        { persons.map(person =>{
                 return <Profileviewchild person = {person} change_selected = {display_selector}/>
             })}
        </div>

        
    
    
   
    
     
    
    )


    }

}

