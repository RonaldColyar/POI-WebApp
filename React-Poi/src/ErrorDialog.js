import React from 'react'

export default function ErrorDialog({state,self_state_controller , actions}) {
    return (
        <div id = "ErrorDialog"style = {{display:(state? "block":"none")}} >
            
            <h1>There Was An Error Completing The Action!</h1>
            <button 
              onClick = {
                    ()=>{
                        actions.change_display_state(self_state_controller)
                    }

              }  

            
            >OK</button>
        </div>
    )
}
