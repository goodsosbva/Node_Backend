const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    
    if (path in urlMap) {
        urlMap[path](req, res);
    }
    else {
        notFound(req, res);
    }
}).listen("3000", () => {
    console.log("Server running on port 3000");
});

const user = (req, res) => {
    const userInfo = url.parse(req.url, true).query;
    res.end(`[user] ${userInfo.name}: andy, age: ${userInfo.age}`);
}

const feed = (req, res) => {
    res.end(`
         <ul>
            <li>한글</li>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li<
         </ul>      
        `)
}

const notFound = (req, res) => {
    res.stautsCode = 404;
    res.end("404 Not Found");
}

const urlMap = {
    "/": (req, res) => res.end("Ok!"),
    "/user": user,
    "/feed": feed0
}