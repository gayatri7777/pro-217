const express = require("express");
const app = express();
const server = require("http").Server(app);
app.set("view engine", "ejs");
app.use(express.static("public"));

const io = require("socket.io")(server, {
    cors: {
        origin: '*'
    }
});

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
    debug: true,
});

app.use("/peerjs",peerServer);

app.get("/", (req, res) => {
    res.render("index");
});

io.on("connection", (socket) => {


    socket.on("join-room", (roomId, userName) => {
        socket.join(roomId);
    socket.on("message", (message) => {
        io.emit("createMessage", message);
    });
});
});

server.listen(3030);