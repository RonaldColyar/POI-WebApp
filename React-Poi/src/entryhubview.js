import React from 'react'
import Entrylistingchild from './Entrylistingchild'

export default function Entryhubview({person,change_selected_entry}) {

if (person) {
    const name = Object.keys(person);
    if (person[name].entries) {
        
        return (
            <div id = "entry_hub_view">
                <div id = "entry_hub_header">
                    <h1>Entries:</h1>
                    <div id = "entries">
                        {person[name].entries.map(entry =>{
                            return <div onClick= {()=>{change_selected_entry(prev=>{return entry})}}>
                                    <Entrylistingchild key={Object.keys(entry)}  data = {entry} />
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
                    <h1>No Entries</h1>
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
