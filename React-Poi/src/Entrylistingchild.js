import React from 'react'

export default function Entrylistingchild({label , threat_level}) {
    console.log(threat_level)
    return (
        <div className = "entry_listing">
            <h1>{label}</h1>
            <img className= "entry_image" src = {"../Images/level"+threat_level+".png"}></img>
            <h3 className= "entry_level_label">{threat_level}</h3>
        </div>
    )
}
