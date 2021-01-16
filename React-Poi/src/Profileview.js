import React from 'react'
import Profileviewheader from './profileviewheader'
import Profileviewlist from './Profileviewlist'

export default function Profileview({ persons ,display_selector} ) {

    if(persons == null  || persons.status == "error"){
        return(
            <Profileviewheader/>
        )
    }
    else{
        console.log("rendering list")
        console.log()
    return (
    
        
     <>
    <Profileviewheader/>
    <Profileviewlist persons = {persons}  display_selector = {display_selector}/>
    
    
    
    </> 
       
    )
    }
}
