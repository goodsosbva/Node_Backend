const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Person = require("./person-model");
require("dotenv").config({
  path: require("path").join(__dirname, "../../.env"),
});

mongoose.set("strictQuery", false);

const app = express();

app.use(bodyParser.json());
app.listen(3000, async () => {
  console.log("Server started");
  const mongodbUri = process.env.MONGODB_URI;

  mongoose.connect(mongodbUri).then(console.log("Connected to MongoDB"));
});

app.get("/person", async (req, res) => {
  const persons = await Person.find();
  res.json(persons);
});

app.get("/person/:email", async (req, res) => {
  const person = await Person.findOne({ email: req.params.email });
  res.send(person);
});

app.post("/person", async (req, res) => {
  const person = new Person(req.body);
  await person.save();
  res.json(person);
});

app.put("/person/:email", async (req, res) => {
  const person = await Person.findOneAndUpdate(
    { email: req.params.email },
    req.body,
    { new: true }
  );
  console.log(person);
  res.send(person);
});

app.delete("/person/:email", async (req, res) => {
  await Person.deleteMany({ email: req.params.email });
  res.send({ success: true });
});
