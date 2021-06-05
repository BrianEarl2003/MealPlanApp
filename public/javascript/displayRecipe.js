const {MongoClient} = require('mongodb');

async function main() {
	const uri = "mongodb+srv://user:user123@cluster0.4bkrd.mongodb.net/recipeList?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    await listRecipes(client);
  } catch (e) {
    console.error(e);
  }

  finally {
  await client.close();
  }


}

async function listRecipes(client) {
  const cursor = client.db("recipes").collection("recipeList").find();

  const results = await cursor.toArray();

  if (results.length > 0) {
    results.forEach((result, i) => {
      console.log();
      console.log(`${i+1}. name: ${result.recipeName}`);
      console.log(`ingredients: ${result.ingredients}`);
      console.log(`prepMethod: ${result.prepMethod}`);
    });
  } else {
    console.log("Fatal Failure. No recipes found!!!");
  }

}

main().catch(console.error);
