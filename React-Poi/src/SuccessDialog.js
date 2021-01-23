import React from 'react'

export default function SuccessDialog({state,self_state_controller,actions}) {
    return (
        <div id = "SuccessDialog" style = {{display:(state? "block":"none")}}>
            <h1>Action Successful!</h1>
            <button         
              onClick = {
                    ()=>{
                        actions.change_display_state(self_state_controller)
                    }

              }  >OK</button>
            
        </div>
    )
}
