import React , {useState,useRef} from 'react'
import Accountbar from './accountbar'
import Confirmbreachpopup from './Confirmbreachpopup'
import ContactsPopup from './ContactsPopup'
import Createcontactspopup from './Createcontactspopup'
import DetailsView from './entrydetailsview'
import Entryhubview from './entryhubview'
import Newentrypopup from './Newentrypopup'
import Newpersonpopup from './newpersonpopup'
import Profilesummary from './profilesummary'
import Profileview from './Profileview'
import StatsBar from './statsbar'



export default function HubPage(params) {
    const [person , changeperson] = useState([])
    this.email = params.match.params.email;
    this.token = localStorage.getItem("poitoken");

    this.fetch_and_respond =async function(header,url){
        const response = await  fetch(url,header)
        const data = await response.json()
        return data  
    }

    this.profile_data = async function(){
        const url = "http://localhost:8020/userprofiledata/" + this.email+"/"+this.token
        const header = {method:"GET",body: {}} ;
        return await  this.fetch_and_respond(header,url)
    }

    this.create_new_person = async function(data){
        const url = "http://localhost:8020/addperson";
        data.token = this.token;
        data.email = this.email;

        const header = {
            method : "POST",
            body : data
        };
        return await this.fetch_and_respond(header,url);
    
    }
    this.breach = async function(){
        
    }
    //not authed or server issues
    if(this.profile_data.status == "error"){
        return(
            <div>

            </div>
        )
    }
    else{
        return (
        
            <div id = "hub_main_wrapper">    
                <Profilesummary data = {person}/>
                <Entryhubview data = {person}/>
                <Profileview persons = {this.profile_data} selector = {changeperson}/>
                <DetailsView data = {person}/>
                <StatsBar />
                <Accountbar data = {this.email} />
                <Newpersonpopup/>    
                <Newentrypopup/>
                <Confirmbreachpopup/>    
                <ContactsPopup/>
                <Createcontactspopup/>    
            </div>
                
        )
    }
}
