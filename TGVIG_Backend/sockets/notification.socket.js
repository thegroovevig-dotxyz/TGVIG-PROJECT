module.exports = (io) => {

  io.on("connection", (socket) => {

    socket.on("notification:send", (data) => {

      io.emit("notification:new", data);

    });

  });

};