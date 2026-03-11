const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

let onlineUsers = 0;

io.on("connection", (socket) => {
    onlineUsers++;
    io.emit("online users", onlineUsers);

    socket.on("chat message", (data) => {
        io.emit("chat message", data);
    });

    socket.on("typing", (name) => {
        socket.broadcast.emit("typing", name);
    });

    socket.on("disconnect", () => {
        onlineUsers--;
        io.emit("online users", onlineUsers);
    });
});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
