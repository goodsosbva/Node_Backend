const port = 4000;
const url = require("url");
const express = require("express");
const app = express();

app.listen(port, () => {
    console.log(`익스프레스 라우터 리팩톨이 하기!`);
});

app.get("/", (_, res) => res.end("Home!"));
app.get("/user", user);
app.get("/feed", feed);


function user(req, res) {
    const user = url.parse(req.url, true).query;

    res.json(`[user] name: ${user.name}, age: ${user.age}`);
}

function feed(req, res) {
    res.json(`
        <ul>
            <li>한글</li>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li>
        </ul>
    `);
}