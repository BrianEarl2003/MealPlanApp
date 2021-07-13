var numbers = ["Fractional Quantity", "⅛", "⅜", "⅝", "⅞", "¼", "¾", "⅓", "⅔", "½"];
var units = ["unit", "Tbsp", "tsp", "oz", "fl oz", "cup", "qt", "pt", "gal", "lb"];

function addFields(divName) {
    var newDiv = document.createElement('div');
    newDiv.className = "row";
    var selectHTML = "";
    selectHTML = '<div class="col"><label class="gray center">Numeric Quantity:</label></div><div class="col"><input type="number" name="ingWholeNumber" id="ingWholeNumber" min="0" value="0" step=".1" class="input form-control recipeForm"></div>';
    selectHTML += '<div class="col"><select class="form-control recipeForm" name="ingQuant">';
    for(i = 0; i < numbers.length; i = i + 1) {
        selectHTML += "<option value='" + numbers[i] + "'>" + numbers[i] + "</option>";
    }
    selectHTML += "</select></div>";
    selectHTML += '<div class="col"><select class="form-control recipeForm" name="ingUnit">';
    for(i = 0; i < units.length; i = i + 1) {
        selectHTML += "<option value='" + units[i] + "'>" + units[i] + "</option>";
    }
    selectHTML += "</select></div>";
    selectHTML += '<div class="col"><input type="text" name="ingName" class="input form-control recipeForm" placeholder="Ingredient Name"></div>'
    newDiv.innerHTML = selectHTML;
    document.getElementById(divName).appendChild(newDiv);
}


