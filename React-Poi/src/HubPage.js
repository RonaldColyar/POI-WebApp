import React from 'react'
import Accountbar from './accountbar'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import Newpersonpopup from './newpersonpopup'
import Profilesummary from './profilesummary'
import Profileview from './Profileview'
import StatsBar from './statsbar'

export default function HubPage(params) {
    console.log(params.match.params.email)
    return (
        <div id = "hub_main_wrapper">    
            
            <Profilesummary data = "insert data"/>
            <Entryhubview data = "insert data"/>
            <Profileview data = "insert data"/>
            <DetailsView data = "insert data"/>
            <StatsBar data = "insert data"/>
            <Accountbar data = "insert data" />
            <Newpersonpopup/>            
        </div>
            
    )
}
