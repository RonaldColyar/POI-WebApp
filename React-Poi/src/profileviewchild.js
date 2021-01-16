import React from 'react'

export default function Profileviewchild({person} , {change_selected}) {
        const name = Object.keys(person)//first layer only will be the name(one key)
        const image = person[name].image
        
        if(typeof image === "undefined"){
            return (
                <div onClick = {
                    change_selected(prev=>{
                        return person;
                    })

                }>
                    <img src = "..Images/defaultimage.png"></img>
                    <h1>{name}</h1>
                </div>
            )
        }
        else{
            return (
                <div>
                    <img src = {image}></img>
                    <h1>{name}</h1>
                </div>
            ) 
            
        }
  

    

}
