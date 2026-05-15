const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");
const server = http.createServer(app);


console.log("ENV CHECK:", process.env.MONGO_URI);
    console.log("MONGO_URI =", process.env.MONGO_URI);

connectDB();

const io = new Server(server, {
  cors: {
    origin: "*"
  }
});

require("./sockets")(io);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});

module.exports = connectDB;