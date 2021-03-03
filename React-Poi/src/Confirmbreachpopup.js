import React from 'react'


async function delete_data(actions){
    let response = await actions.delete_all_data();
    if(actions.check_cud_response(response) == true){
        window.location.replace("http://localhost:3000/");
    }
}


export default function Confirmbreachpopup({state, self_state_controller, actions}) {
    return (
        <div id = "breach_confirm_wrapper" style = {{display:(state? "block":"none")}} >
            <h1 id = "breach_warning_label">This is very dangerous when it comes down to your data!!</h1>

            <button id = "breach_confirm_button" onClick = {()=>{delete_data(actions)}}>START BREACH PROTOCOL!</button>
            <button id = "close_breach_popup" onClick= {function(){actions.change_display_state(self_state_controller)}}>X</button>
            
            
        </div>
    )
}
