const Driver = require("../models/Driver");

module.exports = (io) => {

  io.on("connection", (socket) => {

    console.log("Taxi socket connected");

    // DRIVER ONLINE
    socket.on("driver:online", async ({ driverId }) => {

      await Driver.findByIdAndUpdate(driverId, {
        isOnline: true
      });

    });

    // DRIVER LOCATION
    socket.on("driver:location", async (data) => {

      io.emit("driver:location:update", data);

    });

    // CUSTOMER REQUESTS RIDE
    socket.on("ride:request", async (ride) => {

      io.emit("ride:new", ride);

    });

    // DRIVER ACCEPTS
    socket.on("ride:accepted", async (data) => {

      io.emit("ride:update", {
        status: "ACCEPTED",
        ...data
      });

    });

    // RIDE STARTED
    socket.on("ride:started", async (data) => {

      io.emit("ride:update", {
        status: "STARTED",
        ...data
      });

    });

    // RIDE COMPLETED
    socket.on("ride:completed", async (data) => {

      io.emit("ride:update", {
        status: "COMPLETED",
        ...data
      });

    });

    socket.on("disconnect", () => {
      console.log("Taxi socket disconnected");
    });

  });

};