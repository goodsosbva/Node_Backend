const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 7777 });

server.on("connection", (ws) => {
  ws.send("server was connected");

  ws.on("message", (message) => {
    ws.send(`echo: ${message}`);
  });

  ws.on("close", () => {
    console.log("server was closed");
  });
});
