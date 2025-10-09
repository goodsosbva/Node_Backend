const port = 4000;

const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.set({ "Content-Type": "text/html; charset=utf-8" });
    res.send("Hello Express!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});