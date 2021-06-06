var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Meal Plan App' });
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
