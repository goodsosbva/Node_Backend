const http = require('http');
const url = require('url');

http.createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    
    if (path === "/user") {
        res.end("[user] name: andy, age: 20");
    } else if (path === "/feed") {
        res.end(`
         <ul>
            <li>한글</li>
            <li>picture1</li>
            <li>picture2</li>
            <li>picture3</li<
         </ul>      
        `)
    } else {
        res.stautsCode = 404;
        res.end("404 Not Found");
    }
}).listen("3000", () => {
    console.log("Server running on port 3000");
});

