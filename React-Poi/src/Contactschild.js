import React from 'react'

export default function Contactschild({data,actions,all_modifier}) {
    
    return (
        <div className = "contacts_child">
        <h1>{data}</h1>
        <button
        
        onClick = {
            ()=>{
                actions.remove_contact(data)
                all_modifier(prev=>{
                  var new_contacts = new Object(prev);
                  console.log(new_contacts)
                  delete new_contacts[data]
                  console.log(new_contacts)
                  return new_contacts
                })
            }


        }        
        >Remove</button>
        
    </div>
    )
}
