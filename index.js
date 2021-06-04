const express = require('express');
const path = require('path');
//const {Pool} = require('pg');
//const axios = require('axios');

//const CombosController = require('./public/javascript/recipeDb.js');
const PORT = process.env.PORT || 5000;
//const connectionString = process.env.DATABASE_URL || 'postgres://puzwgqmubratkb:ec448406403a5f0f3149cbbd7ecc69fc642b6abb465098324ee82c1e086f9081@ec2-54-236-169-55.compute-1.amazonaws.com:5432/daot60aij3ip2a?ssl=true';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

/*express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))*/

var app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/getMealPlan', function(req, res) {
    res.render('pages/mealPlan');
});
app.get('/getMealPlan/Calendar', function(req, res) {
  res.render('pages/Calendar');
});
app.get('/getMealPlan/planMeals', function(req, res) {
  res.render('pages/planMeals');
});
app.get('/getMealPlan/addRecipe', function(req, res) {
  res.render('pages/addRecipe');
});
app.get('/getMealPlan/recipeList', function(req, res) {
  res.render('pages/recipeList');
});
app.get('/getMealPlan/ingredientList', function(req, res) {
  res.render('pages/ingredientList');
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));