import React from 'react'

export default function Profileviewchild({person,change_selected}) {
        const name = Object.keys(person)//first layer only will be the name(one key)
        console.log(name)
        const image = person[name].image
    
        if(typeof image === "undefined"){
            return (
                <div className = "PersonsWrapper" >
                    <img className = "PersonsImages"onClick = {

                    function(){change_selected(prev=>{
                        return person;
                    })}

                }  src = "../Images/defaultimage.png"></img>
                    <h1 className = "PersonsNames">{name}</h1>
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
