
/*Client handles all communcation with the
  web server and handles simple U.I updating tasks.

*/
export default class Client{
    constructor(params,modify_success_dialog,modify_error_dialog){
        this.params = params
        this.email = params.match.params.email;
        this.token = localStorage.getItem("POITOKEN");
        this.success_modifier = modify_success_dialog;
        this.error_modifier = modify_error_dialog;
    }
 
    async fetch_and_respond(options,url){
        const response = await  fetch(url,options)
        const data = await response.json()
        return data  
    }
    logout(){
        const options = {
            method: "POST",
            body : JSON.stringify({
                email:this.email,
                token:this.token
            }),
            headers: { "Content-Type": "application/json" }
        }
        return  this.fetch_and_respond(options,"http://localhost:8020/logout")
    }
    change_code(data){
        data.token = this.token;
        data.email = this.email;
        const options = {method:"POST",body:JSON.stringify(data), headers: { "Content-Type": "application/json" }}
        return  this.fetch_and_respond(options,"http://localhost:8020/change-code")
    }
    profile_data(){
        const url = "http://localhost:8020/userprofiledata/" + this.email+"/"+this.token
        const options = {method:"GET"} ;
        return  this.fetch_and_respond(options,url)
    }

    create_person_or_entry(data,url,method){
        data.token =this.token;
        data.email = this.email;
        const options = { method : method, body :JSON.stringify(data), headers: { "Content-Type": "application/json" }};
        return this.fetch_and_respond(options,url);
    }
    delete_person(name){
        const url = "http://localhost:8020/remove-person/"+this.token+"/"+this.email+"/"+name;
        const options = {method: "DELETE"}
        return this.fetch_and_respond(options,url)
    }

    delete_all_data(){
        const url = "http://localhost:8020/breached/"+this.email+"/"+this.token ;
        const options = {method:"DELETE"};
        return  this.fetch_and_respond(options,url);
    }

    send_profile_to_all(profile_name, type){
        const options = {method:"GET"};
        const base_url = "http://localhost:8020/send-profile-to-all/" + this.email+"/"+this.token;
        if(type == "all"){//send all profiles to all contacts
           return this.fetch_and_respond(options,base_url);
        }
        else{//send one profile to all contacts
            const all_url = base_url+"/"+profile_name;
            return  this.fetch_and_respond(options,all_url);
        }


    }
    add_contact(contact_email){
        const url = "http://localhost:8020/add-contact";
        const contact_request_data = {
            token :localStorage.getItem("POITOKEN"),
            email : localStorage.getItem("POIEMAIL"),
            contacts_email:contact_email
        }
        const options = {
            method:"POST",
            body :JSON.stringify(contact_request_data),
            headers: { "Content-Type": "application/json" }}
        return this.fetch_and_respond(options,url);

    }
    remove_contact(contact_email){
        const url = "http://localhost:8020/remove-contact/" 
            +this.token+"/"+this.email+"/"+contact_email;
        const options = {method:"DELETE"};
        return  this.fetch_and_respond(options,url);
    }
     
    async breach(){
        
        var email_result = await this.send_profile_to_all(null , "all")
        var delete_result =  await this.delete_all_data();
        if(email_result.status == "error" || delete_result.status == "error"){
            //user popup
        }
        else{
            //user popup
        }

    }
    change_display_state(change_fun){
        change_fun(prev=>{
            if(prev == false){
                return true;
            }
            else{
                return false;
            }
        })


    }

    on_user_creation_response(status,data,all_modifier){
        if (status == true) {
            const name = data.first+"-"+data.last;
            const new_obj = {
                height: data.height,
                location: data.location,
                race:data.race,
                image:data.image,
                entries:data.entries
            }
            //modify all profiles(persons) with the new person object
            all_modifier(prev=>{
                console.log(prev)
                if(prev == null){
                    let obj = {};
                    obj[name] = new_obj; 
                    return obj;
                }
                else{
                    prev[name] = new_obj; 
                    return prev;
                }
            })
        }

    }


    async send_person_creation_request(response_obj,all_modifier){
     
        const response = await this.create_person_or_entry
                    (response_obj,"http://localhost:8020/addperson","POST");
        //check_cud_response returns a boolean
        this.on_user_creation_response(this.check_cud_response(response),response_obj,all_modifier);
        
    }

    person_CU_with_image(file,person_obj,all_modifier){
        var converter = new FileReader();
        converter.readAsDataURL(file);//converts image to base 64
        converter.onloadend =()=>{//when image is done loading
        person_obj["image"] = converter.result;
        this.send_person_creation_request(person_obj,all_modifier)
        
	}
}
    check_cud_response(response){
        if (response.status=="success") {
                this.change_display_state(this.success_modifier);
                return true;
        }
        else{
                this.change_display_state(this.error_modifier);
                return false;
        }
    }
    check_authentication_response(response){
        if (response.status == "error") {
            window.location.replace("http://localhost:3000/");
            
        }
    }


}