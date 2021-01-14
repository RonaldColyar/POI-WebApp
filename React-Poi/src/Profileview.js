import React from 'react'
import Profileviewheader from './profileviewheader'
import Profileviewlist from './Profileviewlist'

export default function Profileview({ persons },{display_selector} ) {
    
    return (
        
     <>
    <Profileviewheader/>
    <Profileviewlist persons = {persons}  display_selector = {display_selector}/>
    
    
    
    </> 
       
    )
}
