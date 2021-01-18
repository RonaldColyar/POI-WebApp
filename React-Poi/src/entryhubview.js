import React from 'react'
import Entrylistingchild from './Entrylistingchild'

export default function Entryhubview({person,change_selected_entry}) {

if (person) {
    const name = Object.keys(person);
    if (person[name].entries) {
        
        return (
            <div id = "entry_hub_view">
                <div id = "entry_hub_header">
                    <h1 id = "entry_hub_label">Entries:</h1>
                    <div id = "entries">
                        {Object.keys(person[name].entries).map(label =>{
                            /* 
                                person sample data:
                        {"ron-colyar" :{height:"5'0" , location:"unknown" , race :"white" , 
                        entries:{"kill":{level:3,date:"1/3/2020", details:"nothing"}}}}                
                            */
                            return <div onClick= {()=>{change_selected_entry(prev=>{return person[name].entries[label]})}}>
                                    <Entrylistingchild key={Object.keys(label)}    label = {label} />
                                   </div>
                        })}
                    </div>
    
                </div>
                
            </div>
        )
    }
    else{
        return (
            <div id = "entry_hub_view">
                <div id = "entry_hub_header">
                    <h1 id = "entry_hub_label">No Entries</h1>
                </div>
                
            </div>
        )
    }

    
}
else{
    return (
        <div id = "entry_hub_view">
            <div id = "entry_hub_header">
                <h1>No Person Selected</h1>
            </div>
            
        </div>
    )
}

}
