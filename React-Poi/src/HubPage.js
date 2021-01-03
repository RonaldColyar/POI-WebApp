import React from 'react'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import Profilesummary from './profilesummary'
import Profileview from './Profileview'

export default function HubPage(params) {
    console.log(params.match.params.email)
    return (
        <div id = "hub_main_wrapper">    
            
            <Profilesummary data = "insert data"/>
            <Entryhubview data = "insert data"/>
            <Profileview data = "insert data"/>
            <DetailsView data = "insert data"/>
        </div>
            
    )
}
