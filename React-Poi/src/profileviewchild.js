import React from 'react'

export default function Profileviewchild({person_data,person_name,change_selected}) {
        const image = person_data.image
        if(typeof image === "undefined"){
            return (
                <div className = "PersonsWrapper" >
                    <img className = "PersonsImages"onClick = {

                    function(){change_selected(prev=>{
                        return {[person_name]:person_data};
                    })}

                }  src = "../Images/defaultimage.png"></img>
                    <h1 className = "PersonsNames">{person_name}</h1>
                </div>
            )
        }
        else{
            return (
                <div>
                    <img src = {image}></img>
                    <h1>{person_name}</h1>
                </div>
            ) 
            
        }
  

    

}
