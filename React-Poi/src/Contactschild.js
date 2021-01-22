import React from 'react'

export default function Contactschild({data,actions}) {
    
    return (
        <div className = "contacts_child">
        <h1>{data}</h1>
        <button
        
        onClick = {
            ()=>{
                actions.remove_contact(data)
            }


        }        
        >Remove</button>
        
    </div>
    )
}
