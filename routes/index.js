var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Meal Plan App' });
});

/* GET addRecipe page */
router.get('/addRecipe', function(req, res, next) {
  res.render('addRecipe', { title: 'Add a Recipe' });
});

/* GET mealCalendar page */
router.get('/mealCalendar', function(req, res, next) {
  res.render('mealCalendar', { title: 'Meal Calendar' });
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

module.exports = router;
