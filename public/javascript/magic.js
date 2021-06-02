//searches for a card by name and displays it as an image button
function grab_card() {
  console.log('Grab Card');
  event.preventDefault();
  var data2 = $('#cardSearchForm').serialize();
  var data3 = "";
  data3 = data2.replace(' ', '-');
  console.log(data3);
  $.ajax({
    url: '/getCard',
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
//adds the card to combo queue as an image button
function addImgUrl(url) {
  event.preventDefault();
  var i = 0;
  var max = 0;
  var i = parseInt($('#cardId').val());
  var max = (i + 1);
  var newhtml = "";
  for (i; i < max; i++) {
    $('#card'+i).val(url);
    newhtml = "Card" + i + "<input class='card2' onclick='removeCard(" + "\"" + i + "\"" + ")' type='image' src='" + url + "' alt='Card' />";
    $('#img'+i).html(newhtml);
  }
  if (i == 6) {
    i = 1;
  }
  $('#cardId').val(i);
}
//removes a card from the combo queue
function removeCard(i) {
  newhtml = "";
  $('#img'+i).html(newhtml);
  $('#card'+i).val(newhtml);
}
//displays a list of cards from the given query
function grab_list() {
  console.log('Grab List');
  event.preventDefault();
  var data2 = $('#searchQueryForm').serialize();
  $.ajax({
    url: '/searchCard',
    type: 'GET',
    data: data2,
    dataType: 'json', //will parse json into javascript object
    //callback called when suceed
    success: (data) => {
      console.log('ajax success!', data);
      console.log(data.data.length);
      newhtml2 = "";
      var page = 0;
      var max = 0;
      var i = 0;
      page = parseInt($('#pageNum').val());
      i = (page) * 25;
      if (data.data.length - i < 25 ) {
        max = data.data.length;
      } else {
        max = (page + 1) * 25;
      }
      for (i; i < max; i++) {
        var cardName = "";
        cardName = data.data[i].name.replace("'", "");
        newhtml2 += "<input type=\"button\" onclick='fillName(" + "\"" + cardName + "\"" + ")' value=\"" + cardName + "\"id=\"" + cardName + "\"/><br>";
      }
      i = i/25;
      var group = 0;
      group = parseInt($('#groupNum').val());
      var cardQuery = $('#cardQuery').val();
      if (page % 7 == 0 && page > 6) {
        i = 0;
        var tempGroup = group;
        group++;
        var pageGroup = cardQuery.replace('&page=' + tempGroup, '&page=' + group);
        $('#cardQuery').val(pageGroup);
      }
      if (group == 1 && page == 6) {
        $('#cardQuery').val(cardQuery + '&page=' + group);
      }
      $('#groupNum').val(Math.ceil(group));
      $('#pageNum').val(Math.ceil(i));
      $('#cardList').html(newhtml2);
    }
  });
}
//fills the name of the card from the list into the search card input
function fillName(name) {
  console.log(name);
  $('#cardSearch').val(name);
}
//displays all the combos in the database
function showCombos() {
  event.preventDefault();
  data={};
  data["user_name"] = 'FuriousAvatar';
  data["id"] = 1;
  u = data["id"];
  newhtml1 = "";
  for (u; u < data["user_name"].length + 1; u++) {
    data["id"] = u;
    $.ajax({
      url: '/getCombos',
      type: 'GET',
      data: data,
      dataType: 'json', //will parse json into javascript object
      //callback called when succeed
      success: (data) => {
        console.log(data);
        var j = 0;
        for (var i = 0; i < data.length; i++) {
          newhtml1 += "<img class='card' src=" + JSON.stringify(data[i].image_uris) + ">";
          if (i == data.length - 1) {
            newhtml1 += "<br><p class='caption redBorder'>" + data[i].content + "<br>-submitted by " + data[i].user_name + "</p><br>";
          }
          if (data[i].combo_id != data[i+1].combo_id){ 
            newhtml1 += "<br><p class='caption redBorder'>" + data[i].content + "<br>-submitted by " + data[i].user_name + "</p><br>";
          }
        }
        $('#combos').html(newhtml1);
      }
    });
  }
}
//links the input from the user to the database functions and calls submitComboForm()
async function submitUsernameForm() {
  event.preventDefault();
  data={};
  data["user_name"] = $('#username').val();
  await $.ajax({
    url: '/submitUsername',
    type: 'GET',
    data: data,
    dataType: 'json', //will parse json into javascript object
    success: (data) => {
      console.log('ajax success!', data); 
    }
  });
  submitComboForm();
  //return false;
}
//links the input from the user to the database functions and calls submitCardsForm()
async function submitComboForm() {
  data={};
  var card = 0;
  for (var i = 1; i < 6; i++) {
    data["image_uris"+i] = $('#card'+i).val();
    if (data["image_uris"+i].length != 0){
      card++;
    }
  }
  data["numCards"] = card;
  console.log("cards="+card);
  data["user_name"] = $('#username').val();
  data["content"] = $('#explanation').val();
  await $.ajax({
    url: '/submitCombo',
    type: 'GET',
    data: data,
    dataType: 'json', //will parse json into javascript object
    success: (data) => {
      console.log('ajax success!', data);
      submitCardsForm(card);
    }
  });
}
//links the input from the user to the database functions and calls showCombos()
async function submitCardsForm(card) {
  data={};
  for (var i = 1; i < 6; i++) {
    data["image_uris"+i] = $('#card'+i).val();
  }
  //message = $('message').val();
  data["numCards"] = card;
  console.log("cards="+card);
  data["user_name"] = $('#username').val();
  await $.ajax({
    url: '/submitCards',
    type: 'GET',
    data: data,
    dataType: 'json', //will parse json into javascript object
    success: (data) => {
      console.log('ajax success!', data);
      showCombos();
    }
  });
}