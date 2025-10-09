const MongoClient = require("mongodb").MongoClient;

const uri =
  "mongodb+srv://mymongo:NTjjGQpSA2DcyIMO@m0-cluster.0oqgejt.mongodb.net/?retryWrites=true&w=majority&appName=m0-cluster";

const client = new MongoClient(uri, { useNewUrlParser: true });

async function main() {
  try {
    await client.connect();

    console.log("MongoDB 접속 성공");

    const collection = client.db("test").collection("person");

    await collection.insertOne({ name: "khs", age: 32 });
    console.log("문서 추가 완료");

    const documents = await collection.find({ name: "khs" }).toArray();
    console.log("찾은 문서 >> ", documents);

    await collection.updateOne({ name: "khs" }, { $set: { age: 33 } });
    console.log("문서 업데이트");

    const updatedDocuments = await collection.find({ name: "khs" }).toArray();
    console.log("업데이트 된 문서 >> ", updatedDocuments);

    await client.close();
    console.log("MongoDB 접속 종료");
  } catch (err) {
    console.error("MongoDB 접속 실패", err);
  }
}

main();
