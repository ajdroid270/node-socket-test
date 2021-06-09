const express = require("express");
const cors = require("cors");
const http = require("http");
const socket = require("socket.io");
const conversationHandlers = require("./conversation/conversationHandlers");
const messageHandlers = require("./message/messageHandlers");

// App setup
const PORT = 5000;
const app = express();
app.use(cors());
const httpServer = http.createServer(app);

app.get("/", (req, res) => {
  res.json({ hi: "hello" });
});

app.get("/chat", (req, res) => {
  res.json({ messages: [{ id: 41658, message: "Hi" }] });
});

// Socket setup
const io = socket(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", function (socket) {
  console.log("Made socket connection");
  socket.on("ping", (count) => {
    console.log(count);
  });
  messageHandlers(io, socket);
  conversationHandlers(io, socket);
});

httpServer.listen(PORT);
