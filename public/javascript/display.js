function displayRecipe() {
  console.log("displayRecipe");
  var data3 = "";
  $.ajax({
    url: '/listRecipes',
    type: 'GET',
    data: data3,
    dataType: 'json', //will parse json into javascript object
    //callback called when suceed
    success: (data) => {
      console.log('ajax success!', data);
      newhtml = "";
      imageURL = "";
      if (data.layout == "transform") {
        for (var i = 0; i < 2; i++)
        {
          newhtml += "<input onclick='addImgUrl(" + "\"" + data.card_faces[i].image_uris.png + "\"" + ")' type='image' class='card' src='" + data.card_faces[i].image_uris.png + "' alt='Card' />";
        }
      } else { 
        imageUrl = data.image_uris.png;
        newhtml += "<input onclick='addImgUrl(" + "\"" + imageUrl + "\"" + ")' type='image' class='card' src='" + imageUrl + "' alt='Card' />";
      }
      $('#picture2').append(newhtml);
    }//sucess data call
  });//ajax function call
}