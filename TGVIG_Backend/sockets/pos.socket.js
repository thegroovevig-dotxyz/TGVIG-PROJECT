module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("POS socket connected");

    socket.on("pos:payment_request", (data) => {

      io.emit("pos:approval_needed", data);

    });

    socket.on("pos:payment_approved", (data) => {

      io.emit("pos:approved", data);

    });

    socket.on("pos:payment_failed", (data) => {

      io.emit("pos:failed", data);

    });

  });

};