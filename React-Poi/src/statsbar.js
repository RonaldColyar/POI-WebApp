import React from 'react'

export default function StatsBar({data,person_popup_display_selector}) {
    if (data) {



        return(
            <div id = "statsbar">
            <div class= "statwrappers"  id = "profile_num_wrapper">
                <h3 id= "profile_num_header">Profiles</h3>
                <h2 id = "profile_num"> {data.length}</h2>
                <button id = "add_person_button" onClick = {function(){
                    person_popup_display_selector(prev =>{
                        return true;
                    })
                }}> Add New Person</button>
            </div>
            <div class= "statwrappers" id = "entry_num_wrapper">
                <h3 id= "entry_num_header">Contacts</h3>
                <h2 id = "entry_num"> 0</h2>
            </div>
            <div   id = "date_num_wrapper">
                <h3 id= "date_num_header">Last Entry Date</h3>
                <h2 id = "date_num"> 01/10/12</h2>
            </div>
        
        
    </div>
        )
        
        
    }
    else{
        return(
            
                <div id = "statsbar">
                    <div class= "statwrappers"  id = "profile_num_wrapper">
                        <h3 id= "profile_num_header">Profiles</h3>
                        <h2 id = "profile_num"> 0</h2>
                        <button id = "add_person_button" onClick = {function(){
                            person_popup_display_selector(prev =>{
                                return true;
                            })
                        }}> Add New Person</button>
                    </div>
                    <div class= "statwrappers" id = "entry_num_wrapper">
                        <h3 id= "entry_num_header">Entries</h3>
                        <h2 id = "entry_num"> 0</h2>
                    </div>
                    <div   id = "date_num_wrapper">
                        <h3 id= "date_num_header">Last Entry Date</h3>
                        <h2 id = "date_num"> N/A</h2>
                    </div>
                    
                    
                </div>
        )
        
    }
  
}
