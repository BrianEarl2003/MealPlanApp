function randomizeSelect(selectId) {

    var options = document.getElementById(selectId).children;
    
    var random = 0;
    do {
        random = Math.floor(7 * (Math.random() % 1));
    } while (random == 0);
    
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
        randomizeSelect("monday");
        randomizeSelect("tuesday");
        randomizeSelect("wednesday");
        randomizeSelect("thursday");
        randomizeSelect("friday");
        randomizeSelect("saturday");
    
        //gotta make sure that they're all unique
        var days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    
        for (x = 0; x < 15; x++) {
          for (i = 0; i < 7; i++) {
              var e = document.getElementById(days[i]);
              var currentDayRecipe = e.options[e.selectedIndex].text;
              for (j = i + 1; j < 7; j++) {
                  var f = document.getElementById(days[j]);
                  var otherDayRecipe = f.options[f.selectedIndex].text;
                  if (currentDayRecipe == otherDayRecipe) {
                     console.log(days[i] + " and " + days[j] + " match.");
                     randomizeSelect(days[j]);
                    }
                }
            }
        }
    }
}