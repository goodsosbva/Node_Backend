const express = require("express");
const app = express();
let posts = [];

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json(posts);
});

app.post("/posts", (req, res) => {
    const { title, name, text } = req.body;

    posts.push({ id: posts.length + 1, title: name, text, createAt: new Date()});
    res.json({ title, name, text });
});

app.delete("/posts/:id", (req, res) => {
    const id = req.params.id;
    posts = posts.filter((post) => post.id !== id);
    res.json({ id });
    const filteredPosts = posts.filter((post) => post.id !== +id);
    const isLengthChanged = posts.length !== filteredPosts.length;
    posts = filteredPosts;
    
    if (isLengthChanged) {
        res.json("ok!");
        return;
    }
    res.json("not changed!")
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
});