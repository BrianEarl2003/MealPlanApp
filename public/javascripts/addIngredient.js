var numbers = ["Select Quantity", "⅛", "⅜", "⅝", "⅞", "¼", "¾", "⅓", "⅔", "½", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
var units = ["Select the Unit", "Tbsp", "tsp", "Oz", "Fl. Oz", "Cup", "qt", "pt", "gal", "lb", "Can", "unit"];

function addFields(divName) {
    var newDiv = document.createElement('div');
    newDiv.className = "row";
    var selectHTML = "";
    selectHTML='<div class="col"><select class="form-control recipeForm" name="ingQuant">';
    for(i = 0; i < numbers.length; i = i + 1) {
        selectHTML += "<option value='" + numbers[i] + "'>" + numbers[i] + "</option>";
    }
    selectHTML += "</select></div>";
    selectHTML += '<div class="col"><select class="form-control recipeForm" name="ingUnit">';
    for(i = 0; i < units.length; i = i + 1) {
        selectHTML += "<option value='" + units[i] + "'>" + units[i] + "</option>";
    }
    selectHTML += "</select></div>";
    selectHTML += '<div class="col"><input type="text" name="ingName" class="input form-control recipeForm" "inputIngredientName" placeholder="Ingredient Name"></div>'
    newDiv.innerHTML = selectHTML;
    document.getElementById(divName).appendChild(newDiv);
}


