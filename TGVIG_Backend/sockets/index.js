module.exports = (io) => {

  require("./taxi.socket")(io);
  require("./pos.socket")(io);
  require("./notification.socket")(io);

};