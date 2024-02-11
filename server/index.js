const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const msgRoutes = require("./routes/messageRoute");
const socket = require("socket.io");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", userRoutes);
app.use("/api/msg", msgRoutes);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MONGO DB IS UP and connected!");
  })
  .catch((err) => {
    console.error(err.message);
  });

const server = app.listen(process.env.PORT, () => {
  console.log("Server is started on port: ", process.env.PORT);
});

// socket.io creation

const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on("connection", (socket) => {
  global.chatSocket = socket;
  // action to take after a new user joins
  socket.on("add-user", (userId) => {
    console.log("user adddddedddd", userId);
    onlineUsers.set(userId, socket.id);
  });
  // action to take when user sends a message
  socket.on("send-msg", (data) => {
    console.log("SEEENNNDDDDDDD EVENTT", data);
    const user = onlineUsers.get(data.to);
    if (user) {
      socket.to(user).emit("msg-receive", data.message);
    }
  });
});
