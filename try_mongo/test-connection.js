const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config({ path: require("path").join(__dirname, "../.env") });

const uri = process.env.MONGODB_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();
    const adminDB = client.db("test").admin();

    const listDatabases = await adminDB.listDatabases();
    console.log(listDatabases);
    return "OK";
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
