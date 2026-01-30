const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

let timeLeft = 30;
let history = [2, 6, 5, 6, 6];

setInterval(() => {
  if (timeLeft > 0) timeLeft--;
  else {
    timeLeft = 30;
    const result = Math.floor(Math.random() * 10);
    history.unshift(result);
    if (history.length > 5) history.pop();
    io.emit("result", { result, history });
  }
  io.emit("timer", timeLeft);
}, 1000);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(process.env.PORT || 3000);
