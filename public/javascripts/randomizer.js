function randomizeSelect(selectId) {

    var options = document.getElementById(selectId).children;

    var random = Math.floor(options.length * (Math.random() % 1));

    var option = options[random];
    option.selected = true;
    
}

var values = {};

window.onload = function(e) {

    document.onchange = function(e) { // Event Delegation: http://davidwalsh.name/event-delegate
        var t = e.target;
        if(t.tagName == "SELECT")
            document.getElementById(t.id.replace("Select")).value = t.children[t.selectedIndex].innerHTML;  
    }

    document.oninput = function(e) {
        var t = e.target;
        if(t.tagName == "INPUT") {
            if(values.hasOwnProperty(t.id))
                var options = values[t.id];
            else
                var options = document.getElementById(t.id.replace("Label")).children;
        
            var currentValue = t.value;
      
            for(i in options) {
                if(options[i].innerHTML == currentValue) { // Can also use .value
                    options[i].selected = true;
                    break;
                }
            }  
        }
    }

    document.getElementById("randomize").onclick = function(e) {
        randomizeSelect("sunday");
    }
}