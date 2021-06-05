const {MongoClient} = require('mongodb');


async function listRecipes() {
  const uri = "mongodb+srv://user:user123@cluster0.4bkrd.mongodb.net/recipeList?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  await client.connect();
  const cursor = client.db("recipes").collection("recipeList").find();

  const results = await cursor.toArray();

  if (results.length > 0) {
    return results;
  } else {
    console.log("Fatal Failure. No recipes found!!!");
  }

}

module.exports = {
  listRecipes: listRecipes
};