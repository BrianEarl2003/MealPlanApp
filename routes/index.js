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

  // Set our collection
  var collection = db.get('recipeList');

  // Submit to the DB
  collection.insert({
    "recipeName": recipeName,
    "ingredients": recipeIngredients,
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
  res.render('ingredientList', { title: 'List of Ingredients' });
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
router.post('/planMeals', function (req, res) {

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

/*POST mealCalendar page */
router.post('/mealCalendar', function (req, res) {

  // Set our internal DB variable
  var db = req.db;

  // Set our collection
  var collection = db.get('recipeList');

  // https://dev.to/sagdish/generate-unique-non-repeating-random-numbers-g6g
  let range = Object.keys(collection[i]).length;
  let outputCount = 7;

    let arr = []
    for (let i = 1; i <= range; i++) {
      arr.push(i)
    }

    let result = [];

    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }

  collection.update(
    { 'recipeName': 'Famous Butter Chicken' },
    { $set: { 'datePlanned': result[0] } }
    , function (err, doc) {
    });

  collection.update(
    { 'recipeName': 'Spicy Chicken Lasagna Roll-ups' },
    { $set: { 'datePlanned': result[1] } }
    , function (err, doc) {
    });

  collection.update(
    { 'recipeName': 'Navajo Tacos' },
    { $set: { 'datePlanned': result[2] } }
    , function (err, doc) {
    });

  collection.update(
    { 'recipeName': 'Funeral Potatoes' },
    { $set: { 'datePlanned': result[3] } }
    , function (err, doc) {
    });

  collection.update(
    { 'recipeName': 'Enchiladas' },
    { $set: { 'datePlanned': result[4] } }
    , function (err, doc) {
    });

  collection.update(
    { 'recipeName': 'Manicotti' },
    { $set: { 'datePlanned': result[5] } }
    , function (err, doc) {
    });

  collection.update(
    { 'recipeName': 'Homemade Frozen Pizza' },
    { $set: { 'datePlanned': result[6] } }
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

module.exports = router;
