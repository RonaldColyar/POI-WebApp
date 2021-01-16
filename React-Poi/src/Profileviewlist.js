import React from 'react'
import Profileviewchild from './profileviewchild';

export default function Profileviewlist({ persons ,display_selector}) {

   

    return (

    persons.map(person =>{
      return <Profileviewchild person = {person} change_selected = {display_selector}/>
    })
         
        
    )
  

}
