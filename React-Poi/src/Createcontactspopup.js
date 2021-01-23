import React,{useRef} from 'react'

export default function Createcontactspopup({state,self_state_controller, actions,all_modifier}) {
    const contact_ref = useRef();
    return (
        <div id = "create_contacts_wrapper" style = {{display:(state? "block":"none")}} >
            <h1 id = "create_contact_label">Create New Contact</h1>
            <input ref = {contact_ref} placeholder = "Contact's Email" id = "Contact_email_entry"></input>
            <button id = "create_contact_button"
            onClick= {
                async ()=>{
                   var response = await actions.add_contact(contact_ref.current.value)
                    if (actions.check_cud_response(response)==true){
                        all_modifier(prev=>{
                            prev[contact_ref.current.value] = null;
                            return prev
                        })

                    } {
                        
                    }

                }


            }
            
            
            >Create</button>
            <button id = "close_add_contact_popup" onClick = {function () {
                actions.change_display_state(self_state_controller)                
            }}>X</button>
            
        </div>
    )
}
