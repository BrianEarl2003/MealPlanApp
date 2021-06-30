var numbers = ["Select Quantity", "⅛", "¼", "½", "⅓", "⅔"];
var units = ["Select the Unit", "Tbsp", "tsp", "Oz", "Fl. Oz", "Cup", "qt", "pt", "gal", "lb", "unit"];

function addFields(divName) {
    var newDiv = document.createElement('div');
    var selectHTML = "";
    selectHTML="<select>";
    for(i = 0; i < numbers.length; i = i + 1) {
        selectHTML += "<option value='" + numbers[i] + "'>" + numbers[i] + "</option>";
    }
    selectHTML += "</select>";
    selectHTML += "<select>";
    for(i = 0; i < units.length; i = i + 1) {
        selectHTML += "<option value='" + units[i] + "'>" + units[i] + "</option>";
    }
    selectHTML += "</select>";
    selectHTML += '<textarea class="input" style="min-height:40px; max-height:40px;  width:68.5%" id="inputIngredientName" placeholder="Type Ingredient" name="ingName"></textarea>'
    newDiv.innerHTML = selectHTML;
    document.getElementById(divName).appendChild(newDiv);
}



/*
<textarea class="input" style="min-height:40px; max-height:40px;  width:68.5%" id="inputIngredientName"
placeholder="Type Ingredient" name="ingName"></textarea>*/