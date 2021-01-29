import React from 'react'
function number_of_entries(person_data){
    if (person_data.entries) {
        return Object.keys(person_data.entries).length;
    }
    else{
        return 0;
    }
}
export default function Profileviewchild({person_data,person_name,change_selected}) {
        const image = person_data.image
        if(typeof image === "undefined" || image == null){
            return (
                <div className = "PersonsWrapper" onClick = {

                    ()=>{change_selected(prev=>{
                         return {[person_name]:person_data};
                     })}
 
                 }>
                    <img className = "PersonsImages" src = "../Images/defaultimage.png"></img>
                    <h1 className = "PersonsNames">{person_name}</h1>
                    <h1 className = "PersonsEntries"> {"Entries:"+number_of_entries(person_data)}</h1>
                </div>
            )
        }
        else{
          
            return (
                <div className= "PersonsWrapper" onClick = {

                    ()=>{change_selected(prev=>{
                        return {[person_name]:person_data};
                    })}

                    } >
                    <img className = "PersonsImages"  src = {image}></img>
                    <h1  className = "PersonsNames">{person_name}</h1>
                    <h1 className = "PersonsEntries"> {"Entries:"+number_of_entries(person_data)}</h1>
                </div>
            ) 
            
        }
  

    

}
