import React from 'react'

export default function Confirmbreachpopup() {
    return (
        <div id = "breach_confirm_wrapper">
            <h1 id = "breach_warning_label">This is very dangerous when it comes down to your data!!</h1>

            <input className = "persondata" id = "breach_code_input" placeholder = "Security Code..."></input>
            <button id = "breach_confirm_button">START BREACH PROTOCOL!</button>
            <button id = "close_breach_popup">X</button>
            
            
        </div>
    )
}
