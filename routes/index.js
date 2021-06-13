var express = require('express');
var router = express.Router();
var ObjectId = require('monk').ObjectID;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Meal Plan App' });
});

/* GET addRecipe page */
router.get('/addRecipe', function(req, res, next) {
  res.render('addRecipe', { title: 'Add a Recipe' });
});

/*POST addRecipe page */
router.post('/addRecipe', function(req, res) {

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
      "recipeName" : recipeName,
      "ingredients" : recipeIngredients,
      "prepMethod" : recipePrepMethod
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
router.get('/mealCalendar', function(req, res, next) {
  var db = req.db;
  var collection = db.get('recipeList');
  collection.find({},{},function(e,docs){
      res.render('mealCalendar', {
          "recipelist" : docs,
          title: 'Meal Calendar'
      });
  });
});

/* GET ingredientList page */
router.get('/ingredientList', function(req, res, next) {
  res.render('ingredientList', { title: 'List of Ingredients' });
});

/* GET planMeals page */
router.get('/planMeals', function(req, res, next) {
  res.render('planMeals', { title: 'Plan Your Meals' });
});

/* GET recipelist page. */
router.get('/recipelist', function(req, res) {
  var db = req.db;
  var collection = db.get('recipeList');
  collection.find({},{},function(e,docs){
      res.render('recipelist', {
          "recipelist" : docs
      });
  });
});

/* GET viewRecipe page */
router.get('/viewRecipe/:recipeID', function(req, res, next) {
  var db = req.db;

  var recipeID = JSON.parse(req.params.recipeID);
  var collection = db.get('recipeList');

  collection.findOne({'_id': recipeID},function(e,docs){
    res.render('viewRecipe', {
        "recipe" : docs,
        title: 'View Recipe'
    });
});
});

module.exports = router;
