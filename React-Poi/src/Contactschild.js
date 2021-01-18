import React from 'react'

export default function Contactschild({data}) {
    return (
        <div className = "contacts_child">
        <h1>{data.email}</h1>
        <button>Remove</button>
        
    </div>
    )
}
