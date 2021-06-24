var express = require('express');
var router = express.Router();
var ObjectId = require('monk').ObjectID;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Meal Plan App' });
});

/* GET addRecipe page */
router.get('/addRecipe', function (req, res, next) {
  res.render('addRecipe', { title: 'Add a Recipe' });
});

/*POST addRecipe page */
router.post('/addRecipe', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Get our form values. These rely on the "name" attributes
  var recipeName = req.body.recipeName;
  var recipeIngredients = req.body.recipeIngredients;
  var recipePrepMethod = req.body.prepMethod;

  //We'll now add the ingredients to an array;
  var ingredients = recipeIngredients.split(";");

  // Set our collection
  var collection = db.get('recipeList');

  // Submit to the DB
  collection.insert({
    "recipeName": recipeName,
    "ingredients": ingredients,
    "prepMethod": recipePrepMethod
  }, function (err, doc) {
    if (err) {
      // If it failed, return error
      res.send("There was a problem adding the information to the database.");
    }
    else {
      // And forward to success page
      res.redirect("recipeList");
    }
  });

});

/* GET mealCalendar page */
router.get('/mealCalendar', function (req, res, next) {
  var db = req.db;
  var collection = db.get('recipeList');
  collection.find({}, {}, function (e, docs) {
    res.render('mealCalendar', {
      "recipelist": docs,
      title: 'Meal Calendar'
    });
  });
});

/* GET ingredientList page */
router.get('/ingredientList', function (req, res, next) {
  var db = req.db;

  var collection = db.get('recipeList');

  collection.find({'datePlanned': {$ne : 0} }, function (e, docs) {

    var ingredients = [];

    for (i = 0; i < docs.length; i++) {
      for (j = 0; j < docs[i].ingredients.length; j++) {
        ingredients.push(docs[i].ingredients[j]/*.split(" ")*/);
      }
    }

    ingredients.sort();

    res.render('ingredientList', {
      "recipes": ingredients,
      title: 'View Ingredients'
    });
  });
});

/* GET planMeals page  */
router.get('/planMeals', function(req, res) {
  var db = req.db;
  var collection = db.get('recipeList');
  collection.find({},{},function(e,docs){
    res.render('planMeals', { 
    "recipelist" : docs,
    title: 'Plan Your Meals' });
  });
});

/*POST planMeals page */
router.post('/planMeals', async function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('recipeList');

  // Get our form values. These rely on the "name" attributes
  var recipeSunday = req.body.sunday;
  var recipeMonday = req.body.monday;
  var recipeTuesday = req.body.tuesday;
  var recipeWednesday = req.body.wednesday;
  var recipeThursday = req.body.thursday;
  var recipeFriday = req.body.friday;
  var recipeSaturday = req.body.saturday;

  collection.update(
    {'_id' : {$ne : null} },
    { $set: {'datePlanned' : 0}},
    {'multi' : true},
    function (err, doc) {}
  );

  await resolveAfter2Seconds();

  // Submit to the DB
  collection.update(
    {'recipeName' : recipeSunday},
    { $set: {'datePlanned': 1}}
  , function (err, doc) {
    });

  collection.update(
    {'recipeName' : recipeMonday},
    { $set: {'datePlanned': 2}}
  , function (err, doc) {
  });

  collection.update(
    {'recipeName' : recipeTuesday},
    { $set: {'datePlanned': 3}}
  , function (err, doc) {
  });

  collection.update(
    {'recipeName' : recipeWednesday},
    { $set: {'datePlanned': 4}}
  , function (err, doc) {
  });

  collection.update(
    {'recipeName' : recipeThursday},
    { $set: {'datePlanned': 5}}
  , function (err, doc) {
  });

  collection.update(
    {'recipeName' : recipeFriday},
    { $set: {'datePlanned': 6}}
  , function (err, doc) {
  });

  collection.update(
    {'recipeName' : recipeSaturday},
    { $set: {'datePlanned': 7}}
  , function (err, doc) {
      res.redirect("/mealCalendar");
  });
});

/* GET recipelist page. */
router.get('/recipelist', function (req, res) {
  var db = req.db;
  var collection = db.get('recipeList');
  collection.find({}, {}, function (e, docs) {
    res.render('recipelist', {
      "recipelist": docs
    });
  });
});

/* GET viewRecipe page */
router.get('/viewRecipe/:recipeID', function (req, res, next) {
  var db = req.db;

  var recipeID = JSON.parse(req.params.recipeID);
  var collection = db.get('recipeList');

  collection.findOne({ '_id': recipeID }, function (e, docs) {
    res.render('viewRecipe', {
      "recipe": docs,
      title: 'View Recipe'
    });
  });
});

function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 500);
  });
}

module.exports = router;
