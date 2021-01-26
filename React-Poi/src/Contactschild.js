import React from 'react'

export default function Contactschild({data,actions,all_modifier}) {
    
    return (
        <div className = "contacts_child">
        <h1>{data}</h1> 
        <button
        
        onClick = {
            async ()=>{
                const response =await actions.remove_contact(data);
                actions.check_cud_response(response);
                all_modifier(prev=>{
                // (data) is formatted like:'email'(quotes being apart of the string)
                  delete prev[String(data)]
                  return prev;
                })
            }


        }        
        >Remove</button>
        
    </div>
    )
}
