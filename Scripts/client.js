
function ViewStateModifier() {
    this.hide_element = function(id) {
        document.getElementById(id).style.display = "none";
    }
    
}




const state_modifier  = new ViewStateModifier()